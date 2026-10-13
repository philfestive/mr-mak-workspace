# App implementation handoff

T006 lane 15, 2026-10-12. Proposal only: no application changes, tests, account
inspection, installations or launches occurred. Shared core plus project/role
tools is the selected organization model; configured and connected remain
separate evidence states.

The source permits another chat cwd while launch environment, MCP inventory and
native transcript lookup follow service-wide locations. Account wrappers are a
separate route. Sources: [launch](../../../../../desktop/service/sessions.mjs),
[environment](../../../../../desktop/service/agents.mjs),
[inspection](../../../../../desktop/service/mcp.mjs),
[history](../../../../../desktop/service/codex-history.mjs),
[T005 app review](../../T005/reviews/05-mrmak.md).
Checkout version is 0.5.1; the installed/running payload remains unknown.
[Native startup](../../../../../src-tauri/src/main.rs) prefers bundled service
code, so checkout fixes alone cannot establish installed behavior.

Inputs also include [Codex scope](../../T005/reviews/01-codex.md),
[credential boundaries](../../T005/reviews/09-credentials.md) and
[validation limits](../../T005/reviews/10-validation.md).

Implementation starts from lane 17's fresh Git snapshot, with exact paths and
working changes reconciled before editing. T005's `c7c9fbf` is historical evidence,
not an asserted current base. Coordinator owns shared planning/Workspace files.

## Packages and exclusive file ownership

Paths below are repository-relative. Each package has one writer; reviewers
report findings without editing. The API integrator alone wires shared service
entry points. Owners begin only after the preceding contract is accepted.

| Package / owner | Allowed files | Required result and next owner |
| --- | --- | --- |
| A: context engineer | New `desktop/service/launch-context.mjs`, new `desktop/service/test/launch-context.test.mjs`; `desktop/service/agents.mjs`, `desktop/service/platform.mjs`, `desktop/service/test/platform.test.mjs`, `desktop/service/test/runtime-credentials.test.mjs` | Resolve client, accountRef, roleRef, project/cwd, exact executable/version and environment policy once. Separate account home from role profile. Consume lanes 16/19's registry/private-binding contract; never create or copy auth stores. Send immutable internal context and sanitized DTO contract to B/C/D/E. |
| B: session/history engineer | `desktop/service/sessions.mjs`, `desktop/service/native-events.mjs`, `desktop/service/codex-history.mjs`, `desktop/service/opencode.mjs`; `desktop/service/test/codex-history.test.mjs`, `desktop/service/test/opencode.test.mjs`, new `desktop/service/test/session-context.test.mjs` | Use A for spawn, discovery, transcript reads, import, restore and resume. Persist non-secret context references/schema in ignored local state. Deduplicate native IDs by client/account/project. Retain OpenCode v1/v2 observer separation. Send migration contract to D/E. |
| C: inventory engineer | `desktop/service/mcp.mjs`, `desktop/service/test/mcp.test.mjs` | Resolve selected session/preview context through A; inspect exact client layers and host-selected plugin version. Record unsupported policy/layers as unknown. Add OpenCode adapters only against verified version contracts. Scope probe/cache by account, role, project, executable/version, effective args/env/source content. Preserve managed/OAuth/helper no-probe boundaries. Send DTO/check contract to D/E. |
| D: API integrator | `desktop/service/server.mjs`, `desktop/service/coordinator.mjs`, `desktop/service/test/service.test.mjs`, `desktop/service/test/coordinator-input.test.mjs`, new `desktop/service/test/context-routing.test.mjs` | Wire A/B/C. Accept validated aliases, not caller-supplied account homes. Add context selection to sessions, imports/history and MCP routes. Keep GET `/api/mcp` fallback explicitly service-default. Checks must carry their inventory context identity. Coordinator uses its own explicit/default context; selecting a chat must not switch its account. Send API fixtures to E/F. |
| E: desktop UI engineer | `src/desktop/Chats.tsx`, `src/desktop/types.ts`, `src/desktop/client.ts`, `src/desktop/McpPanel.tsx`, `src/desktop/FilesRail.tsx`, `src/desktop/desktop.css`, `src/desktop/mcp.css`; new `desktop/service/test/context-ui.mjs` | Account/role selection and resolved context preview; show account/project in History and MCP panel. FilesRail currently mounts McpPanel without context. Label declared configuration, inspector handshake and native-client evidence separately. Use client-specific status instructions. Reject stale responses after context switching. Send reviewed UI to F. |
| F: release/provenance engineer | `desktop/prepare.mjs`, `desktop/service/main.mjs`, `src-tauri/src/main.rs`, `package.json`, `src-tauri/Cargo.toml`, `src-tauri/Cargo.lock`, `src-tauri/tauri.conf.json`, `docs/updating.md`; new `desktop/service/test/runtime-provenance.test.mjs` | Generate a build manifest with source revision/dirty indication, application/service versions and payload digests. Report actual source/bundled mode, service script, Node version and manifest identity through private diagnostics and D's API contract. Reconcile release documentation. Deliver a prepared artifact and evidence to rollout owner. |

## Acceptance and compatibility

Independent lane 20 reviewer checks these mocked contracts before native rollout:

1. Two synthetic homes and two projects with duplicate native IDs: selected home,
   cwd, role and executable reach launch, inspection, transcript discovery and
   resume consistently; import never claims another account's conversation.
2. Inject spawner, version reader, probe and clock. External-project checks cannot
   consume Workspace credentials; unrelated ambient provider keys and unrelated
   `MRMAK_MCP_*` values stay out. Required credentials remain names/presence only
   in DTOs, errors and diagnostics; global process environment stays unchanged.
3. Context/config/expanded argument/env/executable changes invalidate evidence.
   Invalid endpoint/cwd/script and managed/OAuth/helper entries never spawn.
   Plugin cache ordering cannot substitute for active-version evidence.
4. Delayed account-A response cannot replace account-B inventory. Mocked UI is
   usable at 1280/768/390 px. New requests omitting selectors retain current
   default launch behavior, permission mode and effort, with explicit scope.
5. Packaged/source provenance fixtures distinguish missing, matching and
   mismatched manifests without claiming an installed update.

Legacy sessions lack reliable historical account identity: retain their metadata
and screens, mark unresolved, and require explicit binding before resume; never
guess an account or rewrite native histories. Active sessions retain their launch
snapshot until a separately authorized restart.

Deployment depends on approved bindings, lane 21 version policy, A-E acceptance
and lane 23 rollout. Current prepare code clears staging and invokes `npm ci`;
review/refactor toward non-destructive staging and explicitly approved dependency
handling before execution. Prepared source/build, installed payload and running
service are separate milestones. Owner restart permission is the final activation
boundary; commits/pushes need their own existing gates.

Receiving agents use [.agents/skills/feature-handoff/SKILL.md](../../../../../.agents/skills/feature-handoff/SKILL.md),
[workspace-authoring](../../../../../.agents/skills/workspace-authoring/SKILL.md)
and `C:/Users/haslo/.agents/skills/windows-shell-safety/SKILL.md`. Re-read live
rules, task ownership and package preimages; no external config edits or account
login migration are part of these source packages.

Launch brief for each package: "Implement package A/B/C/D/E/F from this handoff
using only its Allowed files. Read live AGENTS.md, lane 17 baseline and accepted
predecessor DTOs. Preserve other writers' changes. Submit behavior, mocked
acceptance results and migration notes to lane 20 reviewer and the named next
owner. No auth copying, active configuration edits, installs, native launches,
restart, commit or push without authorization covering that action."

Report verification: UTF-8 without BOM, LF and local source links checked. App
acceptance and report preview are outstanding; the coordinator owns registration
and combined-report preview.
