# Other MCP clients and transfer boundaries

Reviewed 2026-10-12. Lane 02 owns this report only. Findings distinguish local
source observations, documented client behavior, and recommendations. No client
configuration, credential store, connection, installation or running session was
changed.

## Observed in Mr. Mak

Mr. Mak launches independent **Claude Code, Kimi and OpenCode CLIs**, plus Codex
and a shell. Claude Desktop and Cursor are not launchable agent entries.
Cursor appearing in the inspector does not create a Cursor agent. See
[agents.mjs](../../../../../desktop/service/agents.mjs).

The inspector reads Claude Code user/project/local scopes and installed plugin
metadata, Cursor user/project files, and Kimi paths described below. It does not
read Claude Desktop configuration, cloud-account connectors, Cursor extension
registrations or OpenCode configuration. See
[mcp.mjs](../../../../../desktop/service/mcp.mjs).

Known project-path checks found `.mcp.json` with **zero server definitions**.
No `.claude/settings.json`, `.claude/settings.local.json`, `.cursor/mcp.json`,
`.kimi-code/mcp.json`, `opencode.json`, `opencode.jsonc`, or equivalent
`.opencode/` config files were present. These checks say nothing about user,
account or remote configuration; other inventory lanes own those findings.

Chats launch with their selected working directory. Environment preparation
reads the Workspace repository's `.env` and forwards explicitly named
`MRMAK_MCP_*` values, while retaining the parent process environment. Thus an
external project's own `.env` is not automatically loaded by this preparation.
See [sessions.mjs](../../../../../desktop/service/sessions.mjs) and
[agents.mjs](../../../../../desktop/service/agents.mjs).

## Documented scope and authentication differences

| Client | Configuration and transfer behavior |
| --- | --- |
| Claude Code | User definitions are in `~/.claude.json`; private local definitions are keyed there by project path; team definitions use project-root `.mcp.json`. Local overrides project, which overrides user. Project trust/approval affects loading. Remote OAuth and cloud-account connectors are separate from file definitions. [Official MCP reference](https://code.claude.com/docs/en/mcp) |
| Claude Desktop | Legacy Windows JSON is `%APPDATA%/Claude/claude_desktop_config.json`. Current Desktop also uses installed extensions and their settings. Neither is automatically imported by Mr. Mak's Claude Code terminal. [MCP quickstart](https://github.com/modelcontextprotocol/docs/blob/main/quickstart/user.mdx), [Desktop extensions](https://support.claude.com/en/articles/10949351-getting-started-with-local-mcp-servers-on-claude-desktop) |
| Cursor | Uses user `~/.cursor/mcp.json` and project `.cursor/mcp.json`; project definitions override matching user names. Supports OAuth and extension registration. Its variable syntax includes `${env:NAME}` and `${workspaceFolder}`, distinct from Claude expansion. [MCP reference](https://cursor.com/docs/mcp), [scope precedence](https://prod.cursor.com/help/customization/mcp) |
| Kimi | Official documentation has two distributions: `kimi-cli` documents `~/.kimi/mcp.json` and explicit `--mcp-config-file`; `kimi-code` documents `~/.kimi-code/mcp.json` or `KIMI_CODE_HOME`, plus working-directory `.kimi-code/mcp.json` taking precedence. Choose the installed distribution before changing paths. Newer docs support OAuth login and `bearerTokenEnvVar`. [CLI reference](https://github.com/MoonshotAI/kimi-cli/blob/main/docs/en/reference/kimi-command.md), [Code MCP reference](https://moonshotai.github.io/kimi-code/en/customization/mcp.html) |
| OpenCode | Uses its own JSON/JSONC configuration, global `~/.config/opencode/opencode.json(c)` and project sources. V1 places servers directly under `mcp`; V2 uses `mcp.servers` and changes field names/discovery. Remote OAuth belongs to OpenCode. [V1 MCP](https://opencode.ai/docs/mcp-servers/), [V1 config](https://opencode.ai/docs/config/), [V2 MCP](https://dev.opencode.ai/v2/docs/mcp-servers/), [V2 config](https://dev.opencode.ai/v2/docs/config/) |

Claude Code's documented Desktop import command is supported on macOS and WSL,
so do not prescribe it as a native Windows migration. Some claude.ai connectors
can appear automatically with subscription authentication; this is an account
route, not a copy of Desktop's local servers. [Claude MCP reference](https://code.claude.com/docs/en/mcp)

## Proposed architecture and gaps

Maintain one secret-free capability catalog with server identity, owner project,
transport, pinned dependency, intended clients/versions, variable names and
verification evidence. Produce client-specific configurations from reviewed
templates. Keep a small user-level core and project/role-specific tools in their
own scopes. Existing projects stay in their working folders; drive letters do
not define MCP availability. OAuth sign-ins remain in each client's account
storage; do not copy token caches between agents.

The inspector needs version-specific adapters before it can be authoritative:

- Its Kimi user path is `~/.kimi/mcp.json`; it does not honor the newer
  `KIMI_CODE_HOME` user path. Whether this affects the installed CLI is unverified.
- Its expansion regex implements `${NAME}`, not Cursor's `${env:NAME}` or
  `${workspaceFolder}`; its bearer field uses snake_case, not newer Kimi's
  `bearerTokenEnvVar`.
- It infers HTTP from `url`; current Claude Code documentation requires an
  explicit transport `type`. Inspector readiness can therefore disagree with
  native loading.
- OpenCode coverage remains intentionally absent. Mr. Mak appends a versioned
  observer to inline OpenCode config while preserving supplied settings; this
  does not translate another client's MCP definitions. See
  [opencode.mjs](../../../../../desktop/service/opencode.mjs).

These are implementation proposals, not configuration edits made in this review.

## Concrete setup and acceptance steps

1. Record each actual executable, version/distribution, working directory,
   effective configuration home and override-variable presence without values.
2. Select capabilities from the catalog for that project and agent role. Check
   duplicate server names, client schema, executable availability, absolute
   Windows paths and project binding before preparing secret-free templates.
3. Review the exact files and scopes to activate. Authorize required installation,
   sign-in and application restart separately; preserve active sessions.
4. After activation, use each native client's MCP status interface and a bounded,
   read-only tool call. Record connection time, exposed tools, selected project
   and evidence. A listing command may start servers or contact remote endpoints,
   so it is not part of this offline review.
5. Compare native results with Mr. Mak. Pass only when the intended tools work in
   the intended account/project and the inspector reflects its supported scope.
   Mark unsupported sources, stale captures and unchecked connections explicitly.

Installed client versions, live authentication, remote connectors and actual
tool availability remain unverified here. Local checks verified only named
project files and application source; no broad drive scan was performed.
