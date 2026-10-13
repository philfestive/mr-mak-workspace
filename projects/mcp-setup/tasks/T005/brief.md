# T005 - Organize MCP setup for future agents

Owner: primary Codex coordinator. Reviewer: review lane 12, plus coordinator
checks. Assigned by the owner on 2026-10-12. Status: Done for review/planning.

## Expected result

A source-backed inventory and a complete, staged setup plan that future agents
can follow without copying credentials or treating a saved configuration as a
working connection. Register a readable Workspace report and link it from
Workspace Home. Keep account and project boundaries explicit.

Working folder: `E:/Dev/mr-mak-workspace-main`.
Inputs: repository AGENTS.md, context/preferences.md, context/goals.md,
processes/workspace-organization.md, Workspace Home, existing client configuration and
application source. Read applicable rules before inspecting another repository.

## Ownership

The coordinator owns `projects/mcp-setup/` except worker report files,
`processes/mcp-agent-onboarding.md`, the MCP review Workspace card, and the
relevant additions to Workspace Home and `workspace/workspace.json`. Any AGENTS.md
entry-point addition is coordinator-owned and must preserve existing work.

Each review agent may write only its report listed below. It must not edit the
hub, registry, application source, skills, external repositories or active client
configuration. Reports use English, LF, UTF-8, and source paths or primary-source
links. Redact secrets before output; never print raw configuration or logs.

| Lane | Scope | Owned report under `reviews/` |
| --- | --- | --- |
| 01 | Codex configuration, account homes and precedence | `01-codex.md` |
| 02 | Claude, Cursor, Kimi and OpenCode client differences | `02-other-clients.md` |
| 03 | Existing C: configuration and plugin inventory | `03-c-drive.md` |
| 04 | Bounded D: and E: inventory and gaps | `04-d-e-drives.md` |
| 05 | Mr. Mak launcher versus inspector behavior | `05-mrmak.md` |
| 06 | Plugin and skill distribution architecture | `06-plugins-skills.md` |
| 07 | Godot project binding and runtime ownership | `07-godot.md` |
| 08 | Creative tools and prerequisites | `08-creative.md` |
| 09 | Credentials, authorization and data boundaries | `09-credentials.md` |
| 10 | Readiness and validation design | `10-validation.md` |
| 11 | Future-agent roles, onboarding and handoffs | `11-onboarding.md` |
| 12 | Independent challenge of assumptions and recommendations | `12-independent-review.md` |

These are temporary review assignments, not 12 persistent desktop chats or
permanent appointments to unrelated projects. Provider/model inherit the current
session; no model override or paid generation budget was requested.

## Completion checks

- All 12 reports exist and distinguish observed, inferred and unverified facts.
- Reconcile disagreements against source evidence and retain remaining gaps.
- Inventory records client, configuration source, scope, owning project,
  configured state, live-check state and next action without secrets.
- Setup plan defines exact affected scopes, dependencies, safe verification and
  success criteria. Application fixes are proposals unless explicitly implemented.
- Every changed Workspace tab renders at 1280, 768 and 390 px; verify its links.
- Preserve pre-existing changes. No installation, credential disclosure,
  activation, paid calls, restart, runtime control, commit or push in this review.

Confirmed owner preference: shared core tools plus tools matched to each project
or role. The owner then requested a second wave of at least 12 planning agents
for setup, version control and best practices; see T005-P2 in the retained `tasks/T006/` packet folder. This supersedes older
Team Hub routing while preserving this task ID and worker scopes.

Updates and final handoff: `handoff.md` in this task folder.
