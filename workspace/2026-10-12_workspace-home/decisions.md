# Decisions

Record choices and their reasons here. Preserve earlier entries and label
replacements clearly.

## Current organization

**D005 - Solo developer.** Confirmed by the owner on 2026-10-12. AI agents are
assistants working on the owner's requests. The maintained identity source is
`context/identity.md`. This replaces the earlier permanent-team interpretation.

**D006 - Workspace Home.** The assistant selected this clearer display name
while implementing the owner's naming request. The existing card ID is retained.
Home, Projects, Tasks, Decisions and Notes are views of the maintained sources.

**D007 - One authoritative source per kind of information.** The owner requested
a single source of truth. `processes/workspace-organization.md` defines source
ownership. Other pages link to those sources instead of copying whole plans.
Legacy folder links resolve to the same source files through a junction.

## Continuing repository requirements

**DCL001 - Character Lab authority and integration.** Owner request, 2026-10-12:
review prior C/D/E runs with 12 temporary reviewers and prevent drift here.
The owner explicitly assigned Character Lab integration to this session.
Home Tasks remains the sole task board. `projects/character-lab/README.md` owns
the lab contract; its card-local catalog owns character identities, lineage
and selections per stage. Sources stay in managed revision folders. Earlier
external projects remain in their current homes. This does not select a first
character, provider, model, budget or engine.

- **D002:** stored work defaults to English, as recorded in AGENTS.md.
- **D003:** related revisions stay together, sources are preserved and previews
  are verified, following the Workspace authoring workflow.
- **D004:** machine Git, filesystem and runtime rules remain in effect.

## Superseded interpretation

**D001 - Permanent team setup.** The earlier assistant interpreted the organizing
request as requiring a fixed roster of 12 agents. The owner clarified that they
are the solo developer. D005 replaces this interpretation. Temporary review
assistants for a specific task, such as T005, do not imply a permanent team.

## MCP setup preference - 2026-10-12

The owner selected shared core tools plus tools matched to each project or role.
The owner requested two temporary 12-agent review/planning waves for setup,
version control and best practices. This does not establish a standing minimum
worker count or authorize activation, paid jobs, restarts, commits or pushes.
The proposal is maintained in [Delivery waves](#/mcp-setup/3).

## DREF001 - Refiner purpose and first priority

Owner direction, 2026-10-12: use this workspace to refine scattered ideas and
prior learning into a clean, documented project. Finish Refiner setup first;
choose the game afterward. Build focus owns the implementation selection.

## DREF002 - GDD and questions before building

Owner direction, 2026-10-12: keep to the GDD and ask many focused questions first.
Define the documented index and complete schemas for the selected scope before
product implementation, so drift is prevented during design rather than trimmed
from a growing build. Unresolved answers remain visible in the owning design.

## DREF003 - Selective prior-work intake

The owner named C:/Dev/GodotWorld3d, C:/Dev and D:/Dev as source locations for
specific lessons and materials. Intake owns selected references and provenance.
This does not choose a game, copy whole repositories or qualify old copies as
current accepted design.

## DREF004 - Mr. Mak and Codex final input

The owner wants focused Codex questions and a voice conversation with Mr. Mak
for final input. Both use the same maintained design/decision documents. Mr.
Mak's guide now routes saving through a visible worker and checks the saved
result. This records the owner's workflow preference and prepared instructions;
a live voice conversation has not been tested by this setup.

## DREF005 - Shared PC and Codex reconnection

Owner direction, 2026-10-13: two people use this PC. Account controls belong
inside Mr. Mak, including voice. The owner prefers switching the existing
Codex login and refreshing Mr. Mak over building another profile manager now.
The refresh action rereads the account through a new Codex app-server process
and starts a new coordinator thread. Worker chats retain their current process.
Voice still uses a separately supplied OpenAI API key; no key source or person
labels have been provided. Future concurrent Claude/Codex profiles can use
explicit provider homes after their account and configuration scope is chosen.

Owner clarification, 2026-10-13: keep Refresh as reconnection to the saved Codex
login and make browser sign-in available for switching accounts inside Mr. Mak.
Provide an explicit Sign in / switch account control; reconnect automatically
only after Codex confirms browser sign-in succeeded. A Codex sign-in is not the
separate voice API key. No additional profile store or person labels are selected.
