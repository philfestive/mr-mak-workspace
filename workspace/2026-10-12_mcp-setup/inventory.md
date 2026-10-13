# Observed setup

Observed on 2026-10-12. This is a bounded inventory, not a machine-wide absence
claim or a live connection test. The retained [review reports](reviews.md) name
the inspected sources, commands and limits.

| Client or scope | Observed configuration | Readiness and next step |
| --- | --- | --- |
| Default Codex home on C: | Three direct entries: `node_repl`, `bf_pilot_godot`, disabled `bf_pilot_artifacts`; 17 enabled plugin declarations | Declarations only. Select the exact launch context before checking native tools. |
| This Workspace's project configuration | Empty `.mcp.json` server object; no MCP sections in `.codex/config.toml` | Project-local definitions absent; inherited user settings can still apply. |
| Prepared `codex-1` and `codex-2` homes | Login settings and machine instructions; no MCP/plugin sections or plugin directories observed | Wrappers select these homes; normal desktop source does not select them. Do not infer login status. |
| Claude Code user scope | No direct global/project MCP records in inspected user map | Plugins and selected project configuration are separate inputs. |
| Claude Desktop | `bf_control` and `godot_world3d_prompt_bridge` definitions | Desktop configuration is distinct from Claude Code; live state unverified. |
| Cursor user scope | Empty user server object | Other project-level sources may apply. |
| GodotWorld3d project on C: | Local Codex and Claude definitions; explicit alternate-route disables | Same `bf_control` name uses different scripts across clients. Binding and live readiness unverified. |
| bf-pilot on C: | Project-bound global bridge definition; disabled artifact alias points to missing older cache | Preserve current state. Any repair belongs to that project's owner. |
| EduAarpg on C: | Earlier project definition observation is guard-limited; current Codex RPG Ops manifest supplies skills only | No qualified live Codex route. Its retained sibling MCP file does not establish activation. |
| Prompt Bridge 0.4.3 plugin | Codex compatibility manifest explicitly declares an artifact MCP | Declaration verified; correct project selection and native exposure still need checks. |
| fal in E: vendor checkout | Seven client-specific definitions under `RecompileGodot/vendor/universal-modder` | Saved vendor setup only. Do not transfer credentials or activate it from this review. |
| D:/Dev and D:/AI | No eligible known client config filename found in bounded scans; D:/Dev contains MCP examples/fixtures | D:/AI prohibits config-body reads. Custom formats and other roots remain outside coverage. |
| E:/Tools | No eligible config filename found in bounded scan | Other tool receipts are not MCP connection evidence. |
| Current review session | Browser/Node and built-in imagegen tools exposed; no Godot, fal, Higgsfield or Blender MCP exposed | Tool exposure is session-specific. No production operation was attempted. |

The inspected Codex executables report **0.162.1**; Python launcher reports
**3.12.10**. Checkout application version is **0.5.1**. Installed/running app
provenance, alternate-home trust, actual account identities, quotas and live
authentication remain unverified.

## Four distinctions future agents must preserve

1. A skill gives instructions; it does not install or authenticate its tools.
2. A file or cached plugin establishes retained configuration, not activation.
3. An inspector handshake establishes that inspector's connection context.
4. Task readiness requires the intended native session, correct project binding,
   expected capabilities and authorized use.

Keep observations dated and scoped. Recheck after a client, account, project,
plugin, executable or configuration change. Never promote an unknown result to
healthy merely because another account or project worked.
