import { EventEmitter } from 'node:events';
import { spawn, execFile } from 'node:child_process';
import { createInterface } from 'node:readline';
import { codexBinary, coordinatorEnvironment } from './agents.mjs';
import { browserCommand } from './platform.mjs';

export function signInUrl(value) {
  const url = new URL(value);
  if (url.protocol !== 'https:' || !['auth.openai.com', 'chatgpt.com'].includes(url.hostname) || url.username || url.password) throw new Error('Codex returned an unsupported sign-in page.');
  return url.href;
}
const openBrowser = url => new Promise((resolve, reject) => {
  const command = browserCommand(signInUrl(url));
  execFile(command.file, command.args, { windowsHide: true }, error => error ? reject(new Error('Use Open sign-in page to continue in your browser.')) : resolve());
});

// Owns only an authentication transport. It never starts a thread or model turn.
export class CodexLogin extends EventEmitter {
  constructor({ repo, completed, spawnProcess = spawn, resolveBinary = codexBinary, open = openBrowser, timeout = 10 * 60 * 1000 }) {
    super(); Object.assign(this, { repo, completed, spawnProcess, resolveBinary, open, timeout });
    this.value = { status: 'idle', url: null, error: null }; this.attempt = null; this.child = null; this.closed = false; this.startPromise = null;
  }
  get busy() { return ['starting', 'waiting', 'completing', 'cancelling'].includes(this.value.status); }
  snapshot() { return { ...this.value }; }
  set(status, url = null, error = null) { this.value = { status, url, error }; this.emit('state', this.snapshot()); }
  start() {
    if (this.closed) return Promise.reject(new Error('Mr. Mak is shutting down.'));
    if (this.busy) return this.startPromise || Promise.resolve(this.snapshot());
    if (this.child) return Promise.reject(Object.assign(new Error('The previous sign-in connection is closing. Retry shortly.'), { status: 409 }));
    this.set('starting');
    const attempt = { pending: new Map(), nextId: 1, loginId: null, early: [], done: false, finishing: null };
    this.attempt = attempt;
    this.startPromise = this.startInternal(attempt).catch(error => { if (!attempt.done) this.finish(attempt, 'failed', error.message); throw error; }).finally(() => { this.startPromise = null; });
    return this.startPromise;
  }
  rpc(attempt, method, params) {
    const id = attempt.nextId++;
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => { attempt.pending.delete(id); reject(new Error('Codex sign-in did not respond. Try again.')); }, 15000);
      attempt.pending.set(id, { resolve, reject, timer });
      try { attempt.child.stdin.write(JSON.stringify({ id, method, params }) + '\n'); }
      catch { clearTimeout(timer); attempt.pending.delete(id); reject(new Error('The Codex sign-in connection closed.')); }
    });
  }
  async startInternal(attempt) {
    const command = this.resolveBinary();
    const child = this.spawnProcess(command.file, [...command.args, 'app-server', '--stdio'], { cwd: this.repo, env: coordinatorEnvironment(this.repo), stdio: ['pipe', 'pipe', 'pipe'], windowsHide: true });
    this.child = attempt.child = child;
    child.stderr.on('data', () => {});
    const lines = createInterface({ input: child.stdout }); attempt.lines = lines;
    lines.on('line', line => {
      if (attempt.done) return;
      try {
        const message = JSON.parse(line), pending = attempt.pending.get(message.id);
        if (pending && !message.method) {
          clearTimeout(pending.timer); attempt.pending.delete(message.id);
          if (message.error) pending.reject(new Error('Codex could not complete the sign-in request.')); else pending.resolve(message.result);
        } else if (message.method === 'account/login/completed') {
          if (!attempt.loginId) attempt.early.push(message.params); else this.loginCompleted(attempt, message.params);
        }
      } catch { /* Never forward non-protocol output or credential envelopes. */ }
    });
    const disconnected = () => {
      if (this.child === child) this.child = null;
      for (const request of attempt.pending.values()) { clearTimeout(request.timer); request.reject(new Error('The Codex sign-in connection closed.')); } attempt.pending.clear();
      if (!attempt.done && !attempt.finishing) this.finish(attempt, 'failed', 'The Codex sign-in connection closed. Try again.');
    };
    child.once('error', disconnected); child.once('exit', disconnected);
    await this.rpc(attempt, 'initialize', { clientInfo: { name: 'mrmak_desktop', title: 'Mr. Mak Desktop', version: '0.1.0' }, capabilities: { experimentalApi: true } });
    child.stdin.write(JSON.stringify({ method: 'initialized', params: {} }) + '\n');
    const result = await this.rpc(attempt, 'account/login/start', { type: 'chatgpt' });
    if (typeof result.loginId !== 'string' || result.type !== 'chatgpt') throw new Error('Codex did not start browser sign-in.');
    attempt.loginId = result.loginId;
    const url = signInUrl(result.authUrl);
    this.set('waiting', url);
    attempt.timer = setTimeout(() => { this.cancel().catch(() => {}); }, this.timeout);
    for (const notification of attempt.early) this.loginCompleted(attempt, notification); attempt.early = [];
    if (attempt.finishing) { await attempt.finishing; return this.snapshot(); }
    if (!attempt.done) { try { await this.open(url); } catch { if (!attempt.done && !attempt.finishing) this.set('waiting', url, 'Use Open sign-in page to continue in your browser.'); } }
    return this.snapshot();
  }
  loginCompleted(attempt, notification) {
    if (attempt.done || attempt.finishing || notification.loginId !== attempt.loginId) return;
    if (!notification.success) { if (this.value.status !== 'cancelling') this.finish(attempt, 'failed', 'Sign-in did not finish. Try again.'); return; }
    this.set('completing');
    attempt.finishing = Promise.resolve().then(() => this.closed ? Promise.reject(new Error('Mr. Mak is shutting down.')) : this.completed())
      .then(() => this.finish(attempt, 'complete'))
      .catch(() => this.finish(attempt, 'failed', 'Sign-in finished, but reconnect failed. Press Refresh connection.'));
  }
  async cancel() {
    const attempt = this.attempt;
    if (!this.busy) return this.snapshot();
    if (attempt.finishing) { await attempt.finishing; return this.snapshot(); }
    if (!attempt.loginId) throw Object.assign(new Error('Wait for browser sign-in to start, then cancel.'), { status: 409 });
    this.set('cancelling');
    try { await this.rpc(attempt, 'account/login/cancel', { loginId: attempt.loginId }); }
    catch { if (!attempt.done && !attempt.finishing) this.finish(attempt, 'failed', 'The sign-in connection closed. Reconnect Codex before retrying.'); }
    if (attempt.finishing) await attempt.finishing;
    else if (!attempt.done) this.finish(attempt, 'cancelled');
    return this.snapshot();
  }
  finish(attempt, status, error = null) {
    if (attempt.done) return;
    attempt.done = true; clearTimeout(attempt.timer); attempt.lines?.close();
    for (const request of attempt.pending.values()) { clearTimeout(request.timer); request.reject(new Error('The sign-in attempt ended.')); } attempt.pending.clear();
    attempt.child?.stdin.end(); attempt.child?.kill();
    this.set(status, null, error);
  }
  close() { this.closed = true; if (this.attempt && !this.attempt.done) this.finish(this.attempt, 'cancelled'); }
}
