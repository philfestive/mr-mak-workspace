# Validation implementation handoff

Lane 20, T006, 2026-10-12. This is a proposed implementation contract. Source
and existing tests were reviewed; no tests, transports, applications, logins or
generations were run. Shared core plus project/role tools is the confirmed target.

## Existing coverage and gaps

[mcp.test.mjs](../../../../../desktop/service/test/mcp.test.mjs) checks precedence,
redaction, missing prerequisites, disabled plugins, credential changes and approval
withdrawal. Its HTTP and stdio cases open a listener and spawn a process. The
environment case checks imported file values, not unrelated ambient credentials.
[codex-history.test.mjs](../../../../../desktop/service/test/codex-history.test.mjs)
checks conversation ownership and resume, but uses one effective home per case.
Existing tests therefore do not prove account/project launch-inspection parity.
Do not run the full desktop suite as a source-only/no-transport check.

Inputs: T005 [application](../../T005/reviews/05-mrmak.md),
[credentials](../../T005/reviews/09-credentials.md),
[validation](../../T005/reviews/10-validation.md) and
[independent review](../../T005/reviews/12-independent-review.md). They identify
checkout behavior; installed-client behavior remains separate evidence.

## Bounded implementation package

Owner: validation implementer after the context, registry and client-adapter
contracts are agreed. Reviewer: an independent agent. Next owner: rollout owner.
Working folder: `E:/Dev/mr-mak-workspace-main`. Proposed test files:
`desktop/service/test/launch-context.test.mjs`, `mcp-policy.test.mjs` and
`mcp-capabilities.test.mjs`; shared synthetic fixture helper:
`desktop/service/test/fixtures/mcp-context.mjs`. Keep existing relevant regressions.
Production edits require the application owner's separate scope, especially
`agents.mjs`, `sessions.mjs`, `codex-history.mjs` and `mcp.mjs`.

Use dependency injection for spawn/transport/client, clock, metadata and private
bindings. Any unexpected spawn, network request, authentication-store read or
tool call throws. Use fake homes/projects and synthetic sentinel values only;
assert public outcomes and forbidden operations, not helper implementation text.

| Fixture | Minimum observable regression |
| --- | --- |
| `two-accounts-two-projects` | Launch, inventory, check, transcript lookup and resume receive the same selected client/home/profile/cwd. Identical server/native IDs in the other account cannot satisfy lookup. Switching project changes effective sources; Workspace variables cannot satisfy another project. |
| `ambient-secret-sentinels` | Selected connection receives only its declared credential variables plus the agreed non-secret baseline. Other account/project/connection and ambient provider sentinels never enter its child or public JSON/UI/errors. Reject unresolved bindings without falling back to another account. |
| `plugins-pinned-and-stray` | An installed pin beats a newer cached directory; a missing selected installation is explicitly unverified/missing. A Codex skills-only manifest with sibling Claude MCP data creates no confirmed Codex transport. No authority to select a version produces unknown, not a guessed winner. |
| `invalid-prerequisites` | Malformed endpoint, missing cwd/script and directory masquerading as executable cannot become locally prepared or checkable. Check only adapter-declared file arguments; do not guess that every argument is a path. |
| `context-and-content-drift` | Account, source, executable/version, expanded argument, effective `env_vars`, script content or approval change invalidates prior evidence. Inject time: 300000 ms is current and 300001 ms stale under the existing five-minute rule. Unchanged inputs retain evidence. Never publish credential-derived fingerprints. |
| `native-auth-and-managed` | OAuth, host-managed and helper-mediated entries produce native-verification-required with zero inspector probe/spawn/auth-store access. Disabled or approval-withdrawn entries also make zero calls. Unknown auth never becomes authenticated. |
| `capability-pages` | A fake SDK client returns two tool pages: follow cursors, retain expected names and report completeness. Repeated cursor/page limit yields explicit partial evidence. Resources-only and zero-tool servers remain connected without pretending to satisfy a required tool. No `tools/call`; 401 and 403 remain distinct fixed categories without echoed bodies or native-login conclusions. |

Gate A: focused synthetic tests pass without transport constructors or real homes;
reviewer confirms behavioral isolation and redaction. Report exact command/results.
An ordinary synthetic pass cannot qualify a live connection.

## Native-client qualification matrix

One row per actual launcher/client/version/account/project/role/connection. Cover
GUI and account-wrapper routes separately; client adapters include Codex, Claude,
OpenCode and any requested Kimi/Cursor route. Unsupported routes remain explicit.

Record desired/configured/enabled/exposed/connected/authenticated/bound/authorized
as separate pass, fail, unknown or justified N/A fields, with UTC time, sanitized
source alias, evidence reference and next owner. Gate B uses the intended existing
native client's status and advertised names; Gate C verifies exact project/server
identity through a specifically authorized read-only observer. OAuth/managed checks
stay native. Creative qualification makes no generation, upload or paid call.
Godot qualification belongs to its runtime owner under the one-process rule.
Changed binding, version, configuration or reconnect requires fresh qualification.

## Report gate and launch brief

[check-template.mjs](../../../../../scripts/check-template.mjs) checks registry
targets and HTML assets, but skips Markdown link closure.
[check-preview-ui.mjs](../../../../../scripts/check-preview-ui.mjs) opens tabs,
starts Vite/browser and may create a junction; it lacks the required width matrix.
Do not invoke either indiscriminately during this planning lane.

Gate D: coordinator resolves every changed Markdown local link literally, checks
registered paths, and previews each changed tab at 1280, 768 and 390 px in dark
and light themes. Verify wrapping, contained table scrolling, navigation and
applicable media controls. Record actual captures; absent preview is outstanding.

Launch brief: implement the four proposed fixture/test files after receiving
contract versions; inject all effectful dependencies, run only the focused
synthetic suite, return sanitized results and independent review. Do not activate
connections, install, restart, access credentials, generate, stage or commit.
Later native qualification needs a named client/account/project and authorized
operation; the plan alone supplies no execution permission.
