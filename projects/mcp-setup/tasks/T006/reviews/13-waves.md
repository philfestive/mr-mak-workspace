# Dependency-ordered implementation waves

T006 lane 13, 2026-10-12. Planning only. Outcome: future agents can select a small shared core plus project/role tools, identify their actual client/account/project context, and use capabilities with current evidence. Twelve review workers do not imply twelve workers for every implementation wave.

Basis: [Codex scopes](../../T005/reviews/01-codex.md), [other clients](../../T005/reviews/02-other-clients.md), [application mismatch](../../T005/reviews/05-mrmak.md), [secret boundaries](../../T005/reviews/09-credentials.md), [qualification](../../T005/reviews/10-validation.md), [independent review](../../T005/reviews/12-independent-review.md). All paths below are relative to `E:/Dev/mr-mak-workspace-main` unless absolute. New paths are proposed, not existing implementations.

Desktop rollout: **W1 -> W2 -> W3 -> W4 -> W5 -> W6**. W3 design can parallel W2 after W1; final integration waits for W2. A native-only canary can follow W2 directly, without claiming desktop parity. Offline project research can continue during W5; application and runtime qualification are serialized by owner.

Every launch brief carries the absolute working folder, baseline, authoritative board, allowed files, owner/reviewer, selected client context and checks. Use `.agents/skills/feature-handoff/SKILL.md`, `.agents/skills/plan/SKILL.md`, `.agents/skills/workspace-authoring/SKILL.md`, and `C:/Users/haslo/.agents/skills/windows-shell-safety/SKILL.md`. Re-read current rules and resolve ownership before editing.

## W1 - Establish the catalog and baseline

**Package P1; 3 workers:** catalog writer, client-scope researcher, independent reviewer. Inputs: T005 evidence, T006 lanes 14/16/17/18 and current organization decisions. Catalog writer owns proposed `projects/mcp-setup/registry.schema.json`, `projects/mcp-setup/registry.json` and `projects/mcp-setup/contexts.md`. Workers submit separate reports; the coordinator alone edits Workspace Home and card metadata.

Launch clause: "Define stable connection/profile/project aliases, effective source precedence, desired versus observed states, unknowns, owning writer and next action. Reuse lane 17 Git evidence; do not measure other repositories or activate tools."

Checks: schema validation, unique composite IDs, allowlisted metadata, resolved source links, no account identities/secrets, no claims of native readiness. Reviewer approves the contract; next owner is P2/P3. Owner choices: first client/account launch route and first real project; shared-core preference is already confirmed.

## W2 - Prepare reproducible setup packets

**Package P2; 3 workers:** template writer, dependency researcher, reviewer. Own proposed `projects/mcp-setup/templates/`, `projects/mcp-setup/versions.json`, and `projects/mcp-setup/packets/`. Inputs: P1, T006 lanes 19/21/23. Partition templates by client; one writer owns shared version/schema files.

Launch clause: "Prepare value-free configurations for selected scopes and reviewed inverse patches. Record client distribution/version, transport, source revision, dependency version, auth kind, prerequisite names, exact destination and local checks. Reconcile fal OAuth versus retained Bearer templates."

Checks: supported client syntax/precedence, duplicate names, paths, version compatibility, no mutable cache chosen as canonical source, no embedded credentials. Do not install or copy login/plugin caches. Reviewer hands accepted packets to P3/P4; optional creative routes wait for provider/account and budget choices.

## W3 - Make launch context consistent

**Package P3; 4 workers:** service writer, UI writer, test writer, independent reviewer. Service owns `desktop/service/{agents,sessions,coordinator,native-events,codex-history}.mjs` and proposed `desktop/service/launch-context.mjs`; UI owns `src/desktop/Chats.tsx` and `src/desktop/types.ts`; test writer owns proposed `desktop/service/test/launch-context.test.mjs`. Inputs: P1 context contract, P2 client semantics, T006 lane 15.

Launch clause: "Resolve executable/version, client, selected account home/profile and cwd once; carry context through launch, history and resume. Preserve default routing until explicit selection."

Checks: injected launches with two fake homes/two projects, account-safe history/resume, scoped environment, secret redaction, compatibility with default sessions. Serialize shared-file integration. No running-app restart. Reviewer hands accepted context API to P4.

## W4 - Align inspection and validation

**Package P4; 4 workers:** inspector writer owns `desktop/service/{mcp,server,platform,opencode}.mjs`; UI writer owns `src/desktop/McpPanel.tsx`; test writer owns `desktop/service/test/{mcp,opencode,platform}.test.mjs`; independent reviewer owns its report. Inputs: completed P3, T006 lane 20, P2 version matrix.

Launch clause: "Use P3 context for inspection; implement verified client adapters and explicit unsupported states. Separate declarations, local preparation, inspector handshake and native-session evidence."

Checks: fake homes, client schema variants, host-selected plugin version, skills-only manifests, malformed endpoints, missing scripts/cwd, pagination/resources-only servers, precise 401/403 handling, redaction and invalidation after context/version changes. Managed transports retain no-probe boundaries. Reviewer hands qualified application build to P5; built does not mean installed.

## W5 - Activate one canary, then qualify selected scopes

**Package P5; 2 workers plus one named project/runtime owner:** setup operator and independent verifier. Exact candidate targets are `C:/Users/haslo/.codex/config.toml`, `.mrmak/accounts/codex-1/config.toml`, `.mrmak/accounts/codex-2/config.toml`; select one, remove unselected targets from the launch brief, then expand after passing. Subsequent client/project packets name exact destinations before launch. External project owners retain their own files/boards.

Launch clause: "Apply only the reviewed named packet under explicit setup authorization; authenticate in its native client. Verify exposure, identity/project binding and one permitted read-only capability."

Checks: dated client/home/profile/cwd/version evidence; comparison with inspector; reconnect requalification. Godot uses one runtime owner/process and preserves deliberate disables. Restarts require owner permission. Failure stops expansion; reverse only owned configuration changes using the reviewed inverse patch. No authentication copying, cleanup scripts or repository resets.

## W6 - Practice onboarding and maintenance

**Package P6; 2 workers:** operating-guide writer and fresh reviewer. Own proposed `projects/mcp-setup/maintenance.md`, `projects/mcp-setup/startup.md`, and sanitized evidence reports; coordinator reconciles the existing card.

Launch clause: "Resume one bounded task from the startup brief; identify required/exposed tools and stale evidence. Document version-update canaries, recovery, owner routing and requalification triggers."

Checks: another agent finds the authoritative board and exact context without assumed accounts; links/previews pass. Git safeguards apply throughout: named branches/worktrees only when needed, one writer per shared file, scoped review, no automatic staging/commit/push. Commit requires a separate request and exact-path cached checks; push requires named repository/branch authorization and origin check. Maintenance retains history and records the next owner action.
