# Character brief

**Document type:** Template; no character or production choice is selected here.
Save the completed brief as `characters/<character-id>/brief.md` in Character
Lab. Keep unresolved values visible and adjust relative links after copying.

Use the [lab workflow](../README.md),
[generic project template](../../workspace-organization/templates/project.md)
and [output standard](../../../workspace/2026-10-12_workspace-organization/standard.md)
for project organization. This brief adds character details to those sources.
Link an existing design/specification when relevant.

## Purpose, look and next result

| Field | Selected direction |
| --- | --- |
| Macro purpose: what this character should contribute | |
| Intended look: silhouette, proportions, personality and art direction | |
| Next deliverable the owner can open or use | |
| Exact intended consumer: project/repository and working folder | |
| Receiving scene, component or asset slot; intended use | |
| Current stopping point in the production pipeline | |

Name the actual consumer or mark it Open. A concept, reference sheet or motion
study may be the complete requested result; later stages remain future goals.

## Identity and source authority

- Stable character ID and display name:
- Brief revision and updated date:
- Owning design/specification: exact file, section and accepted revision:
- Decision record and accepted amendments:
- Current task and allowed write paths: link the Home Tasks entry/assignment:
- Brief owner and current writer:

## Identity invariants

State what must survive later edits and handoffs. Include the anatomy and limb
count, silhouette/proportions, face, signature details and palette when chosen.

| Aspect | Keep exactly / permitted tolerance | Selected reference or decision |
| --- | --- | --- |
| | | |

- Allowed variations:
- Explicit exclusions:
- Required pose, framing, views and readable details:

## References and inputs

Optional style application, separate from asset identity:

- Controlling style ID, source file and current authority status:
- Medium, project/subproject, territory or other application context:
- Proposed context variation; specific properties to keep/change:
- Existing asset/profile IDs to preserve; unresolved application questions:

A context or style label does not create a new model/profile or select a renderer.

| Source | Exact local path and version/revision | Accepted or proposed; use |
| --- | --- | --- |
| | | |

Preserve accepted source files. When a revision uses this brief, retain an
immutable brief snapshot in that revision folder and list it as an input in
`delivery.json`. Record its canonical brief path and revision in the snapshot.
Later brief edits apply to new work; earlier snapshots remain historical inputs.

## Production goals and checks

List only the path this character needs. Use the lab's existing stages:
`concept`, `sheet`, `mesh`, `materials`, `rig`, `animation`, `engine`.

| Macro goal / required stage | Deliverable and dependency | Observable acceptance criteria | Evidence destination |
| --- | --- | --- | --- |
| | | | |

- Target engine/tool version and export format, if required:
- Scale, orientation, topology/material and performance constraints, if required:
- Rig, motion and runtime behavior requirements, if required:
- For 2D: native editable source, canvas/frame dimensions, pivot, body/parts
  contract, palette method, filtering and atlas layout:
- For 2D animation: frame timing, directions, loops/events, required PNG and
  metadata exports, and evidence of the actual consumer loading the bundle:
- Review criteria and owner choice needed for the next deliverable:

Task status stays in Home Tasks. Exact revision identities and stage selections
stay in the catalog; link those records here rather than maintaining another list.
2D can use concept -> sheet/sprites -> animation -> engine without mesh or rig.

## Open choices

| Question | Open / Proposed / Decided | Answer or options and consequence | Owning decision / next action |
| --- | --- | --- | --- |
| | | | |

Keep unchosen references, consumer, engine, provider, model and budget explicit.
Save accepted changes in the owning decision record, then update this brief.
