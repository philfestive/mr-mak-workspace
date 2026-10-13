# Reproducible version management

T006 lane 21, reviewed 2026-10-12. Keep one reviewed baseline for shared core
tools, with separate tested combinations for project and role tools. This is a
plan; no install, launch, configuration change, authentication, restart or Git
write occurred. Workspace registration and preview checks belong to the
coordinator.

## Evidence and compatibility baseline

Versions below are observations or declared constraints, not an established
supported matrix. Promote a combination to supported only after its exact
client/account/project launch route passes the checks below.

| Component | Recorded baseline | Qualification still required |
| --- | --- | --- |
| Codex CLI | T005 observed 0.162.1 at both PATH and standalone locations | Prove which executable each desktop, wrapper and coordinator route actually selects; active-process identity remains unknown |
| Workspace app | Root package, Cargo and Tauri declare 0.5.1; service package declares 0.1.0 | Record installed app, bundled service and checkout separately; service package version is not the application version |
| Node/npm | Root declares Node >=22.20.0; service >=22.6 | Select an exact Node patch meeting both constraints; record npm version and bundled versus system executable |
| Rust | Cargo declares rust-version 1.77.2 | Record exact rustc/cargo toolchain and target used for an authorized build |
| Python | Machine default is py -3.12; T005 observed 3.12.10 | Record launcher resolution and each declared tool venv separately; installed dependencies remain unchecked |
| Godot | Owner pins C:/Program Files/Godot/godot.exe, expected 4.7.2 | Record actual --version for any separately authorized proof; one Godot process and one runtime owner |
| Plugins | T005 inspected Prompt Bridge 0.4.3 and RPG Ops 0.5.1 manifests | Prove target-account activation and binding; cached versions do not establish selected versions |

Sources: T005 [Codex](../../T005/reviews/01-codex.md),
[application](../../T005/reviews/05-mrmak.md),
[plugins/skills](../../T005/reviews/06-plugins-skills.md),
[Godot](../../T005/reviews/07-godot.md),
[creative](../../T005/reviews/08-creative.md);
local [root manifest](../../../../../package.json),
[service manifest](../../../../../desktop/service/package.json),
[Cargo manifest](../../../../../src-tauri/Cargo.toml).

## Version record contract

Extend the connection registry proposed by lane 16 instead of creating another
inventory. Use one component record plus compatibility rows linking records.

| Fields | Required content |
| --- | --- |
| Identity/scope | Stable component ID, role, owning project/root, client, account alias/home, platform/architecture and owner |
| Executable provenance | Requested command, actual absolute executable, resolver/launch route, reported version, file SHA-256 and observation date |
| Source/dependencies | Owning repository/release URL, exact source revision, manifest paths/hashes, lockfile paths/hashes, package version/integrity and runtime/toolchain versions |
| Plugin distribution | Catalog/source revision, manifest format/hash, installed package ID/version, authoritative activation evidence and account scope |
| Compatibility | Exact referenced client/runtime/plugin versions, transport/protocol/schema, declared requirements, tested operations, verdict and evidence date |
| Lifecycle | Candidate/current/last-known-good/superseded, change reason, reviewer, deployment route and recovery reference |

Keep command arguments sanitized. Record credential variable names only; exclude
login stores, private receipts, native pipes and host-managed environment values.
An unpinned remote service gets an observed capability/schema fingerprint and
date, explicitly marked externally managed; do not invent a server version.

Retain root and service package-lock.json alongside their manifests, Cargo.lock,
and each owning module's existing uv.lock. Record actual resolved versions rather
than treating manifest ranges as pins. Unlocked Python requirements need a
reviewed per-tool dependency-lock proposal before reproducibility is claimed.
Do not replace module-specific Python declarations with the machine default.
Edit maintained skills in .agents/skills; after an authorized shared-skill edit,
run npm run skills:sync and its read-only mirror check. Record source revision
and payload hashes; never maintain plugins by editing installed caches.

## Bounded update sequence

1. Name one component, scope and owner. Inventory its current executable,
   manifests, lockfiles and evidence without changing active settings. Reuse
   lane 17's Git snapshot; preserve concurrent work.
2. Prepare exact candidate versions and release/source references. Review
   compatibility changes, licenses, dependency diffs and migration requirements.
   Keep existing known-good references; propose no blanket upgrades or installs.
3. Stage source and secret-free templates in the authorized edit scope. Validate
   parsing, resolver consistency, lock/manifest agreement, skill mirrors and
   account/project fixtures. Address the existing skills:pack bare-python entry
   in a separately assigned change using py -3.12.
4. Reconcile docs/updating.md's 0.5.0 instructions with the actual approved
   release. A build receipt must identify source revision, lock hashes, bundled
   Node and service payload hash; checkout 0.5.1 alone cannot prove deployed code.
5. Obtain the necessary installation/deployment authorization for the concrete
   candidate. Schedule a user-approved restart window if activation interrupts
   an application or chat; leave active sessions running until then.
6. In the intended fresh session, verify executable/home/project parity,
   initialization, exposed tools and one permitted read-only operation. Check
   managed transports through their supported host route. Requalify Godot
   identity after reconnect; runtime work stays with its owner.
7. Promote only passing exact combinations. On failure, restore the approved
   known-good configuration/package route without deleting repositories or
   private state, and obtain permission for any required restart. Publish
   redacted evidence and the next owner action; mark unrun checks NOT_RUN.
