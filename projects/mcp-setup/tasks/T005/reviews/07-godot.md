# Godot MCP binding and runtime ownership review

Reviewed 2026-10-12. Scope: offline configuration and documented authority. No
editor, helper, diagnostic probe, runtime control, installation or restart was
run. No Godot tool is exposed in this review session's tool catalogue.

## Keep three project bindings separate

An MCP name, plugin installation or listening port does not identify the project
an agent may operate. Retain a separate registry record for each absolute project
root, client/account and tool role; never substitute a sibling project or worktree.

| Project | Configuration evidence | Current disposition |
| --- | --- | --- |
| `C:/Dev/bf-pilot` | Lane 03 observed `bf_pilot_godot` in `C:/Users/haslo/.codex/config.toml`, using `C:/Dev/_orchestration/mcp-bridge/godot_authority_bridge.js`. Its `bf_pilot_artifacts` entry is explicitly disabled and pins a missing older Prompt Bridge cache/launcher. | Project-specific configuration exists; connection and runtime identity are unverified. Preserve the disabled entry pending an owner-scoped repair. |
| `C:/Dev/GodotWorld3d` | Lane 03 observed `bf_control` and `godot_world3d_prompt_bridge` in local `.codex/config.toml` and `.mcp.json`; referenced scripts/configs exist. Prompt Bridge explicitly selects this root's `.prompt-bridge.json`. | Configured, not live-qualified. Codex uses `client_loop.py`; `.mcp.json` and Claude Desktop use `bf_control.py`, both under `C:/Dev/bf-tools/client-loop/`. Reconcile their behavior rather than assuming identical names mean identical implementations. Local Codex disables seven alternate routes, including Pilot aliases. |
| `C:/Dev/EduAarpg` | `.mcp.json` is a historical navigation reference; fresh inspection is restricted by its session-start guard in this review. The current RPG Ops Codex plugin manifest is directly observed to contain skills and no MCP server declaration. | Live binding is unqualified. Installing its skills does not create an editor connection or approve its inert observer template. |

Lane 04 found no Godot configuration filenames in its bounded D:/E: scan. This
does not establish absence outside that scan. `E:/Dev/RecompileGodot` reserves
binding changes to its own Codex 10; this is distinct from the Bright Frontier
lane with a similar name. Follow each repository's actual owner.

Sources: lane [03 inventory](03-c-drive.md), lane [04 inventory](04-d-e-drives.md),
and the [T005 brief](../brief.md). The inventory lanes own discovery details;
this report defines how to consume them safely.

## Separate the tool roles

**Editor observation:** a project-bound gateway must initialize with the expected
project identity, policy digest, gateway run, protocol and fresh session. Then
`get_project_info` must agree. RPG Ops `fleet-run` permits only that call,
`get_editor_state` and `list_open_scenes`. It rejects writer leases, validators,
gates, renders, full-fleet work and raw HTTP fallback. The preserved Claude/Cowork
HTTP package is not a qualified Codex route.

**Prompt Bridge consumption:** the current cached Prompt Bridge 0.4.3 manifest
declares an artifact MCP. Select a real project's `.prompt-bridge.json`, ideally
with explicit `--config`. Config-selector environment variables outrank
`--project-root`; a cached plugin's working directory is not the selected Godot
project. Compare returned project ID/root, selected config and artifact root.
`PROMPT_BRIDGE_ARTIFACT_ROOT` can override an artifact location without selecting
a project. Sample and legacy fixture roots remain fixtures.

**Runtime input or mutation:** this requires the separately governed runtime
owner and supported project-bound control route. The playtest skill requires
loopback transport, authentication, one writer lease and its current fence.
Neither an observer skill nor a Prompt Bridge status result supplies this
authority. Prompt Bridge can also write advisory proposals or optional triage
reports; those calls need a scoped write assignment. Its `run_gate` returns a
host-runner request and does not execute Godot.

## Proposed concurrency design

Use one named runtime owner for the machine's one Godot process. Additional
agents can inspect source and retained evidence concurrently within disjoint
edit scopes. Have one owner capture/export a selected scene and publish a
correlated receipt; readers consume that run rather than independently starting
Godot or rewriting `.ai/`. Keep client-managed artifact readers distinct from
the editor/game process. A writer lease does not waive the one-process rule.

Record only non-secret binding metadata in the shared registry: project root,
client/account scope, config source, implementation/version, tool role, runtime
owner, permitted effects, credential variable names, observed readiness level,
evidence date and next owner action. Keep authentication values and private
runtime receipts outside Git. Use project-specific aliases so identical tool
names cannot silently choose a different project.

## Exact future preflight and handoff

1. Read the selected repository's AGENTS.md and coordination source. Name the
   absolute project/worktree, client/account, scene, consumer, runtime owner and
   authorized effects. Confirm actual exposed tools; saved configuration is not
   availability.
2. Before any launch, identify existing editor/game/helper ownership. For a
   separately authorized Godot proof, use `C:/Program Files/Godot/godot.exe` and
   record `--version`; do not launch a second process. Preserve ambiguous or
   shared instances.
3. Prove live gateway binding before dependent calls. For artifacts, separately
   prove config/root binding, then inspect schema, timestamps, source, status,
   warnings and provenance. Missing or mismatched identity stops that route.
4. When fresh capture is authorized, runtime owner performs Capture, then Export
   Current Scene. Correlate project/scene/source, capture/export IDs, timestamps,
   paths/hashes and validator scope. Different IDs require a linking receipt.
5. Return observed operations, ownership, identities, run references, evidence
   limits, surviving shared resources and exact next dependency. Label unchecked
   steps NOT_RUN or NOT_ESTABLISHED; status, screenshots and exports do not prove
   current gameplay, visual acceptance or production authority.
6. Release owned inputs/leases through their supported owner route. Never close,
   restart or kill another session to refresh tools. A client restart/reconnect,
   project switch or implementation change invalidates prior qualification;
   repeat identity checks on the new session.

Primary local sources: `C:/Users/haslo/.codex/skills/godot-live-loop/SKILL.md`;
`C:/Users/haslo/.codex/plugins/cache/godot-prompt-bridge-local/godot-prompt-bridge/0.4.3+codex.20260929133107/skills/godot-prompt-bridge/SKILL.md`
and `.codex-plugin/plugin.json`; corresponding RPG Ops cache
`eduaarpg-local/godot-open-world-rpg-ops/0.5.1+codex.20260927193017/skills/fleet-run/SKILL.md`,
`skills/live-playtest/SKILL.md`, README.md and `.codex-plugin/plugin.json`.
Machine/runtime restrictions come from the owner's session AGENTS instructions;
documentation does not authorize a launch or activation.
