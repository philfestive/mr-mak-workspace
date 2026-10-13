import { lazy, Suspense, useEffect, useState } from 'react'
import App from '../App'
import { dismissError, sendEvent, startDesktop, surface, useDesktop } from './client'
import FilesRail, { FilePreview } from './FilesRail'
import VoiceDock from './VoiceDock'
import WorkspaceSettings from './WorkspaceSettings'
import { Icon, Nose } from './Icons'
import './desktop.css'

const Chats = lazy(() => import('./Chats'))

export default function DesktopApp() {
  const state = useDesktop()
  const [settingsOpen, setSettingsOpen] = useState(false)
  useEffect(() => { const open = () => setSettingsOpen(true); window.addEventListener('mrmak-open-settings', open); return () => window.removeEventListener('mrmak-open-settings', open) }, [])
  useEffect(() => { startDesktop() }, [])
  useEffect(() => {
    if (surface !== 'workspace') return
    const route = () => sendEvent({ type: 'workspace-route', route: location.hash })
    window.addEventListener('hashchange', route)
    return () => window.removeEventListener('hashchange', route)
  }, [])
  if (!state.ready) return <div className="desktop-boot"><Nose size={70} /><h1>Mr. Mak</h1><p>{state.error || 'Opening your workspace…'}</p>{state.error && <button className="desk-secondary" onClick={() => startDesktop()}>Reconnect</button>}</div>
  return <div className={`desktop-root ${surface}-root`}>
    {surface === 'chats' ? <Suspense fallback={<div className="desktop-boot"><Nose size={50} /></div>}><Chats /></Suspense> : <><div className="workspace-surface"><App />{state.preview && <FilePreview file={state.preview} />}</div><FilesRail /></>}
    {state.error && <div className="desktop-error" role="alert"><span>{state.error}</span><button onClick={dismissError} aria-label="Dismiss error"><Icon name="close" size={16} /></button></div>}
    {!state.connected && <div className="desktop-offline">Reconnecting to the local service…</div>}
    <VoiceDock />
    {settingsOpen && <div className="desk-scrim voice-settings-overlay" onClick={() => setSettingsOpen(false)}><div className="voice-settings-dialog" onClick={event => event.stopPropagation()}><WorkspaceSettings focusVoice onClose={() => setSettingsOpen(false)} /></div></div>}
  </div>
}
