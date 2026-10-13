import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, readdir, stat, symlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { WebSocket } from 'ws';
import { parse as parseEnv } from 'dotenv';
import { VoiceSettings } from '../voice-settings.mjs';
import { createService } from '../server.mjs';

// Fake keys and provider responses only. No real .env, login, mic or model call.
const firstKey = 'fixture-first-no-provider-access';
const secondKey = 'fixture-second-no-provider-access';
const tick = () => new Promise(resolve => setImmediate(resolve));
async function fixture() {
  await mkdir('.cache', { recursive: true });
  const repo = await mkdtemp(path.resolve('.cache/voice-settings-'));
  return { repo, settings: new VoiceSettings(repo, { env: {} }) };
}
async function serviceFixture() {
  const { repo } = await fixture();
  await mkdir(path.join(repo, 'workspace'));
  await writeFile(path.join(repo, 'workspace/workspace.json'), '{"entities":[]}\n', 'utf8');
  const service = await createService({ repo, uiDir: repo, voiceSetupOptions: { env: {} }, mcpOptions: { home: repo, env: {} } });
  const originalFetch = globalThis.fetch;
  const request = (route, data, authorized = true) => originalFetch(service.origin + '/api' + route, {
    method: data === undefined ? 'GET' : 'POST',
    headers: { ...(authorized ? { Authorization: `Bearer ${service.token}` } : {}), 'Content-Type': 'application/json' },
    body: data === undefined ? undefined : JSON.stringify(data),
  });
  return { repo, service, request, originalFetch };
}

test('voice setup reports presence and origin without changing the supplied environment', async () => {
  const { repo, settings } = await fixture();
  assert.deepEqual(await settings.check(), { configured: false, source: null });
  const env = { OPENAI_API_KEY: firstKey, CODEX_HOME: 'fixture-home' };
  const inherited = new VoiceSettings(repo, { env });
  assert.deepEqual(await inherited.check(), { configured: true, source: 'environment' });
  await writeFile(path.join(repo, '.env'), 'OPENAI_KEY=' + secondKey + '\n', 'utf8');
  assert.deepEqual(await inherited.check(), { configured: true, source: 'repository' });
  assert.deepEqual(env, { OPENAI_API_KEY: firstKey, CODEX_HOME: 'fixture-home' });
  assert(!JSON.stringify(await inherited.check()).includes(firstKey));
  assert(!JSON.stringify(await inherited.check()).includes(secondKey));
});

test('saving replaces only the canonical key and retains CRLF, comments, duplicates and unrelated multiline values', async () => {
  const { repo, settings } = await fixture();
  const before = '# Keep this comment\r\nOTHER="line one\r\nOPENAI_API_KEY=inside-other-value\r\nline three"\r\nexport OPENAI_API_KEY = "old-value" # key comment\r\nOPENAI_KEY=legacy-value\r\nOPENAI_API_KEY=old-duplicate  # duplicate comment\r\nCODEX_HOME=fixture-home\r\n';
  await writeFile(path.join(repo, '.env'), before, 'utf8');
  assert.deepEqual(await settings.save(firstKey), { configured: true, source: 'repository' });
  const after = await readFile(path.join(repo, '.env'), 'utf8');
  assert.equal(after, before.replace('"old-value"', firstKey).replace('old-duplicate', firstKey));
  assert.equal(parseEnv(after).OTHER, parseEnv(before).OTHER);
  assert.equal(parseEnv(after).OPENAI_KEY, 'legacy-value');
  assert.equal(parseEnv(after).CODEX_HOME, 'fixture-home');
  assert.equal(parseEnv(after).OPENAI_API_KEY, firstKey);
  assert(!after.includes('old-duplicate'));
  assert.deepEqual((await readdir(repo)).filter(name => name.endsWith('.tmp')), []);
  if (process.platform !== 'win32') assert.equal((await stat(path.join(repo, '.env'))).mode & 0o777, 0o600);
});

test('new files use UTF-8 LF and concurrent saves preserve unrelated fields with the final queued key', async () => {
  const { repo, settings } = await fixture();
  await settings.save(firstKey);
  assert.equal(await readFile(path.join(repo, '.env'), 'utf8'), 'OPENAI_API_KEY=' + firstKey + '\n');
  await writeFile(path.join(repo, '.env'), '# unchanged\nOTHER=keep\n', 'utf8');
  const pending = [settings.save(firstKey), settings.save(secondKey)];
  assert.equal(settings.saving, true);
  await Promise.all(pending);
  assert.equal(settings.saving, false);
  assert.equal(await readFile(path.join(repo, '.env'), 'utf8'), '# unchanged\nOTHER=keep\nOPENAI_API_KEY=' + secondKey + '\n');
});

test('invalid key input cannot inject assignments or replace an existing file', async () => {
  const { repo, settings } = await fixture();
  const before = 'OTHER=untouched\nOPENAI_API_KEY=' + firstKey + '\n';
  await writeFile(path.join(repo, '.env'), before, 'utf8');
  for (const apiKey of [null, '', 'short', 'a'.repeat(513), secondKey + '\nOTHER=changed', '"' + secondKey + '"', secondKey + ' # comment', secondKey + '\u0000']) {
    await assert.rejects(settings.save(apiKey), /API key|key only/);
    assert.equal(await readFile(path.join(repo, '.env'), 'utf8'), before);
  }
});

test('external edits during an atomic save are retained and its temporary credential file is removed', async () => {
  const { repo, settings } = await fixture();
  await writeFile(path.join(repo, '.env'), 'OTHER=original\n', 'utf8');
  const record = settings.record.bind(settings);
  let reads = 0;
  settings.record = async () => {
    if (++reads === 2) await writeFile(path.join(repo, '.env'), 'OTHER=external-edit\n', 'utf8');
    return record();
  };
  await assert.rejects(settings.save(firstKey), /changed while saving/);
  assert.equal(await readFile(path.join(repo, '.env'), 'utf8'), 'OTHER=external-edit\n');
  assert.deepEqual((await readdir(repo)).filter(name => name.endsWith('.tmp')), []);
  settings.record = record;
  await settings.save(secondKey);
  assert.equal(await readFile(path.join(repo, '.env'), 'utf8'), 'OTHER=external-edit\nOPENAI_API_KEY=' + secondKey + '\n');
});

test('a linked .env file cannot overwrite a target outside the repository', async t => {
  const { repo, settings } = await fixture();
  const outside = await mkdtemp(path.resolve('.cache/voice-settings-outside-'));
  const target = path.join(outside, 'external.env');
  await writeFile(target, 'OTHER=external-untouched\n', 'utf8');
  try { await symlink(target, path.join(repo, '.env'), 'file'); }
  catch (error) { if (['EPERM', 'EACCES'].includes(error.code)) { t.skip('This Windows account cannot create a file symlink.'); return; } throw error; }
  await assert.rejects(settings.check(), /regular .env file/);
  await assert.rejects(settings.save(firstKey), /regular .env file/);
  assert.equal(await readFile(target, 'utf8'), 'OTHER=external-untouched\n');
});

test('a nonfile or directory junction .env cannot be replaced by a credential save', async () => {
  const { repo, settings } = await fixture();
  await mkdir(path.join(repo, '.env'));
  await assert.rejects(settings.save(firstKey), /regular .env file/);
  const linked = await fixture(), outside = await fixture();
  await writeFile(path.join(outside.repo, 'marker.txt'), 'unchanged', 'utf8');
  await symlink(outside.repo, path.join(linked.repo, '.env'), process.platform === 'win32' ? 'junction' : 'dir');
  await assert.rejects(linked.settings.save(firstKey), /regular .env file/);
  assert.equal(await readFile(path.join(outside.repo, 'marker.txt'), 'utf8'), 'unchanged');
});

test('voice setup is authenticated, never exposes keys and does not start Codex or a provider', async () => {
  const { repo, service, request, originalFetch } = await serviceFixture();
  let providerCalls = 0, codexCalls = 0;
  service.coordinator.start = service.coordinator.refreshConnection = async () => { codexCalls++; throw new Error('Fixture must not start Codex'); };
  globalThis.fetch = (url, options) => { if (String(url).startsWith('https://api.openai.com/')) { providerCalls++; throw new Error('Fixture must not contact a provider'); } return originalFetch(url, options); };
  const socket = new WebSocket(service.origin.replace('http:', 'ws:') + '/events', { origin: service.origin });
  const events = [];
  socket.on('message', value => events.push(JSON.parse(value.toString())));
  try {
    await new Promise((resolve, reject) => { socket.once('open', resolve); socket.once('error', reject); });
    socket.send(JSON.stringify({ type: 'auth', token: service.token, clientId: 'fixture', surface: 'workspace' }));
    while (!events.some(event => event.type === 'connected')) await tick();
    assert.equal((await request('/voice/setup', undefined, false)).status, 401);
    assert.equal((await request('/voice/setup', { apiKey: firstKey }, false)).status, 401);
    assert.equal((await request('/voice/setup', { apiKey: secondKey + '\nOTHER=changed' })).status, 400);
    assert.deepEqual(await request('/voice/setup').then(response => response.json()), { configured: false, source: null });
    assert.equal((await request('/live/session', { sdp: 'fixture', clientId: 'fixture' })).status, 400);
    const saved = await request('/voice/setup', { apiKey: firstKey }).then(response => response.json());
    assert.deepEqual(saved, { configured: true, source: 'repository' });
    assert.equal(parseEnv(await readFile(path.join(repo, '.env'), 'utf8')).OPENAI_API_KEY, firstKey);
    assert.deepEqual(await request('/voice/setup').then(response => response.json()), saved);
    while (!events.some(event => event.type === 'voice-status' && event.configured)) await tick();
    assert(!JSON.stringify(events).includes(firstKey)); assert(!JSON.stringify(saved).includes(firstKey));
    assert.equal(codexCalls, 0); assert.equal(providerCalls, 0);
  } finally { socket.close(); globalThis.fetch = originalFetch; await service.close(); }
});

test('credential saves cannot overlap voice, login or refresh; voice cannot overlap saving', async () => {
  const { service, request, originalFetch } = await serviceFixture();
  let providerCalls = 0;
  let releaseSave;
  globalThis.fetch = (url, options) => String(url) === 'https://api.openai.com/v1/live/sessions' ? (providerCalls++, Promise.resolve(new Response(JSON.stringify({ session: { id: 'fixture' }, transport: { sdp: 'fixture-answer' } })))) : originalFetch(url, options);
  try {
    service.codexLogin.value = { status: 'waiting', url: null, error: null };
    assert.equal((await request('/voice/setup', { apiKey: firstKey })).status, 409);
    service.codexLogin.value = { status: 'idle', url: null, error: null };
    service.coordinator.refreshPromise = Promise.resolve();
    assert.equal((await request('/voice/setup', { apiKey: firstKey })).status, 409); service.coordinator.refreshPromise = null;
    let enteredSave;
    const entered = new Promise(resolve => { enteredSave = resolve; });
    const saving = new Promise(resolve => { releaseSave = resolve; });
    const saveInternal = service.voiceSetup.saveInternal.bind(service.voiceSetup);
    service.voiceSetup.saveInternal = async key => { enteredSave(); await saving; return saveInternal(key); };
    const saved = request('/voice/setup', { apiKey: firstKey });
    await entered;
    assert.equal((await request('/live/session', { sdp: 'fixture', clientId: 'fixture' })).status, 409);
    assert.equal((await request('/coordinator/login', {})).status, 409);
    assert.equal((await request('/coordinator/refresh', {})).status, 409);
    releaseSave(); assert.equal((await saved).status, 200);
    service.voiceSetup.saveInternal = saveInternal;
    assert.equal((await request('/live/session', { sdp: 'fixture', clientId: 'fixture' })).status, 201);
    assert.equal((await request('/voice/setup', { apiKey: secondKey })).status, 409);
    assert.equal(providerCalls, 1);
  } finally { releaseSave?.(); service.coordinator.refreshPromise = null; globalThis.fetch = originalFetch; await service.close(); }
});

test('simultaneous starts from two windows and repeated starts from one client reserve only one provider request', async () => {
  const { service, request, originalFetch } = await serviceFixture();
  await request('/voice/setup', { apiKey: firstKey });
  let providerCalls = 0, arrived = 0, release;
  const barrier = new Promise(resolve => { release = resolve; });
  const key = service.voiceSetup.key.bind(service.voiceSetup);
  service.voiceSetup.key = async () => { const result = await key(); if (++arrived === 2) release(); await barrier; return result; };
  globalThis.fetch = (url, options) => String(url) === 'https://api.openai.com/v1/live/sessions' ? (providerCalls++, Promise.resolve(new Response(JSON.stringify({ session: { id: 'fixture' }, transport: { sdp: 'fixture-answer' } })))) : originalFetch(url, options);
  try {
    const responses = await Promise.all([
      request('/live/session', { sdp: 'fixture-offer', clientId: 'one', surface: 'workspace' }),
      request('/live/session', { sdp: 'fixture-offer', clientId: 'two', surface: 'chats' }),
    ]);
    assert.deepEqual(responses.map(response => response.status).sort(), [201, 409]);
    const owner = responses[0].status === 201 ? 'one' : 'two';
    assert.equal((await request('/live/session', { sdp: 'fixture-offer', clientId: owner })).status, 409);
    assert.equal(providerCalls, 1);
    service.voiceSetup.key = key;
    const bootstrap = await request('/bootstrap').then(response => response.json());
    assert.equal(bootstrap.voice.owner.clientId, owner);
  } finally { release(); globalThis.fetch = originalFetch; await service.close(); }
});

test('voice provider errors cannot echo a submitted credential into the API response', async () => {
  const { service, request, originalFetch } = await serviceFixture();
  await request('/voice/setup', { apiKey: firstKey });
  globalThis.fetch = (url, options) => String(url) === 'https://api.openai.com/v1/live/sessions' ? Promise.resolve(new Response(JSON.stringify({ error: { message: 'Fixture rejected credential ' + firstKey } }), { status: 401 })) : originalFetch(url, options);
  try {
    const result = await request('/live/session', { sdp: 'fixture-offer', clientId: 'fixture' });
    assert.equal(result.status, 400);
    const message = await result.text();
    assert.match(message, /OpenAI Live \(401\)/); assert(!message.includes(firstKey));
    const bootstrap = await request('/bootstrap').then(response => response.json());
    assert.equal(bootstrap.voice.owner, null);
  } finally { globalThis.fetch = originalFetch; await service.close(); }
});
