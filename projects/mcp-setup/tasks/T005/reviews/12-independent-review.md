# Independent MCP setup review

Lane 12, T005. Reviewed 2026-10-12. Final disposition: **PASS for source-backed
planning quality only**. No live readiness, activation or implementation is
approved. Initial findings below record the assumptions challenged during review.
This lane made no live probes or configuration changes.

## Claims that require correction

1. **Empty project configuration does not establish missing MCPs.** Codex layers
   CLI overrides, trusted project configuration, selected profile, user settings,
   managed defaults and built-in defaults. An empty project file alone cannot
   establish the effective server list. Its trust state also matters. The root
   `.mcp.json` is not the ordinary Codex user/project configuration source.
   [Official configuration precedence](https://learn.chatgpt.com/docs/config-file/config-basic),
   [official MCP configuration](https://learn.chatgpt.com/docs/extend/mcp).

2. **Account folders and GUI chats have different launch paths.**
   [Start-Account.ps1](../../../../../.mrmak/agents/Start-Account.ps1) explicitly
   sets `CODEX_HOME` or `CLAUDE_CONFIG_DIR` to the chosen private profile, then
   restores the prior environment. By contrast,
   [sessions.mjs](../../../../../desktop/service/sessions.mjs) launches GUI chats
   using [agents.mjs](../../../../../desktop/service/agents.mjs), which retains
   the service environment and does not select those account folders or pass
   `--profile`. Source proves two possible routes, not which route the running
   service or this conversation used. Record launcher identity and effective
   home before applying findings from either route.

3. **Cached files do not establish installation, exposure or connection.** The
   retained EduAarpg Codex manifest declares skills and no MCP server:
   [manifest](C:/Users/haslo/.codex/plugins/cache/eduaarpg-local/godot-open-world-rpg-ops/0.5.1+codex.20260927193017/.codex-plugin/plugin.json).
   Its [fleet-run instructions](C:/Users/haslo/.codex/plugins/cache/eduaarpg-local/godot-open-world-rpg-ops/0.5.1+codex.20260927193017/skills/fleet-run/SKILL.md)
   explicitly preserve the sibling `.mcp.json` for Claude packaging and limit
   Codex to a separately approved three-tool observer gateway. The inspector's
   fallback to cached `.mcp.json` can therefore overstate Codex server membership.
   Official documentation also permits refreshing disabled plugin files, so a
   cache directory is insufficient evidence.
   [Official plugin packaging](https://developers.openai.com/plugins/build/plugins).

4. **Inspector success is narrower than native-agent readiness.**
   [mcp.mjs](../../../../../desktop/service/mcp.mjs) scans the service's configured
   home and Workspace root, infers cached plugin versions, and can create its
   own transport. A successful check proves that inspector handshake/listing
   under its environment; it does not prove a particular chat loaded the same
   tools, account, project or permissions. A check is an operation that may
   start processes/contact services. Native-session verification is still needed.

5. **Drive coverage must remain bounded.** No configuration found under named
   D: folders supports only that search result. It cannot establish absence on
   all D:, and filename scans miss remote/account-managed sources. Publish exact
   roots, exclusions, unreadable paths, timestamp and discovery method. Avoid
   duplicating whole-drive scans merely to make an absolute absence claim.

## Initial required distinctions

- Use separate states for desired, configured, enabled, exposed, connected,
  authenticated, project-bound and consumer-verified. Include explicit unchecked,
  unsupported, failed and stale states; never compress these into "set up."
- Catalog both launch routes, actual client/version, account alias, effective
  configuration home, CWD, profile/override presence and owning writer. Do not
  copy credentials or infer identity from a numbered directory.
- Treat the inspector as a supported-source view. Flag unsupported manifest,
  profile, nested-project, managed/account and client-version sources. Proposed
  inspector fixes remain proposals until separately implemented and checked.
- Reconcile entry-point links with the live organization migration. Disk
  [AGENTS.md](../../../../../AGENTS.md) and
  [workspace-organization.md](../../../../../processes/workspace-organization.md)
  now name Workspace Home and a solo owner. Earlier Team Hub paths were absent
  during review; Home content still contained older links when sampled. The
  coordinator is handling this transition. Twelve review lanes do not create
  permanent agents, roles, accounts or appointments.

## Godot ownership and agent sharing

One named runtime owner can accept requests from many research/implementation
agents, serialize authorized operations and return correlated evidence. That is
an organizational proposal, not proof that the existing gateway supports many
simultaneous clients. Preserve the machine's one-Godot-process rule. Do not grant
each agent writer control, launch another editor to resolve contention, or use
raw HTTP when an approved tool is absent.

[godot-live-loop](C:/Users/haslo/.codex/skills/godot-live-loop/SKILL.md) requires
matching absolute project/session identity, ownership and fresh requalification
after reconnect. Prompt Bridge exports prove their artifact scope; they do not
establish current runtime state. Test gateway observer concurrency and writer
serialization only in an authorized runtime lane. This review's tool catalog
contained no Godot or fal tool names; that is a current-session observation.

## Conditions for a fully organized and qualified setup

1. Define the intended client/account/project/role matrix. Every required
   capability has an owner, exact source, dependencies and concrete next action;
   deliberate exclusions and unavailable routes are explicit.
2. Reconcile duplicate/stale definitions against each client's effective schema
   and precedence. Preserve owning project folders, existing sessions and secrets.
3. Prepare secret-free, client-specific setup packets with exact affected files
   and activation dependencies. No historical runbook authorizes execution.
4. In the intended native session, establish tool exposure and authenticated
   identity where applicable; perform one harmless representative operation.
   Record version, account alias, home, CWD, time, result and scope without raw
   secrets/logs. For project tools, verify the exact project binding first.
5. Repeat required checks after changes/reconnect. An independent future agent
   can follow the linked onboarding guide, identify its authorized tools and
   resume a bounded task without assuming an old receipt is current.

Remaining unknowns: actual running-service environment, client versions, active
account identities, project trust, remote connectors, live authentication,
gateway concurrency and results of native consumer checks. Review completion
can establish organized evidence and a setup plan; activation readiness requires
the later scoped results above.

## Final packet disposition

Reviewed all eight [MCP report tabs](../../../../../workspace/2026-10-12_mcp-setup/overview.md),
the onboarding process, project README, T005 brief and both handoffs. The final
packet addresses inheritance, distinct launch routes, bounded drive coverage,
inspector/native evidence, Godot ownership and deliberate disabled routes.
Independently checked Prompt Bridge 0.4.3's actual compatibility manifest:
`mcpServers` is an inline declaration, unlike RPG Ops' skills-only manifest.
Current official fal documentation supports the OAuth reconciliation proposal;
legacy endpoint failure remains unasserted.
[Official fal MCP guide](https://fal.ai/docs/documentation/setting-up/mcp).

Two final corrections were applied and re-read: T005 now names Workspace Home;
W1 assigns schemas exclusively to writer 02 rather than also to the catalog
writer. Updated W1 launch scopes and W2 generator/adapter/pin ownership agree
with Staffing. Thirty assignments are proposed roles across six waves, not
proof of 30 running agents. T005-P2's retained T006 folder does not acquire
Character Lab's global T006.

No material source-claim inaccuracy remains in the assessed packet. Native
account/project qualification, runtime concurrency and installed/running app
provenance remain unknown. The coordinator's preview/link checks are reported
evidence; this lane did not independently rerun them. Handoffs still correctly
show verification in progress pending final dispositions and updated checks.
This pass authorizes no future operation; W1 requires its bounded assignment,
and subsequent gates require their own actual results.
