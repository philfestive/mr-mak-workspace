# Lane names and Workspace containers

This is the naming and presentation contract for the current Mr. Mak agent
chat tabs. The user selected Mr. Mak tabs, not separate Codex application
windows. These labels describe responsibilities; they do not create more agents.

## Desired chat names

| Existing title | Desired title | Workspace destination |
| --- | --- | --- |
| First game | REF-00 - Refiner | Workspace Home |
| Setup2 | REF-10 - Sources & Design | Sources & Output |
| Character lab setup | REF-20 - Character Lab | Character Lab |
| mcp setups | REF-30 - MCP Setup | MCP Setup and Agent Waves |
| who are we | REF-40 - Context & Goals | Workspace Home / Overview |
| tool manager | REF-50 - Tool Library | Sources & Output; existing tool sources remain with their owner |

Keep the REF identifier stable; name the responsibility in plain English.
Preserve each chat's native conversation, working folder, account, provider,
model, permissions and current assignment. Rename the existing matching tab.
Do not create a replacement conversation to change its label. Verify ambiguous
titles against actual task context before changing them.

Observed naming state, 2026-10-13: five target labels are present in the saved
metadata for open managed chats: REF-00, REF-20, REF-30, REF-40 and REF-50.
Setup2 remains to be named REF-10 - Sources & Design through live app controls.
This check reads managed metadata; it does not claim a fresh visual inspection
or that this session performed those renames. Editing sessions.json would race
the live service and is not an acceptable substitute.

## The container

```text
Workspace / Container name
Main sections: Overview | Refine | Define | Build
Documents:    only the sub-tabs for the selected section
Preview:      the selected source document
```

Workspace Home groups existing and new guide documents in those four sections.
Sources & Output groups its own references and design guidance. Character Lab
and MCP use their own domain sections. The exact groups and document paths
are owned by workspace/workspace.json, using tabGroups and step.groupId.
Existing Home step indexes and card IDs remain stable. Append new documents
after registered ones; section membership can change without changing the
global document index.

Selecting a main section restores its last visited document, or its configured
default. Direct document links select the correct section automatically.
Unassigned documents remain visible under Other documents. Flat sample cards
keep their existing layout.

## Responsibility and receiving

- REF-00 owns this request's Home navigation/layout metadata and shared integration.
- REF-10 owns Sources & Output, design-direction answers and its original reports.
- REF-20 owns the character catalog, revision identity and its original lab outputs.
- REF-30 owns MCP setup/readiness and its original reports.
- REF-40 and REF-50 keep their existing assignments; these names do not grant
  ownership of other lanes' files.
- The assigned UI worker owns types.ts, Topbar.tsx and TopbarGroups.css for this
  change; it has acknowledged this contract. Root owns integration and preview.

The [peer handoff](#/team-hub/12) records receiving and unresolved delivery.
Document delivery is separate from a peer acknowledging it. The grouped UI is
installed; [Notes](#/team-hub/4) owns update and verification evidence.
[Tasks](#/team-hub/2) owns remaining setup work.

## Mr. Mak rename instruction

> Read the desired chat names in Workspace Home's Lane setup document. Match
> each existing chat, rename it without replacing its conversation, and verify
> the new labels. Keep each lane's existing task and working folder. Read the
> peer handoff before sending the affected lanes their container instructions.
