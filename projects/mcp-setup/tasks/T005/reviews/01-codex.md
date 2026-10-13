# Codex configuration review

Reviewed 2026-10-12 for T005 lane 01. This report is read-only evidence and a setup proposal; it does not activate connections.

## Findings

The two Mr. Mak account folders are prepared alternate Codex homes. Ordinary Mr. Mak desktop chats currently follow a different route, so those folders do not establish which account a chat uses.

| Observed scope | Configuration state | Evidence and limit |
| --- | --- | --- |
| Default user home: `C:/Users/haslo/.codex` | Three direct MCP sections: `node_repl`, `bf_pilot_godot`, `bf_pilot_artifacts`; the artifact server explicitly disabled. Seventeen enabled plugin declarations. | Sanitized section inventory of `config.toml`; configured state only. |
| Workspace: `E:/Dev/mr-mak-workspace-main/.codex/config.toml` | No MCP, plugin or marketplace sections. | Default user config contains an exact trusted entry for this workspace. Trust in the alternate homes was not established. |
| `.mrmak/accounts/codex-1` and `codex-2` | Each contains only `AGENTS.md` and `config.toml`. Both set file credential storage and ChatGPT login. No `auth.json` or plugin folder observed. | Login status and account identity were not checked; no credential contents read. |
| Review shell | Process, user and machine `CODEX_HOME` unset. | Does not establish the environment of an already running desktop service. |

The observed PATH executable `C:/Users/haslo/AppData/Local/Programs/OpenAI/Codex/bin/codex.exe` and `C:/Users/haslo/.codex/packages/standalone/current/bin/codex.exe` both returned `codex-cli 0.162.1`. Tracked source files below had no scoped working-tree changes; repository HEAD was `c7c9fbfd0d9c4f961536392fbd50b71ff0b0c528`. These checks do not identify a running process.

## Account wrappers versus desktop chats

[Start-Account.ps1](../../../../../.mrmak/agents/Start-Account.ps1) sets process-local `CODEX_HOME` to the selected account folder, clears named inherited OpenAI credential and host-agent variables, forces file/ChatGPT authentication, and launches Codex with `--no-daemon`. It restores the parent environment afterward. Its checks require an existing profile, machine instructions and protected ACL inheritance. That ACL check alone is not a complete access review.

[agents.mjs](../../../../../desktop/service/agents.mjs) instead launches the resolved `codex` command with no account wrapper or `--profile` selection. `childEnvironment()` copies the service environment, including any `CODEX_HOME`; [sessions.mjs](../../../../../desktop/service/sessions.mjs) uses it with the session working directory. [mcp.mjs](../../../../../desktop/service/mcp.mjs) inspects its own environment-selected home or default `.codex`. Therefore normal chats and inspection are service-scoped today, not selected from the two prepared account homes.

**Inference:** launching through an account wrapper replaces the default user configuration/state location. It does not import the default home's MCP/plugin settings automatically. It also does not isolate the shared repository, OS home, or every inherited MCP credential.

## Current official behavior

Local Codex values resolve from highest priority: CLI overrides; trusted project layers, closest directory first; selected named profile; user config; cloud-managed defaults; system defaults; built-ins. Enforced requirements remain constraints. Untrusted projects skip project config, hooks and rules. [Official configuration basics](https://learn.chatgpt.com/docs/config-file/config-basic).

`CODEX_HOME` defaults to `~/.codex` and contains configuration and local state. A named `--profile` is different: it overlays `<profile-name>.config.toml` within that home. Current documentation says Codex 0.134.0+ no longer selects legacy `[profiles.name]` tables. Project config cannot redirect provider/authentication settings. [Official advanced configuration](https://learn.chatgpt.com/docs/config-file/config-advanced).

Native MCP definitions use `[mcp_servers.name]` in Codex TOML. Local desktop, CLI and IDE share these configuration layers; hosted ChatGPT web does not read local files. A root `.mcp.json` is not a replacement for Codex TOML. Plugin transports come from their package; policy belongs under `plugins.<plugin>.mcp_servers.<server>`. [Official MCP documentation](https://learn.chatgpt.com/docs/extend/mcp?surface=cli).

Repo marketplace discovery and project plugin enablement are separate. Disabled plugins can still refresh; enabling a plugin does not automatically trust its hooks. Workspace-managed plugin policy is separate from local marketplace policy. [Official plugin packaging](https://developers.openai.com/plugins/build/plugins).

## Proposed architecture

1. Maintain one secret-free inventory in this project: client, account/home, project, server/plugin ID, source, version, role, credential variable names, readiness evidence and owner. Keep private runtime state outside Git.
2. Recommend a small shared core plus project/role tools, pending the owner's preference. Store reusable instructions in existing repository skills and reviewed templates in the project; do not copy the whole C: home into the account folders.
3. Keep each account's login, user settings, caches and plugin installation records in its own selected home. Apply the approved core separately to each home. Review exact workspace trust separately for each account.
4. Put project-bound MCP transports and plugin policy in that project's trusted `.codex/config.toml`. Keep provider/auth settings at user scope. Use current named profile files for role overrides only when the launcher explicitly selects them.
5. Propose a per-chat account/home field in Mr. Mak, passed consistently to process launch, inspector and transcript lookup. Display the resolved home and executable version without secrets. This requires application work; no implementation was made here.

## Future setup sequence and acceptance

First choose the intended account route and tools. Record exact executable, version, home, working directory and applicable trust/config sources. Validate prepared templates and transport prerequisites offline before changing active settings.

After a separate authorized setup task, apply selected definitions to the correct scopes, install only required plugin dependencies, and perform account-specific sign-in where needed. Never copy authentication files between homes. Record approval before an application restart.

Verify from each intended launch route: sanitized configured-server names, active `/mcp` tools, initialization result and one permitted read-only capability call. Correlate evidence to account alias, home, project, server version and time. Confirm inspection/history use the same identity. Configuration presence or an inspector health check alone is insufficient.

Remaining unknowns: the running service's inherited environment; actual account identities; managed requirements; alternate-home trust and marketplace discovery; current MCP initialization and tool availability. Resolve those with the exact selected client and account, without exposing credentials.
