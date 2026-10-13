# Project and model directory

Give every study a project, a useful subproject and one source location. Browse
the same work by medium, style and subject without making copies for every
combination. Deep projects stay understandable when each level answers a
different question.

Use [Styles](#/character-lab/4) for the style and project views, [Characters](#/character-lab/1)
for actual revisions, and [Pipeline](#/character-lab/3) for the next deliverable.
The [lab contract](../../projects/character-lab/README.md) owns source layout;
the [library index](library.json) records the browse vocabulary and its sources.

## The levels

- **Project:** the experience or collection the work serves, with its owning
  design and intended use. A Classic-inspired collection is a possible project;
  the Refiner has not selected a game.
- **Subproject:** a bounded group with a shared goal, such as a settlement,
  character group or prop collection. Its brief links the project design.
- **Subject:** the character or other asset being developed. Give it a stable
  identity and one authoritative brief.
- **Round:** the question being explored, exact base, alternatives, observed
  results and choice. Each candidate keeps its own revision identity.
- **Delivery:** the editable source, export and exact receiving consumer,
  followed by evidence of use.

Race, region, asset kind and style can describe a subproject or subject. Use
them as browse facets unless they represent a distinct design goal. A Human
farmer, a village house and a supply crate can share a regional look while
keeping separate briefs and deliverables.

## Proposed source entries in this Lab

The following study entry points are a plan. Create a folder when a real brief
needs it; the diagram does not describe files already populated here.

```text
projects/character-lab/
  studies/<project-id>/
    README.md                    project purpose and design links
    <subproject-id>/README.md     group goal and links to subjects
  characters/<character-id>/
    brief.md                     authoritative character brief
    revisions/r001/              one candidate and its retained inputs
    revisions/r002/              next candidate or refinement
```

The `characters/` directory and canonical [catalog](catalog.json) already
exist. They currently contain no personal character records. Stable character
folders remain flat so a character can appear in several project or style
views without being copied or renamed. Study entries link those folders and
their catalog identities. They do not keep another revision or selection list.

An illustrative depth is `Classic-inspired -> Human homestead -> farmer ->
palette round -> model delivery`. Those names are an example, not a selected
project or a new character record. Regional pilots, settlements, race groups
and prop kits can become subprojects when their own goal warrants one.

For a non-character collection, keep the editable files in its existing owning
project and link the exact source entry. The current character catalog contract
does not silently become a prop, environment or VFX schema.

## Medium and style views

The requested browse direction includes these branches:

```text
2D
  Pixel
  Graphic / edgy exploration
3D
  Toon
    Cartoon
    Clay
      Bright
      Dark
      Plush: separate source family; placement still open
```

This is a proposed navigation tree. Pixel work supplies existing 2D examples;
the edgy branch is a future exploration. A new 2D style still needs its own
canvas, palette, body/parts, frame and animation compatibility choices.
Cartoon can be a shared umbrella and clay a material family within it; these
browse branches can overlap and do not define mutually exclusive style IDs.

The inspected Arty sources preserve `bright_clay`, `dark_clay` and `plush_clay`
as three distinct working IDs. Bright and Dark can be the prominent clay browse
branches without losing Plush. A clay look alone does not select stop-motion
timing or prove a production animation workflow.

Keep tone, palette, surface, anatomy, regional context and construction route
as separate descriptions. A dark tone does not automatically make something
`dark_clay`; a body variant is not a visual style. The style library's terms
also do not establish 2D and 3D compatibility by themselves. Record applicability
for the actual study and preserve unresolved choices.

A construction style, zone context and zone variant can help describe an
application without becoming new asset IDs or filenames. Reclassifying a browse
view or testing a different light does not create a model version. Changed
source, material or export bytes require the appropriate scoped revision.

## Existing 3D source and receiving locations

`C:/Dev/GodotWorld3d` remains an external project with its own rules, source
owners and task records. Its reviewed directories inform this Lab; they are
not new E-drive project folders or a selected consumer for a new character.

The existing clay pipeline has four lanes under
`C:/Dev/GodotWorld3d/addons/assets/`:

- `art_direction/claymation/`: briefs and art-direction references.
- `source/claymation/`: editable production source lane.
- `processed/claymation/`: prepared/exported asset lane.
- `runtime/claymation/`: runtime delivery lane.

These lane folders include scaffolding. Their existence is not evidence that
every stage has produced or consumed an asset. Actual retained prop exports
also exist under `C:/Dev/GodotWorld3d/assets/bright_frontier/props/`; the typed
clay definitions and catalogs are under `C:/Dev/GodotWorld3d/resources/clay/`.
An assignment records the actual route instead of assuming one of these lanes
from the style name.

The reviewed Godot system links catalog entries to visual definitions and
then to a scene or an `assembly_v2` definition. These are construction layers
inside the receiving project. They are not separate creative projects or proof
that the normal game has displayed the selected export.

The nested World of Claudecraft and Brick Stunt Rally trees are comparison
references retained by that external project. Preserve their source and license
boundaries. They do not select a first-party Lab project or authorize copying
their content into a new game.

## Where each finished asset goes

Keep the destination record with the revision that produced the asset:

1. **Editable source:** exact retained source file, such as the authored Blender
   file or native sprite source, and its owning working folder.
2. **Export:** exact exported file and the intended destination path.
3. **Receiver:** project root, current owner and task, plus the scene, resource
   or other consumer that will use that export.
4. **Proof:** a receiving-project record bound to the exact export, tool/version
   and run, with retained evidence and clear limits.

Past Arty work separated the source package, candidate export and receiving
Godot project. CX20, BF20 and CX30 identify historical lanes with different
responsibilities; a lane name alone does not choose a present destination.
Name the actual receiver and its current authority for each assignment.

Use the [model handoff template](../../projects/character-lab/templates/model-handoff.json).
Keep the handoff's state Planned until source, export and receiver are named;
Delivered and Verified require the corresponding files and evidence. An export
can be delivered while its visual acceptance or normal-game integration remains
open. Earlier isolated proof retains its original scope.

One handoff record describes the bounded receiver for one assignment. Other
projects or placements can reuse the unchanged source and selected revision,
with their own instance/configuration and proof records. Link the source;
record the actual consumer rather than duplicating the model into each study.

## Start one useful branch

Choose the project or collection, its first bounded subproject, and the next
subject. Use the [character brief](../../projects/character-lab/templates/character-brief.md)
and [version round](../../projects/character-lab/templates/round.md) for that work.
State the medium, intended style, exact design sources and next result, leaving
the consumer Open if this is an exploration. Add a catalog character only when
its real brief is ready. Create deeper folders as real studies need them.

Current assignments stay in Workspace Home Tasks. The project design stays
in its owning source; style facets and the directory view lead to it. Future
workers can therefore find the idea, its versions and its destination from
the same Lab card.
