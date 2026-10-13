# Delivery waves

**Plan first, then implement in bounded batches.** Two temporary 12-agent review
waves produced 24 reports. The next implementation waves below remain proposed;
the owner has requested planning, not activation or application deployment.
The latest request emphasizes 20+ agents and accuracy; the proposed staffing
now has **30 bounded assignments**, with at most 12 workers plus the coordinator
running at once. Each gate gets a reviewer independent of its implementation.

Use shared core tools plus project/role additions. Status belongs to Workspace
Home's **T005**. The second planning packet is **T005-P2**; its retained folder
is `projects/mcp-setup/tasks/T006/`. Global T006 belongs to Character Lab and
retains its separate owner and scope. No file move or task takeover is needed.

## Sequence and gates

| Wave | Outcome | Suggested workers | Entry and exit gate |
| --- | --- | --- | --- |
| W1: Registry and baseline | Versioned aliases, schema, source pins and exact scope map | 5: catalog writer, schema writer, scope researcher, fixture validator, reviewer | Start from these reviews; finish with a validated secret-free contract. |
| W2: Setup packets | Client/version-specific templates, private-binding contract and canary packet | 5: generator writer, Codex adapter writer, Claude adapter writer, version researcher, reviewer | W1 contract accepted; offline packets parse and preserve client/project precedence. |
| W3: Launch context | One client/account/project context across launch, history and resume | 7: six disjoint source-package writers plus independent reviewer | W1/W2 contract ready; synthetic context and compatibility checks pass. |
| W4: Inspection and readiness | Account/project-aware panel, explicit evidence states and correct adapters | 5: inspector writer, UI writer, test writer, client-contract researcher, reviewer | W3 context API stable; focused regression suite and responsive UI checks pass. |
| W5: Canary, then expansion | One exact account/project is native-verified before others | 4: configuration writer, native-client verifier, binding operator, independent reviewer | Reviewed packet and scoped setup assignment; current native exposure/binding/read operation pass. |
| W6: Onboarding and maintenance | Another agent can resume a bounded task using current evidence | 4: guide writer, fresh-session agent, version-maintenance auditor, reviewer | Selected routes qualified; startup, links, version updates and recovery are reviewable. |

W3 design may proceed beside W2 after W1. Its integration waits for the selected
client semantics. W4 integrates after W3. A native-only canary may follow W2;
that route makes no claim of desktop parity. Desktop canary qualification waits
for W3/W4 and a prepared application artifact. Each wave can use more workers
for distinct research/verification packages; the requested scale is provided across disjoint assignments, while no standing
minimum is imposed on unrelated future tasks. See [Staffing and accuracy](staffing.md).

## W1 - Registry and baseline

Catalog writer 01 owns proposed `projects/mcp-setup/registry/catalog.json`,
`pins.json` and registry `README.md`. Schema writer 02 exclusively owns
`projects/mcp-setup/registry/schemas/`. Researcher 03 and reviewer 05 write only
their named W1 reports; validator 04 owns its named helper and tests.
One coordinator updates the report and Workspace metadata.

Define stable client/profile/project/source aliases, selected shared core and
role additions. Separate intended configuration from dated observations. Exact
machine paths and account-store references resolve in an ignored private binding
map. Version pins describe reviewed source and compatibility; they do not infer
the active plugin from cache sorting.

Checks: closed schema, unique selection keys, references resolve, missing/unknown
values stay explicit, synthetic secret sentinels cannot enter tracked exports.
Fixture validator owns proposed `scripts/mcp/validate-registry.mjs` and
`scripts/mcp/test/registry.test.mjs`; scope researcher and reviewer write only
their W1 reports named in Staffing. Private bindings and runtime observations
are not populated by this wave.
Handoff: accepted contract to W2 and W3. Design source:
[registry review](../../projects/mcp-setup/tasks/T006/reviews/16-registry-versioning.md).

## W2 - Reproducible setup packets

Generator writer 06 owns `scripts/mcp/generate-config.mjs` and the shared
adapter interface only. Writer 07 owns Codex adapter/templates/fixtures; writer
08 owns Claude adapter/templates/fixtures. Name exact client-specific paths at
assignment; optional Cursor work receives a separate scope. Writer 09 owns
shared version/pin updates after explicit handoff from 01.
Create private prepared bundles only when an exact target is selected; the
generator never writes active client configuration or runs a server.

Prepare native Codex TOML and separate Claude/Cursor JSON adapters. Kimi and
OpenCode require installed distribution/major selection first. Reconcile fal
OAuth and older Bearer templates; preserve deliberate Godot route exclusions.
Host-managed runtime wiring remains with its host. Separate starter-distribution
checks from personal-runtime checks; the starter currently requires empty MCP
templates.

Checks: selected version syntax, duplicate winners, trust/approval assumptions,
safe Windows paths, dependency metadata and credential-free output. No account
store/cache copying. Handoff: exact destination, selected packet/version,
prerequisites, scoped inverse patch and safe qualification call to W5.
Sources: [templates](../../projects/mcp-setup/tasks/T006/reviews/19-templates.md),
[versions](../../projects/mcp-setup/tasks/T006/reviews/21-version-management.md).

## W3 - One launch context

Split source implementation into these packages. These are proposed files,
not edits performed by this review.

| Package | Sole edit owner and principal files | Dependency |
| --- | --- | --- |
| A: Context resolver | `desktop/service/launch-context.mjs`, `agents.mjs`, pure context tests | W1/W2 contract |
| B: Sessions/history | `sessions.mjs`, `native-events.mjs`, `codex-history.mjs`, associated tests | A API and migration contract |
| C: Inventory engine | `mcp.mjs`, its behavioral fixture tests | A and client adapter contracts |
| D: API/coordinator integration | `server.mjs`, `coordinator.mjs`, routing/coordinator tests | A/B/C contracts |
| E: Desktop UI | `Chats.tsx`, `types.ts`, `client.ts`, `McpPanel.tsx`, `FilesRail.tsx`, related CSS and context UI checks | D API contract |
| F: Release provenance | `desktop/prepare.mjs`, service/native startup, release manifests/docs | Accepted A-E and approved build/dependency route |

A-C can develop against reviewed interfaces in parallel. D integrates in order;
E consumes stable API fixtures. C/E finalize readiness behavior in W4. Each
shared source file and index has exactly one writer. Tests are owned with their
behavior package or by an explicitly designated test writer, never both.

Acceptance: two fake account homes and projects remain separate through launch,
inventory, transcript discovery and resume; environment scoping follows selected
connections; stale cross-context responses cannot replace current UI state.
Legacy sessions retain unresolved identity until explicitly bound. Default
behavior remains supported; current sessions keep their launch snapshot.

Packaging needs a reviewed non-destructive staging/dependency path: the current
prepare script clears staging and invokes installation, so this review does not
run it. A prepared build is separate from an installed/running version.
Source: [implementation handoff](../../projects/mcp-setup/tasks/T006/reviews/15-app-handoff.md).

## W4 - Inspection and validation

Use the same context resolver for the inspector and native launch. Label declared
configuration, locally prepared state, inspector handshake and native-session
evidence separately. Unsupported layers and unknown plugin activation remain
visible. OAuth/host-managed/helper routes retain their proper native-owner checks.

Use injected filesystem, environment, spawner/client and clock fixtures for
account/project isolation, malformed endpoint/cwd/script, plugin linkage/version,
secret redaction, expanded arguments/env and content-sensitive invalidation,
pagination, resources-only servers and precise auth failures. No credential or
production service is needed for these regressions.

Check the intended UI at 1280, 768 and 390 px. A full existing test suite can
start loopback transports or processes; choose the test route based on actual
effects. Handoff: tested source/build and documented limitations to the operator.
Source: [validation handoff](../../projects/mcp-setup/tasks/T006/reviews/20-validation-handoff.md).

## W5 - Canary and expansion

Select **one** actual client, account home, role and project. The exact choice
remains open; W1/W2 can proceed without guessing it. Assign its configuration
writer, independent verifier and required project/runtime owner. Remove all
unselected targets from the execution brief.

Apply only the reviewed selected patch under the setup assignment. Keep auth
in its native client; obtain any needed sign-in directly for that account. For
application changes, prepare and verify the update before requesting permission
to restart active sessions.

Native acceptance: actual client/version/home/cwd recorded, required capabilities
exposed, auth where applicable, exact project identity, and one permitted
representative read operation. An inspector handshake is a separate field.
Requalify after reconnect. Use no paid generation as a readiness test.

Godot qualification stays with its runtime owner and one process. External
binding edits stay with each project's designated writer. Failure stops expansion;
reverse only the owned setting patch after re-reading current state. Preserve
tokens, histories, deliberate disabled routes and concurrent edits. No cleanup,
backup/retirement scripts or destructive Git reset.

Handoff: dated accepted canary evidence, then repeat per selected account/project.
Source: [rollout and recovery](../../projects/mcp-setup/tasks/T006/reviews/23-rollout-recovery.md).

## W6 - Future-agent practice

One guide writer maintains [Agent startup](agent-startup.md) and the linked
onboarding process; a fresh reviewer follows it for a bounded task. Reuse the
existing report and board. Record version-update and evidence-expiry triggers,
source changes, known limits and receiving owner.

Exit: another agent can identify its exact context, required/exposed tools,
allowed files and next action without guessing an account or using a stale check.
Git ownership and scoped review apply throughout; commits and pushes require
their existing separate gates. Source:
[operating practice](../../projects/mcp-setup/tasks/T006/reviews/22-operating-practice.md).

## Launch the next wave

```text
Implement W1 for T005 in E:/Dev/mr-mak-workspace-main.
Read live AGENTS/context, Workspace Home, MCP report and retained reviews.
Use the confirmed shared core plus project/role tools model.
Assign five workers with exclusive paths:
01: projects/mcp-setup/registry/catalog.json, pins.json and registry/README.md
02: projects/mcp-setup/registry/schemas/ only
03: projects/mcp-setup/tasks/T005/implementation/W1/scope-review.md only
04: scripts/mcp/validate-registry.mjs and scripts/mcp/test/registry.test.mjs
05: projects/mcp-setup/tasks/T005/implementation/W1/gate-review.md only
Agree one field/interface contract before dependent writes.
Coordinator alone owns integration and shared metadata.
Reuse Git snapshot as dated evidence, then recheck exact current write scope.
No active configs, credential copying, installs, login, runtime launch,
paid work, restart, commit or push in this offline contract wave.
Pass schema/reference/redaction/unknown-state checks and independent review.
Return exact outputs, checks, remaining choices and W2/W3 handoff.
```

This is a launch brief ready for a future assignment, not an automatic launch.
The [version-control workflow](version-control.md) and current machine/project
rules apply to every wave.
