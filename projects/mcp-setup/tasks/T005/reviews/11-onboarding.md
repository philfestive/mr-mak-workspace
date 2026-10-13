# Future-agent onboarding review

Lane 11, T005. Read-only review of organization; recommendations below are
proposals, not activated profiles or permanent agent appointments.

## Evidence and unresolved transition

Observed on 2026-10-12: [AGENTS.md](../../../../../AGENTS.md),
[preferences](../../../../../context/preferences.md),
[goals](../../../../../context/goals.md) and
[organization process](../../../../../processes/workspace-organization.md)
identify a solo owner, Workspace Home, one authoritative source per information
type and one writer per shared file. External projects retain their own folders,
rules and boards. A roster and separate handoffs are optional.

The task's older `processes/team-coordination.md` and
`workspace/2026-10-12_team-hub/overview.md` inputs are absent. The existing
[Workspace Home overview](../../../../../workspace/2026-10-12_workspace-home/overview.md),
[tasks](../../../../../workspace/2026-10-12_workspace-home/tasks.md) and
[decisions](../../../../../workspace/2026-10-12_workspace-home/decisions.md)
still include Team Hub/team-of-12 text. Its overview links to absent `agents.md`
and `handoffs.md`. This is a source transition requiring coordinator reconciliation;
it does not establish 12 permanent appointments. Preserve unassigned roster
placeholders and historical IDs; mark superseded claims instead of inventing
identities, provider/model selections or budgets.

[T005 brief](../brief.md) grants temporary review scopes. This lane has not
inspected account homes, live MCP connections or C:/D: project availability.

## Recommended architecture

Use a central, secret-free catalog and short onboarding process in this repository.
Keep each real configuration in its owning client/account/project location. Link
C:, D: and E: projects by exact absolute folder plus their brief, rules and task
board; drive letters are location information, not permission or connection scope.
Do not copy or move external projects. Workspace Home indexes the catalog and
project results; project boards remain the source of current project status.

Recommend a small shared core with task-specific additions, pending the owner's
preference. A role is a reusable capability request, not an automatically launched
chat, account, model or entitlement.

| Temporary role/profile | Capability scope | Edit/operation boundary |
| --- | --- | --- |
| Coordinator | Inventory and task routing | Named shared documents only |
| Research/reviewer | Evidence sources and approved read tools | Assigned report; independent review when required |
| Implementer | Exact project's development tools | Explicit files in the project brief |
| Runtime operator | Project-bound runtime bridge | Named runtime owner and authorized actions |
| Creative worker | Selected media tools | Approved provider, job scope and budget |

Each task records its actual client, account alias/profile and effective
configuration sources. Two sessions with the same role can have different tools.
Use inherited session choices unless the owner specifies changes. The review's
12 lane names must not populate permanent roster slots.

## Reusable startup brief

```text
Task ID, result and acceptance checks:
Working repository / absolute working folder:
Local AGENTS.md, project brief, authoritative task board:
Owner / reviewer / shared-file writer:
Allowed edit paths and operation scope:
Client and version / account alias / selected profile:
Model, effort, permissions and generation budget: confirmed or unresolved
Configuration sources and precedence evidence:
Required catalog IDs / tools exposed now / validation timestamp:
Existing runtimes and sessions that must remain uninterrupted:
Baseline revision or relevant file state / prior handoff:
Next action / unresolved dependencies / evidence links:
```

At startup, read current sources and inspect the exact scope. Reconcile competing
ownership before writing. Compare required tools with tools actually exposed;
saved configuration, inspected entries and a successful live check are separate
claims. If a tool is missing, continue independent authorized work and record the
precise next setup action. Do not silently switch accounts, enable everything,
install, authenticate, restart or launch a runtime from this template.

## Catalog and update contract

For each entry record: stable ID; service/purpose; owning project and config
writer; client/version; account alias; scope (user/account/project/plugin);
absolute configuration source and applicable precedence; transport and sanitized
launch/endpoint description; prerequisites; credential variable names and private
storage reference; desired state; observed configured/enabled state; exposed
capabilities; live-check state; last-check time/client/account/CWD; evidence link;
known limits; next action. Never store tokens, login material or raw logs.

Use one catalog writer. Workers submit evidence in their owned reports; that
writer reconciles observations rather than duplicating catalogs. Separate dated
observations from desired configuration. Recheck after client/config/profile,
account, project or plugin changes. Label old evidence stale; retain history and
the reason it no longer proves the current scope. A failed check records its
failure class and smallest safe follow-up, not a guessed healthy state.

## Staged plan and handoff

1. **Reconcile entry points.** Coordinator updates stale Home/task links while
   preserving IDs/placeholders. Check all onboarding links resolve and only one
   board/process claims current authority.
2. **Publish inventory and profiles.** Consolidate 12 reviews into the catalog,
   route matrix and exact scope proposals. Check every entry has evidence or an
   explicit unknown, and no credentials or unsupported live claims.
3. **Prepare concrete setup packets.** For each selected client/account/project,
   document affected config, dependencies, proposed changes and verification.
   Check ownership and authorization before executing any activation stage.
4. **Verify selected connections.** In an authorized follow-up, validate exposure
   and a harmless service-specific operation in the intended session. Record
   actual results and limits; required runtime/paid operations retain their gates.
5. **Test onboarding and publish.** A future agent follows the brief, finds the
   right project/config and resumes a bounded task. Check Workspace links and
   previews, plus independent review required by T005.

A resumable handoff links baseline, chosen proposal, implemented changes,
verification and owner acceptance separately. Include owned files, current
source state, tools actually available, dated evidence, unresolved actions and
sessions not to interrupt. Re-read live shared state before resuming. Follow
[feature-handoff](../../../../../.agents/skills/feature-handoff/SKILL.md);
the coordinator owns the shared onboarding file and registry.
