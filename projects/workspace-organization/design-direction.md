# Design direction and open specifics

Updated: 2026-10-12. Owner: the human; maintained by this organization session.
This file owns the current cross-project refinement answers from this request.
It is not a selected game's GDD. Existing repositories keep their design,
implementation and evidence authorities; future GDDs link the relevant choices.

## Owner-stated direction

| ID | Direction |
| --- | --- |
| DIR-01 | Keep clear workspaces and routes for 2D, 3D or whatever a project needs. Prior examples are EduAarpg for 2D and GodotWorld3d for 3D. |
| DIR-02 | Keep existing project sources authoritative; use this workspace for clear outputs and links. |
| DIR-03 | Performance comes first for the mobile 3D goal. Art quality and strong toon colors also matter. |
| DIR-04 | Use the best retained runs as design examples. We are far from bringing material into a new project. |
| DIR-05 | Develop the specifics through detailed owner questions and indexes. Do not impose a hard final-product eligibility rule. |
| DIR-06 | Target mid-range Android first, then iPhone. The minimum support models remain open. |
| DIR-07 | Use 30 FPS as the sustained frame-rate target for the first 3D design. Other performance measures remain open. |
| DIR-08 | There are 8+ styles to define; work through them one at a time. No single global best look has been selected. |
| DIR-09 | Human/cartoon is the first style topic; earlier style ideas are inputs. Later rows and the Human profile record its specific choices. |
| DIR-10 | Pixel 9 Pro XL is the available reference phone. Seek substantial measured performance margin there while retaining the broader mid-range/older-device goal. |
| DIR-11 | First game / Refiner owns shared Home and workspace registry integration. Other lanes send it scoped changes. |
| DIR-12 | Begin Human/cartoon with environment props, starting from a crate or signpost discussion. |
| DIR-13 | The first Human example should pursue painted matte cartoon surfaces with soft edges. |
| DIR-14 | Define a representative workload before choosing the Pixel processing-headroom margin. |

Source: the owner's explicit answers in this organizing conversation,
2026-10-12. These establish direction and the stated platform/FPS target, not
other numeric budgets, selected looks, game features, a fork, a new name, or a remote operation.
The earlier carry-forward question is deferred by DIR-04 and DIR-05.

## Sources and presentation

- Prior 2D source: `C:/Dev/EduAarpg`. Deeper inspection is held by its mandatory
  preflight interpreter conflict; see explorer 13/14, not a current product claim.
- Prior 3D source: `C:/Dev/GodotWorld3d`. Owning decisions, source and evidence
  remain there. New philosophy does not inherit every older product feature.
- [Macro outcomes](../../workspace/2026-10-12_workspace-organization/macro-goals.md)
  present the refinement goals; [examples](../../workspace/2026-10-12_workspace-organization/examples.md)
  identify candidate discussion references.
- [Drift plan](../../workspace/2026-10-12_workspace-organization/drift-plan.md)
  explains source/answer change handling. Home Tasks still owns task status.

## Open questions

These are a question map, not an implementation backlog. Record an explicit
answer here once received; do not select the first suggested option by default.

| ID | Specific to decide | State |
| --- | --- | --- |
| PERF-01 | Reference and support devices, OS and tiers | Reference: Pixel 9 Pro XL; mid-range Android first, then iPhone; minimum support models/OS open |
| PERF-02 | Sustained frame-rate target | Decided: 30 FPS; workload and measurement details open |
| ART-01 | First style name and its owning refinement source | Decided: Human/cartoon; [Human profile](styles/human-cartoon.md) owns its specific questions |
| PERF-03 | First representative workload: camera, view distance, density, effects and networking | Open |
| PERF-04 | Output/internal resolution, sustained test duration, memory and thermal expectations | Open |
| ART-02 | Toon shading and outlines | Continued in Human HC-05/HC-06; preserve this original question identity |
| ART-03 | Palette specifics | Continued in Human HC-04; preserve this original question identity |
| ART-04 | Shape, material feel and distance readability | Continued in Human HC-02/HC-03/HC-07/HC-09; preserve this original question identity |
| ART-05 | Common art qualities across styles | Open |
| ART-06 | Actual style list beyond the first topic | Open; nine legacy working families are source vocabulary, not adopted roster |
| ART-07 | Which qualities vary by style versus stay shared | Open |
| PERF-05 | Pixel reference headroom and older-device receiving measures | Decided sequence: workload first, then margin; measures/support floor open; [performance vocabulary](../../workspace/2026-10-12_workspace-organization/performance.md) |
| TRADE-01 | Which visual costs may scale by device and which qualities must remain consistent | Open |
| PROJ-01 | First actual game/slice, exact design home and mechanic scope | Open; choose after refinement |

The owner has not chosen minimum support devices, a palette, a renderer, gameplay
workload, or a particular best example. Older muted-clay rules, desktop captures and shader experiments
remain references with their own scopes.

At 30 FPS the nominal frame interval is about 33.3 ms. That arithmetic does not
allocate CPU/GPU/physics budgets or demonstrate sustained performance on a phone.
Each style's geometry, surface, palette, lighting and readability choices should
be recorded separately from the shared platform/performance direction.
The [Human/cartoon profile](styles/human-cartoon.md) owns the first style's
answers. Shared Home/registry writer selection is resolved to First game / Refiner;
direct receiving delivery is a separate capability/state, not inferred from that choice.

## Answer and change record

For each material choice, keep: question ID, explicit answer, date, exact example
or source when relevant, reason/tradeoff, and affected questions or future
requirements. An uncertain answer stays Proposed. A changed answer supersedes
the prior choice visibly; it does not erase the original run or decision.

Ask a small dependency-ordered round, reflect the consequence, and save/read back
the answer. Device/workload choices guide performance measures; visible exemplar
properties guide art questions. A source check can validate a link or identity;
it cannot decide the owner's look or tradeoff.
