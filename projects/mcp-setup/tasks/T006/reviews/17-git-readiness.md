# Git readiness: exact E: repository

Lane 17, T006. Planning evidence only. The checkout contains several concurrent
scopes and is not ready for blanket staging. No staging, commit, push, fetch,
repair or configuration change was performed.

## Read-only snapshot

Status sampled at **2026-10-13 03:47:03 UTC** (2026-10-12 22:47:03 America/Chicago).
Concurrent writers continued afterward; counts are this snapshot, before adding
this report. Commands returned exit code 0 and used `--no-optional-locks`.

| Item | Evidence |
| --- | --- |
| Repository | `E:/Dev/mr-mak-workspace-main` |
| Git directory | `E:/Dev/mr-mak-workspace-main/.git` |
| Branch | `workspace-customizations` |
| HEAD | `c7c9fbfd0d9c4f961536392fbd50b71ff0b0c528` |
| Branch upstream | `refs/remotes/origin/workspace-customizations` |
| Cached tracking | HEAD and cached upstream have the same SHA; `rev-list --left-right --count HEAD...origin/workspace-customizations` returned `0 0` |
| Origin URL | `https://github.com/philfestive/mr-mak-workspace.git` |
| Separate upstream remote | `https://github.com/witnesstodark/mr-mak-workspace.git` |
| Index | Zero staged paths; all five tracked changes were unstaged |
| Index lock | Absent when checked at 03:45:33 UTC; this is not a persistent guarantee |

Both local `main` and cached `origin/main`/`upstream/main` point to the same SHA.
The remote named `upstream` is distinct from the current branch's tracking
upstream. Remote userinfo was filtered before output. No network query was
needed for planning; cached references do not establish current server state.

## Payload and ownership

Five tracked files are modified: `AGENTS.md`, `context/goals.md`,
`context/identity.md`, `context/preferences.md`, and `workspace/workspace.json`.
The first four belong to the Workspace organization scope; the registry is
shared metadata owned by its assigned coordinator. Its diff can contain several
tasks and must be reviewed by hunk before inclusion.

The 52 untracked pathname entries group as follows:

| Scope | Entries | Checkpoint treatment |
| --- | ---: | --- |
| MCP setup | 25 | Project README, T005/T006 briefs and current lane reports, plus three MCP card tabs; reconcile with the MCP coordinator |
| Character Lab | 9 | Independent project, validator and card files; leave to that scope's owner |
| Workspace organization | 18 | Two process files, four project/template files, two organization card tabs and ten Home/legacy alias entries; reconcile with that scope's owner |

`workspace/2026-10-12_team-hub` is a **junction** to
`workspace/2026-10-12_workspace-home`. Git lists five files through each spelling;
those ten entries are not ten independent documents. Use the canonical Home
paths and resolve intended alias packaging with the owning writer before staging.
Do not remove or move the junction as a Git readiness repair.

## Private-file boundary

[The root ignore rules](../../../../../.gitignore) match `.mrmak/`, `.env`,
`.env.*`, nested `auth.json`, `credentials.json`, `token.json`, `tokens.json`,
`.cache/`, `node_modules/`, virtual environments, Python caches and logs.
Representative `check-ignore --no-index -v` probes confirmed these rules;
`.env.example` is explicitly included. A tracked-filename scan found only
`.env.example` among those sensitive/cache patterns, and no matching private
credential or cache paths. No credential contents were read. Ignore rules and
filename checks do not prove secret-free content; selected payloads still need
content review.

## Proposed checkpoint gate

1. The coordinator settles the exact checkpoint purpose and records an explicit
   list of individual files. Include only completed, reviewed MCP deliverables;
   exclude Character Lab, unrelated organization work and duplicate junction
   spellings. Shared `workspace/workspace.json` and Home changes need the owning
   writer's reconciliation. Directory-wide staging and `add -A` are unsuitable.
2. Review every selected file/diff for personal data, credentials, unintended
   media and unrelated changes. Verify links/previews and preserve existing line
   endings. Recheck branch, HEAD, status and index lock immediately beforehand.
3. **Only after the owner asks for a commit**, one Git writer stages exact paths
   using `git -c maintenance.auto=false -c gc.auto=0 add -- <explicit paths>`.
   Review the actual staged diff and run
   `git --no-optional-locks diff --cached --check -- <those same paths>`.
   A failure stops the commit; apply `-c core.whitespace=cr-at-eol` only to
   preserved CRLF paths when needed. Include both paths of a rename.
4. Commit only that reviewed payload with the required maintenance-disabled
   prefix. Push remains a separate gate: the owner must name this repository
   and branch, or a valid lane-specific D1 grant must apply. Perform the required
   read-only origin check then; never push `main` or force.

No commit/push authorization exists in this conversation. Existing files remain
in place. Any future isolated worktree must be on a named branch under
`C:/Dev/worktrees/<repo>/<lane>-<YYYYMMDD>/`; only a DECISIONS.md-named stable pin
has the machine exception. No worktree creation or external-repository Git
inspection occurred, and no C:-restricted readiness helper was used on E:.

Sources: [live repository rules](../../../../../AGENTS.md),
[organization workflow](../../../../../processes/workspace-organization.md),
[T006 scope](../brief.md), and the owner's machine safety floor in this session.
The coordinator owns final registration and viewport review of this report.
