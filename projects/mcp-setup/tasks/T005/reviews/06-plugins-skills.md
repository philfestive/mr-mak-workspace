# Plugin and skill distribution review

Reviewed 2026-10-12, lane 06. Keep project workflows in versioned source, install
reusable plugins through their owning client, and record account-specific
readiness separately. A listed skill, cached package and callable MCP tool are
three different kinds of evidence.

## Observed local structure

- This repository contains 20 maintained workflows in `.agents/skills/` and
  complete distribution copies in `.claude/skills/`. Read-only verification,
  `node scripts/sync-skills.mjs --check`, exited 0 and reported **375 skill files
  verified identical**. This verifies the selected payload, not tool connections.
- `scripts/sync-skills.mjs` copies differing source files byte-for-byte into the
  Claude tree. It excludes dot-prefixed entries, `node_modules`, `__pycache__`,
  `.pyc` and `.pyo`; it never deletes recipient-added files. Consequently,
  `--check` does not detect destination-only leftovers or validate dependencies.
  Edit `.agents/skills/`, then run `npm run skills:sync` when a shared skill changes.
- `package.json` defines `test:template` as the template check, the skill mirror
  check, then asset tests. `scripts/check-template.mjs` checks 20 skill folders,
  complete matching entry files, absence of local account paths, empty template
  MCP configuration and credential placeholders. These tests enforce starter
  distribution invariants; activating project MCPs can require separating
  distribution checks from personal runtime checks.
- `scripts/package_skills.py` uses an explicit 20-skill/support-file list,
  rejects listed state/credential filenames, verifies mirrors and extracted
  references, and produces SHA-256 payload checksums. This is valuable packaging
  evidence, but filename checks cannot prove every payload is secret-free.
  `npm run skills:pack` currently invokes bare `python`, contrary to this machine's
  launcher rule. A later authorized packaging task should use
  `py -3.12 -B scripts/package_skills.py` or correct that script entry.
- Standalone machine workflows are present under
  `C:/Users/haslo/.codex/skills/`; machine shell safety is under
  `C:/Users/haslo/.agents/skills/`. Their presence does not prove discovery by a
  different client or account home. Preserve existing files until provenance and
  consumers are recorded.
- `C:/Users/haslo/.agents/plugins/marketplace.json` declares the `personal`
  catalog with three local plugins: `godot-test-architect`, `godot-asset-proof`
  and `godot-capture-loop`. All three source directories exist under
  `C:/Users/haslo/plugins/`. Their `./plugins/<name>` paths resolve from the
  personal marketplace root, not from its `.agents/plugins/` directory. The
  inspected entries specify `AVAILABLE`, `ON_INSTALL` and `Productivity`.
- Cached package manifests exist under `C:/Users/haslo/.codex/plugins/cache/`
  for personal, bundled, curated, primary-runtime and local Godot marketplaces.
  This repository currently has neither `.agents/plugins/marketplace.json` nor
  `.claude-plugin/marketplace.json`. Cache presence establishes retained files;
  lane 03 owns declarations and lane 01 owns effective account scope.

## Skills, plugins and host dependencies

A skill supplies instructions/resources; MCP supplies callable capabilities.
Installing a skill does not authenticate a provider or start its server.
[Official skill explanation](https://developers.openai.com/plugins/concepts/skills).
The repository already states this in `docs/skills.md` and `docs/skills-pack.md`.

Manifest linkage matters. Codex Prompt Bridge 0.4.3's
`.codex-plugin/plugin.json` declares skills and an inline `mcpServers` object:
`godot-prompt-bridge`, command `cmd`, cwd `.`, and arguments
`/c py -3.12 ./scripts/run_mcp_server.py`. The RPG 0.5.1 compatibility manifest
declares skills without an MCP field. A stray `.mcp.json` beside that skills-only
manifest does not establish a bundled server. Preserve the distinction from
Claude declarations and separately configured servers.

Conversely, `openai-developers/1.3.6/.codex-plugin/plugin.json` explicitly links
both `.mcp.json` and `.app.json`: the former contains a local confirmation helper,
the latter a registered app mapping. Its Claude/Cursor adaptation differs from
the Codex Platform connector. [Official distribution guide](https://developers.openai.com/learn/developers-codex-plugin).

The inspected `unified-computer-use/26.1007.21434` manifest links a `cua_repl`
descriptor containing an absolute executable and runtime-specific environment
keys, including native-pipe and trusted-service settings. **Inference:** this
installed wiring depends on its host runtime; copying it to another account's
TOML cannot establish an equivalent browser session. Do not export those
environment values, native-pipe state or installed caches as portable setup.

## Recommended canonical homes

| Content | Canonical home |
| --- | --- |
| Project workflows and support files | This repository's `.agents/skills/`, documented support paths; generated `.claude/skills/` mirrors |
| Personal workflows used across repositories | Reviewed source under `$HOME/.agents/skills/`; record legacy roots before any migration |
| Reusable plugin source | Its owning source repository or a reviewed source folder, with manifest/version/licences |
| Team/project plugin catalog | `.agents/plugins/marketplace.json` in the owning repository |
| Installed plugin cache, account auth and host state | Client-managed private storage; never the shared source of truth |
| Setup decisions and readiness | `projects/mcp-setup/`, linked from Workspace Home |

Codex documents repo `.agents/skills/` discovery and `$HOME/.agents/skills/` user
discovery; duplicate names are not merged. [Official discovery rules](https://learn.chatgpt.com/docs/build-skills).

For new portable plugin packages, use root `plugin.json`, `skills/` and optional
`mcp.json`; retain compatible overlays when needed. Pin a reviewed source
revision/version and use relative package paths. Catalog discovery, installation,
enablement, authentication and connection success remain separate. Local
marketplace plugins load installed copies; cache edits are therefore a poor
maintenance workflow. [Official packaging guide](https://developers.openai.com/plugins/build/plugins).

## Reproducible onboarding

Record each capability's source/version, licence, support files, owning client,
account home, project scope, prerequisite executable and safe check. Select
project modules with their sibling/support dependencies. Install selected plugins
through the target client's supported interface when authorized, authenticate
each target account independently, then verify fresh-session discovery and a
bounded read-only operation. Capture only redacted results and timestamps.
The owner confirmed shared core workflows plus project/role tools. Follow that
choice; an installed catalog need not enable every capability for every agent.

No installation, activation, sign-in, server launch or restart occurred. Only the
mirror check ran; template/packaging checks and cross-account live readiness
remain unverified. Workspace rendering and registration belong to the coordinator.
