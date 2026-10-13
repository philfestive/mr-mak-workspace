# Client, account and role rollout

T006 lane 14, 2026-10-12. Planning only. Adopt the confirmed shared core plus
project/role additions through small, verified batches. Preserve the owner's
provider, model, effort, permissions and budget; an account alias identifies a
configuration route, not a person or entitlement.

## Resolve scope before setup

Each work packet selects one tuple: client/distribution + executable/version +
account-home alias + role + absolute project cwd. Record effective configuration
sources, trust, duplicate server precedence, required capability IDs and runtime
owner. Launch, inspection, history and resume must use that same tuple. Store
actual home/account mappings privately; publish aliases and sanitized evidence.
See [Codex review](../../T005/reviews/01-codex.md),
[account boundaries](../../T005/reviews/09-credentials.md) and
[startup contract](../../T005/reviews/11-onboarding.md).

The shared core is machine rules, current Workspace entry points, repository
skills and already available source/browser tools. Host-managed tools stay with
their host. Official documentation MCP is a candidate selected separately per
client; this does not mean cloning all 17 default-home plugin declarations.
Project bindings stay in their owning C:, D: or E: repository. See
[target setup](../../../../../workspace/2026-10-12_mcp-setup/setup-plan.md).

## Selection and inheritance

| Route | Intended configuration scope and prerequisite |
| --- | --- |
| Default Codex | Retain `C:/Users/haslo/.codex/config.toml`; prepare an additive core diff and audit inherited project/plugin entries. |
| Prepared Codex homes | `.mrmak/accounts/codex-1` and `codex-2` each receive separately reviewed core definitions and required plugin prerequisites. Selecting `CODEX_HOME` does not import the default home. |
| Codex roles/projects | Use `<role>.config.toml` inside the selected home, explicitly selected with `--profile`; project transports/policy belong in that repository's trusted `.codex/config.toml`. |
| Prepared Claude Code homes | Select `claude-1` or `claude-2` through process-local `CLAUDE_CONFIG_DIR`. Resolve the native user/local MCP store before provisioning; use client-supported operations for its mixed state store. Shared project definitions belong in that project's `.mcp.json`. |
| Mr. Mak GUI | Preserve the current default route until a selected home is supported consistently by launch, scan and resume. The panel's service-level home cannot prove an independently launched account's tools. |
| Account wrappers | Existing wrapper selects a home, clears named provider variables, forces subscription authentication and launches from Workspace cwd. External-project cwd and Codex role selection need explicit support before reuse. Use this route only when subscription authentication is the owner's choice. |

Codex precedence is CLI overrides, trusted project layers, selected role file,
user configuration, then lower defaults. Project layers can override role
settings. Test the complete effective result; a role name does not restrict
loaded tools or authorize operations. Provider/authentication settings remain
outside project scope. Use current separate profile files, not legacy
`[profiles.name]` tables. [Official OpenAI configuration](https://learn.chatgpt.com/docs/config-file/config-basic),
[advanced configuration](https://learn.chatgpt.com/docs/config-file/config-advanced).

Claude Code resolves duplicate MCP names as local, project, then user, taking
the entire winning server definition. Project approval remains account-specific;
Desktop extensions/connectors are a separate route. Never import Desktop auth
or copy either client's account files, caches or plugin installation receipts.
[Claude MCP](https://code.claude.com/docs/en/mcp),
[alternate home settings](https://code.claude.com/docs/en/settings).

Optional routes wait for an explicit client choice:

- Cursor: user `~/.cursor/mcp.json`, project `.cursor/mcp.json`, Cursor-specific
  interpolation and native OAuth. Cursor is not currently a Mr. Mak agent entry.
  [Cursor MCP](https://cursor.com/docs/mcp).
- Kimi: establish installed distribution first; older `.kimi` and newer
  `.kimi-code`/`KIMI_CODE_HOME` routes require different adapters.
  [Client review](../../T005/reviews/02-other-clients.md),
  [Kimi Code MCP](https://moonshotai.github.io/kimi-code/en/customization/mcp.html).
- OpenCode: select the installed major; v2 uses `mcp.servers` and replaces whole
  duplicate server objects. Preserve supplied provider/model config and Mr. Mak's
  observer injection. Native verification is required while inspector coverage
  is absent. [OpenCode v2 MCP](https://dev.opencode.ai/v2/docs/mcp-servers/).

## Dependency-ordered rollout packets

1. **Prepare:** catalog/template/version owners deliver reviewed secret-free
   templates, selected IDs and exact private binding targets. Account-route owner
   supplies the launch/inspection contract. Independent reviewer checks schema,
   duplicate winners, ignored storage and environment isolation with fixtures.
2. **Pilot:** owner selects one existing client/home/project. Configuration writer
   changes only its named user/project/profile files; validator owns sanitized
   evidence. Native initialization, expected tools and a bounded read operation
   must pass in that exact tuple before expansion.
3. **Expand:** repeat separately for the two Codex and two Claude homes, then one
   project/role at a time. Reuse definitions, never credentials. Serial Godot
   checks remain with the qualified runtime owner; creative checks retain budget.
4. **Optional clients:** enable only selected Cursor/Kimi/OpenCode packets after
   their adapters and native-version checks pass. Keep unsupported UI states
   explicit. Coordinator updates authoritative status and onboarding links.

Launch brief: name the tuple, exact allowed files, baseline/template versions,
required tools, safe verification call, reviewer and next owner. Distinguish
prepared, configured, inspector-checked and native-verified outcomes. Recheck
after any tuple/config/version change. Missing auth, trust or dependency records
the smallest follow-up; no account substitution. Install, sign-in, activation,
restart and external-project writes require their specific authorized follow-up.
No such operation occurred in this review.
