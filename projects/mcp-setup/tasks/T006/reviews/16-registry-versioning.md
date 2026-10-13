# Registry, private bindings and version history

Lane 16, T006; planning only, 2026-10-12. Build one portable, secret-free
connection contract with private machine resolution. This implements the
confirmed shared core plus project/role tools preference without merging accounts.
No configuration, authentication, installation or live readiness changed.

## Inputs and canonical files

[Credentials review](../../T005/reviews/09-credentials.md) establishes the
two-part contract; [validation review](../../T005/reviews/10-validation.md)
identifies incomplete account/plugin selection and cache invalidation.
[Plugin review](../../T005/reviews/06-plugins-skills.md) distinguishes source,
installed cache, skill discovery and callable tools. The current
[organization process](../../../../../processes/workspace-organization.md)
owns routing; older transition claims in
[onboarding review](../../T005/reviews/11-onboarding.md) are historical inputs.

Proposed implementation files, all currently proposals:

| File | Sole purpose |
| --- | --- |
| `projects/mcp-setup/registry/catalog.json` | Intended connections, aliases, shared core and role/project selections |
| `projects/mcp-setup/registry/pins.json` | Reviewed source, plugin, client and runtime requirements |
| `projects/mcp-setup/registry/schemas/catalog.schema.json` | Portable catalog structure |
| `projects/mcp-setup/registry/schemas/pins.schema.json` | Reproducibility contract |
| `projects/mcp-setup/registry/schemas/bindings.schema.json` | Private resolution structure, without populated bindings |
| `projects/mcp-setup/registry/schemas/observation.schema.json` | Redacted evidence contract |
| `projects/mcp-setup/registry/README.md` | Field definitions, migration and update routine |
| `projects/mcp-setup/templates/` | Inert client-specific templates; lane 19 owns their contract |
| `.mrmak/mcp/<machineAlias>/bindings.json` | Ignored local paths, profile homes, identity/credential-store references |
| `.mrmak/mcp/<machineAlias>/observations.jsonl` | Ignored append-only local checks, invalidations and private fingerprints |

The catalog is the only intended-state source. Existing client configurations
remain the effective runtime sources. Workspace Home links this contract; its
Tasks remains the only local task board. Never export private bindings with a
card, package or source checkout. Verify ignored and untracked status before
creating private files; ignore rules alone do not protect already tracked files.

## Schema and pins

Use JSON Schema with required fields, closed objects, bounded strings, explicit
null/unknown values and UTC timestamps. Separate `schemaVersion` from catalog
revision and individual entry revision. Stable connection IDs never depend on
drive letters. Unique selection key: connection + client + profile alias +
project alias. Machine/profile/project/source/store aliases resolve only locally;
aliases must not encode emails, tenants or personal paths.

Each entry declares purpose, configuration owner alias, scope, transport,
source-layer aliases and precedence, template/pin references, prerequisite
names, auth kind and required variable/header names. Intended selection and
enablement are explicit. Allowed capability categories describe a role's needs;
they grant no operational authority. Task authorization remains in the current
request and owning project's rules.

Pins record source repository/reference, immutable revision or artifact checksum,
manifest version, licence and compatibility constraints. Distinguish desired pin
from observed installed/host-selected version. Unsupported pins are `unknown`,
not inferred from the highest cached directory. Do not use floating `latest`
as proof. Host-managed connectors require a native-host identifier and documented
version limits rather than copied host wiring.

Illustrative synthetic record; placeholders carry no machine or credential values:

```json
{
  "id": "example.reader",
  "clientRef": "client.example",
  "profileRef": "profile.example",
  "projectRef": "project.example",
  "sourceRefs": ["source.example"],
  "pinRef": "pin.example",
  "templateRef": "template.example",
  "intended": { "selected": false, "enabled": false },
  "auth": { "kind": "unknown", "envNames": [] }
}
```

## Observations, drift and history

Keep discovery, effective configuration, prerequisites, inspector connection,
native-client exposure, binding and authorization as separate evidence dimensions.
Each observation records alias tuple, method, UTC check time, result
(`pass`, `fail`, `unknown`, `not-applicable`), limits and evidence reference.
An inspector handshake cannot establish native-account authentication or project
binding. Historical success never becomes current readiness automatically.

Invalidate dependent observations after client/profile/project/source/precedence,
pin, executable/script content, selected plugin, effective environment or auth
changes. Also expire time-sensitive results and session-bound results when their
session ends. Keep secret-derived fingerprints private; record only a fixed drift
category in shareable summaries. Invalidation appends a superseding event and
reason; it does not erase history or silently overwrite failure. Export only
reviewed, dated, allowlisted summaries to reports, never raw runtime state/logs.

Schema migrations require an explicit versioned transformation, fixture validation
and retained old evidence. No automatic account-store migration or activation.

## Implementation handoff and future-agent routine

Dependency: reconcile T005 evidence and approve the alias/profile/template
contract first. One registry writer owns the tracked files; a selected machine's
configuration owner owns private bindings. Lane 19 reviews template references;
lane 20 reviews validation and drift cases. The coordinator owns registration.

Launch brief: implement the listed tracked schemas/catalog/pins/README only;
use synthetic fixtures; do not populate private bindings or alter active configs.
Check schema/version compatibility, unique IDs, resolving references, precedence,
pin consistency, missing/unknown evidence, secret rejection, two-profile separation
and drift invalidation. Include URL/header/env/argument/error-body sentinel leaks
and unchanged-path executable changes. Use existing dependencies; missing
validators remain an explicit dependency. Reviewer checks exact changed paths.

Future agent: read current task/rules, select aliases, compare intent with the
exact effective sources, inspect freshness and exposed tools, submit redacted
evidence to the catalog writer, then update only owned sources. Record the
smallest next action for unknowns. Configuration changes, installs, sign-in,
restarts, commits and pushes retain their own authorization requirements.
