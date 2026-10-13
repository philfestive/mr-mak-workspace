# Staged rollout and recovery

T006 lane 23, 2026-10-12. Planning only: no active configuration, credential,
installation, process, network or Git changes were made. The confirmed design
is shared core tools plus project/role tools. Future execution requires a bounded
owner assignment; this report supplies launch gates, not standing authorization.

## Canary and evidence contract

Select one existing account alias, one client, one absolute project root and one
read-only connection. The owner chooses the alias and project; do not infer an
account identity or use another project's Godot binding. Record selected client
executable/version, account-home reference, cwd, role, effective configuration
sources, expected capability and config/runtime owner. Other accounts remain
outside that implementation package.

The current desktop launch and inspector are service-scoped; prepared account
folders do not establish per-chat selection. An existing wrapper route can be
the first qualified route, but cannot prove desktop parity. See [Codex](../../T005/reviews/01-codex.md)
and [application findings](../../T005/reviews/05-mrmak.md).

Before applying anything, record the exact selected non-secret keys and their
previous presence/value, an inverse patch, owner, source references, and private
preimage/postimage digests. Keep credential-derived digests private. Do not
export whole configuration files, arguments, URLs, environments or authentication
stores. Preserve unrelated bytes and embedded secrets without touching them;
if a safe bounded edit cannot preserve them, stop for the configuration owner.
This requires no backup script or bulk file copy. Re-read the selected preimage
immediately before applying; any unexpected difference invalidates the package.

## Dependency-ordered rollout gates

These local rollout labels can be mapped onto the consolidated wave plan.
Every exit needs a dated, sanitized result and reviewer disposition.

| Wave / owner | Entry gate | Work and exact exit gate | Failure resumes with |
| --- | --- | --- | --- |
| R0: coordinator + target owner | Owner names canary client/account/project, allowed actions and files; local rules and live ownership checked | Freeze bounded scope, expected tools and preimage contract. Exit: one writer per target, reviewer assigned, no unresolved binding or ownership ambiguity | Coordinator resolves missing assignment; external repository owner resolves its guard |
| R1: template/version owner | R0 passes; inventory and pinned source references available | Prepare value-free templates and inverse patch offline; verify syntax, paths, declared prerequisites and version references without launching servers. Exit: reviewer accepts scoped diff and recovery record; missing dependencies are explicit | Template/version owner fixes package; installation remains a separately authorized step |
| R2: application owner + reviewer | R1 passes; any required launcher/inspector changes are assigned | Prepare account/project parity, environment isolation and runtime-provenance changes; verify with synthetic fixtures. Exit: selected home/cwd/executable agree across launch, inspection, resume and history; sensitive output stays redacted; disabled/managed entries retain policy | Application owner repairs code; coordinator retains current application session |
| R3: configuration owner | R1 passes; R2 passes for desktop route; separately authorized setup names exact targets | Apply only selected non-secret definitions; re-read and compare intended postimage; leave credentials in their native store. Exit: effective layers/pins/trust match canary manifest, inverse patch remains applicable | Configuration owner inspects drift and applies bounded recovery |
| R4: native qualification owner | R3 passes; prerequisite/auth actions authorized; required application restart permission obtained after preparation | Qualify the intended client route. Exit: current native connection, expected identity/binding and permitted read-only capability agree with the canary manifest; inspector evidence remains separately labeled | Native-client owner handles connection/auth; runtime owner handles project binding |
| R5: coordinator + next target owner | R4 passes and independent reviewer accepts evidence | Expand one account/project batch at a time, repeating R0-R4. Exit: each target has its own qualification and future-agent handoff; no inferred global readiness | Failed target's owner; coordinator pauses dependent batches |

## Restart, stop and recovery rules

Prepare application changes and checks first. Present the exact built artifact,
affected application/session, remaining qualification and restart impact before
asking restart permission. A built update is not an installed update. Preserve
active chats until permission; a deferred restart leaves native qualification
outstanding. Repeat identity checks after reconnect, version or binding changes.

Stop dependent work on source drift, account/project mismatch, unexpected tools,
secret disclosure, unauthorized effects, failed validation, missing prerequisite
or ambiguous process ownership. Mark affected evidence unknown; preserve the
sanitized failure and exact next owner/action. Do not retry an authentication
denial through another account or revive a disabled legacy entry.

Recover only owned non-secret keys with the reviewed inverse patch after the
current bytes match the recorded postimage. Concurrent drift requires owner
review; never overwrite the whole file, reset Git/configuration, delete caches,
copy login stores or execute backup/cleanup/retirement scripts. Requalification
is required after recovery; prior evidence cannot establish a new session.

Godot qualification belongs to its named runtime owner: one Godot process,
supported project-bound observer calls, and preserved shared sessions. Retain
disabled Pilot artifacts and other legacy bindings until their owners assign
repair. [Godot ownership](../../T005/reviews/07-godot.md),
[credential boundaries](../../T005/reviews/09-credentials.md) and
[acceptance evidence](../../T005/reviews/10-validation.md) govern these gates.

Coordinator owns shared status, registration and final viewport/link checks.
Implementation, native connection and recovery exercises remain NOT_RUN.
