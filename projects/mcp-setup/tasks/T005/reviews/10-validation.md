# Readiness and validation review

Reviewed 2026-10-12. Scope: source inspection and validation design only. No tests,
client/server launches, connection probes, authentication, installations or paid
requests were run. Recommendations below are proposals, not implemented fixes.

An MCP should be called ready only for a named task, client/account, project and
capability. Keep discovery, configuration, local prerequisites, live connection,
binding and authorization as separate evidence fields.

## Observed behavior and implications

- **Inventory coverage is bounded.** The inspector reads one service environment's
  Codex/Claude homes and explicit project/user paths; it is not a drive-wide or
  all-account inventory (`desktop/service/mcp.mjs:35-61`). OpenCode is outside its
  supported client list (`docs/getting-started.md:77-78`). Record inspected paths,
  empty sources and read errors so an empty result does not imply no MCP exists.
- **Enabled is not connected.** `enabled` means no computed disabling condition,
  independently of missing variables, commands or approval
  (`desktop/service/mcp.mjs:134-151`). The panel counts these as "enabled
  connections" and says "Tools available to your agents"
  (`src/desktop/McpPanel.tsx:52`), although its footer explains the distinction
  (`src/desktop/McpPanel.tsx:76`). Prefer "declared enabled" and separate counts
  for verified prerequisites and current native-client connections.
- **Plugin selection needs stronger evidence.** Codex chooses the highest sorted
  cache directory (`desktop/service/mcp.mjs:90-92`), not a proven host-selected
  installation/pin. Claude selects the first matching/global installation record
  (`desktop/service/mcp.mjs:102-105`). Missing cache versions are silently skipped.
  The Codex loader also falls back to a sibling `.mcp.json` when the manifest has
  no `mcpServers` declaration (`desktop/service/mcp.mjs:94-98`). The inspected Ops
  Codex manifest declares `skills` at line 19 and no `mcpServers`, while its cache
  has `.mcp.json` [1]. Whether the native host intentionally discovers that file
  remains unverified; do not promote inferred linkage to confirmed transport.
- **Local preparation is incomplete.** Invalid URLs get an "Invalid address"
  label but can still be `configured`/checkable
  (`desktop/service/mcp.mjs:140-151`). Command resolution checks existence, not
  file type or launchability (`desktop/service/platform.mjs:32-38`); argument
  scripts and working directories are not verified. "Not installed" can instead
  mean incorrect PATH or resolution context. The inspector builds its own child
  environment (`desktop/service/mcp.mjs:154-156`), whereas agent terminals inherit
  the process environment and selected project variables
  (`desktop/service/agents.mjs:87-99`). Their outcomes can differ.
- **Available is a temporary inspector result.** It proves initialization and,
  when tools are advertised, one `tools/list` page; it stores counts, not server
  identity, expected tool names or binding (`desktop/service/mcp.mjs:183-195`).
  Zero tools or no tool capability can still be available. A 403 becomes
  `agent-auth`, although authorization denial need not mean missing login
  (`desktop/service/mcp.mjs:201-202`). The private session is closed after checking
  (`desktop/service/mcp.mjs:204-210`). No native-chat session is proven.
- **Freshness is conditional.** Cached checks become stale after five minutes
  (`desktop/service/mcp.mjs:143-145`). The fingerprint includes headers and
  expanded explicit `env`, but omits effective `env_vars` values, expanded
  arguments, source/account identity and artifact content at unchanged paths.
  These changes can preserve an earlier result. Treat evidence as unknown after
  relevant context or executable changes, even within the time window.

## Minimum acceptance matrix

Use pass, fail, unknown or justified not-applicable for each row. Store source,
checked time and next action. Credentials are names/presence only.

| Evidence | Minimum pass condition | Safe verification |
| --- | --- | --- |
| Discovered | Client, account home, scope and exact source recorded | Literal-path inventory and parsing; no launch |
| Declared/enabled | Effective layers, trust/approval and host-selected plugin version agree | Read configuration/installation records; reconcile host-native status |
| Locally prepared | Endpoint valid; runtime, cwd and required files exist; required variable names present | File metadata and redacted environment checks |
| Connected/authenticated | Intended existing native client reports a current connection under the selected account | Read that client's status; separate anonymous access from authenticated access |
| Correctly bound | Server/project/resource identity matches the task | Existing session metadata or a documented, authorized read-only identity observer |
| Capability authorized | Expected tools are exposed and task permissions permit their intended use | Compare advertised capabilities with task scope and host approval state |

A resources-only server does not fail solely for having zero tools. Likewise,
tool advertisement does not grant permission to call it. Use each installed
client's supported status controls; do not assume the panel's copied `/mcp`
command applies to every client (`src/desktop/McpPanel.tsx:76`). Host-managed
transports need native-host evidence rather than an inspector-owned duplicate.

## Minimal regression acceptance

Existing tests cover precedence/redaction, disabled plugins, missing command/env,
approval withdrawal, HTTP/stdio handshake, no tool invocation and explicit
credential changes (`desktop/service/test/mcp.test.mjs:19-129`). They do not prove
live readiness on this machine. Add focused fixture checks for:

1. Multiple cached plugin versions, a missing declared installation and a
   skills-only manifest with stray MCP configuration. Verify the actual host
   manifest contract before defining the fallback expectation.
2. Invalid URL, nonexistent cwd/script and a directory resolving as command:
   none should become locally prepared.
3. Changes to expanded arguments, `env_vars`, account/source identity and
   executable/script contents: invalidate cached evidence. Use an injected clock
   to test the freshness boundary without waiting.
4. No-tools capability, paginated tools and 401/403: retain partial capability and
   precise connection evidence; never assert binding or native authentication.

Use injected probes and disposable fixture files for these regressions. Reserve
native-client connection checks for the later authorized setup stage. This
review deliberately did not run the existing tests that create servers or
processes (`desktop/service/test/mcp.test.mjs:59-91`).

[1] `C:/Users/haslo/.codex/plugins/cache/eduaarpg-local/godot-open-world-rpg-ops/0.5.1+codex.20260927193017/.codex-plugin/plugin.json:19`; sibling `.mcp.json` existence observed by file inventory.
