# Working notes

Keep short progress notes and check evidence here. Tasks owns current status;
Decisions owns choices. Larger work may link to a detailed note in its project.

## A useful note

```text
Date / task:
What changed and output paths:
Checks and actual results:
Open question or blocker:
Next action:
```

Routine tasks do not need a separate handoff document or another agent's review.
Keep credentials, raw transcripts, runtime state and private job receipts out
of versioned notes.

## Three-agent voice and fork review - 2026-10-13

Prepared **Settings -> Voice setup** and a **Set up voice** action from Talk to
Mak. The masked field saves the workspace key to the existing local .env;
Check voice setup reports presence without a paid request. A missing key is
checked before microphone access. Codex connection controls have their own
section, and completion notices belong to the current interaction rather than
reappearing every time the panel opens. A successful Codex login does not supply
or switch the voice API key. Text remains available without voice setup.

Three independent lanes reviewed voice recovery, workspace/UI reliability and
Git/fork readiness. Backend saves are serialized, atomic and preserve unrelated
environment settings; conflicting voice/login/save operations are guarded. Keys
are never returned in setup responses or saved in chat/client state. Failed
provider responses cannot echo credentials. No real key was supplied or changed,
no voice provider request was made, and live voice remains unverified.

Validation: the app build and scoped lint/whitespace checks passed. The full
service suite reports 117 tests: 114 passed, three platform/privilege skips and
zero failures. The maintained voice UI runner passed 16 wide/narrow views under
dark/light workspace settings, setup save/check, missing-key preflight before
microphone access, missed account-event recovery, notice dismissal/reopening,
account cancellation and preserved composer behavior. Zero page errors and zero
voice/provider requests. Inspected narrow Settings and wide Chats captures.
Local UI evidence: .cache/voice-ui-OkVBan/verification.json. This ignored receipt
is retained on this PC; the test runner itself is part of the checkpoint.

The new voice setup/recovery update is prepared in source and has **not yet been
installed**. The earlier browser sign-in update remains the verified installed
version. Installation needs a new owner-approved graceful restart. Next: apply
the verified bounded update, then enter the voice key in Settings and explicitly
start Talk to Mak. Presence checks do not establish key validity or live audio.

Git review verified origin philfestive/mr-mak-workspace and the branch
workspace-customizations against the live origin. The application checkpoint
and maintained Refiner sources are being prepared as exact path manifests;
linked companion files travel with the Home/registry so fresh clones have their
internal routes. The legacy team-hub junction remains on this PC but is ignored;
Git versions the canonical workspace-home files once. Personal machine paths in
retained source reports are identified metadata; no detected credentials or
account emails belong to the selected packet. Historical raw reference bytes
and their NOT ADOPTED status are preserved.

At the source-review checkpoint, all work was saved on local disk. **No commit
or push had occurred**, and the fork did not yet contain this setup. Commit requires the owner's explicit request;
push requires the named fork/branch authorization. Private .env, account data,
transcripts, .mrmak, .cache and job receipts are excluded. No repository or old
source folder was deleted, moved or cleaned.

Owner-approved delivery - 2026-10-13: the owner selected Install + commit/push
checkpoint. This authorizes the reviewed 122 app/Refiner files on
philfestive/mr-mak-workspace, branch workspace-customizations, and the tested
voice update with a graceful Mr. Mak restart. This is a bounded approval, not a
standing grant for other commits, pushes or restarts. The source review above
precedes delivery. Git history/the remote branch establish source publication;
the local install receipt establishes installed/runtime completion:
.mrmak/voice-setup-install-result-c29f702e-7b8c-4316-96d8-4f54834ee93a.json.
The helper checks exact runtime bindings, file hashes and eight saved conversation
identities, and cannot report complete with recorded conversation restore errors.
No voice key or live provider test is part of this installation.

## 2026-10-12 - T001: solo wording and link repair

The owner clarified that they are a solo developer and requested a single
source of truth. The display name is Workspace Home. The permanent roster was
replaced with a project directory; the existing filenames and card ID remain
valid. The former folder path is a junction to the same maintained source.
`processes/team-coordination.md` is a pointer to the current organization guide.
The existing MCP review task and its temporary assistant scopes are preserved.

Verification: all five tabs passed 30 browser previews across 1280, 768 and
390 px in dark and light themes. All 36 linked-document requests returned
the exact expected source content. The five legacy tab paths returned the same
source documents. Repository content checks passed. The narrow Home capture was
visually inspected. These are browser-preview and file checks; no active chat
was restarted.

## 2026-10-12 - T001: earlier organizing setup

Historical evidence for the earlier revision: repository content checks passed,
all five tabs rendered at 1280, 768 and 390 px in dark and light themes, and
24 relative-link requests succeeded with no browser page errors. At 390 px the
existing Hide menu control was used. Desktop overview and narrow task-board
captures were visually inspected.

Those checks apply to the earlier revision. The solo clarification replaces its
permanent-team assumptions and drops the proposed roster requirement.

## 2026-10-12 - T006: Character Lab setup

Delivered the pinned Character Lab card with Overview, Characters and Lessons.
`projects/character-lab/README.md` owns its contract;
`workspace/2026-10-12_character-lab/catalog.json` owns character/revision identity.
Home Tasks remains the only task board. Sources use stable per-character revision
folders; one integration writer preserves the independent T005 MCP work.

All 12 temporary read-only reviewers returned findings. Their synthesized
prior-run lessons are in the lab card; no C/D project files were changed or moved.
The independent final code review found and verified fixes for typed IDs and
stale catalog restoration after failed refresh. No permanent roster was created.

Checks: `node --test scripts/check-character-lab.test.mjs` passed 8/8;
`node scripts/check-character-lab.mjs`, `node scripts/check-template.mjs` and
`npm run build` passed. The real catalog correctly contains zero characters.
Browser checks covered 48 lab/Home tab views at 1280, 768 and 390 px in dark/light
themes, with 12 successful relative links and no page errors. Focused final-source
checks also passed filtering, refresh/failure recovery, catalog download and the
restricted mobile catalog fetch. Final desktop and narrow captures were inspected.
Evidence: `.cache/lab-ui-NOI8qb/checks.json` and
`.cache/lab-ui-S9zEXl/checks.json`; final captures are in the latter folder.
Preview services used isolated state, restored no chats and were closed afterward.
Final source checks passed for 11 lab/source files, 13 local links, LF and
whitespace. Eight final Home tab views confirmed the T006 integration and Done
status with no browser page errors.

The check verifies index coverage and recorded bytes; it is a manual handoff
check and does not make visual or engine approval decisions. Next: choose the
first character brief and expected result. Setup is Done; no paid generation,
installation, application restart, commit or push occurred.

## 2026-10-12 - T001: Refiner setup

The owner chose Refiner setup first and game selection afterward. The existing
Home card now has Intake and Build focus tabs, preserving its ID, folder and
earlier tab paths. Intake records exact source references; Build focus alone
owns implementation selection. The existing project/GDD templates are reused.

Updated the owner goals/preferences, agent entry point, organization process
and Mr. Mak guide for question rounds, selective source reuse and GDD/index/
schema definition before building. Other project tasks and history are preserved.

Verification: all seven Home tabs passed 42 browser previews at 1280, 768
and 390 px in dark and light themes. All 162 linked-document checks returned
the expected source content; legacy tab URLs still served the same documents.
Zero browser page errors occurred. Wide Home and narrow Build focus captures
were visually inspected. The source-based Mr. Mak startup orientation includes
the updated guide. Live voice behavior was not exercised. No source materials were
imported and no game GDD or product schema was claimed complete. The voice guide
is prepared; no voice API call, sign-in, restart or active-session replacement
was performed. A running voice session can read the current guide on request.

## 2026-10-12 - T005: MCP review and delivery waves

Two requested 12-agent waves delivered 24 reports. The owner confirmed shared
core plus project/role tools, then requested 20+ agents for accuracy. The
[plan](#/mcp-setup/3) has six gated implementation waves and
[30 bounded assignments](#/mcp-setup/4), peak 12 workers
plus the coordinator. Independent lane 12 passed source accuracy; lane 24 passed
the roadmap, ownership corrections and readable final mobile capture.

Eight MCP tabs are registered. Content checks verified UTF-8/LF and all selected
local references. Final preview covered 90 tab views (MCP8 + Home7, three widths,
dark/light), 49 successful HTTP links and zero page errors. Mobile checks require
the actual collapsed layout and at least 340 px report width; observed minimum
345.95 px. Root visually inspected desktop and mobile captures. Private evidence:
`.mrmak/mcp-review-proof/20261012-final/preview.json`. Preview's own browser and
Vite service closed afterward; existing applications and chats were preserved.

Git evidence is a dated local snapshot, not current origin proof or push
permission. Concurrent organization and Character Lab work was preserved.
No active MCP/auth configuration, installation, runtime control, paid work,
restart, staging, commit or push occurred. Only review/planning is Done.
Next: assign the exact W1 offline contract package; choose the canary client,
account/project and runtime owner before later native qualification.

## 2026-10-12 - Workspace navigation repair

Registered report links now use existing card/tab routes so navigation stays
inside Workspace. Raw source documents keep their source links. No app rebuild
or restart is required for these content changes. The owner prefers in-place
previews and is exploring grouped sub-tabs; true nested groups are a proposed
app change, not an implemented feature. In an isolated desktop-mode service
using the existing built UI, 15 actual clicks passed at 1280 and 390 px: correct
selected tabs and previews, same-window routes, no extra windows and no page
errors. No user chats started. The owned preview service and browser were closed.

Proposed main groups: Overview (current project and next question), Refine
(Intake, Questions, GDD), Define (Index, Schemas, Decisions), and Build (Tasks,
Results, Notes). Sub-tabs would display the same owning documents in the preview
below. This layout is a proposal, not a recorded owner selection or installed UI.

## 2026-10-12 - T006: Character Lab pipeline and style-depth refinement

All 72 distinct temporary review/explorer assignments informed this task:
36 pipeline/prior-run/peer-lane reviewers and 36 additional style/project-depth
explorers. Scoped E-drive authors returned files to one integrating writer.
No external source project was reorganized or promoted into a new game choice.

The same Lab card now has Overview, Characters, Lessons, Pipeline, Styles and
Directory. Reusable brief and round templates support 2D and 3D. Characters
reads one canonical catalog; Styles reads one sourced browse index. Four project
roots expand into 16 study/source scopes. Nine Arty working terms, one pixel
reference, retired Dusk and future edgy 2D remain distinct from production choices.
Bright/dark browse emphasis preserves plush_clay with its placement open.

The supplied art draft was copied byte-for-byte as reference input, preserving
NOT ADOPTED status and original relative links. Hash and incomplete package
closure are in [reference provenance](../../projects/character-lab/references/README.md).
External Arty records, D source packages and Godot consumers retain their owners.

The checker now binds actual parent bytes, immutable brief snapshots, editable
sources and receiver-specific delivery records. Independent evidence cannot be
a self-certifying control record. Verified delivery requires exact consumption
proof coverage for every declared export, including sprite sidecars.

Checks: 26/26 regression tests passed, real catalog/tree check passed at zero
characters, sample template check passed, and TypeScript/Vite build passed.
Browser verification passed 52 Lab/Home views at 1280/390 px in dark/light,
19 relative links and five actual desktop tab-navigation clicks, with no page
errors. Dynamic tests covered style/alias/history filters, exact raw download
hash, refresh failure/recovery, synthetic version media/prompt/choice/destination
views, and restricted mobile same-card JSON plus unavailable-source messaging.
Receipt: `.cache/lab-refinement-ui-GTOF68/checks.json`; captures were inspected.
The narrow Pipeline table was then simplified into readable stage/round lists;
the targeted release receipt records its final captures and Home status:
`.cache/lab-release-QR2R2p/checks.json`. It passed 19 source-file LF/whitespace
checks, 14 local source links, four final Pipeline/Home views and 15 additional
internal tab-route clicks, with no page errors. Sample cards remain intact.

Services used isolated state and restored no chats; their owned browsers and
preview services closed. No paid generation, installation, user-app restart,
commit, push or directory move occurred. T006 setup/refinement is Done. Next:
choose one actual project/subproject, subject and next output through the brief.

## T001 - Grouped Refiner containers and chat naming - 2026-10-13

Prepared the six desired Mr. Mak chat names in [Lane setup](#/team-hub/7).
The UI lane accepted the section/document contract and implemented the scoped
Topbar/types/stylesheet change. Integrated the existing Sources & Output packet
without copying its design answers; wrote the receiving receipt into its
macro-review coordination file. Other live lanes have not acknowledged a new
chat message. [Peer handoff](#/team-hub/12) records the receiving boundary.

Workspace Home uses Overview, Refine, Define and Build, with document sub-tabs
and one preview below. Character Lab, MCP and Sources & Output group their
existing reports in their own sections. Home indexes 0-6 and existing card IDs
remain unchanged. Reconciled incoming Sources links after its peer inserted
Performance; documented append-only registration to keep routes stable.

Verification: scoped ESLint, no-emit TypeScript, Vite build, template/media
closure and scoped whitespace checks passed. All 49 registered files exist;
57 registered document hash links resolve. Opened all grouped reports at
1280, 768 and 390px. Checked section defaults, remembered documents, real-link
back/forward, keyboard activation, internal links without popups, flat samples,
unknown/unassigned fallback and disabled empty sections. No page errors or
live chat launches. Wide/narrow dark and actual light captures were inspected.

Navigation/dark receipt: `.cache/refiner-sections-0OKcBh/verification.json`.
The original light-labelled captures used dark service settings; actual light
verification is `.cache/refiner-sections-3dMyjF/verification.json`, with 107
views and 44 interactions. Both isolated preview services and browsers closed.

A separate user-facing preview is open in Chrome at
http://localhost:3009/#/team-hub/5. The prepared build is local under
`.cache/refiner-sections-0OKcBh/ui/`; this is not an installed desktop update.
T001 remains Working for the live rename/update recorded in [Tasks](#/team-hub/2).
No application restart, agent termination, install, commit or push occurred.

## T001 - Codex connection refresh - 2026-10-13

Prepared Refresh Codex connection in Conversation and Settings. It shows the
account email/plan returned by the new app-server connection, creates a fresh
ephemeral coordinator thread, and keeps worker terminals and completed action
IDs. Busy/queued work and active voice reject refresh; duplicate refresh calls
share one attempt. New requests wait until the attempt finishes. Sign-out and
failed startup return actionable errors; service shutdown cannot spawn a new
connection. Only account display fields reach the UI, never token envelopes.

Review: the owner already switches Codex logins, so a refresh uses that existing
workflow. Full per-person profile storage is deferred. Official Codex
[app-server authentication](https://learn.chatgpt.com/docs/app-server) supplies
account/read; [state locations](https://learn.chatgpt.com/docs/config-file/config-advanced)
explain CODEX_HOME. [Claude settings](https://code.claude.com/docs/en/settings)
document CLAUDE_CONFIG_DIR for later separate provider homes. Reviewed GitHub
[claude-switch](https://github.com/botjaeger/claude-switch) and
[Claude/Codex account switch](https://github.com/LightZirconite/claude-account-switch)
as examples; installed no switcher and copied no credentials.

Checks: 19 targeted service/regression tests, TypeScript, scoped ESLint and
whitespace checks passed. Vite built an isolated preview. Eighteen UI views and
54 fixture refresh attempts passed across Conversation/Settings, both windows,
1280/768/390px and dark/light. Tests covered account updates in two windows,
keyboard activation, draft retention, busy controls and failure/retry. No page
errors. The narrow Chats panel was kept inside the viewport. Receipt:
`.cache/codex-refresh-ui-oYO1wR/verification.json`. Final button styling also
passed six narrow views and 18 refreshes, with inspected dark/light captures:
`.cache/codex-refresh-ui-4vClBd/verification.json`. Tests use simulated accounts;
an actual two-account login switch and live voice have not been verified.

The installed app reads a separate local runtime. Its server differs from this
checkout, so the prepared server patch preserves those installed changes.
Prepared files and expected preimage hashes:
`.cache/codex-refresh-ui-oYO1wR/runtime-patch/manifest.json`.
Installed files and running chats remain unchanged. Applying the prepared UI
and service update requires owner-authorized restart. Voice remains missing
OPENAI_API_KEY: refreshing a Codex login does not supply that key.

Final placement follows the owner's correction: Refresh connection sits directly
under the OPENAI_API_KEY warning. It rechecks the key and refreshes Codex. If
the key is absent, the warning remains; when found, it clears the stale warning
and asks the user to press the nose. Voice is not started automatically.
Account controls also remain in Settings. Final receipt:
`.cache/inline-refresh-ui-rkS4XE/verification.json` - 18 views, 30 refreshes,
wide/medium/narrow dark/light, both windows, missing-key retention, key-found
feedback, keyboard activation and preserved drafts. No provider requests or
live account switches. The prepared manifest points to this final build.

The earlier inline layout used a flex row that squeezed the warning text.
Visual review rejected it. The final receipt above verifies a stacked warning
and button, readable text width, full panel bounds and inspected captures.

## Approved installed refresh - 2026-10-13

The owner approved applying the verified update and restarting Mr. Mak. This
chat runs inside the app, so a one-time independent helper owns graceful quit,
verified runtime copies and reopen. It preserves the installed server changes
and verifies saved conversation/native IDs after restart. The helper removes
its own temporary scheduled task. Actual completion is recorded locally in
`.mrmak/approved-refresh-result.json`; no key or account credentials are copied.
The voice-key warning still requires a supplied OPENAI_API_KEY.

## Five-agent Codex refresh repair - 2026-10-13

Five read-only reviews covered CLI resolution, installed launch, refresh protocol,
voice setup and restart/history evidence. The Windows native resolver stopped at
a PATH command wrapper and incorrectly reported that Codex was absent. The repair
continues executable-only lookup; ordinary worker command resolution is unchanged.
The native CLI resolves to the same standalone release as the existing wrapper.
The bundled Node 22 runtime initialized that CLI and read a signed-in ChatGPT
account, without a model turn or login change. Display fields only were retained.

Reviewed fixes also prevent old-thread reuse after failed refresh, withhold inherited
host/voice credentials from the coordinator, preserve the chosen CODEX_HOME,
handle Windows environment casing, and synchronize account display through both
the response and reconnect snapshot. Voice ownership is checked immediately before
refresh reservation. Voice-key presence is rechecked independently; a key-found
notification clears the stale warning even when Codex refresh fails, while the
Codex failure stays visible. No actual voice key is configured or copied.

Checks: 22 service/regression tests, the 11 affected tests on bundled Node 22,
TypeScript, scoped ESLint and whitespace checks passed. Final isolated UI receipt:
`.cache/inline-refresh-ui-5p2q2Q/verification.json` - 18 views, 31 fixture
refreshes, both windows and three widths under dark/light workspace settings.
Missed account notifications and key-found plus Codex failure were verified.
Dark narrow and light-settings wide captures were inspected; Chats retains its
own dark presentation. No live model turn, account switch or voice session was run.

The original restart receipt's history failure was a PowerShell 5.1 array-wrapping
probe bug. Eight saved chats remain, with zero recorded restore errors. Exact
pre-restart identity equality was not retained, so the historical receipt remains
unaltered. The new helper separately parses JSON, casts its actual array, and
records stable identity digests before/after; its same-snapshot test passes at
eight records. History did not authorize an additional repair.

The corrective runtime update uses the owner's existing approved refresh/restart.
The installed server is patched in place in the prepared payload, preserving its
unrelated differences. Four service files and the verified compiled UI are hash
bound. Preflight passed. Deployment helper and manifest:
`.cache/codex-refresh-repair-f3766528-7211-49aa-9b13-92202149ac35/`.
Actual restart, installed CLI probe and session-digest results will be recorded
locally in `.mrmak/codex-refresh-repair-result.json`. Completion is established
by that receipt, not by this prepared handoff. No commit or push occurred.

Installed repair completion verified - 2026-10-13: the separate repair receipt reports complete, installed and restarted.
All eight saved conversation/native identities have equal before/after digests;
zero restore errors were recorded. The installed native CLI initialized and read
a signed-in ChatGPT account. The temporary helper task removed itself. A current
process check binds service 40944 to installed app 43956, and its UI returns HTTP
200. The owner additionally observed “Codex refreshed. Voice still needs
OPENAI_API_KEY in .env.” This confirms the actual button completed Codex refresh.
Voice remains unconfigured; no live voice session or two-account switch was proved.

## Browser sign-in prepared - 2026-10-13

The owner selected reconnection with browser sign-in available for switching
accounts. Prepared Sign in / switch account beside Refresh in the inline warning
and Settings. It uses Codex's own account/login/start browser flow, retains a
fallback sign-in link and cancellation, then replaces Mr. Mak's coordinator
connection only after a matching successful completion. No logout is performed.
The shared CLI login changes when the user completes authentication; managed
worker chats keep their existing process. Voice still needs its own API key.

The sign-in transport owns no model thread or turn. RPC output and credential
envelopes are not forwarded. Only HTTPS auth.openai.com and chatgpt.com URLs can
open the browser. Coordinator initialization, requests, refresh and voice cannot
race an active sign-in. Failed/cancelled attempts release their owned transport.
Account/status updates recover through authenticated snapshots and UI polling.

Sources: [OpenAI Docs authentication](https://learn.chatgpt.com/docs/auth),
[app-server browser authentication](https://learn.chatgpt.com/docs/app-server),
and [voice WebRTC](https://developers.openai.com/api/docs/guides/voice-webrtc).
Installed Codex 0.162.1 generated the matching browser-login request, response,
cancellation and completion schemas locally; no real sign-in was started.

Validation: 23 service/regression tests on bundled Node 22, TypeScript, scoped
ESLint and whitespace checks passed. UI receipt:
`.cache/inline-refresh-ui-SiXoFg/verification.json` - 18 refresh views plus eight
sign-in views; 31 fixture refreshes and 16 fixture sign-ins. Both windows,
wide/narrow views, dark/light workspace themes, fallback link, cancel/retry,
keyboard controls and recovery after missed events passed. Narrow light Workspace
and dark Chats captures were inspected. No provider requests, login changes,
voice session or live account switch occurred in these tests.

The prepared three-file runtime patch preserves the installed server's unrelated
changes. Its verified UI and service files have a hash manifest. PowerShell
preflight and bundled Node syntax checks passed, with installed files untouched.
Prepared package:
`.cache/codex-browser-login-b044448f-eb34-4ade-b8d4-7abc02377b2b/`.
The helper is not launched and no restart is scheduled. This new sign-in feature
awaits owner approval to restart/install, as required by repository AGENTS.md.
If approved, completion belongs in the separate local receipt
`.mrmak/codex-browser-login-install-result.json`. No commit or push occurred.

Browser sign-in install approved - 2026-10-13: the owner answered yes to installing the tested sign-in update and
restarting Mr. Mak. Prepared hashes, UI proof and installed process binding
were rechecked; PowerShell preflight passed. The independent helper will own
graceful quit, scoped runtime/UI copies and reopening. Actual completion,
installed Codex account probe and saved conversation identity equality belong
in `.mrmak/codex-browser-login-install-result.json`. No browser sign-in is
started by installation; the owner can use Sign in / switch account afterward.

Browser sign-in install verified - 2026-10-13: the installation receipt reports complete, installed and restarted.
All eight saved conversation/native identities have equal before/after digests;
zero restore errors were recorded. All three installed service files and 27 UI
files match the prepared hashes. The current installed app and its service are
running, with the UI returning HTTP 200. The helper removed its own task. The
local CLI probe initialized and read a signed-in account without changing login.

The owner subsequently observed “Signed in. Codex connection refreshed” after
using browser sign-in, and supplied a responding Mr. Mak text exchange. These
are owner-observed live sign-in/text results, distinct from the earlier fixture
checks. The browser sign-in tab can be closed once that completion appears.
Voice remains unconfigured and still requests OPENAI_API_KEY. Mr. Mak's reply
that the Refiner is still checking installation was stale; installed completion
is now recorded here and in Tasks. No account email or credentials are retained
in this note, and no commit or push occurred.

## Refiner readiness check - 2026-10-13

The installed service is running and its UI responds HTTP 200. Three service
files and 27 compiled UI files still match the installed sign-in update manifest.
All eight registered cards, 49 registered document files and 65 card/document
hash links resolve. Workspace Home is pinned, and its legacy junction resolves
to the same canonical folder. Eight saved chats remain, with zero recorded
restore errors. These checks cover the observed registry, files and managed
metadata, not every external link, MCP connection or a fresh native UI review.

Five planned lane labels are already present for open managed chats; Setup2
still has its earlier name and maps to REF-10 in Lane setup. An additional
REF-01 label and a closed generic placeholder were observed without assigning
them new scope. Updated maintained naming and installed-UI claims in Home,
Lane setup and Tasks; Build focus now distinguishes core readiness from setup
polish. The selected product remains unchosen, as directed by the owner.

The Refiner and Codex text route are ready for idea/design questions. Voice
requires the separately supplied API key and has not been validated. T005 still
owns outstanding MCP validation. Product implementation still follows selection,
GDD, source index and schemas. No runtime restart, account change, chat rename,
provider request, staging, commit or push occurred in this readiness check.
