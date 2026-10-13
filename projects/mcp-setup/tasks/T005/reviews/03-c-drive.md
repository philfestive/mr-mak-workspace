# C: configuration and plugin inventory

Lane 03, observed 2026-10-12. This is a bounded configuration review, not a connection test. Read-only parsing and local existence checks returned exit 0. No servers, applications or runtimes were launched. No credentials, headers or environment values were disclosed.

The existing C: setup is substantial, but it belongs to several clients and projects. A cached plugin, an enabled declaration, a configured server and a callable tool are separate observations.

## User and project definitions

| Client/source | Observed definitions | Binding and local prerequisites | Live state |
| --- | --- | --- | --- |
| Shared Codex [S1] | `node_repl`; `bf_pilot_godot`, both with enabled unspecified | Node REPL executable exists. Pilot uses `C:/Program Files/nodejs/node.exe` and `C:/Dev/_orchestration/mcp-bridge/godot_authority_bridge.js`, both present; `--project C:/Dev/bf-pilot` and its settings file exist. | Node REPL tools are exposed to this review lane; Pilot Godot tools are absent. No invocation performed. |
| Shared Codex [S1] | `bf_pilot_artifacts`, explicitly disabled | Python312 executable and `C:/Dev/bf-pilot/.prompt-bridge.json` exist. Its pinned cache and runner are missing; see below. | Unavailable in this lane; disabled configuration is observed. |
| Claude Desktop [S2] | `bf_control`; `godot_world3d_prompt_bridge`; no enabled field | Python312 executable exists. Control uses `C:/Dev/bf-tools/client-loop/bf_control.py` and its `client-loop.json` manifest. Prompt Bridge uses the `bp013-demo-20260926` repo root and GodotWorld3d config. All referenced local paths checked exist. | Not tested. Desktop configuration does not establish Claude Code or Codex availability. |
| GodotWorld3d `.mcp.json` [S3] | Same two names and bindings as Desktop; no enabled field | Same local paths exist. | Not tested; client loading and project trust unverified. |
| GodotWorld3d Codex [S4] | `bf_control`; `godot_world3d_prompt_bridge`; no enabled field | Control uses `client_loop.py`, unlike Desktop/project JSON's `bf_control.py`; that script exists. Same manifest and Prompt Bridge binding. | Not tested. Configuration precedence belongs to lane 01. |
| Cursor user [S5] | Empty `mcpServers` | No user MCP definitions in this file. | Does not rule out project or extension tools. |
| Claude Code user [S6] | Zero user MCP entries; inspected GodotWorld3d/EduAarpg project maps also have zero entries | Plugin settings are separate, below. | Does not rule out repository `.mcp.json` loading. |
| EduAarpg [S7] | Parent's earlier observation: `godot-prompt-bridge` in `.mcp.json` | Historical task evidence only; no fresh binding/path check. | Unqualified. Required session-start guard was not run, so this lane stopped that scope. |

GodotWorld3d Codex explicitly disables seven additional names: `godot_world3d_loop`, `godot_world3d_editor`, `godot_world3d_bridge`, `godot`, `godot-prompt-bridge`, `bf_pilot_godot`, `bf_pilot_artifacts` [S4:12-42]. These exclusions must survive any organizing proposal.

The selected Prompt Bridge root is `C:/Dev/worktrees/godot-prompt-bridge/bp013-demo-20260926`; its config is `C:/Dev/GodotWorld3d/.prompt-bridge.json`. Pilot's settings binding is `C:/Users/haslo/AppData/Roaming/Godot/app_userdata/bf-pilot/mcp_settings.cfg`. Existence checks passed; contents and project identity were not validated.

## Plugin declarations and cached transports

Shared Codex declares 17 enabled plugins [S1:267-317]: five document plugins; Prompt Bridge; RPG operations; three personal Godot skills; and seven bundled plugins (`visualize`, `browser`, `computer-use`, `codex-app-tools`, `unified-computer-use`, `chrome`, `code-review`). Cache manifests for these names exist. This establishes declaration and cache presence, not an independent installed registry or effective server loading.

| Cached plugin/version under `C:/Users/haslo/.codex/plugins/cache/` | Descriptor observation |
| --- | --- |
| `godot-prompt-bridge-local/godot-prompt-bridge/0.4.3+codex.20260929133107` | Manifest contains inline `godot-prompt-bridge` stdio declaration using `cmd`; root `.mcp.json` also references a plugin-relative runner. Runner exists. Expansion/loading not tested. |
| `eduaarpg-local/godot-open-world-rpg-ops/0.5.1+codex.20260927193017` | Root `.mcp.json` contains `godot`, HTTP at localhost port 19081. Manifest has no `mcpServers` field. Reachability, project selection and loading unverified. |
| `openai-bundled/codex-app-tools/0.1.6` | Manifest references `.mcp.json`; `codex_app` uses stdio `cmd.exe`, explicitly disabled. |
| `openai-bundled/unified-computer-use/26.1007.21434` | Manifest references `.mcp.json`; `cua_repl` uses stdio, explicitly enabled. Versioned user runtime Node executable and module file exist. Browser-control APIs are exposed in this session. |
| `openai-bundled/code-review/26.1007.21434` | Manifest references `.mcp.json`; `code-review` uses stdio `cmd.exe`, explicitly disabled. |

The other checked enabled-plugin manifests have skills and no `mcpServers` field. Do not count their skills as MCP connections. Runtime-managed paths should not be copied into another account home.

Claude's installed registry [S8] records seven user-scope plugins, all with existing install paths. Settings [S9] disable `godot-open-world-rpg-ops@eduaarpg-cowork` and `godot-prompt-bridge@godot-prompt-bridge-local`. Their installed caches respectively declare `godot` HTTP localhost:19081 at version `0.5.0`, and `godot-prompt-bridge` stdio via `cmd` at version `0.4.2`; the latter's plugin-relative runner exists. The five enabled plugin settings are `skill-creator`, `plugin-dev`, `document-skills`, `godot-asset-proof` and `godot-test-architect`. These settings belong to Claude's user configuration, not Desktop's MCP file.

## Disabled stale path and next action

`bf_pilot_artifacts` still points to `C:/Users/haslo/.codex/plugins/cache/godot-prompt-bridge-local/godot-prompt-bridge/0.4.2+codex.20260809205934/scripts/run_mcp_server.py`; both that runner and its version directory are absent [S1:365]. A newer cache exists, but changing the pin or enabling it requires a separate scoped setup action. The deliberate disablement is also recorded by `C:/Dev/_handoffs/DECISIONS.md`, D30.

Future agents should select a client/account home and owning project first, preserve project exclusions, and record configured state separately from tool exposure and a project-bound live check. This lane found no callable Godot or fal tools. Endpoint health, effective plugin installation, account-home inheritance and EduAarpg readiness remain unverified.

## Exact configuration sources

- S1: `C:/Users/haslo/.codex/config.toml`, sections at lines 18, 267, 351 and 365.
- S2: `C:/Users/haslo/AppData/Roaming/Claude/claude_desktop_config.json`.
- S3: `C:/Dev/GodotWorld3d/.mcp.json`.
- S4: `C:/Dev/GodotWorld3d/.codex/config.toml`, selected sections at lines 2 and 7.
- S5: `C:/Users/haslo/.cursor/mcp.json`.
- S6: `C:/Users/haslo/.claude.json`.
- S7: `C:/Dev/EduAarpg/.mcp.json`; guard rule: `C:/Dev/EduAarpg/AGENTS.md`, TL;DR.
- S8: `C:/Users/haslo/.claude/plugins/installed_plugins.json`.
- S9: `C:/Users/haslo/.claude/settings.json`.

Each cache table row names its exact root; transport evidence comes from its `.mcp.json` and `.codex-plugin/plugin.json`. Claude transport roots are `C:/Users/haslo/.claude/plugins/cache/eduaarpg-cowork/godot-open-world-rpg-ops/0.5.0` and `C:/Users/haslo/.claude/plugins/cache/godot-prompt-bridge-local/godot-prompt-bridge/0.4.2`.
