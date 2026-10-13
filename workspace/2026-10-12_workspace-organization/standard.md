# Documented outputs

Prepared: 2026-10-12. Owner direction: this workspace should be an organized,
clear output space grounded in GDDs or identified sources of truth.
This is the working contract for this organization task and a prepared standard
for integration by the shared workspace writer. Naming recommendations below
have not renamed existing chats, files or external repositories.

## One source for each kind of information

| Information | Owning source |
| --- | --- |
| Product intent | Accepted GDD/spec and amendments |
| System rules | Subsystem or content contract |
| Task status | Project board or queue |
| Built result | Actual source and assets |
| Measurements | Scoped results and evidence |
| Decisions | Owning decision log |
| Navigation | Project entry and Workspace card |

Workspace shows concise source-linked summaries, exact output paths, actual
observations and known gaps. External task status stays on the external board.

One source of truth means one owner for each fact. A GDD cannot certify a runtime
result; a passing test cannot silently change product intent. An index helps
find the sources and does not replace them.

## Before starting an output

1. Identify the real project, exact working folder and current writer.
2. Read the applicable rules and the existing authoritative sources.
3. Name the selected requirement and its file/section/revision.
4. Describe the next concrete output, allowed paths and acceptance observation.
5. Resolve a conflicting or absent requirement with its owner. Continue other
   work that has adequate inputs; keep this question visible as unresolved.

For a new project, use the [project brief template](../../projects/workspace-organization/templates/project.md).
For a new game that lacks an adequate design source, use the
[GDD template](../../projects/workspace-organization/templates/gdd.md).
Both are empty scaffolds, not approved personal projects.

## Each delivered result needs

```text
Project and deliverable:
Owner / reviewer / date:
GDD or specification requirement: exact file, section, status and revision
Inputs: source identity and the assumptions actually used
Output: file/card and editable source location
Result: what changed or was observed
Checks: expected observation, actual result and evidence location
Open decisions or limitations:
Next action and owning source to update:
```

Keep this brief. Use the existing project result or card instead of adding a
separate receipt for every field. Update the owning source when the fact changes
and keep summaries linked to it.

## Keep the labels precise

- **Design:** Draft, Proposed, Accepted or Superseded, using the project's
  existing decision lifecycle.
- **Implementation:** Planned, In progress or Implemented, with the source path.
- **Evidence:** Not checked, Verified for a named scope/date, or Failed with the
  actual observation. Use the project's existing verdict vocabulary where present.
- **Research:** Finding or hypothesis with a source, question, date and limits.
- **Template/sample:** Clearly identified; does not establish the owner's game.

These describe different subjects. A technically completed image can still await
art selection; a written audio contract can still lack listening/runtime proof.
Do not claim broad readiness from a narrowly scoped check.

## Naming and organization

| Item | Convention |
| --- | --- |
| Specialist chat | Stable lane ID, domain and responsibility |
| Task chat | Existing project/task ID and deliverable |
| New project folder | Descriptive lowercase kebab-case ID |
| Project entry | README routes to owning sources |
| New game design | GDD in the selected project home |
| Workspace card | Readable title; related revisions in tabs |
| Evidence run | Existing dated observation convention |

For example: `AUD-40 - Godot | Proof & Contracts`,
`Project - task-id - Deliverable`, and `projects/descriptive-project-id/`.
Preserve existing lane IDs, filenames and external homes. Use `gdd.md` for a
new game only when no adequate design source exists.

The numbering in existing SHD, AUD, BF-CX, RGS and COMFY lanes identifies their
local roles; it does not establish a universal priority or readiness scale.
Logical project titles, working folders, lane IDs and task IDs are separate
identities. Record the relationship instead of making them match by moving files.

Keep the existing repository roles: `projects/` for briefs/specifications and
editable sources; `workspace/` for readable results; `inbox/` for incoming
references; `processes/` for methods; `knowledge/` for reusable lessons;
`context/` for confirmed owner preferences and goals.

External projects stay in their own homes. Register the canonical route here,
and let their own boards own their status. Match existing adequate files rather
than requiring INDEX/CONTEXT/PLAN/FOLDERS files in every small project.

## Integrating this work

The shared writer has a [prepared card entry](../../projects/workspace-organization/workspace-card.json)
and [integration handoff](../../projects/workspace-organization/README.md).
Keep the current Workspace Home and this review together by links. The existing
MCP setup work retains its own project and scope.

First actual GDD/specification setup is pending selection of the project and
canonical design source. Source conflicts found in the
[setup review](review.md) go to their existing owners.
