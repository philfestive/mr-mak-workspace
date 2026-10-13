import test from 'node:test';
import assert from 'node:assert/strict';
import { EventEmitter } from 'node:events';
import { PassThrough, Writable } from 'node:stream';
import { mkdir, mkdtemp, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { Coordinator } from '../coordinator.mjs';
import { createService } from '../server.mjs';

// Protocol-only fixtures. No provider, account file, model turn or worker process.
async function fixture() {
  await mkdir('.cache', { recursive: true });
  const repo = await mkdtemp(path.resolve('.cache/coordinator-refresh-'));
  let account = { type: 'chatgpt', email: 'first@example.invalid', planType: 'plus', accessToken: 'never-display' };
  const children = [], calls = [];
  function spawnProcess() {
    const child = new EventEmitter(); child.stdout = new PassThrough(); child.stderr = new PassThrough(); child.kills = 0;
    const signedIn = account && { ...account };
    child.stdin = new Writable({ write(chunk, encoding, callback) {
      for (const line of chunk.toString().trim().split('\n')) {
        const message = JSON.parse(line); calls.push(message);
        if (message.id == null) continue;
        const result = message.method === 'account/read' ? { account: signedIn, requiresOpenaiAuth: true }
          : message.method === 'thread/start' ? { thread: { id: `thread-${children.length}` } } : {};
        setImmediate(() => child.stdout.write(JSON.stringify({ id: message.id, result }) + '\n'));
      }
      callback();
    } });
    child.kill = () => { child.kills++; setImmediate(() => { child.stdout.end(); child.emit('exit', 0); }); return true; };
    children.push(child); return child;
  }
  const options = { repo, stateDir: path.join(repo, 'state'), execute: async () => ({}), context: () => ({}), spawnProcess, resolveBinary: () => ({ file: 'protocol-fixture', args: [] }) };
  const coordinator = await new Coordinator(options).init();
  return { repo, coordinator, options, children, calls, setAccount: value => { account = value; } };
}

test('refresh reads the changed account, replaces the ephemeral thread and retains completed operation IDs', async () => {
  const { coordinator, children, calls, setAccount } = await fixture();
  try {
    await coordinator.start();
    assert.equal(coordinator.account.email, 'first@example.invalid');
    assert(!JSON.stringify(coordinator.account).includes('never-display'));
    coordinator.operations.set('finished', { id: 'finished', status: 'completed', result: 'Already delivered.' });
    setAccount({ type: 'chatgpt', email: 'second@example.invalid', planType: 'pro', refreshToken: 'private' });
    const first = coordinator.refreshConnection(), same = coordinator.refreshConnection();
    assert.equal(first, same);
    await assert.rejects(coordinator.ask({ id: 'new-request', text: 'Do something' }), /reconnecting/);
    const result = await first;
    assert.equal(result.account.email, 'second@example.invalid');
    assert.equal(coordinator.threadId, 'thread-2');
    assert.equal(children[0].kills, 1); assert.equal(children[1].kills, 0);
    assert.equal((await coordinator.ask({ id: 'finished', text: 'Retry' })).result, 'Already delivered.');
    assert(!JSON.stringify(result).includes('private'));
    assert(calls.filter(item => item.method === 'account/read').every(item => item.params.refreshToken === false));
    assert(!calls.some(item => /login|logout|turn\/start/.test(item.method)));
  } finally { coordinator.close(); }
});

test('refresh refuses active or queued work and a pending initialization', async () => {
  const { coordinator, children } = await fixture();
  try {
    await coordinator.start();
    coordinator.active = {}; await assert.rejects(coordinator.refreshConnection(), /finish/); coordinator.active = null;
    coordinator.operationPromises.set('queued', Promise.resolve()); await assert.rejects(coordinator.refreshConnection(), /finish/); coordinator.operationPromises.clear();
    coordinator.startPromise = Promise.resolve(); await assert.rejects(coordinator.refreshConnection(), /finish/); coordinator.startPromise = null;
    assert.equal(children[0].kills, 0);
  } finally { coordinator.close(); }
});

test('signed-out refresh does not create a coordinator thread and can recover after login', async () => {
  const { coordinator, setAccount, calls } = await fixture();
  try {
    setAccount(null); await assert.rejects(coordinator.refreshConnection(), /Sign in to Codex/);
    await new Promise(resolve => setImmediate(resolve));
    assert.equal(coordinator.child, null); assert.equal(coordinator.state, 'offline');
    assert.equal(coordinator.account.status, 'signed-out');
    assert(!calls.some(item => item.method === 'thread/start'));
    setAccount({ type: 'apiKey' });
    assert.equal((await coordinator.refreshConnection()).account.type, 'apiKey');
  } finally { coordinator.close(); }
});

test('refresh endpoint keeps worker chats and distinguishes the voice key', async () => {
  const { repo, options } = await fixture();
  await mkdir(path.join(repo, 'workspace')); await writeFile(path.join(repo, 'workspace/workspace.json'), '{"entities":[]}\n', 'utf8');
  const service = await createService({ repo, uiDir: repo, stateDir: path.join(repo, 'service-state'), mcpOptions: { home: repo, env: {} } });
  let workerKills = 0;
  const worker = service.sessions.make({ id: 'worker-fixture', name: 'Keep worker', agent: 'codex', cwd: repo, open: true, status: 'running' });
  worker.process = { kill() { workerKills++; }, write() {}, resize() {} }; service.sessions.items.set(worker.id, worker);
  service.coordinator.spawnProcess = options.spawnProcess; service.coordinator.resolveBinary = options.resolveBinary;
  const request = (route, data, authorized = true) => fetch(service.origin + '/api' + route, { method: 'POST', headers: { ...(authorized ? { Authorization: `Bearer ${service.token}` } : {}), 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
  try {
    assert.equal((await request('/coordinator/refresh', {}, false)).status, 401);
    const response = await request('/coordinator/refresh', {}); assert.equal(response.status, 200);
    const result = await response.json(); assert.equal(result.account.status, 'signed-in');
    // Even a successful subscription reconnect does not populate the repo .env.
    assert.equal(workerKills, 0); assert.equal(service.sessions.get(worker.id).process, worker.process);
    service.coordinator.operationPromises.set('busy', Promise.resolve());
    assert.equal((await request('/coordinator/refresh', {})).status, 409); service.coordinator.operationPromises.clear();
    const bootstrap = await fetch(service.origin + '/api/bootstrap', { headers: { Authorization: `Bearer ${service.token}` } }).then(r => r.json());
    assert.equal(bootstrap.codexAccount.email, 'first@example.invalid'); assert(!JSON.stringify(bootstrap.codexAccount).includes('never-display'));
  } finally { worker.process = null; await service.close(); }
});

test('refresh cannot replace the coordinator during an owned voice conversation', async () => {
  const { repo } = await fixture();
  await mkdir(path.join(repo, 'workspace')); await writeFile(path.join(repo, 'workspace/workspace.json'), '{"entities":[]}\n', 'utf8');
  await writeFile(path.join(repo, '.env'), 'OPENAI_API_KEY=fixture-only-no-provider-access\n', 'utf8');
  const service = await createService({ repo, uiDir: repo, mcpOptions: { home: repo, env: {} } });
  const originalFetch = globalThis.fetch;
  let refreshes = 0;
  service.coordinator.refreshConnection = async () => { refreshes++; return { ready: true }; };
  globalThis.fetch = (url, options) => String(url) === 'https://api.openai.com/v1/live/sessions'
    ? Promise.resolve(new Response(JSON.stringify({ session: { id: 'fixture-voice' }, transport: { sdp: 'fixture-answer' } }), { headers: { 'Content-Type': 'application/json' } }))
    : originalFetch(url, options);
  const request = (route, data) => originalFetch(service.origin + '/api' + route, { method: 'POST', headers: { Authorization: `Bearer ${service.token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
  try {
    assert.equal((await request('/live/session', { sdp: 'fixture-offer', clientId: 'voice-owner' })).status, 201);
    assert.equal((await request('/coordinator/refresh', {})).status, 409); assert.equal(refreshes, 0);
    await request('/live/release', { clientId: 'voice-owner' });
    assert.equal((await request('/coordinator/refresh', {})).status, 200); assert.equal(refreshes, 1);
  } finally { globalThis.fetch = originalFetch; await service.close(); }
});

test('service shutdown during refresh cannot start a replacement process', async () => {
  const { coordinator, children } = await fixture();
  await coordinator.start();
  const refreshing = coordinator.refreshConnection();
  coordinator.close();
  await assert.rejects(refreshing, /shutting down/);
  assert.equal(children.length, 1);
});

test('a failed outgoing close cannot reuse the previous account thread', async () => {
  const { coordinator, children } = await fixture();
  await coordinator.start();
  const outgoing = children[0], kill = outgoing.kill;
  outgoing.kill = () => false;
  try {
    await assert.rejects(coordinator.refreshConnection(), /Could not close/);
    assert.equal(coordinator.threadId, null);
    await assert.rejects(coordinator.start(), /Refresh the Codex connection again/);
    await assert.rejects(coordinator.ask({ id: 'unsafe-after-failure', text: 'Do work' }), /Refresh the Codex connection again/);
    assert.equal(children.length, 1);
    outgoing.kill = kill;
    assert.equal((await coordinator.refreshConnection()).ready, true);
    assert.equal(coordinator.needsRefresh, false); assert.equal(children.length, 2);
  } finally { outgoing.kill = kill; coordinator.close(); }
});
