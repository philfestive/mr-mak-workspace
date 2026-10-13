# Lane 18 - Version control for agent waves

Planning only, 2026-10-12. No Git writes, origin checks or other repository
inspection performed. Lane 17 owns the [readiness snapshot](17-git-readiness.md):
branch `workspace-customizations`, HEAD `c7c9fbfd0d9c4f961536392fbd50b71ff0b0c528`,
no staged files/index.lock at sampling, and mixed dirty Character Lab/Workspace
scopes. Its cached origin comparison is 0/0; live origin was not queried.
The Team Hub path is a Workspace Home junction; do not stage both aliases.
Reconcile fresh state before implementation. Authority: the replacement machine floor
in this conversation, [AGENTS.md](../../../../../AGENTS.md),
[organization process](../../../../../processes/workspace-organization.md) and
[T006 scope](../brief.md).

Use one named integration checkout, one index writer per checkout and one writer
per shared file. Parallelize independent source/report work. Serialize landing
and live configuration changes. External projects retain their own rules,
branches, boards and owners.

## Launch and ownership

Each package names task, repository, branch, base commit, checkout, exact writable
paths, shared-file/index owner, reviewer, checks and next owner. Workers may edit
their paths; only the integration owner stages or commits in a shared checkout.
Reserve registry, lockfiles, shared launcher code, skills mirrors and Workspace
metadata explicitly. Resolve overlaps before editing. Generated mirrors remain
part of the source owner's change; run the required skill sync when applicable.

For implementation, prefer a new named branch in an allowed worktree over
switching the concurrently dirty E: checkout. Example, not executed:

```powershell
$sourceRepo = "E:/Dev/mr-mak-workspace-main"
$baseSha = "<lane17-verified-full-commit>"
git --no-optional-locks -C $sourceRepo rev-parse "$baseSha^{commit}"
git -c maintenance.auto=false -c gc.auto=0 -C $sourceRepo worktree add -b "mcp/T006/registry-20261012" "C:/Dev/worktrees/mr-mak-workspace-main/registry-20261012" "$baseSha"
$repo = "C:/Dev/worktrees/mr-mak-workspace-main/registry-20261012"
```

Only create after confirming the intended path/branch is unused and work is
authorized. All ordinary worktrees use
`C:/Dev/worktrees/<repo>/<lane>-<YYYYMMDD>/` on named branches. The sole exception
is an explicitly recorded stable pin in DECISIONS.md with path, commit and owner.
Never use temporary folders, drive roots or protected paths. Report stale or
orphaned worktrees; leave them in place.

A new worktree contains the committed base, not current uncommitted plans or
other lanes' edits. Reference those inputs at their source; transfer only exact
reviewed, owned changes when required. Never copy the entire dirty checkout.

## Preserve the baseline

At package start and before landing, obtain fresh status and scoped differences:

```powershell
git --no-optional-locks -C $repo status --short --branch
git --no-optional-locks -C $repo diff --name-status
git --no-optional-locks -C $repo diff --cached --name-status
git --no-optional-locks -C $repo diff -- projects/mcp-setup/registry.json
git --no-optional-locks -C $repo ls-files --eol -- projects/mcp-setup/registry.json
```

Example paths above/below are proposed, not existing-file claims. Record dirty
and staged path ownership without copying private content. Preserve concurrent
changes. Stop an overlapping edit for its owner; never stash everyone's work,
switch the dirty checkout's branch or restore entire files to obtain cleanliness.
An index.lock blocks the operation; report it for its owner to remove.

## Review and land one result

A local checkpoint is saved editable source plus a concise handoff and check
evidence. It needs no commit. Planning does not authorize staging or commits.
When explicitly asked to commit, inspect candidate files for credentials,
personal data, runtime state and unrelated edits. Review the complete index;
if unrelated staged content exists, coordinate its owner rather than unstage it.

Stage only exact reviewed paths; never `add .`, `add -A` or `commit -a`:

```powershell
git -c maintenance.auto=false -c gc.auto=0 -C $repo add -- projects/mcp-setup/registry.json
git --no-optional-locks -C $repo diff --cached -- projects/mcp-setup/registry.json
git --no-optional-locks -C $repo diff --cached --check -- projects/mcp-setup/registry.json
git -c maintenance.auto=false -c gc.auto=0 -C $repo commit -m "mcp: add reviewed connection registry"
```

Check actual exit codes; failure stops the commit. For preserved CRLF only, add
`-c core.whitespace=cr-at-eol` to the scoped cached check. Include both rename
paths. New files are UTF-8 LF; preserve existing endings. One commit should
deliver one reviewable behavior or catalog result with its meaningful checks;
separate unrelated account/config rollouts. Re-read after other writers finish.

## Authority and recovery

Push requires the owner to name repository and branch, or an applicable D1 grant
for that lane's own branch. Never push main or force. Check origin read-only:

```powershell
$branch = "mcp/T006/registry-20261012"
git --no-optional-locks -C $repo ls-remote --heads origin "refs/heads/$branch"
git -c maintenance.auto=false -c gc.auto=0 -C $repo push origin "HEAD:refs/heads/$branch"
```

Do not fetch to measure. A necessary authorized fetch includes
`--no-auto-maintenance --no-prune --no-prune-tags --no-recurse-submodules`.
Commit, push, publication, MCP activation and restart are separate effects.

Recover uncommitted work by a reviewed inverse of owned hunks after rereading
current source. Recover a committed change with a new inverse commit when asked,
preserving history and unrelated work. Never rewrite history or sweep files.
In an isolated checkout that was clean before recovery, a named complete commit
can be inverted with:

```powershell
$revertSha = "<exact-owned-commit>"
git -c maintenance.auto=false -c gc.auto=0 -C $repo revert --no-commit "$revertSha"
```

Review resulting paths, run scoped cached checks, then commit only when asked.
Conflicts stop recovery; hand off the exact current state.
Forbidden: maintenance, gc, prune, worktree remove/prune, remote prune, repack -d,
reflog expire/delete, stash drop/clear, branch -d/-D/-M, tag -d, update-ref -d,
clean, reset --hard, force pushes, global Git config changes, repository moves,
deletions/re-clones and disk cleanup/archive/retirement/backup scripts.
Never create a repository named `backphil` or operate on protected machine paths.

Acceptance: lane 24 confirms exact scope, preserved baseline, appropriate checks,
secret-free staged content, commit/index ownership and explicit operation
authority. Next owner: coordinator, to integrate the workflow and assign the next
bounded package. Future implementation records its resulting revision.
