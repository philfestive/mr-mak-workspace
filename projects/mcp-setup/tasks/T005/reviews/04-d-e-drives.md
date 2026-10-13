# Lane 04 - Bounded D: and E: MCP inventory

Observed on 2026-10-12. This review found saved E-drive definitions, not working connections. The earlier statement that no D-drive MCP configuration exists must be narrowed to the searched roots, filename patterns and exclusions below.

## Scope and method

Listed the immediate children of `D:/Dev`, `D:/AI`, `E:/Dev` and `E:/Tools`, then performed filename discovery with `rg --files --hidden --no-ignore` inside those four roots. Hidden and ignored files matter: a normal search omitted the vendor fal definitions and Mr. Mak account homes. No symlink-following option was used.

Final candidate patterns: `.mcp.json`, `mcp*.json`, `claude_desktop_config.json`, `config.toml`, `opencode.json`, `opencode.jsonc`, `kimi.json`, `gemini-extension.json`, `.kimi/config.json`, `.gemini/settings.json`, `.agent/*.json`, `*mcp*.yaml` and `*mcp*.yml`. This explicitly covers `.agent/mcp_config.json`; no such filename was returned. Filename matching is not a complete census of every client's possible format.

Final excluded directory/name patterns: `.git`, `.git.crashed-*`, `*_backup_*`, `*-snapshot-*`, `snapshots`, `_private`, `private`, `archive`, `archives`, `archived`, `_archive`, `node_modules`, `.venv`, `venv`, `build`, `.godot`, `AssetDatabase`, `_probe`, `_history`, `_doc-history`, `_logs`, `Logs`, `Cache`, `Quarantine`, `RecompileInputs` and `Notes`. No private or protected tree was recursively inspected. An initial filename-only pass returned archived note paths; those were not opened and were excluded from the final pass.

The D-drive audit reads no candidate config bodies. In particular, [D:/AI/AGENTS.md](D:/AI/AGENTS.md) explicitly prohibits opening configuration and credential files, so that root has filename-only coverage. External rules read before the E vendor audit were [E:/Dev/AGENTS.md](E:/Dev/AGENTS.md), the [RecompileGodot rules](E:/Dev/RecompileGodot/AGENTS.md), its machine/setup/lane documents, and [universal-modder/AGENTS.md](E:/Dev/RecompileGodot/vendor/universal-modder/AGENTS.md). No vendor files were changed.

## Observed inventory

| Scope | Observation | Readiness / next action |
| --- | --- | --- |
| `D:/Dev` | Eight broad MCP YAML matches under `deepseek-harness`: documentation, examples, test fixtures and implementation notes. No known client-config filename returned. | These paths do not establish installed connections. Custom DeepSeek/Cordis profile formats remain unexamined. |
| `D:/AI` | No candidate filename returned; `rg` exit 1, no reported search errors. | Bounded absence only. Config bodies remain prohibited by local rules. |
| `E:/Tools` | No candidate filename returned; `rg` exit 1, no reported search errors. | Tool-route/receipt JSON files were visible at the top level; they are not MCP configuration or connection proof. |
| Mr. Mak project | `.mcp.json` has an empty `mcpServers` object. `.codex/config.toml` has no MCP section or root MCP key. | Project-local MCP definitions absent in these two files. Shared client/account definitions must be considered separately. |
| Mr. Mak Codex account homes | `.mrmak/accounts/codex-1/config.toml` and `codex-2/config.toml` contain no MCP sections. Both account homes have no child directories, including `plugins`. | No account-local plugin directory observed. This does not prove what an active process loaded. |
| RecompileGodot vendor | Seven `universal-modder` files define `fal`; details below. | Saved vendor definitions only. Loading, credential resolution, authentication and availability were not tested. |
| Other E vendor matches | `ida-mcp/.github/plugin/mcp.json`, `ida-mcp/.codex-plugin/mcp.json`, `reference-only/PortPS5/opencode.json`; `rea/tests/fixtures/golden/mcp-initialize.json`; two GBA upstream `.cargo/config.toml` files. | Filename-only observations. Plugin descriptors, parked/reference material, test fixtures and Rust build configs must not be promoted into active client connections. Bodies unreviewed. |

The Mr. Mak paths above are relative to `E:/Dev/mr-mak-workspace-main`. Relevant account metadata was summarized without reading login/authentication files or printing raw configuration.

## fal definition variants

Base: `E:/Dev/RecompileGodot/vendor/universal-modder/`.

| File | Observed server container / transport |
| --- | --- |
| `.mcp.json` | `mcpServers.fal`; `http` |
| `mcp.json` | `mcpServers.fal`; `streamable-http` |
| `.cursor/mcp.json` | `mcpServers.fal`; URL field |
| `.vscode/mcp.json` | `servers.fal`; `http` |
| `opencode.json` | `mcp.fal`; `remote` |
| `gemini-extension.json` | `mcpServers.fal`; `httpUrl` field |
| `.codex/config.toml` | `mcp_servers.fal`; URL-based definition; `FAL_KEY` variable reference |

All six JSON definitions point to host `mcp.fal.ai` and name an `Authorization` header. Header values were not output. No credential was copied, tested or retained. Different containers/transports show why blindly copying one client's config into another is unsuitable. These definitions belong to the vendor checkout; merely working elsewhere on E: does not establish their activation. Client-specific activation and trust behavior require the corresponding client review and a selected later verification step.

## Remaining gaps and proposed organization

Unsearched: D:/E: locations outside the four named roots; Windows user AppData, WSL homes, external client stores, browser/account connectors, excluded trees and custom configuration filenames. No full-drive, account-wide or machine-wide absence claim is supported.

Keep one inventory row per client, account home, project and config source, with separate states for file present, definitions present, client loaded, authentication checked and bounded tool check passed. Preserve external repositories and vendor templates; link them instead of moving them or treating them as shared configuration. The [RecompileGodot binding rule](E:/Dev/RecompileGodot/AGENTS.md) reserves MCP binding edits to Codex 10; this review grants no binding ownership.

Only this report was created. No active config changes, probes, installs, sign-ins, paid calls, restarts, runtime actions or Git writes occurred. Root owns registration and preview verification in the current Workspace Home and MCP report card.
