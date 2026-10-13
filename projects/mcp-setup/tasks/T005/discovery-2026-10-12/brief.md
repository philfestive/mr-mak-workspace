# T005 discovery packet: 36 coordinated assignments

Owner request: implement the supplied three-wave tool discovery plan. This packet
complements T005 and T005-P2; it never reuses the historical MCP T006 identifier.
The search coordinator owns this packet. The existing T005 shared writer retains
MCP card, registry and Home ownership pending explicit succession clarification.

## Scope and evidence contract

Inspect bounded eligible source/docs/metadata on C:, D: and E:. Read applicable
AGENTS.md before repository inspection. List filenames before reading. No source
repository writes. No credentials, raw client configuration, transcripts, private
inputs, logs, bulk media, dependency trees, archives, backups, snapshots, crashed
Git stores, frozen worktrees or prohibited trees. AssetDatabase is source/docs
read-only, subject to its rules. If a mandatory runtime/guard is needed to inspect
a scope, stop that scope and record the gap: discovery grants no execution.

Never execute discovered scripts, tests, servers or runtimes. No installation,
activation, application changes, account changes, paid calls, restart, staging,
commit or push. Newly authored packet auditing and report-preview tooling may
verify these deliverables only; they do not qualify discovered tools.

Each worker writes only its assigned files in this packet, UTF-8/LF. Inherit the
current provider/model. At most 12 workers plus coordinator. No nested delegation.
Discovery lanes 01-12 precede independent verification 13-24. Consumer lanes
25-30 precede reconciliation 31, boundary review 32, writer 33, challenge 34,
correction 35 and independent acceptance 36. Use agent messages for available
peers; retained docs are documentation-only consultation, never owner assent.

## Discovery records

Each researcher supplies at most ten strongest distinct candidates in
`wave1/NN.json`, plus `wave1/NN.md` coverage, exclusions, backlog and questions.
Prefer 3-5 useful candidates over weak padding. Candidate IDs are `TD-NN-XX`.
JSON is an object with `lane`, `observed_at_utc`, `roots`, `coverage`, `exclusions`,
`gaps`, `backlog`, and `candidates`. Every candidate contains:

- `id`, `name`, `kind`, `canonical_root`, `entrypoint`, `consumer`, `need`,
  `overlap`, `route` (reference/reuse/wrapper/defer), `owner`, `qualification`;
- `sources`: objects with exact `path`, `sha256`, `lines`, `claim`; compute SHA256
  of actual source bytes, never infer a hash. Use safe source files, not secrets;
- `claims`, `dependencies`, `version`, `license`, `effects`, `unknowns`,
  `review_question`, `evidence_level`, `runtime` (always `unassessed`).

Distinguish documentation claim, source presence, static verification and installed
artifact. Installed metadata alone is not runtime readiness. License unknown is
not permission to copy or redistribute. Link original sources; do not copy tools.

## Independent review

Reviewer 13-24 reads its corresponding researcher JSON, reopens the actual source,
rehashes it, checks entrypoint/dependencies/version/license/effects and returns
`wave2/NN.json` plus `.md`. JSON has `lane`, `discovery_lane`, `observed_at_utc`,
`reviews`: one object per candidate with `id`, `disposition`
(accept/correct/unverified/reject), `reason`, `source_checks` (path, sha256,
matches), `corrections` (candidate-field overrides), `unknowns`, `reviewer`.
Do not verify your own discovery. Message the researcher with discrepancies;
retain the answer or mark unresolved. Browse official primary sources when a
current upstream claim or recommendation needs verification. Never run the tool.

## Consumer and final gates

Liaisons 25-30 write `wave3/NN.json` plus `.md`: `lane`, `consumer`, `consultation`
(documentation-only or actual agent contact), `dispositions` (id, useful/duplicate/
deferred, need, dependencies, interface_mismatch, owner, qualification). Every
candidate gets a consumer disposition, including deferred ones. Source/duplicate
review 31 and boundary review 32 map every candidate explicitly. Writer 33 ranks
only candidates that pass independent source, useful consumer and boundary gates.
Recheck finalist hashes before writing. Changed sources return to their reviewer.
Challenge 34 identifies material issues; 35 resolves them with evidence; 36 reads
the final packet independently and returns acceptance with exact remaining limits.

## Assigned discovery partitions

01 C: user skills/plugins and installed metadata; 02 C: general dev helpers;
03 C: AI/MCP sources; 04 C: Godot tools; 05 C: orchestration/historical references;
06 D: development harnesses; 07 D: protected AssetDatabase source/docs;
08 D: AI workflows/Blender helpers; 09 D: remaining eligible references;
10 E: Workspace helpers/tool maps; 11 E: RecompileGodot tool families;
12 E: research/notes/qualification helpers.

## Deliverables

Retain all 36 assignments, one machine-readable verified inventory, ranked
adoption plan, coverage/limits, provenance/refresh audit, coordination and
acceptance records. Prepare a single Discovery tab in the existing MCP card and
exact shared-writer integration instructions. Verify local links and previews at
1280, 768 and 390 pixels. Integration and runtime qualification stay future work.
