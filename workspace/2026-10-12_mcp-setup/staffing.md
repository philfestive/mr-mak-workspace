# Staffing and accuracy gates

The owner requested 20+ agents and accepts sequential waves to improve accuracy.
**24 reviewers have delivered evidence.** The proposed implementation roadmap
uses **30 bounded assignments across six waves**, with no more than 12 workers
plus the coordinator active at once. These are task roles, not permanent agents
or accounts. Agents can continue a relevant assignment; reviewers must remain
independent of the work they approve.

Do not start all assignments together. Accept each interface and wave gate
before dependent writers begin. Resolve exact working tree/branch, file owner
and source preimage in the launch brief. Proposed paths below do not authorize
their implementation or deployment.

## Thirty assignments

| ID | Wave and responsibility | Exclusive output/edit scope |
| --- | --- | --- |
| 01 | W1 catalog writer | `projects/mcp-setup/registry/catalog.json`, `pins.json`, registry `README.md` |
| 02 | W1 schema writer | `projects/mcp-setup/registry/schemas/` only; agree field contract with 01 |
| 03 | W1 scope researcher | `projects/mcp-setup/tasks/T005/implementation/W1/scope-review.md`; no config writes |
| 04 | W1 fixture validator | `scripts/mcp/validate-registry.mjs`, `scripts/mcp/test/registry.test.mjs` |
| 05 | W1 independent reviewer | `projects/mcp-setup/tasks/T005/implementation/W1/gate-review.md`; challenge schema, aliases, redaction and readiness |
| 06 | W2 generator writer | `scripts/mcp/generate-config.mjs` and shared adapter interface only |
| 07 | W2 Codex adapter writer | Codex adapter, Codex templates and its separate fixtures/tests |
| 08 | W2 Claude adapter writer | Claude adapter/templates/fixtures; selected Cursor work separately scoped if included |
| 09 | W2 version researcher/writer | Version/pin updates after explicit handoff from 01; dependency evidence report |
| 10 | W2 independent reviewer | Native schema/precedence, deterministic preparation and credential-free output review |
| 11 | W3 context engineer A | Exact package A files in the implementation handoff |
| 12 | W3 session/history engineer B | Exact package B files; no inventory/API/UI edits |
| 13 | W3 inventory engineer C | Exact package C files; consumes accepted A contract |
| 14 | W3 API/coordinator integrator D | Exact package D files; sole shared-entry integration writer |
| 15 | W3 desktop UI engineer E | Exact package E UI files and context UI checks |
| 16 | W3 release/provenance engineer F | Exact package F manifest/startup/build-preparation files; no deployment |
| 17 | W3 independent reviewer | Context, legacy session, environment and provenance gate report |
| 18 | W4 inspector continuation | Package C ownership transferred or continued explicitly after W3; existing MCP test file remains with this owner |
| 19 | W4 UI continuation | Package E ownership transferred or continued explicitly; no concurrent W3 writer |
| 20 | W4 behavioral test writer | New policy/capability/context fixture tests only; exact paths avoid 18's existing test file |
| 21 | W4 client-contract researcher | Dated distribution/major/schema/activation evidence report; no code/config writes |
| 22 | W4 independent reviewer | Synthetic behavior, readiness labels, supported coverage and responsive UI gate report |
| 23 | W5 configuration operator | Only the selected canary's named keys/files, after a setup assignment and preimage review |
| 24 | W5 native-client verifier | Sanitized intended-client/account exposure/auth/read-operation evidence |
| 25 | W5 project/binding operator | Named project's allowed identity check; Godot requires its existing runtime owner |
| 26 | W5 independent reviewer | Canary proof and expansion decision; no alternate-account fallback |
| 27 | W6 operating-guide writer | Existing onboarding process/report only, after scope handoff from coordinator |
| 28 | W6 fresh-session agent | One bounded startup/resume exercise and evidence report |
| 29 | W6 version-maintenance auditor | Pin/update/freshness/recovery review report; no blanket upgrades |
| 30 | W6 independent reviewer | Final usable-onboarding and maintenance disposition |

Package A-F paths and observable behavior are authoritative in the retained
[app implementation handoff](../../projects/mcp-setup/tasks/T006/reviews/15-app-handoff.md).
The coordinator alone writes Workspace metadata and the consolidated roadmap.
One designated Git writer owns the index in each checkout. Transfer file
ownership at the wave gate; a new role does not acquire a concurrent write lease.

## Accuracy protocol

1. **Bind each claim to evidence.** Record observed source/path/version/date and
   distinguish inference, proposal and unchecked behavior. Unknown is a valid
   result; cached tracking, cached plugins and saved config are scoped facts.
2. **Reconcile disagreement at the source.** The first review corrected the
   Prompt Bridge manifest claim by reading its actual inline MCP declaration;
   RPG Ops remained skills-only. Retain correction history and cite the source.
3. **Test behaviors with synthetic contexts.** Two homes and two projects must
   stay separate. Unexpected credential read, process launch, network call or
   tool operation fails the offline check rather than silently contacting a
   real service.
4. **Qualify the real consumer separately.** Native client/account/project
   checks follow the accepted preparation and scoped setup assignment. Keep
   inspector connection, auth, binding and task capability as separate fields.
5. **Require an independent gate report.** Reviewer returns pass, changes-needed
   or unknown with concrete reasons. Fix source findings, rerun only affected
   checks, then obtain the review disposition before downstream integration.
6. **Expand from one canary.** A failure stops dependent expansion and returns
   the exact issue to its owner. Additional reviewers can be assigned to a
   disputed contract; repeating unrelated scans or creating more writers does
   not resolve a missing authority or identity.

## Decisions needed later

The shared-core/project-role choice is settled. Before W5, select the first
actual account/client launch route and project, required capabilities, native
qualification operation and configuration/runtime owner. Optional clients and
creative providers need their own selection; a generation budget is not needed
for offline W1/W2 or a non-generation canary check.

No active-session restart, account login, installation, paid job, commit or push
is implied by this staffing plan. Future launch briefs name exact effects and
retain the current machine/project authorization rules.
