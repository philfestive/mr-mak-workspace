# Version control and reproducible setup

The review makes no Git writes. The repository's concurrent edits must remain
intact. A saved plan, local checkpoint, commit, push and installed application
are separate outcomes with separate authorization.

## What belongs in Git

Track reviewed connection aliases/schema, client-specific value-free templates,
source manifests, dependency lockfiles, supported-version records, project
skills, setup guidance and sanitized evidence. Keep client logins, OAuth stores,
private bindings, installed caches, `.env`, transcripts and runtime/job state in
their supported private local homes. Check actual tracking as well as ignore
rules; ignoring a path does not remove an existing tracked file.

Pin the implementation source revision/version separately from the observed
executable, installed plugin and running application version. A moving folder
named `current` or the highest cache directory is not a reproducible pin.
Record what was measured, when, and which consumer used it.

## Work across agents

Use disjoint source ownership and one Git index writer per checkout. A chat tab
shares the filesystem. Future implementation may use a named branch/worktree
when isolation is warranted; allowed worktrees are under
`C:/Dev/worktrees/<repo>/<lane>-<YYYYMMDD>/`. Do not move repositories or create
worktrees in temporary or drive-root locations. Report stale worktrees rather
than repairing or removing them. A fresh worktree starts from committed source;
these uncommitted planning inputs must remain referenced at their source or be
transferred as exact reviewed owned changes. Do not copy a whole dirty checkout.

Review each package's exact diff and checks before integration. Preserve
unrelated tracked, staged and untracked work. Never stage an entire checkout
from a dirty-tree count. If branch/index ownership overlaps, stop that write
and continue independently permitted work.

## Later commit and push gates

Commit only when the owner asks. Recheck repository, branch, HEAD and staged
payload; stage exact authorized paths; run the scoped cached whitespace check
and stop on failure. Use maintenance overrides on every Git write. Read-only
status/diff/log use `--no-optional-locks`.

```powershell
# Read-only examples; substitute exact owned files when reviewing a diff.
git --no-optional-locks -C 'E:/Dev/mr-mak-workspace-main' status --short
git --no-optional-locks -C 'E:/Dev/mr-mak-workspace-main' diff -- 'projects/mcp-setup/README.md'
```

For a separately authorized staging action, use the machine-prescribed prefix:

```text
git -c maintenance.auto=false -c gc.auto=0 -C <exact-repo> add -- <exact-owned-paths>
git --no-optional-locks -C <exact-repo> diff --cached --check -- <same-paths>
```

Preserve existing line endings. Apply a CRLF whitespace exception only to exact
paths that require it. Never leave an index lock; if one blocks work, report it
for its owner to remove. Do not run cleanup, maintenance, destructive reset,
force push or branch/worktree retirement operations.

Push requires the owner to name the repository and branch, or an applicable
standing grant for that lane's own branch, plus a fresh read-only origin check.
Never push `main` or force. Use `git ls-remote` to measure origin; do not fetch
merely to compare. A needed fetch must carry the machine's no-maintenance,
no-prune, no-tag-prune and no-submodule-recursion options.

## Version update practice

Measure the selected executable and package source first. Update a bounded
compatibility record and prepare the exact dependency/plugin/template change.
Use existing lockfiles and project-declared runtimes; Python uses `py -3.12` or
the declared tool venv. Godot uses the specified machine binary, with version
recorded during an authorized proof. A shared skill edit requires
`npm run skills:sync` and appropriate distribution checks.

Run focused synthetic checks before any client activation. Qualify a single
account/project, then expand only after its native-session checks pass. Prepare
packaged application changes for review; obtain restart permission before
interrupting active sessions. Do not execute existing cleanup/backup/retirement
scripts as an update mechanism.

The retained [Git readiness review](../../projects/mcp-setup/tasks/T006/reviews/17-git-readiness.md)
is a dated snapshot, not live origin or push authorization.
