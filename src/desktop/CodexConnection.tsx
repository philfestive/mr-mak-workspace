import { useCallback, useEffect, useRef, useState } from 'react'
import { api, applyCodexConnection, applyCodexLogin, dismissError, onServiceEvent, reportError, useDesktop } from './client'
import type { CodexAccount, CodexLogin } from './types'
import './codex-connection.css'

export default function CodexConnection({ compact = false, onRefreshed }: { compact?: boolean; onRefreshed?: (voiceConfigured: boolean) => void } = {}) {
  const { connected, coordinator, codexAccount: account, codexLogin: login, voice } = useDesktop()
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const currentLogin = useRef(false)
  const receiveLogin = useCallback((value: CodexLogin) => {
    if (!currentLogin.current) return
    if (['complete', 'cancelled', 'failed'].includes(value.status)) { currentLogin.current = false; if (value.status === 'failed') setError(value.error || 'Sign-in did not finish. Try again.'); else { setError(''); setMessage(value.status === 'complete' ? 'Signed in. Codex connection refreshed.' : 'Sign-in cancelled.') } }
  }, [])
  useEffect(() => onServiceEvent(event => { if (event.type === 'coordinator-login' && event.login) receiveLogin(event.login) }), [receiveLogin])
  const loginBusy = ['starting', 'waiting', 'completing', 'cancelling'].includes(login.status)
  useEffect(() => {
    if (!loginBusy || !connected) return
    let stopped = false
    const timer = window.setInterval(() => { api<CodexLogin>('/coordinator/login').then(value => { if (!stopped) { applyCodexLogin(value); receiveLogin(value) } }).catch(() => {}) }, 1500)
    return () => { stopped = true; window.clearInterval(timer) }
  }, [loginBusy, connected, receiveLogin])
  const blocked = loginBusy || busy || !connected || coordinator === 'working' || coordinator === 'connecting' || !!voice.owner
  const label = account.status === 'signed-in'
    ? account.email || (account.type === 'apiKey' ? 'Codex API account' : 'Codex account connected')
    : account.status === 'signed-out' ? 'Sign in to Codex first'
      : account.status === 'unavailable' ? 'Account identity unavailable' : 'Account not checked yet'
  async function refresh() {
    setBusy(true); setMessage(''); setError(''); if (compact) dismissError()
    try {
      const result = await api<{ voiceConfigured: boolean; account: CodexAccount }>('/coordinator/refresh', {})
      applyCodexConnection(result.account, result.voiceConfigured)
      setMessage('Codex connection refreshed.')
      onRefreshed?.(result.voiceConfigured)
    } catch (error) { if (compact) reportError(error); else setError(error instanceof Error ? error.message : String(error)) }
    finally { setBusy(false) }
  }
  async function signIn(cancel = false) {
    setBusy(true); setMessage(''); setError(''); if (compact) dismissError()
    currentLogin.current = true
    try { const value = await api<CodexLogin>(cancel ? '/coordinator/login/cancel' : '/coordinator/login', {}); applyCodexLogin(value); receiveLogin(value) }
    catch (error) { currentLogin.current = false; if (compact) reportError(error); else setError(error instanceof Error ? error.message : String(error)) }
    finally { setBusy(false) }
  }
  return <div className={`codex-connection${compact ? ' compact' : ''}`}>
    {!compact && <p className="codex-account" aria-label="Connected Codex account">{label}{account.status === 'signed-in' && account.planType && <span> · {account.planType}</span>}</p>}
    <div className="codex-actions"><button type="button" className="desk-secondary" disabled={blocked} onClick={() => void refresh()}>{busy ? 'Connecting…' : compact ? 'Refresh connection' : 'Refresh Codex connection'}</button><button type="button" className="desk-secondary" disabled={blocked} onClick={() => void signIn()}>Sign in / switch account</button></div>
    {loginBusy && <p role="status">{login.status === 'waiting' ? 'Finish signing in in your browser. Mr. Mak will reconnect afterward.' : login.status === 'completing' ? 'Signed in. Reconnecting Mr. Mak…' : login.status === 'cancelling' ? 'Cancelling sign-in…' : 'Opening Codex sign-in…'}</p>}
    {login.status === 'waiting' && <div className="codex-actions">{login.url && <a href={login.url} target="_blank" rel="noopener noreferrer">Open sign-in page</a>}<button type="button" className="desk-secondary" disabled={busy || !connected} onClick={() => void signIn(true)}>Cancel sign-in</button></div>}
    {loginBusy && login.error && <p className="desk-error-inline" role="alert">{login.error}</p>}
    {!compact && <p>Refresh reconnects the saved Codex login. Sign in / switch account opens your browser and updates the shared Codex login after you finish. Mr. Mak then reconnects; worker chats keep running.</p>}
    {voice.owner ? <p>Finish the voice conversation before refreshing.</p> : coordinator === 'working' && <p>Wait for the current request to finish.</p>}
    {!compact && !voice.configured && <p>Voice needs an OpenAI API key in this repository's .env. Codex sign-in and voice setup are separate.</p>}
    {message && <div className="codex-notice" role="status"><span>{message}</span><button type="button" className="desk-secondary" aria-label="Dismiss Codex notice" onClick={() => setMessage('')}>Dismiss</button></div>}
    {error && <p className="desk-error-inline" role="alert">{error}</p>}
  </div>
}
