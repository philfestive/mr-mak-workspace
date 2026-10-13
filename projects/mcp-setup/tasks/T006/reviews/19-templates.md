# Secret-free client template contract

Lane 19, T006; planning only, 2026-10-12. Build inert templates and a deterministic
preparation tool for shared core plus selected project/role connections. Active
configuration and authentication remain client-owned; this report changes neither.

Working folder: `E:/Dev/mr-mak-workspace-main`. Use explicit workdir, literal
Windows paths, UTF-8 and LF; preserve existing endings. No installs, server
launches, sign-ins, restarts, paid operations or Git writes belong to this package.

## Inputs and ownership

[Lane 16](16-registry-versioning.md) owns catalog, pins, schemas and aliases.
[T005 Codex](../../T005/reviews/01-codex.md),
[other clients](../../T005/reviews/02-other-clients.md),
[plugins](../../T005/reviews/06-plugins-skills.md),
[creative routes](../../T005/reviews/08-creative.md) and
[credentials](../../T005/reviews/09-credentials.md) establish the boundaries.

One implementation writer owns templates, adapters and generator code. Lane 16
reviews references; lane 20 reviews validation; the configuration owner later
reviews an exact target/file proposal. The coordinator alone edits shared
metadata. External projects retain their files, rules and runtime owners.

## Preparation contract

Inputs: validated catalog/pins, selected connection/client/profile/project tuple,
adapter version and reviewed private binding references. Reject unknown aliases,
unreviewed paths, ambiguous precedence, duplicate effective server names,
unsupported transport/auth combinations and missing prerequisites.

Illustrative template metadata, never an active client configuration:

```json
{
  "templateVersion": "1.0.0",
  "connectionRef": "<REVIEWED_CONNECTION_ID>",
  "clientRef": "<REVIEWED_CLIENT_ALIAS>",
  "profileRef": "<REVIEWED_PROFILE_ALIAS>",
  "projectRef": "<REVIEWED_PROJECT_ALIAS>",
  "pinRef": "<REVIEWED_PIN_ID>",
  "adapterRef": "<CLIENT_SCHEMA_AND_ADAPTER_VERSION>"
}
```

Templates contain placeholders, required variable names and reviewed public
endpoints only. Private bindings resolve machine paths and client-owned store
references; they never copy login files or contain token values. The generator
does not read credentials or interpolate secret values. Native adapters emit
supported environment references; unsupported references stop preparation.

Default operation validates without writes. Explicit preparation produces an
ignored private bundle with candidate fragments and a redacted review manifest:
alias tuple, input revisions, adapter/schema versions, target source alias,
hashes and unresolved requirements. It never invokes clients, probes URLs,
overwrites active files or grants project trust. Stable inputs produce identical
bytes; volatile timestamps stay outside content hashes. Preserve unrelated
settings during later separately scoped application; detect target drift first.

## Client adapters and versions

Each adapter records its own version, client distribution, tested client versions,
schema family, supported scopes/auth/variable syntax and dated official source.
An observed executable version is inventory evidence, not a compatibility pin.

| Adapter | Required native boundary |
| --- | --- |
| Codex | TOML `[mcp_servers.<id>]`; separate user/project targets. Role overlays use `<role>.config.toml` in the selected home, explicitly selected by the launcher. No legacy profile-table generation. [Official MCP](https://learn.chatgpt.com/docs/extend/mcp?surface=cli), [profiles](https://learn.chatgpt.com/docs/config-file/config-advanced). |
| Claude Code | JSON `mcpServers`; project `.mcp.json` differs from user/private-local scopes. Emit explicit supported transport fields. Claude Desktop needs its own adapter. [Official schema](https://code.claude.com/docs/en/mcp). |
| Cursor | JSON `.cursor/mcp.json` or selected user scope; preserve `${env:NAME}` and `${workspaceFolder}` through its own adapter. Do not reuse another client's expansion rules. [Official interpolation](https://cursor.com/docs/mcp). |
| OpenCode, optional | Separate V1 `mcp` and V2 `mcp.servers` adapters. Block until installed distribution/version and scope are established. See T005 other-clients evidence. |
| Kimi, optional | Distinguish `kimi-cli` from `kimi-code`, their homes/overrides and bearer field names. Block until distribution/version is established. See T005 other-clients evidence. |

Current fal generation uses Streamable HTTP/OAuth at
`https://mcp.fal.ai/mcp-relay`, without an authorization header. Keep its
documentation-only route separate. [Official fal guide](https://fal.ai/docs/documentation/setting-up/mcp).
Historical `/mcp` bearer templates remain labeled legacy, excluded from new
defaults; their compatibility is unknown. Python `FAL_KEY` is a separate route.

Exclude host-managed browser/native-pipe/imagegen wiring and installed caches
from generated transports. Plugin-owned servers retain package transport;
generate only supported client policy, avoiding a duplicate direct server.

## Proposed paths and acceptance

Proposed new paths: `projects/mcp-setup/templates/`,
`scripts/mcp/generate-config.mjs`, `scripts/mcp/adapters/`,
`desktop/service/test/fixtures/mcp-templates/` and
`desktop/service/test/mcp-templates.test.mjs`. Private proposals use lane 16's
`.mrmak/mcp/<machineAlias>/bindings.json` and `prepared/<taskRef>/` beneath that
machine folder. Verify ignored/untracked status before creating private files.

Acceptance cases: deterministic JSON/TOML parse and round trip; two profile
homes/two project roots stay distinct; unsupported version fails closed; literal
Windows spaces/brackets and native variable syntax survive; duplicate/direct
plugin collision fails; missing bindings cannot activate; synthetic secret
sentinels never enter artifacts, diagnostics or manifests; host-managed entries
produce no transport; target drift prevents application.

Keep starter-distribution tests enforcing empty `.mcp.json` and empty
`.env.example` values. [Current distribution check](../../../../../scripts/check-template.mjs).
Create a separate personalized-runtime gate; it requires authorized native-client
discovery and a bounded read-only call in the exact account/project. Offline
template success never establishes authentication or live readiness.

Launch brief: implement only these tracked template/generator/fixture paths after
lane 16's contract is accepted; use existing dependencies and synthetic inputs.
Return offline results to lane 20, then hand the reviewed private target proposal
to the configuration owner. No active configuration or skill edits are included.
