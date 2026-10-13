import { useEffect, useMemo, useRef } from 'react'
import type { WorkspaceEntity } from '../types'
import { isDesktop } from '../desktop/client'
import BrowserSettings from './BrowserSettings'
import { EntityStatusButton } from './EntityControls'
import './TopbarGroups.css'

interface TopbarProps {
  entity: WorkspaceEntity | null
  stepIndex: number
  onStep: (id: string, index: number) => void
  onHome: () => void
  reportUrl: string | null
}

interface TabGroup {
  key: string
  name: string
  defaultStep?: number
  stepIndexes: number[]
}

function tabGroupsFor(entity: WorkspaceEntity | null): TabGroup[] {
  if (!entity?.tabGroups?.length) return []

  const groups = new Map<string, TabGroup>()
  for (const group of entity.tabGroups) {
    if (!groups.has(group.id)) {
      groups.set(group.id, {
        key: `group:${group.id}`,
        name: group.name,
        defaultStep: group.defaultStep,
        stepIndexes: [],
      })
    }
  }

  const fallback: TabGroup = { key: 'fallback', name: 'Other documents', stepIndexes: [] }
  entity.steps.forEach((step, index) => {
    const group = step.groupId === undefined ? undefined : groups.get(step.groupId)
    ;(group ?? fallback).stepIndexes.push(index)
  })

  return [...groups.values(), ...(fallback.stepIndexes.length ? [fallback] : [])]
}

export default function Topbar({ entity, stepIndex, onStep, onHome, reportUrl }: TopbarProps) {
  const groups = useMemo(() => tabGroupsFor(entity), [entity])
  const currentGroup = groups.find(group => group.stepIndexes.includes(stepIndex))
    ?? groups.find(group => group.stepIndexes.length > 0)
  const lastSteps = useRef(new Map<string, Map<string, number>>())

  // Record all selections, including direct hash links and browser history.
  useEffect(() => {
    if (!entity || !currentGroup?.stepIndexes.includes(stepIndex)) return
    let cardSteps = lastSteps.current.get(entity.id)
    if (!cardSteps) {
      cardSteps = new Map()
      lastSteps.current.set(entity.id, cardSteps)
    }
    cardSteps.set(currentGroup.key, stepIndex)
  }, [entity, currentGroup, stepIndex])

  const selectGroup = (group: TabGroup) => {
    if (!entity) return
    const remembered = lastSteps.current.get(entity.id)?.get(group.key)
    const index = remembered !== undefined && group.stepIndexes.includes(remembered)
      ? remembered
      : group.defaultStep !== undefined && group.stepIndexes.includes(group.defaultStep)
        ? group.defaultStep
        : group.stepIndexes[0]
    if (index !== undefined) onStep(entity.id, index)
  }

  return (
    <div className={`topbar${groups.length ? ' topbar-grouped' : ''}`}>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <button className="crumb-link" onClick={onHome}>
          Workspace
        </button>
        {entity && (
          <>
            <span className="crumb-sep">/</span>
            <span className="crumb-current">{entity.title}</span>
            <EntityStatusButton entity={entity} />
          </>
        )}
        {!isDesktop && <BrowserSettings />}
      </nav>

      {entity && (
        <div className="topbar-right">
          {entity.steps.length > 0 && (
            groups.length ? (
              <div className="workspace-tab-navigation">
                <div className="workspace-tab-row">
                  <span className="workspace-tab-label">Workspace sections</span>
                  <div className="workspace-section-tabs" role="tablist" aria-label="Workspace sections">
                    {groups.map(group => (
                      <button
                        key={group.key}
                        type="button"
                        role="tab"
                        aria-selected={group.key === currentGroup?.key}
                        className={`workspace-section-tab${group.key === currentGroup?.key ? ' active' : ''}`}
                        disabled={group.stepIndexes.length === 0}
                        onClick={() => selectGroup(group)}
                        title={group.stepIndexes.length ? group.name : `${group.name} has no documents yet`}
                      >
                        {group.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="workspace-tab-row">
                  <span className="workspace-tab-label">Workspace documents</span>
                  <div className="step-tabs workspace-document-tabs" role="tablist" aria-label="Workspace documents">
                    {currentGroup?.stepIndexes.map(index => (
                      <button
                        key={index}
                        type="button"
                        role="tab"
                        aria-selected={index === stepIndex}
                        className={`step-tab${index === stepIndex ? ' active' : ''}`}
                        onClick={() => onStep(entity.id, index)}
                        title={entity.steps[index].name}
                      >
                        {entity.steps[index].name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="step-tabs" role="tablist">
                {entity.steps.map((s, i) => (
                  <button
                    key={i}
                    role="tab"
                    aria-selected={i === stepIndex}
                    className={`step-tab${i === stepIndex ? ' active' : ''}`}
                    onClick={() => onStep(entity.id, i)}
                    title={s.name}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            )
          )}
          {reportUrl && (
            <a
              className="open-ext"
              href={reportUrl}
              target="_blank"
              rel="noreferrer"
              title="Open report in a new tab"
            >
              ↗
            </a>
          )}
        </div>
      )}
    </div>
  )
}
