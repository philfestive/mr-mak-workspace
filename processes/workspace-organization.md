# Organizing a solo development workspace

Start at the pinned Workspace Home in
`workspace/2026-10-12_workspace-home/overview.md`. The owner's confirmed identity
is recorded in `context/identity.md`. The owner sets priorities and makes project
choices; agents help with the current authorized request.

## The Refiner

The owner chose Refiner setup first and game selection afterward. Turn prior
learning and scattered ideas into a clean, defined project using this sequence:
Intake -> Questions -> GDD -> Index and schemas -> Selected implementation ->
Evidence and lessons.

### Selective intake

`workspace/2026-10-12_workspace-home/intake.md` owns the idea/source intake.
The owner named `C:/Dev/GodotWorld3d`, `C:/Dev` and `D:/Dev` as candidate source
locations. Pick exact documents or materials for a named question. List before
reading and follow their own rules. Record origin, inspected version/date, lesson,
proposed reuse and destination. Preserve conflicts and protected-path boundaries.
Bring forward selected lessons and materials rather than whole repositories.
An old Current label or implementation does not select the new design.

### Ask questions in rounds

Ask 1-3 focused questions per Codex round and normally one at a time in voice.
Follow up until the selected design is clear. Explain the effect of alternatives,
offer a recommendation when useful, and challenge contradictions or scope growth.
Do not dump all questions in one turn or repeat already explicit owner choices.

Work through experience, audience, core loop, selected systems, exclusions, data
relationships, technical constraints, asset needs and first-slice checks. Keep
answers Open, Proposed or Decided in the owning GDD/decision section. An uncertain
remark stays a proposal rather than silently becoming an implementation feature.

Useful questions include:

- What should the player experience and do in the first five minutes?
- Which older lesson helps that experience, and what should stay behind?
- What belongs in the selected design, what is excluded, and what comes later?
- Which entities and stable IDs exist, and how do they relate?
- What are the field types, constraints, defaults and validation rules?
- Where does each authoritative design or schema file live?
- What observable result will prove the first implementation slice works?

### GDD, index and schemas before product implementation

Reuse the existing project/GDD templates linked in Build focus for a new design.
Where an adequate source exists, link its exact file/revision and accepted
amendments. Product intent belongs in the chosen GDD; measured results belong
in evidence files. Older implementation is refinement input, not new design
authority.

The selected project needs an index to its GDD, schemas, decisions, sources,
tasks and evidence. Each schema defines entities, IDs, types, required/optional
fields, relationships, constraints, defaults, ownership, versions, validation
and valid/invalid examples. Map these contracts to GDD requirements. Complete
the accepted scope before building; keep future possibilities explicitly parked.

`workspace/2026-10-12_workspace-home/focus.md` alone owns this Refiner's selected
implementation project: identity, exact folder, GDD source/revision, index/schema
links, open choices and next bounded task. Link the owning sources instead of
copying their contents. Existing support assignments retain their own scopes.
Explicit owner implementation requests remain authorized within their scope;
the current setup request does not select a game.

### Final input through Codex or Mr. Mak

Read current design and open questions before asking. Summarize a final owner
choice and its consequence; save it in the owning GDD/decision section. Update
Build focus when the owner selects a project or implementation scope. Preserve
the next question in files rather than relying on transcript memory.

Mr. Mak's current tools read documents and manage chats; they do not directly
edit GDD bodies. When asked to save a choice, reuse a suitable visible worker
with the exact project, owning file/section and owner's answer. Check the written
result before saying it is saved. Message delivery alone is not persistence.
Read this guide on request if a running voice session has older startup context.
Do not restart an app or agent chat merely to refresh instructions.

## One authoritative place for each thing

| Information | Authoritative source |
| --- | --- |
| Owner identity | `context/identity.md` |
| Working preferences | `context/preferences.md` |
| Current goals | `context/goals.md` |
| Ideas and selective source intake | Workspace Home, `intake.md` |
| This Refiner's implementation selection | Workspace Home, `focus.md` |
| Project brief and specifications | `projects/<project>/README.md` and linked specifications |
| Current tasks and priorities in this repository | Workspace Home, `tasks.md` |
| Project and workspace decisions | Workspace Home, `decisions.md` |
| Session notes and check evidence | Workspace Home, Notes tab (`handoffs.md`) |
| Editable project sources | `projects/<project>/` |
| Readable results and revisions | The project's Workspace card |

Workspace Home is an index into these sources. Its Projects tab links to the
brief and result card; it does not maintain a second project specification.
Notes record progress and evidence, while Tasks owns current status. Registry
entries in `workspace/workspace.json` describe cards, not a second task board.
Update the owning source and link it elsewhere rather than copying whole plans.

For a project already in another repository, link its actual working folder,
brief and local task board. That local board owns its status. Keep its files and
rules in place; do not create a conflicting task list in this repository.

## A short working loop

1. Read the current request, relevant project brief and Tasks. Choose the next
   useful result with the owner; do not infer a new product assignment.
2. Record a short task: result, working folder, files to edit and how it will be
   checked. The assisting agent may update this hub within the requested scope.
3. Do the work and save sources and results in their owning locations.
4. Run appropriate checks, update Tasks and add a short note with evidence and
   the next action. Ask for a decision only when one is needed.

Use Next, Working, Blocked and Done. Record a concrete next action when blocked.
Routine reversible work can be checked by the assisting agent. Use a separate
reviewer when the actual project requires independent review. A successful
technical check does not establish the owner's approval of a design.

An agent roster, coordinator appointment and separate handoff file are optional,
not setup requirements. For larger work, task-specific briefs and notes may live
under the project with a link from this hub. Start simple.

If multiple assistants work concurrently, give them distinct edit scopes and
one writer per shared file. Resolve an existing overlap before editing. Chat
tabs share the filesystem; any isolated checkout must obey machine Git rules.

## Names and maintenance

The current Mr. Mak chat naming and container contract is in Workspace Home
[Lane setup](#/team-hub/7). Keep its REF identifier stable when renaming an
existing chat. workspace/workspace.json owns sections and document routes;
append registered documents so existing links remain valid.

Use the project name for its folder and card. Use a chat title such as
`Project - Movement` for a bounded assignment and reuse it for follow-ups. Keep
related revisions as tabs in the same card. Preserve stable task and decision
IDs, and label superseded entries so old advice cannot appear current.

Keep the Workspace Home card's existing ID so saved navigation stays valid.
Update its `updated` date after substantive edits. Keep credentials, transcripts,
runtime state and private job receipts out of versioned notes. Organization
does not authorize restarts, paid jobs, commits, pushes, publication or repository
moves; the existing machine and repository rules continue to apply.
