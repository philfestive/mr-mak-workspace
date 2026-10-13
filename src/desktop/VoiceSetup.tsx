import { useEffect, useState } from 'react'
import { api, applyVoiceSetup, useDesktop } from './client'

interface Setup { configured: boolean; source: 'repository' | 'environment' | null }
export default function VoiceSetup() {
  const { connected, voice, codexLogin, coordinator } = useDesktop()
  const [key, setKey] = useState('')
  const [busy, setBusy] = useState(false)
  const [source, setSource] = useState<Setup['source']>(null)
  const [error, setError] = useState('')
  const blocked = busy || !connected || !!voice.owner || ['starting', 'waiting', 'completing', 'cancelling'].includes(codexLogin.status) || coordinator === 'connecting'
  useEffect(() => { let stopped = false; api<Setup>('/voice/setup').then(value => { if (!stopped) { setSource(value.source); applyVoiceSetup(value.configured) } }).catch(error => { if (!stopped) setError(error.message) }); return () => { stopped = true } }, [])
  async function check(save = false) {
    setBusy(true); setError('')
    try { const value = await api<Setup>('/voice/setup', save ? { apiKey: key } : undefined); setSource(value.source); applyVoiceSetup(value.configured); if (save) setKey('') }
    catch (error) { setError(error instanceof Error ? error.message : String(error)) }
    finally { setBusy(false) }
  }
  return <div className="voice-setup">
    <p role="status">{voice.configured ? 'Voice key found. Press Talk to Mak to connect.' : 'Voice is not configured. You can keep using text.'}</p>
    <p>{source === 'environment' ? 'Voice currently uses an environment key. Saving here switches future voice connections to a workspace key.' : source === 'repository' ? 'Voice uses the key saved for this workspace.' : 'Save an OpenAI API key below for this workspace.'} Switching Codex accounts keeps the voice key.</p>
    <p><a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer">Create or manage your OpenAI API key</a></p>
    <label>OpenAI voice API key<input type="password" autoComplete="new-password" value={key} onChange={event => setKey(event.target.value)} disabled={blocked} placeholder="Paste your key here" /></label>
    <div className="codex-actions"><button type="button" className="desk-secondary" disabled={blocked || !key.trim()} onClick={() => void check(true)}>Save voice key</button><button type="button" className="desk-secondary" disabled={blocked} onClick={() => void check()}>Check voice setup</button></div>
    <p>Keys saved here are stored locally in .env and excluded from Git. Checking detects a key; connecting tests live access. Voice API usage is billed separately from your ChatGPT plan.</p>
    {voice.owner && <p>Stop voice before changing its setup.</p>}
    {error && <p className="desk-error-inline" role="alert">{error}</p>}
  </div>
}
