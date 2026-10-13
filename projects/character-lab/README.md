# Character Lab

Owner: the workspace owner. Setup writer: this Character Lab Codex session for
T006 only. Established: 2026-10-12. Purpose: take ideas through visible versions,
refine the chosen direction, and retain editable assets with exact exports and
named receiving projects. Support 2D and 3D without duplicating their sources.

This is a new personal lab. The bundled Arachne card demonstrates the version
process. Pixel, future edgy 2D, toon and clay directions are browse interests;
the Arty register preserves working terminology and historical lookups. No first
personal character, production style, provider/model, budget or receiver has been
selected. The source library is reference input, not adoption of its proposals.

## One home for each fact

| Fact | Authority |
| --- | --- |
| Lab purpose and source layout | This README |
| Task priority, status, owner and exact write scope | [Workspace Home Tasks](../../workspace/2026-10-12_workspace-home/tasks.md) |
| Owner decisions and changes of direction | [Workspace Home Decisions](../../workspace/2026-10-12_workspace-home/decisions.md) |
| Character IDs, revision lineage and selected revision per stage | [Catalog](../../workspace/2026-10-12_character-lab/catalog.json) |
| Style aliases, source status and project browse views | [Library index](../../workspace/2026-10-12_character-lab/library.json), derived from linked source owners |
| Editable assets and per-character brief | `characters/<character-id>/` |
| Input/output identity for a revision | Its `delivery.json`, using the existing asset-delivery format |
| Visual review and owner selection evidence | Catalog-linked, revision-local records |
| Readable views and prior-run lessons | [Character Lab card](../../workspace/2026-10-12_character-lab/overview.md) |

The card's Characters view reads the catalog directly; Styles reads the library
index. Library views may link one character from many contexts; they never create
another asset, selected pointer or task board. Workspace registry
metadata describes navigation; it does not own character or task status.
Chat replies are working context; durable results belong in the records above.

## Stable source layout

```text
projects/character-lab/characters/<character-id>/
  brief.md
  revisions/r001/
    reference.png
    brief-snapshot.md
    prompt.md
    concept.png
    delivery.json
    review.json
    selection.json
```

Create only files needed for the assignment. Use a lowercase stable character
ID and increasing `rNNN` revision IDs. Add a revision instead of overwriting
earlier outputs. Every managed file is indexed; private receipts and raw
responses belong under ignored `.mrmak/character-lab/`, outside this tree.
Git-ignored inputs in `inbox/` are intake, not the durable accepted reference.

## Working loop

1. Record one task in Home Tasks with owner, allowed paths, result and checks.
2. Register the character brief. Choose the next stage and exact parent revision.
3. Save the selected input, a revision-local brief snapshot, prompt/settings,
   editable source and output locally. Keep the current brief editable; earlier
   manifests bind the immutable snapshot rather than that changing brief.
   Record actual provider/model/version when used; recover the same paid job
   after timeouts. Keep secrets and private job receipts outside Git.
4. Build a revision-local `delivery.json` with
   `scripts/asset-delivery/manifest.mjs`. Paths are relative to this repository;
   include at least one input and one output. Pin the manifest's SHA-256 in the
   catalog. This reuses existing tooling rather than creating another verifier.
5. Record review against the exact revision. Owner selection names its stage
   and exact revision; update only that stage's `selected` pointer in the catalog.
6. Run the lab check, then update the assigned Home task and note the outcome.

Stages are `concept`, `sheet`, `mesh`, `materials`, `rig`, `animation` and
`engine`. A 2D assignment can use concept -> sheet/sprites -> animation -> engine,
skipping mesh/materials/rig when unnecessary. Selection is scoped to a stage.
A selected concept does not prove a mesh, sprite bundle, rig or engine result.
A downstream revision must name its parent; changed
inputs require a new revision and a new review. Failed takes remain discoverable
as `rejected`; old selections become `superseded` when replaced.

## Catalog record contract

The catalog has `schema`, `card_id` and `characters`. A character has `id`,
`name`, `brief`, `selected` (stage-to-revision mapping), and `revisions`.
Each revision has `id`, `task_id`, `stage`, `parent` (null for a starting reference),
`state`, `manifest` (`path`, `sha256`), `review` and `selection`.
Optional nonempty strings `round`, `label` and `goal` group readable comparisons.
The first starting revision may be any required stage. Additional independent
concept candidates may have null parents. Other revisions
name an earlier revision and retain an input matching a parent output's SHA-256
and bytes; a copied input can have a different path. The mutable current brief
cannot be a manifest input; retain its revision-local snapshot. Inputs that name another
revision must match an earlier declared output. Numbering alone proves no lineage.

States: `candidate`, `reviewed`, `accepted`, `rejected`, `superseded`.
`review` and `selection` are null or `{ "path": "...", "sha256": "..." }`.
Their JSON records contain `schema` (`mrmak.character-review/v1` or
`mrmak.character-selection/v1`), `character_id`, `revision_id` and
`manifest_sha256`. A review adds `verdict` (`pass` or `fail`) and `notes`;
a selection adds `by`, `date`, `scope` equal to the stage, and `decision`.
Accepted/superseded revisions require passing review and owner-selection
evidence. All evidence paths stay in that revision's folder. These records
record the human decision; the checker cannot authenticate or make it.

## Start an idea and grow its project depth

Use the [character brief](templates/character-brief.md) and
[version round](templates/round.md). Name the next observable result, exact base,
what to keep/change and the question being tested. Record observed results and
the owner's choice beside the alternatives, as in the Arachne process.

[Directory](../../workspace/2026-10-12_character-lab/directory.md) distinguishes
observed external roots from the proposed project/subproject study structure.
Create a study entry only when it has a real brief; link stable character IDs
instead of copying their revision trees into every style or territory folder.
Existing Arty and Godot projects keep their own source owners and task boards.

## Editable source, export and receiving consumer

Use [model-handoff.json](templates/model-handoff.json) for either 2D or 3D
delivery. The compatibility name does not require a 3D model. Manifest role
`model-handoff` identifies one revision-output JSON record, schema
`mrmak.character-handoff/v1`, with `character_id`, `revision_id`,
`editable_sources`, `exports`, `receiver`, `state`, `evidence` and `notes`.

Editable-source paths reference unique files in the same manifest. A mesh, rig
or animation handoff includes a file with role `editable-source`: for example a
Blender source or sprite-authoring source. Each export is an output entry
`{path, destination_path}`; its destination is a safe relative receiver path.
Receiver fields are `project`, absolute locator `root`, `owner`, `task` and
`consumer`. The checker never reads that external root. One v1 handoff names one
receiver; proof does not transfer automatically to another consumer.

- `planned`: named receiver; exports/evidence may be empty and consumer open.
- `delivered`: retained exports and independent output evidence, role `evidence`.
- `verified`: named consumer and consumption proof coverage for every export,
  including required sprite atlas or model sidecars.

Role `consumption-proof` identifies a revision-output JSON record, schema
`mrmak.character-consumption-proof/v1`, with `character_id`, `revision_id`,
`export_sha256`, `receiver_root`, `consumer`, `receiver_revision`, `tool_version`,
`run_id`, `result`, `evidence` and `observations`. It binds the exact export and
receiver/consumer, requires `result: "pass"`, retained independent evidence and
nonempty run details. Control records cannot supply their own evidence. Handoff
and proof records reject unknown fields and omit self-manifest hashes.

This checks recorded bindings and bytes. Actual runtime and visual qualification
depend on the retained receiving evidence, with its scope and limitations.

## Drift check

Run `node scripts/check-character-lab.mjs`. It checks the real catalog and
managed asset tree, verifies pinned manifests and evidence, catches duplicate
IDs/case aliases, broken paths, unindexed files and invalid selected pointers.
It reads only; it does not fix, remove, migrate or select anything. Run it at
handoff and after catalog/asset changes. It is not a background monitor.

Use the [local rules](AGENTS.md) for the reading order. Keep this entry short;
add a specification only when an actual task needs it. Existing external
repositories retain their own sources and owners; link them without moving them.
