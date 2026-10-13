import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { commandSearchRoots, invalidFilename, ptyOptions, resolveCommand, shellCommand, shellLabel } from '../platform.mjs';
import { codexBinary, coordinatorEnvironment } from '../agents.mjs';

test('platform policy preserves POSIX names while retaining Windows-safe validation', () => {
  assert.equal(invalidFilename('notes:linux.md'), process.platform === 'win32');
  assert.equal(invalidFilename('notes.md'), false);
  assert.equal(invalidFilename('../escape.md'), true);
  assert.equal(shellLabel(), process.platform === 'win32' ? 'PowerShell' : 'Shell');
  assert.ok(shellCommand().file);
  assert.equal('useConpty' in ptyOptions({ cwd: process.cwd(), env: process.env, cols: 80, rows: 24 }), process.platform === 'win32');
});

test('OpenCode install directory is included in command lookup roots', async () => {
  const home = await mkdtemp(path.join(os.tmpdir(), 'mrmak-command-home-'));
  const bin = path.join(home, '.opencode', 'bin');
  await mkdir(bin, { recursive: true });
  const executable = path.join(bin, 'opencode');
  await writeFile(executable, '');

  assert.ok(commandSearchRoots({}, home).includes(bin));
  assert.equal(resolveCommand('opencode', { PATH: '' }, home), executable);
});

test('Codex native lookup skips an earlier PATH wrapper while terminal lookup retains it', { skip: process.platform !== 'win32' }, async () => {
  const home = await mkdtemp(path.join(os.tmpdir(), 'mrmak-codex-path-'));
  const wrapperBin = path.join(home, 'wrapper'), nativeBin = path.join(home, 'native');
  await mkdir(wrapperBin); await mkdir(nativeBin);
  const wrapper = path.join(wrapperBin, 'codex.cmd'), executable = path.join(nativeBin, 'codex.exe');
  await writeFile(wrapper, '@echo off\n'); await writeFile(executable, 'native fixture');
  const env = { PATH: [wrapperBin, nativeBin].join(path.delimiter), APPDATA: path.join(home, 'empty-appdata') };
  assert.equal(resolveCommand('codex', env, home), wrapper);
  assert.equal(resolveCommand('codex', env, home, ['.exe']), executable);
  assert.deepEqual(codexBinary(env), { file: executable, args: [] });
  assert.throws(() => codexBinary({ PATH: wrapperBin, APPDATA: env.APPDATA }), /could not locate a native Codex executable/);
});

test('coordinator env keeps the selected home and withholds voice/host identity', () => {
  const fixture = { OPENAI_API_KEY: 'fixture-voice-key', OPENAI_KEY: 'fixture-legacy-key', CODEX_ACCESS_TOKEN: 'fixture-host-token', CODEX_SESSION_ID: 'fixture-host-session', CODEX_INTERNAL_ORIGINATOR_OVERRIDE: 'fixture-host-origin', CODEX_HOME: 'fixture-selected-home', openai_api_key: 'fixture-alias', codex_access_token: 'fixture-alias-token' };
  const env = coordinatorEnvironment(undefined, fixture);
  assert.equal(env.CODEX_HOME, fixture.CODEX_HOME);
  for (const key of Object.keys(fixture).filter(key => key !== 'CODEX_HOME')) assert.equal(key in env, false);
  assert.equal(fixture.OPENAI_API_KEY, 'fixture-voice-key');
});
