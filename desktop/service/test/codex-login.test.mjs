import test from 'node:test';
import assert from 'node:assert/strict';
import { EventEmitter } from 'node:events';
import { PassThrough, Writable } from 'node:stream';
import { mkdir, mkdtemp, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { CodexLogin, signInUrl } from '../codex-login.mjs';
import { createService } from '../server.mjs';

// Fake authentication transports only: no real login, browser, account file or provider.
function fixture({ browserFails = false, url = 'https://auth.openai.com/authorize?fixture=only' } = {}) {
  const children = [], calls = [], opened = [];
  const spawnProcess = () => {
    const child = new EventEmitter(); child.stdout = new PassThrough(); child.stderr = new PassThrough(); child.kills = 0;
    child.stdin = new Writable({ write(chunk, encoding, callback) {
      for (const line of chunk.toString().trim().split('\n')) {
        const request = JSON.parse(line); calls.push(request); if (request.id == null) continue;
        const result = request.method === 'account/login/start' ? { type: 'chatgpt', loginId: 'fixture-login', authUrl: url }
          : request.method === 'account/read' ? { account: { type: 'chatgpt', email: 'switched@example.invalid', planType: 'plus' } }
          : request.method === 'thread/start' ? { thread: { id: 'fresh-fixture-thread' } } : {};
        setImmediate(() => child.stdout.write(JSON.stringify({ id: request.id, result }) + '\n'));
      }
      callback();
    } });
    child.kill = () => { child.kills++; setImmediate(() => { child.stdout.end(); child.emit('exit', 0); }); return true; };
    children.push(child); return child;
  };
  const options = { repo: process.cwd(), spawnProcess, resolveBinary: () => ({ file: 'fixture-codex', args: [] }), open: async value => { opened.push(value); if (browserFails) throw new Error('fixture'); } };
  const notify = (child, success, loginId = 'fixture-login') => child.stdout.write(JSON.stringify({ method: 'account/login/completed', params: { loginId, success, error: null } }) + '\n');
  return { options, children, calls, opened, notify };
}
const tick = () => new Promise(resolve => setImmediate(resolve));
const waitFor = (login, status) => login.snapshot().status === status ? Promise.resolve() : new Promise((resolve, reject) => {
  const timer = setTimeout(() => { login.off('state', changed); reject(new Error('Fixture state did not arrive')); }, 2000);
  const changed = value => { if (value.status === status) { clearTimeout(timer); login.off('state', changed); resolve(); } }; login.on('state', changed);
});

test('browser sign-in is single-flight and reconnects only after matching success', async () => {
  const fixtureState = fixture(); let reconnects = 0;
  const login = new CodexLogin({ ...fixtureState.options, completed: async () => { reconnects++; } });
  try {
    const first = login.start(); assert.equal(first, login.start()); await first;
    assert.equal(login.busy, true); assert.equal(fixtureState.opened.length, 1); assert.equal(reconnects, 0);
    fixtureState.notify(fixtureState.children[0], true, 'other-attempt'); await tick(); assert.equal(reconnects, 0);
    fixtureState.notify(fixtureState.children[0], true); fixtureState.notify(fixtureState.children[0], true); await waitFor(login, 'complete');
    assert.equal(reconnects, 1); assert.equal(login.busy, false); assert.equal(login.snapshot().url, null);
    assert.equal(fixtureState.children[0].kills, 1);
    assert(!fixtureState.calls.some(item => /thread\/|turn\/|logout/.test(item.method)));
  } finally { login.close(); }
});

test('browser launch failure keeps a fallback link and cancellation closes only its attempt', async () => {
  const f = fixture({ browserFails: true }); const login = new CodexLogin({ ...f.options, completed: async () => assert.fail('Cancelled login must not reconnect') });
  try {
    await login.start(); assert.equal(login.snapshot().status, 'waiting'); assert(login.snapshot().url); assert.match(login.snapshot().error, /Open sign-in page/);
    await login.cancel(); assert.equal(login.snapshot().status, 'cancelled'); assert.equal(f.children[0].kills, 1);
    assert(f.calls.some(item => item.method === 'account/login/cancel' && item.params.loginId === 'fixture-login'));
  } finally { login.close(); }
});

test('failed sign-in permits retry after exit; shutdown cannot reconnect', async () => {
  const f = fixture(); let reconnects = 0; const login = new CodexLogin({ ...f.options, completed: async () => { reconnects++; } });
  await login.start(); f.notify(f.children[0], false); await waitFor(login, 'failed'); await tick();
  await login.start(); assert.equal(f.children.length, 2); login.close(); f.notify(f.children[1], true);
  await tick(); assert.equal(reconnects, 0); await assert.rejects(login.start(), /shutting down/);
});

test('untrusted sign-in URLs cannot launch external commands', async () => {
  for (const value of ['file:///C:/Windows/test', 'https://example.invalid/login', 'https://user:password@auth.openai.com/login']) assert.throws(() => signInUrl(value), /unsupported/);
  const f = fixture({ url: 'https://example.invalid/login' }); const login = new CodexLogin({ ...f.options, completed: async () => {} });
  await assert.rejects(login.start(), /unsupported/); assert.equal(f.opened.length, 0); assert.equal(f.children[0].kills, 1); login.close();
});

test('authenticated sign-in endpoint blocks competing coordinator/voice work and retains worker chats', async () => {
  await mkdir('.cache', { recursive: true }); const repo = await mkdtemp(path.resolve('.cache/login-service-')); await mkdir(path.join(repo, 'workspace')); await writeFile(path.join(repo, 'workspace/workspace.json'), '{"entities":[]}\n', 'utf8');
  await writeFile(path.join(repo, '.env'), 'OPENAI_API_KEY=fixture-only-no-provider-access\n', 'utf8');
  const f = fixture(); const service = await createService({ repo, uiDir: repo, loginOptions: f.options, mcpOptions: { home: repo, env: {} } });
  service.coordinator.spawnProcess = f.options.spawnProcess; service.coordinator.resolveBinary = f.options.resolveBinary;
  const worker = service.sessions.make({ id: 'keep-worker', name: 'Keep worker', agent: 'codex', cwd: repo, open: true, status: 'running' }); let workerKills = 0;
  worker.process = { kill() { workerKills++; } }; service.sessions.items.set(worker.id, worker);
  const request = (route, data = {}, auth = true) => fetch(service.origin + '/api' + route, { method: 'POST', headers: { ...(auth ? { Authorization: 'Bearer ' + service.token } : {}), 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
  try {
    assert.equal((await request('/coordinator/login', {}, false)).status, 401); assert.equal(f.opened.length, 0);
    service.coordinator.active = {}; assert.equal((await request('/coordinator/login')).status, 409); service.coordinator.active = null;
    assert.equal((await request('/coordinator/login')).status, 200);
    assert.equal((await request('/coordinator/refresh')).status, 409); assert.equal((await request('/coordinator/prepare')).status, 409);
    assert.equal((await request('/coordinator', { id: 'blocked', text: 'Do work' })).status, 409);
    assert.equal((await request('/live/session', { sdp: 'fixture-offer', clientId: 'fixture' })).status, 409);
    await assert.rejects(service.coordinator.ask({ id: 'direct', text: 'Do work' }), /browser sign-in/);
    await assert.rejects(service.coordinator.refreshConnection(), /browser sign-in/);
    f.notify(f.children[0], true); await waitFor(service.codexLogin, 'complete');
    assert.equal(service.coordinator.account.email, 'switched@example.invalid'); assert.equal(service.coordinator.threadId, 'fresh-fixture-thread');
    assert.equal(workerKills, 0); assert.equal(service.sessions.get(worker.id).process, worker.process);
    const initial = await fetch(service.origin + '/api/bootstrap', { headers: { Authorization: 'Bearer ' + service.token } }).then(r => r.json());
    assert.equal(initial.codexLogin.status, 'complete'); assert.equal(initial.codexAccount.email, 'switched@example.invalid');
  } finally { worker.process = null; await service.close(); }
});
