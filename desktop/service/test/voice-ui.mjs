// No microphone, paid model request, browser sign-in, native terminal or personal workspace is used.
import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { copyFile, cp, mkdtemp, mkdir, writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createService } from '../server.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
await mkdir(path.join(root, '.cache'), { recursive: true });
const repo = await mkdtemp(path.join(root, '.cache/voice-ui-'));
await mkdir(path.join(repo, 'workspace'));
const uiDir = path.join(repo, 'ui');
await cp(path.join(root, 'dist'), uiDir, { recursive: true });
for (const name of ['mak-nose.svg', 'mak-nose-chats.svg']) await copyFile(path.join(root, 'public/assets', name), path.join(uiDir, 'assets', name));
await writeFile(path.join(repo, 'workspace/workspace.json'), '{"entities":[]}');
const service = await createService({ repo, uiDir, mcpOptions: { home: repo, env: {} }, voiceSetupOptions: { env: {} } });
const requests = [];
let fail = false;
let refreshes = 0, signIns = 0, cancellations = 0, voiceSessions = 0;
const fixtureKey = 'fixture-only-no-provider-access';
const fixtureLoginUrl = 'https://auth.openai.com/authorize?fixture=only';
const account = email => ({ status: 'signed-in', type: 'chatgpt', email, planType: 'plus' });
// Deliberately omit account/login notifications: HTTP responses and polling must recover them.
service.codexLogin.removeAllListeners('state');
service.codexLogin.start = async () => { signIns++; service.codexLogin.set('waiting', fixtureLoginUrl); return service.codexLogin.snapshot(); };
service.codexLogin.cancel = async () => { cancellations++; service.codexLogin.set('cancelled'); return service.codexLogin.snapshot(); };
service.coordinator.refreshConnection = async () => {
  refreshes++; service.coordinator.account = account('refreshed@example.invalid');
  return { ready: true, account: service.coordinator.account };
};
service.coordinator.ask = async data => {
  requests.push(data);
  const operation = { ...data, at: new Date().toISOString(), status: fail ? 'failed' : 'completed', result: fail ? 'Fixture request failed. Please retry.' : 'Fixture completed.' };
  service.coordinator.operations.set(data.id, operation);
  service.coordinator.emit('result', operation);
  return operation;
};
service.quick.ask = async () => null;
const imageBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jvWQAAAAASUVORK5CYII=';
let browser;
try {
  browser = await chromium.launch({ headless: true, channel: process.env.MRMAK_TEST_BROWSER || 'msedge' });
  const page = await browser.newPage({ viewport: { width: 650, height: 800 } });
  page.setDefaultTimeout(10000);
  const voiceSetupResponse = () => page.waitForResponse(response => new URL(response.url()).pathname === '/api/voice/setup' && response.request().method() === 'GET');
  const errors = [], screenshots = []; page.on('pageerror', error => errors.push(error.message));
  const captureSetup = async (surface, state, region) => {
    for (const theme of ['dark', 'light']) {
      const changed = await fetch(service.origin + '/api/settings', { method: 'POST', headers: { Authorization: 'Bearer ' + service.token, 'Content-Type': 'application/json' }, body: JSON.stringify({ workspaceTheme: theme }) });
      assert(changed.ok);
      await page.waitForFunction(value => document.documentElement.dataset.workspaceTheme === value, surface === 'workspace' ? theme : 'dark');
      for (const width of [1280, 390]) {
        await page.setViewportSize({ width, height: 900 });
        const bounds = await region.evaluate(element => { const rect = element.getBoundingClientRect(); return { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom, width: element.clientWidth, scroll: element.scrollWidth }; });
        assert(bounds.left >= -1 && bounds.right <= width + 1 && bounds.top >= -1 && bounds.bottom <= 901 && bounds.scroll <= bounds.width + 2, `${state} overflows ${surface} at ${width}px`);
        const screenshot = path.join(repo, `${state}-${surface}-${theme}-${width}.png`);
        await page.screenshot({ path: screenshot }); screenshots.push(screenshot);
      }
    }
    await page.setViewportSize({ width: 650, height: 800 });
  };
  // This guard makes a fixture mistake fail locally instead of reaching the voice provider.
  await page.route('**/api/live/session', route => { voiceSessions++; return route.fulfill({ status: 503, contentType: 'application/json', body: '{"error":"Voice provider is disabled in this fixture."}' }); });
  await page.addInitScript(() => {
    window.fixtureMicRequests = 0;
    Object.defineProperty(navigator.mediaDevices, 'getUserMedia', { value: async () => { window.fixtureMicRequests++; throw new DOMException('Permission denied', 'NotAllowedError'); } });
  });
  for (const surface of ['chats', 'workspace']) {
    await writeFile(path.join(repo, '.env'), '', 'utf8');
    service.coordinator.account = account('previous@example.invalid');
    service.codexLogin.set('complete');
    await page.goto(service.urls[surface]);
    const input = page.getByRole('textbox', { name: 'Message Mr. Mak' });
    await page.getByRole('button', { name: 'Start voice', exact: true }).click();
    const missingVoice = page.locator('.voice-error');
    await missingVoice.getByRole('button', { name: 'Set up voice', exact: true }).waitFor();
    assert.equal(await missingVoice.getByRole('button', { name: /Refresh|Sign in/ }).count(), 0, 'Codex actions must be separate from voice setup');
    assert.equal(await page.getByText('Signed in. Codex connection refreshed.', { exact: true }).count(), 0, 'Old completed sign-in must not appear as a fresh result');
    await input.fill('Keep this setup draft.');
    const repeatedPreflight = voiceSetupResponse();
    await page.getByRole('button', { name: 'Start voice', exact: true }).click();
    assert.equal((await (await repeatedPreflight).json()).configured, false);
    await missingVoice.getByRole('button', { name: 'Set up voice', exact: true }).waitFor();
    assert.equal(await page.evaluate(() => window.fixtureMicRequests), 0, 'Missing-key preflight must precede microphone access');
    assert.equal(voiceSessions, 0);
    await captureSetup(surface, 'voice-missing', page.locator('.voice-panel'));
    const dockConnection = page.locator('details.codex-dock-connection');
    await dockConnection.locator('summary').filter({ hasText: /^Codex connection$/ }).click();
    await dockConnection.getByRole('button', { name: 'Refresh connection', exact: true }).click();
    await dockConnection.getByText('Codex connection refreshed.', { exact: true }).waitFor();
    await dockConnection.getByRole('button', { name: 'Dismiss Codex notice', exact: true }).click();
    await page.getByRole('button', { name: 'Toggle conversation', exact: true }).click();
    await page.getByRole('button', { name: 'Toggle conversation', exact: true }).click();
    assert.equal(await dockConnection.getByText('Codex connection refreshed.', { exact: true }).count(), 0, 'Dismissed compact results must not replay when Conversation reopens');
    assert.equal(await page.getByText('Signed in. Codex connection refreshed.', { exact: true }).count(), 0);
    await dockConnection.locator('summary').filter({ hasText: /^Codex connection$/ }).click();
    await missingVoice.getByRole('button', { name: 'Set up voice', exact: true }).click();
    const settings = page.locator('.workspace-settings');
    await settings.getByText('Voice is not configured. You can keep using text.', { exact: true }).waitFor();
    assert.equal(await input.inputValue(), 'Keep this setup draft.');
    await captureSetup(surface, 'voice-settings', settings);
    const beforeCheck = refreshes;
    const checkedAbsent = voiceSetupResponse();
    await settings.getByRole('button', { name: 'Check voice setup', exact: true }).click();
    assert.equal((await (await checkedAbsent).json()).configured, false);
    await settings.getByText('Voice is not configured. You can keep using text.', { exact: true }).waitFor();
    assert.equal(refreshes, beforeCheck, 'Checking the voice key must not reconnect Codex');
    assert.equal(await page.evaluate(() => window.fixtureMicRequests), 0);

    await settings.getByRole('button', { name: 'Refresh Codex connection', exact: true }).click();
    await settings.getByText('Codex connection refreshed.', { exact: true }).waitFor();
    await settings.getByLabel('Connected Codex account', { exact: true }).filter({ hasText: 'refreshed@example.invalid' }).waitFor();
    assert.equal(refreshes, beforeCheck + 1);
    assert.equal(await missingVoice.getByRole('button', { name: 'Set up voice', exact: true }).count(), 1, 'Codex refresh must not claim voice is configured');
    await settings.getByRole('button', { name: 'Dismiss Codex notice', exact: true }).click();
    assert.equal(await settings.getByText('Codex connection refreshed.', { exact: true }).count(), 0);

    const signIn = settings.getByRole('button', { name: 'Sign in / switch account', exact: true });
    await signIn.click();
    await settings.getByText('Finish signing in in your browser. Mr. Mak will reconnect afterward.', { exact: true }).waitFor();
    assert(await signIn.isDisabled());
    assert(await settings.getByRole('button', { name: 'Refresh Codex connection', exact: true }).isDisabled());
    assert.equal(await settings.getByRole('link', { name: 'Open sign-in page', exact: true }).getAttribute('href'), fixtureLoginUrl);
    await settings.getByRole('button', { name: 'Cancel sign-in', exact: true }).click();
    await settings.getByText('Sign-in cancelled.', { exact: true }).waitFor();
    assert(await signIn.isEnabled());
    await signIn.click();
    await settings.getByRole('button', { name: 'Cancel sign-in', exact: true }).waitFor();
    service.coordinator.account = account('switched@example.invalid');
    service.codexLogin.set('complete');
    await settings.getByText('Signed in. Codex connection refreshed.', { exact: true }).waitFor();
    await settings.getByLabel('Connected Codex account', { exact: true }).filter({ hasText: 'switched@example.invalid' }).waitFor();
    assert.equal(await settings.getByRole('link', { name: 'Open sign-in page', exact: true }).count(), 0);
    await settings.getByRole('button', { name: 'Dismiss Codex notice', exact: true }).click();
    await settings.getByRole('button', { name: 'Close settings', exact: true }).click();
    await missingVoice.getByRole('button', { name: 'Set up voice', exact: true }).click();
    await settings.getByLabel('OpenAI voice API key', { exact: true }).waitFor();
    assert.equal(await settings.getByText('Signed in. Codex connection refreshed.', { exact: true }).count(), 0, 'Completed sign-in must remain dismissed after Settings remounts');

    const keyInput = settings.getByLabel('OpenAI voice API key', { exact: true });
    assert.equal(await keyInput.getAttribute('type'), 'password');
    await keyInput.fill(fixtureKey);
    await settings.getByRole('button', { name: 'Save voice key', exact: true }).click();
    await settings.getByText('Voice key found. Press Talk to Mak to connect.', { exact: true }).waitFor();
    assert.equal(await keyInput.inputValue(), '', 'Clear the key field after saving');
    assert.match(await readFile(path.join(repo, '.env'), 'utf8'), /OPENAI_API_KEY=fixture-only-no-provider-access/);
    assert(!(await page.locator('body').innerText()).includes(fixtureKey), 'Never render the saved key');
    assert.equal(await missingVoice.count(), 0, 'Saved-key notification clears the old missing-key warning');
    assert.equal(await input.inputValue(), 'Keep this setup draft.');
    const beforeExternalCheck = refreshes;
    await writeFile(path.join(repo, '.env'), '', 'utf8');
    const checkedExternal = voiceSetupResponse();
    await settings.getByRole('button', { name: 'Check voice setup', exact: true }).click();
    assert.equal((await (await checkedExternal).json()).configured, false);
    await settings.getByText('Voice is not configured. You can keep using text.', { exact: true }).waitFor();
    assert.equal(refreshes, beforeExternalCheck, 'Voice setup must re-read an external key change without reconnecting Codex');
    await keyInput.fill(fixtureKey);
    await settings.getByRole('button', { name: 'Save voice key', exact: true }).click();
    await settings.getByText('Voice key found. Press Talk to Mak to connect.', { exact: true }).waitFor();
    await settings.getByRole('button', { name: 'Close settings', exact: true }).click();
    assert.equal(await page.evaluate(() => window.fixtureMicRequests), 0, 'Saving/checking a key must not start voice');
    await input.fill('');
    await page.getByRole('button', { name: 'Start voice', exact: true }).click();
    await page.getByRole('alert').filter({ hasText: 'Permission denied' }).waitFor();
    await page.getByRole('button', { name: 'Dismiss voice error' }).click();
    assert.equal(await page.getByRole('alert').count(), 0);
    assert.equal(await page.evaluate(() => window.fixtureMicRequests), 1);
    const before = requests.length;
    await input.fill('First line'); await input.press('Shift+Enter'); await input.pressSequentially('Second line');
    assert.equal(await input.inputValue(), 'First line\nSecond line'); assert.equal(requests.length, before);
    await input.dispatchEvent('keydown', { key: 'Enter', code: 'Enter', isComposing: true });
    assert.equal(requests.length, before);
    await page.getByRole('button', { name: 'Toggle conversation' }).click();
    await page.getByRole('button', { name: 'Toggle conversation' }).click();
    assert.equal(await input.inputValue(), 'First line\nSecond line');
    await input.press('Enter');
    await page.waitForFunction(() => document.querySelector('.voice-compose textarea')?.value === '');
    assert.equal(requests.at(-1).text, 'First line\nSecond line'); assert.equal(requests.length, before + 1);

    await input.fill('Review this screenshot');
    await input.evaluate((element, encoded) => {
      const bytes = Uint8Array.from(atob(encoded), value => value.charCodeAt(0));
      const clipboardData = new DataTransfer(); clipboardData.items.add(new File([bytes], 'Screenshot.png', { type: 'image/png' }));
      element.dispatchEvent(new ClipboardEvent('paste', { bubbles: true, cancelable: true, clipboardData }));
    }, imageBase64);
    const attached = page.getByLabel('Attached images', { exact: true });
    await attached.locator('img').waitFor();
    await page.waitForFunction(() => !document.querySelector('.voice-compose button[type=submit]').disabled);
    await attached.getByRole('link').click(); await page.getByRole('dialog', { name: 'Image preview' }).waitFor();
    await page.getByRole('button', { name: 'Close', exact: true }).click();
    await page.screenshot({ path: path.join(repo, `composer-${surface}.png`) });
    fail = true;
    await input.press('Enter');
    await page.getByRole('alert').filter({ hasText: 'Fixture request failed' }).waitFor();
    assert.equal(await input.inputValue(), 'Review this screenshot'); assert.equal(await attached.locator('img').count(), 1);
    await page.getByRole('button', { name: 'Dismiss message error' }).click();
    fail = false; await input.press('Enter');
    await page.waitForFunction(() => document.querySelector('.voice-compose textarea')?.value === '');
    assert.equal(await attached.count(), 0);
    assert.equal(requests.at(-1).images.length, 1);
    const saved = requests.at(-1).images[0];
    assert.ok(saved.startsWith(path.join(repo, 'inbox/attachments') + path.sep));
    assert.deepEqual(await readFile(saved), Buffer.from(imageBase64, 'base64'));
    await page.getByLabel('Sent images', { exact: true }).last().locator('img').waitFor();

    await page.locator('input[type=file][aria-label="Choose images for Mr. Mak"]').setInputFiles({ name: 'Reference.png', mimeType: 'image/png', buffer: Buffer.from(imageBase64, 'base64') });
    await attached.locator('img').waitFor();
    await attached.getByRole('button', { name: /^Remove / }).click();
    assert.equal(await attached.count(), 0);
  }
  assert.deepEqual(errors, []);
  assert.equal(signIns, 4); assert.equal(cancellations, 2); assert.equal(voiceSessions, 0);
  assert.equal(service.sessions.list().length, 0);
  await writeFile(path.join(repo, 'verification.json'), JSON.stringify({ passed: true, windows: ['chats', 'workspace'], screenshots, refreshes, signIns, cancellations, voiceSessions, microphoneFixtureOnly: true, voiceKeyFixtureOnly: true, missedLoginAndAccountNotifications: true, noNativeSessions: true, errors }, null, 2) + '\n', 'utf8');
  console.log('Talk to Mak: voice preflight/setup, masked key save, Codex refresh/sign-in/cancel with missed notifications, dismissible current results, newline/send/IME, image paste/upload/preview/removal, retry and draft retention passed in both windows. No provider or native account request was made.');
  console.log(`Screenshots: ${repo}`);
} finally { await browser?.close(); await service.close(); }
