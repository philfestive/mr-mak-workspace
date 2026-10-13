import { lstat, open, readFile, realpath, rename, unlink } from 'node:fs/promises';
import { randomBytes } from 'node:crypto';
import path from 'node:path';
import { parse as parseEnv } from 'dotenv';
import { within } from './util.mjs';

const setupError = message => Object.assign(new Error(message), { status: 400 });
const entry = /^(\uFEFF?[\t ]*(?:export[\t ]+)?([\w.-]+)(?:[\t ]*=[\t ]*|:[\t ]+))('(?:\\'|[^'])*'|"(?:\\"|[^"])*"|`(?:\\`|[^`])*`|[^#\r\n]*)([\t ]*(?:#[^\r\n]*)?)(?=\r?$)/gm;

function checkedKey(value) {
  if (typeof value !== 'string') throw setupError('Enter an OpenAI API key for voice.');
  const key = value.trim();
  if (key.length < 16 || key.length > 512 || !/^[A-Za-z0-9_-]+$/.test(key)) throw setupError('Enter the API key only, without quotes, spaces or extra lines.');
  return key;
}

export function replaceVoiceKey(text, key) {
  let found = false;
  const updated = text.replace(entry, (match, prefix, name, value, comment) => {
    if (name !== 'OPENAI_API_KEY') return match;
    found = true;
    const gap = value.match(/[\t ]+$/)?.[0] || '';
    return prefix + key + gap + comment;
  });
  const ending = text.match(/\r\n|\n|\r/)?.[0] || '\n';
  const result = found ? updated : updated + (updated && !/[\r\n]$/.test(updated) ? ending : '') + 'OPENAI_API_KEY=' + key + ending;
  const before = parseEnv(text), after = parseEnv(result);
  if (after.OPENAI_API_KEY !== key || Object.entries(before).some(([name, value]) => name !== 'OPENAI_API_KEY' && after[name] !== value)) throw setupError('This .env format cannot be updated safely. Edit OPENAI_API_KEY manually.');
  return result;
}

// Secrets stay in this local file boundary; HTTP callers receive presence only.
export class VoiceSettings {
  constructor(repo, { env = process.env } = {}) {
    this.repo = repo; this.env = env; this.saves = Promise.resolve(); this.pendingSaves = 0;
  }
  get saving() { return this.pendingSaves > 0; }
  async record() {
    const root = await realpath(this.repo), file = path.join(root, '.env');
    let info;
    try { info = await lstat(file); }
    catch (error) { if (error.code === 'ENOENT') return { file, bytes: null, text: '' }; throw setupError('Voice setup could not read the repository .env.'); }
    if (info.isSymbolicLink() || !info.isFile() || !within(root, await realpath(file))) throw setupError('Voice setup requires a regular .env file inside this repository. Linked files are not changed.');
    if (info.size > 1024 * 1024) throw setupError('The repository .env is too large to update safely.');
    const bytes = await readFile(file);
    const after = await lstat(file);
    if (after.isSymbolicLink() || !after.isFile() || info.dev !== after.dev || info.ino !== after.ino || info.size !== after.size || info.mtimeMs !== after.mtimeMs) throw setupError('The repository .env changed. Check voice setup again.');
    let text;
    try { text = new TextDecoder('utf-8', { fatal: true, ignoreBOM: true }).decode(bytes); }
    catch { throw setupError('Voice setup requires a UTF-8 .env file.'); }
    return { file, bytes, text };
  }
  async key() {
    await this.saves.catch(() => {});
    const { text } = await this.record(), keys = parseEnv(text);
    const repository = keys.OPENAI_API_KEY || keys.OPENAI_KEY;
    return repository ? { key: repository, source: 'repository' } : this.env.OPENAI_API_KEY ? { key: this.env.OPENAI_API_KEY, source: 'environment' } : { key: null, source: null };
  }
  async check() {
    const { key, source } = await this.key();
    return { configured: !!key, source };
  }
  save(value) {
    let key;
    try { key = checkedKey(value); } catch (error) { return Promise.reject(error); }
    this.pendingSaves++;
    const saved = this.saves.catch(() => {}).then(() => this.saveInternal(key));
    this.saves = saved.finally(() => { this.pendingSaves--; });
    return this.saves;
  }
  async saveInternal(key) {
    const original = await this.record();
    const text = replaceVoiceKey(original.text, key);
    const temporary = original.file + '.' + randomBytes(12).toString('hex') + '.tmp';
    let handle;
    try {
      handle = await open(temporary, 'wx', 0o600);
      await handle.writeFile(text, { encoding: 'utf8' }); await handle.sync(); await handle.close(); handle = null;
      const current = await this.record();
      if (original.bytes === null ? current.bytes !== null : current.bytes === null || !original.bytes.equals(current.bytes)) throw setupError('The repository .env changed while saving. Check voice setup and retry.');
      await rename(temporary, original.file);
      return { configured: true, source: 'repository' };
    } catch (error) {
      if (error.status) throw error;
      throw setupError('Voice setup could not save the repository .env. Check its file permissions.');
    } finally {
      await handle?.close().catch(() => {});
      await unlink(temporary).catch(() => {});
    }
  }
}
