# Lane 09: Credentials, accounts and authorization

Reviewed 2026-10-12. Read-only source review; no secret files, logs, credentials, account identities or live connections were inspected. Recommendations below are proposals, not implemented controls.

## Observed boundaries and gaps

The repository already excludes .env variants, common authentication/token files and .mrmak from Git. AGENTS.md requires empty values in .env.example and keeps account logins, transcripts, runtime state and job receipts private. Ignore rules do not remove previously tracked files or identify secrets pasted into ordinary documents. [Sources: AGENTS.md](../../../../../AGENTS.md), [.gitignore](../../../../../.gitignore), [sharing guidance](../../../../../docs/sharing.md).

The MCP inspector deliberately publishes URL origin, executable basename, source paths, missing environment names and header names rather than values. Malformed configuration and connection failures return fixed messages; HTTP redirects are rejected. Credential-sensitive fingerprints remain in memory and invalidate previous checks when configuration changes. Existing tests cover several redaction and invalidation cases; this lane read their code without running server fixtures. [mcp.mjs, lines 140-156 and 185-202](../../../../../desktop/service/mcp.mjs), [mcp.test.mjs](../../../../../desktop/service/test/mcp.test.mjs).

Two existing implementation details need explicit treatment before a claim of account isolation:

- childEnvironment starts with all process.env. Its .env import permits every MRMAK_MCP_* value and removes a short list of host identity/token keys. Consequently ambient provider keys can reach worker terminals, and prefixed MCP secrets are not limited to the selected connection. The current test establishes limited project-file forwarding, not isolation from ambient secrets. [agents.mjs, lines 87-99](../../../../../desktop/service/agents.mjs).
- Sessions supplies the service repository to childEnvironment even when a terminal uses another working directory. Session metadata contains no account/profile selector. The inspector similarly selects one service-level CODEX_HOME and CLAUDE_CONFIG_DIR. A scan cannot establish what every independently launched account/profile sees. [sessions.mjs, lines 18-20 and 125-138](../../../../../desktop/service/sessions.mjs), [mcp.mjs, lines 30-36](../../../../../desktop/service/mcp.mjs).

Inspector HTTP checks use configured headers; this implementation does not supply an OAuth authProvider or import a CLI OAuth store. Its agent-auth result therefore cannot establish that native client authentication is absent or broken. Authenticate and verify OAuth in the selected client/account, preserving that client-owned store. Do not substitute an API key or copy refresh tokens. [mcp.mjs, lines 185-202](../../../../../desktop/service/mcp.mjs).

## Proposed two-part data contract

Track a versioned registry and value-free client templates. Keep machine paths, identity mappings and credentials in a separate private local binding file outside the tracked registry. Existing .mrmak is ignored, but new storage locations must be checked before use. Use stable aliases such as codex-primary, not emails or copied login records.

Each tracked connection record should require:

| Field | Type and meaning |
| --- | --- |
| id, client, profileRef | Strings; uniqueness is client + profileRef + projectRef + id. |
| scope | Enum: user, project, plugin, managed. |
| projectRef, ownerRef | Stable project and runtime/configuration owner identifiers. |
| sourceRefs | Array of source aliases, scope, precedence and effective flag. |
| transport | Enum: stdio, http, sse, host-managed. |
| endpointOrigin | Sanitized origin or null; private/local hosts may use an alias. |
| auth | Object: kind none/env-header/bearer-env/oauth/client-managed/unknown; envNames array; headerNames array; credentialStoreRef alias or null. |
| configuredState | Enum: absent, present, disabled, missing-prerequisite, unverified. |
| validation | Object: method, state, client/profile/project refs, checkedAt UTC, evidenceRef; no credentials or raw responses. |
| authorization | Object: taskRef, allowedActions array, allowedProjectRefs array, runtimeOwnerRef, explicit restart permission or null. |
| nextAction | Concrete bounded step and responsible owner. |

Private bindings resolve profileRef to the exact CLI home, projectRef to a root, sourceRefs to actual paths and credentialStoreRef to an existing native store or local environment source. Environment mappings contain variable names and target header names; tracked templates contain placeholders or empty values only. Never create a unified authentication home or merge account stores. Reuse of a configuration pattern does not imply reuse of a credential or account.

## Redaction rules

Allowlist exported fields above. Never export .env content, command arguments, full URLs, URL userinfo/path/query/fragment, header values, OAuth tokens, cookies, signed downloads, raw error bodies, transcripts or job receipts. Keep credential-derived fingerprints private. Review names and source paths too: they can disclose account identities, tenant names or private locations even without tokens. Malformed inputs produce a fixed error category. Treat presence, configured state, inspector connection and native-client tool availability as separate facts.

For a future launcher change, resolve environment per selected profile/project/connection using an explicit non-secret baseline and required variable names; preserve only the selected native account home. Do not silently change the current launcher while active sessions exist.

## Rollout checks and authority

1. Resolve each profile alias and owner without opening authentication files. Check Git tracking/ignore status for selected local artifacts; review actual publish candidates for pasted credentials.
2. Use synthetic fixtures to verify no header, environment, argument, URL or error-body value reaches registry, UI, reports or diagnostics. Include two account homes, two project roots, and an unrelated ambient key; verify only requested connection values reach its child.
3. Correlate the inspector scan and native-client check to the same client, profile and project. Record OAuth-native checks separately; invalidate evidence when any binding changes.
4. Apply configuration only to named authorized targets after review. This request authorizes organizational review, not installation, login, activation, account migration, paid calls, restart or external project writes. Other repositories retain their own AGENTS.md, boards and runtime owners.

Organization changed during review. Current entry points are [Workspace Home](../../../../../workspace/2026-10-12_workspace-home/overview.md) and [workspace-organization.md](../../../../../processes/workspace-organization.md); the owner is a solo developer and these are temporary review lanes. No personal account choice or live authentication success is asserted.
