import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdir, mkdtemp, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildManifest, PLAN_SCHEMA } from './asset-delivery/manifest.mjs';
import { CATALOG, checkLab } from './check-character-lab.mjs';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const prefix = 'projects/character-lab/characters/test-character';
async function fixture() {
  await mkdir(path.join(repo, '.cache'), { recursive: true });
  const root = await mkdtemp(path.join(repo, '.cache/lab-check-'));
  const put = async (relative, value) => {
    const full = path.join(root, relative); await mkdir(path.dirname(full), { recursive: true });
    await writeFile(full, typeof value === 'string' ? value : JSON.stringify(value, null, 2) + '\n', 'utf8');
    return { path: relative, sha256: sha(await readFile(full)) };
  };
  await put('workspace/workspace.json', { entities: [
    { id: 'character-lab', folder: '2026-10-12_character-lab' },
    { id: 'team-hub', folder: 'home' },
  ] });
  await put('workspace/home/tasks.md', '# Tasks\n\nT999 - Synthetic test only\n');
  await put(`${prefix}/brief.md`, '# Synthetic fixture character\n');
  await put(`${prefix}/revisions/r001/brief-snapshot.md`, '# Immutable synthetic fixture brief\n');
  await put(`${prefix}/revisions/r001/concept.txt`, 'Synthetic output, not real character art.\n');
  const manifest = await buildManifest({ schema: PLAN_SCHEMA, card_id: 'character-lab', step: 'test-character-r001-concept', files: [
    { path: `${prefix}/revisions/r001/brief-snapshot.md`, role: 'brief', kind: 'input' },
    { path: `${prefix}/revisions/r001/concept.txt`, role: 'concept', kind: 'output' },
  ] }, root);
  const revision = { id: 'r001', task_id: 'T999', stage: 'concept', parent: null, state: 'candidate', manifest: await put(`${prefix}/revisions/r001/delivery.json`, manifest), review: null, selection: null };
  const character = { id: 'test-character', name: 'Synthetic fixture', brief: `${prefix}/brief.md`, selected: {}, revisions: [revision] };
  const catalog = { schema: 'mrmak.character-lab/v1', card_id: 'character-lab', characters: [character] };
  const save = () => put(CATALOG, catalog);
  await save(); return { root, put, save, catalog, character, revision, manifest };
}
const rejected = async (fixture, pattern) => { await fixture.save(); assert.match((await checkLab(fixture.root)).errors.join('\n'), pattern); };

async function refreshManifest(f, revision, files) {
  const manifest = await buildManifest({ schema: PLAN_SCHEMA, card_id: 'character-lab', step: 'test-character-' + revision.id + '-' + revision.stage, files }, f.root);
  revision.manifest = await f.put(prefix + '/revisions/' + revision.id + '/delivery.json', manifest);
  await f.save();
  return manifest;
}
async function addRevision(f, { id = 'r002', stage = 'sheet', parent = 'r001', inputText, inputs } = {}) {
  const local = prefix + '/revisions/' + id;
  if (!inputs) {
    const retained = inputText ?? (parent === null ? '# Independent immutable brief\n' : await readFile(path.join(f.root, prefix, 'revisions', parent, parent === 'r001' ? 'concept.txt' : 'result.txt'), 'utf8'));
    await f.put(local + '/retained-input.txt', retained);
    inputs = [{ path: local + '/retained-input.txt', role: parent === null ? 'brief' : 'reference', kind: 'input' }];
  }
  await f.put(local + '/result.txt', 'Synthetic ' + id + ' ' + stage + ' output.\n');
  const files = [...inputs, { path: local + '/result.txt', role: stage, kind: 'output' }];
  const revision = { id, task_id: 'T999', stage, parent, state: 'candidate', manifest: null, review: null, selection: null };
  f.character.revisions.push(revision);
  await refreshManifest(f, revision, files);
  return { revision, files, local };
}
async function handoffFixture(state = 'planned', stage = 'mesh') {
  const f = await fixture(), added = await addRevision(f, { stage });
  const source = added.local + '/source.blend', exported = added.local + '/asset.glb', evidence = added.local + '/evidence.txt';
  await f.put(source, 'Synthetic editable-source fixture, not a Blender asset.\n');
  const exportedRef = await f.put(exported, 'Synthetic export fixture, not a GLB asset.\n');
  await f.put(evidence, 'Synthetic recorded consumption evidence, not actual engine approval.\n');
  added.files.push({ path: source, role: 'editable-source', kind: 'output' }, { path: exported, role: 'export', kind: 'output' }, { path: evidence, role: 'evidence', kind: 'output' });
  // Receiver roots are deliberately nonexistent: checking never dereferences them.
  const handoff = {
    schema: 'mrmak.character-handoff/v1', character_id: f.character.id, revision_id: added.revision.id,
    editable_sources: [source], exports: [{ path: exported, destination_path: 'assets/characters/fixture.glb' }],
    receiver: { project: 'Synthetic receiver', root: 'Z:/nonexistent-synthetic-receiver', owner: 'fixture-owner', task: 'fixture-task', consumer: state === 'verified' ? 'res://actors/fixture.tscn' : '' },
    state, evidence: state === 'planned' ? [] : [evidence], notes: 'Synthetic handoff only.',
  };
  const proof = {
    schema: 'mrmak.character-consumption-proof/v1', character_id: f.character.id, revision_id: added.revision.id,
    export_sha256: exportedRef.sha256, receiver_root: handoff.receiver.root, consumer: handoff.receiver.consumer,
    receiver_revision: 'fixture-receiver-revision', tool_version: 'fixture-tool-1', run_id: 'fixture-run-1',
    result: 'pass', evidence: [evidence], observations: 'Synthetic observations only; no actual consumer run.',
  };
  const handoffPath = added.local + '/model-handoff.json', proofPath = added.local + '/consumption-proof.json';
  added.files.push({ path: handoffPath, role: 'model-handoff', kind: 'output' });
  if (state === 'verified') added.files.push({ path: proofPath, role: 'consumption-proof', kind: 'output' });
  const refresh = async () => {
    await f.put(handoffPath, handoff);
    if (added.files.some(asset => asset.role === 'consumption-proof')) await f.put(proofPath, proof);
    return refreshManifest(f, added.revision, added.files);
  };
  await refresh();
  return { ...f, ...added, source, exported, evidence, handoff, proof, refresh };
}

test('checks a real indexed input/output tree using the existing manifest verifier', async () => {
  const f = await fixture(); assert.deepEqual((await checkLab(f.root)).errors, []);
});
test('rejects an unindexed nested output and changed same-length bytes', async () => {
  const f = await fixture(); await f.put(`${prefix}/revisions/r001/nested/forgotten.txt`, 'Unindexed\n');
  await rejected(f, /unindexed file/);
  const g = await fixture(); await g.put(`${prefix}/revisions/r001/concept.txt`, 'Synthetic output, not real character Art.\n');
  await rejected(g, /content or size changed/);
});
test('rejects duplicate IDs and cyclic or absent parent lineage', async () => {
  const f = await fixture(); f.catalog.characters.push(structuredClone(f.character)); await rejected(f, /duplicate ID/);
  const g = await fixture(); g.revision.parent = 'r001'; await rejected(g, /parent must name an earlier revision/);
});
test('rejects numeric/string directory aliases and private evidence paths before reading', async () => {
  const f = await fixture(); f.character.id = 1; await rejected(f, /invalid or duplicate ID/);
  const g = await fixture(); g.revision.review = { path: `${prefix}/revisions/r001/auth.json`, sha256: 'a'.repeat(64) };
  await rejected(g, /private path forbidden/);
});
test('rejects absent files, manifest substitution and output path escape', async () => {
  const f = await fixture(); f.revision.manifest.path = `${prefix}/revisions/r001/missing.json`; await rejected(f, /ENOENT/);
  const g = await fixture(); await g.put(g.revision.manifest.path, '{}\n'); await rejected(g, /pinned content changed/);
  const h = await fixture(); h.revision.manifest.path = '../outside.json'; await rejected(h, /path must stay/);
});
test('rejects selected candidates and acceptance without evidence', async () => {
  const f = await fixture(); f.character.selected.concept = 'r001'; await rejected(f, /must be accepted/);
  const g = await fixture(); g.revision.state = 'accepted'; g.character.selected.concept = 'r001'; await rejected(g, /lacks passing review or owner selection/);
});
test('binds acceptance evidence to exact revision and manifest; catches later evidence mutation', async () => {
  const f = await fixture(); const binding = { character_id: f.character.id, revision_id: 'r001', manifest_sha256: f.revision.manifest.sha256 };
  const review = { schema: 'mrmak.character-review/v1', ...binding, verdict: 'pass', notes: 'Synthetic fixture review only.' };
  const selection = { schema: 'mrmak.character-selection/v1', ...binding, by: 'synthetic-fixture-owner', date: '2026-10-12', scope: 'concept', decision: 'Synthetic test selection, not actual approval.' };
  f.revision.review = await f.put(`${prefix}/revisions/r001/review.json`, review);
  f.revision.selection = await f.put(`${prefix}/revisions/r001/selection.json`, selection);
  f.revision.state = 'accepted'; f.character.selected.concept = 'r001'; await f.save();
  assert.deepEqual((await checkLab(f.root)).errors, []);
  review.revision_id = 'r999'; f.revision.review = await f.put(f.revision.review.path, review); await rejected(f, /review must bind this exact character/);
  await f.put(f.revision.selection.path, { ...selection, decision: 'Changed afterward.' }); await rejected(f, /pinned content changed/);
});
test('rejects receipt files and unknown catalog fields rather than hiding them', async () => {
  const f = await fixture(); await f.put(`${prefix}/revisions/r001/job.json`, '{}\n'); await rejected(f, /private receipt\/credential file forbidden/);
  const g = await fixture(); g.catalog.status = 'done'; await rejected(g, /unknown field status/);
});

test('current brief edits preserve immutable prior revision identity', async () => {
  const f = await fixture(), pinnedManifest = f.revision.manifest.sha256;
  await f.put(prefix + '/brief.md', '# Revised current brief for the next design round\n');
  assert.deepEqual((await checkLab(f.root)).errors, []);
  assert.equal(f.revision.manifest.sha256, pinnedManifest);
  assert.equal(sha(await readFile(path.join(f.root, f.manifest.files[1].path))), f.manifest.files[1].sha256);
});

test('rejects mutable current brief inputs including Windows case aliases', async () => {
  for (const alias of ['brief.md', 'Brief.md']) {
    const f = await fixture();
    const files = f.manifest.files.map(({ path, role, kind }) => ({ path, role, kind }));
    files.push({ path: f.character.brief, role: 'current-brief', kind: 'input' });
    const manifest = await refreshManifest(f, f.revision, files);
    manifest.files.at(-1).path = prefix + '/' + alias;
    f.revision.manifest = await f.put(f.revision.manifest.path, manifest);
    await f.save();
    assert.deepEqual((await checkLab(f.root)).errors, [
      'test-character/r001: mutable current brief cannot be a manifest input; retain revision-local brief-snapshot.md instead',
    ]);
  }
});

test('first non-concept root is allowed while additional null roots require concept stage', async () => {
  const f = await fixture();
  f.revision.stage = 'rig';
  const files = f.manifest.files.map(({ path, role, kind }) => ({ path, role, kind }));
  await refreshManifest(f, f.revision, files);
  assert.deepEqual((await checkLab(f.root)).errors, []);
  await addRevision(f, { stage: 'mesh', parent: null });
  await rejected(f, /only independent concept candidates may start an additional root/);
  f.character.revisions[1].stage = 'concept';
  const rootFiles = [
    { path: prefix + '/revisions/r002/retained-input.txt', role: 'brief', kind: 'input' },
    { path: prefix + '/revisions/r002/result.txt', role: 'concept', kind: 'output' },
  ];
  await refreshManifest(f, f.character.revisions[1], rootFiles);
  assert.deepEqual((await checkLab(f.root)).errors, []);
});

test('accepts independent concept roots and optional round labels without false candidate ancestry', async () => {
  const f = await fixture();
  const added = await addRevision(f, { stage: 'concept', parent: null });
  Object.assign(f.revision, { round: 'v1', label: 'A', goal: 'Explore one readable silhouette.' });
  Object.assign(added.revision, { round: 'v1', label: 'B', goal: 'Compare another silhouette from the same brief.' });
  await f.save();
  assert.deepEqual((await checkLab(f.root)).errors, []);
  added.revision.goal = '';
  await rejected(f, /optional goal must be a nonempty string/);
  delete added.revision.task_id;
  await rejected(f, /missing task_id/);
});

test('accepts copied parent outputs and branching from an earlier revision with additional image input', async () => {
  const f = await fixture();
  await addRevision(f);
  await addRevision(f, { id: 'r003', stage: 'concept', parent: null });
  const copy = prefix + '/revisions/r004/copied-reference.txt';
  await f.put(copy, await readFile(path.join(f.root, f.manifest.files[1].path), 'utf8'));
  await addRevision(f, { id: 'r004', stage: 'mesh', parent: 'r001', inputs: [
    { path: copy, role: 'primary-reference', kind: 'input' },
    { path: prefix + '/revisions/r002/result.txt', role: 'additional-reference', kind: 'input' },
  ] });
  assert.deepEqual((await checkLab(f.root)).errors, []);
});

test('rejects parent declarations without an actual matching retained output', async () => {
  const f = await fixture();
  await addRevision(f, { inputText: 'A changed local reference that did not come from the parent.\n' });
  await rejected(f, /primary parent requires a retained input matching its output SHA-256 and bytes/);
  const g = await fixture();
  const added = await addRevision(g);
  const manifest = await refreshManifest(g, added.revision, added.files);
  manifest.files[0].bytes += 1;
  added.revision.manifest = await g.put(added.revision.manifest.path, manifest);
  await rejected(g, /primary parent requires a retained input/);
});

test('rejects cross-revision input snapshots, changed claims and future outputs', async () => {
  const f = await fixture();
  await addRevision(f, { inputs: [{ path: prefix + '/revisions/r001/brief-snapshot.md', role: 'reference', kind: 'input' }] });
  await rejected(f, /cross-revision input must match an earlier declared output/);
  const g = await fixture();
  const added = await addRevision(g, { inputs: [{ path: prefix + '/revisions/r001/concept.txt', role: 'reference', kind: 'input' }] });
  const manifest = await refreshManifest(g, added.revision, added.files);
  manifest.files[0].sha256 = 'a'.repeat(64);
  added.revision.manifest = await g.put(added.revision.manifest.path, manifest);
  await rejected(g, /cross-revision input must match an earlier declared output/);
  const h = await fixture();
  await h.put(prefix + '/revisions/r003/result.txt', 'Synthetic future output.\n');
  await addRevision(h, { inputs: [{ path: prefix + '/revisions/r003/result.txt', role: 'reference', kind: 'input' }] });
  await addRevision(h, { id: 'r003', stage: 'concept', parent: null });
  await rejected(h, /cross-revision input must match an earlier declared output/);
});

test('accepts planned, delivered and verified indexed model handoffs without opening receiver roots', async () => {
  for (const state of ['planned', 'delivered', 'verified']) {
    const f = await handoffFixture(state);
    assert.deepEqual((await checkLab(f.root)).errors, [], state);
  }
  const planned = await handoffFixture();
  planned.handoff.exports = [];
  await planned.refresh();
  assert.deepEqual((await checkLab(planned.root)).errors, []);
});

test('rejects malformed handoffs, unindexed files and unsafe receiver destinations', async () => {
  const cases = [
    [f => { f.handoff.character_id = 'wrong-character'; }, /model-handoff must bind this exact character/],
    [f => { f.handoff.revision_id = 'r999'; }, /model-handoff must bind this exact character/],
    [f => { f.handoff.editable_sources = []; }, /editable_sources requires nonempty indexed paths/],
    [f => { f.handoff.editable_sources = [f.local + '/unindexed.blend']; }, /editable_sources must name unique same-manifest files/],
    [f => { f.handoff.exports[0].path = f.files[0].path; }, /export must name a unique same-manifest output/],
    [f => { f.handoff.exports[0].destination_path = '../outside.glb'; }, /safe relative receiver path/],
    [f => { f.handoff.receiver.root = 'relative/receiver'; }, /absolute locator/],
    [f => { f.handoff.receiver.owner = ''; }, /receiver owner required/],
    [f => { f.handoff.state = 'done'; }, /invalid model-handoff state/],
    [f => { f.handoff.evidence = [f.local + '/unindexed-proof.txt']; }, /handoff evidence must name unique same-manifest files/],
    [f => { f.handoff.manifest_sha256 = 'a'.repeat(64); }, /unknown field manifest_sha256/],
    [f => { f.handoff.notes = ''; }, /model-handoff notes required/],
  ];
  for (const [mutate, pattern] of cases) {
    const f = await handoffFixture();
    mutate(f); await f.refresh(); await rejected(f, pattern);
  }
});

test('mesh rig and animation handoffs require a listed editable source while early candidates remain valid', async () => {
  for (const stage of ['mesh', 'rig', 'animation']) {
    const f = await fixture(); await addRevision(f, { stage });
    assert.deepEqual((await checkLab(f.root)).errors, [], stage + ' candidate');
    const h = await handoffFixture('planned', stage);
    h.files.find(asset => asset.path === h.source).role = 'preview';
    await h.refresh();
    await rejected(h, /requires a listed editable-source/);
  }
});

test('delivered handoffs require export and evidence while verified requires consumer and proof', async () => {
  const delivered = await handoffFixture('delivered');
  delivered.handoff.exports = []; delivered.handoff.evidence = [];
  await delivered.refresh();
  await rejected(delivered, /exports required for delivery/);
  await rejected(delivered, /handoff evidence requires nonempty indexed paths/);
  const verified = await handoffFixture('delivered');
  verified.handoff.state = 'verified';
  await verified.refresh();
  await rejected(verified, /verified receiver consumer required/);
  await rejected(verified, /verified model-handoff requires consumption-proof/);
});

test('consumption proof binds exact export receiver consumer run and indexed evidence', async () => {
  const cases = [
    [f => { f.proof.character_id = 'wrong-character'; }, /consumption-proof must bind this exact character/],
    [f => { f.proof.revision_id = 'r999'; }, /consumption-proof must bind this exact character/],
    [f => { f.proof.export_sha256 = 'a'.repeat(64); }, /declared export SHA-256/],
    [f => { f.proof.receiver_root = 'Z:/different-receiver'; }, /receiver root and consumer must match/],
    [f => { f.proof.consumer = 'res://wrong.tscn'; }, /receiver root and consumer must match/],
    [f => { f.proof.receiver_revision = ''; }, /receiver_revision required/],
    [f => { f.proof.tool_version = ''; }, /tool_version required/],
    [f => { f.proof.run_id = ''; }, /run_id required/],
    [f => { f.proof.result = 'fail'; }, /result must be pass/],
    [f => { f.proof.evidence = []; }, /consumption-proof evidence requires nonempty indexed paths/],
    [f => { f.proof.evidence = [f.local + '/unindexed.png']; }, /consumption-proof evidence must name unique same-manifest files/],
    [f => { f.proof.observations = ''; }, /observations required/],
  ];
  for (const [mutate, pattern] of cases) {
    const f = await handoffFixture('verified');
    mutate(f); await f.refresh(); await rejected(f, pattern);
  }
});

test('malformed handoff arrays return validation errors instead of throwing', async () => {
  const f = await handoffFixture('verified');
  f.handoff.editable_sources = 'not-an-array'; f.handoff.exports = 'not-an-array'; f.proof.evidence = null;
  await f.refresh();
  const result = await checkLab(f.root);
  assert.match(result.errors.join('\n'), /editable_sources requires/);
  assert.match(result.errors.join('\n'), /exports required/);
  assert.match(result.errors.join('\n'), /consumption-proof evidence requires/);
});

test('primitive handoff and consumption proof records cannot satisfy delivery claims', async () => {
  for (const role of ['model-handoff', 'consumption-proof']) {
    const f = await handoffFixture('verified');
    const asset = f.files.find(candidate => candidate.role === role);
    await f.put(asset.path, false);
    await refreshManifest(f, f.revision, f.files);
    await rejected(f, new RegExp(role + ': object required'));
  }
});

test('malformed manifest entries fail before file reads and return validation errors', async () => {
  const f = await fixture();
  f.manifest.files = [null];
  f.revision.manifest = await f.put(f.revision.manifest.path, f.manifest);
  const result = await checkLab(f.root);
  assert.match(result.errors.join('\n'), /unsafe asset path/);
  assert.match(result.errors.join('\n'), /at least one retained input required/);
});

test('handoff and consumption proof records cannot certify themselves or one another as evidence', async () => {
  for (const target of ['handoff', 'proof']) {
    for (const claimRole of ['model-handoff', 'consumption-proof', 'review', 'selection']) {
      const f = await handoffFixture('verified');
      let claimPath = f.files.find(asset => asset.role === claimRole)?.path;
      if (!claimPath) {
        claimPath = f.local + '/' + claimRole + '-claim.json';
        await f.put(claimPath, { schema: 'mrmak.character-' + claimRole + '/v1', notes: 'Synthetic claim record.' });
        f.files.push({ path: claimPath, role: claimRole, kind: 'output' });
      }
      f[target].evidence = [claimPath];
      await f.refresh();
      await rejected(f, /must name independent output files with role evidence/);
    }
  }
});

test('evidence requires independent output captures or reports with the single role evidence', async () => {
  const cases = [
    f => { f.proof.evidence = [f.files[0].path]; }, // Retained input is not observed output evidence.
    f => { f.files.find(asset => asset.path === f.evidence).role = 'preview'; },
    f => { f.files.find(asset => asset.path === f.exported).role = 'evidence'; f.handoff.evidence = [f.exported]; },
  ];
  for (const mutate of cases) {
    const f = await handoffFixture('verified');
    mutate(f); await f.refresh();
    await rejected(f, /must name independent output files with role evidence/);
  }
  for (const schema of ['mrmak.character-handoff/v1', 'mrmak.character-consumption-proof/v1', 'mrmak.character-review/v1', 'mrmak.character-selection/v1']) {
    const f = await handoffFixture('verified');
    const disguised = f.local + '/disguised-claim.txt';
    await f.put(disguised, { schema, notes: 'Synthetic record relabelled as evidence.' });
    f.files.push({ path: disguised, role: 'evidence', kind: 'output' });
    f.proof.evidence = [disguised];
    await f.refresh();
    await rejected(f, /must name independent output files with role evidence/);
  }
});

test('verified sprite PNG and atlas sidecar bundle requires valid proof coverage for both exported hashes', async () => {
  const f = await handoffFixture('verified', 'animation');
  const png = f.local + '/sprites.png', atlas = f.local + '/atlas.json';
  const pngRef = await f.put(png, 'Synthetic sprite PNG fixture, not actual image bytes.\n');
  const atlasRef = await f.put(atlas, { image: 'sprites.png', frames: [{ name: 'fixture-idle', x: 0, y: 0, w: 16, h: 16 }] });
  f.files.push({ path: png, role: 'export', kind: 'output' }, { path: atlas, role: 'export', kind: 'output' });
  f.handoff.exports = [
    { path: png, destination_path: 'assets/characters/sprites.png' },
    { path: atlas, destination_path: 'assets/characters/atlas.json' },
  ];
  f.proof.export_sha256 = pngRef.sha256;
  await f.refresh();
  await rejected(f, /valid consumption-proof for every export: .*atlas\.json/);
  const secondPath = f.local + '/atlas-consumption-proof.json';
  const secondProof = { ...f.proof, export_sha256: atlasRef.sha256, observations: 'Synthetic run observed the PNG and its atlas together.' };
  await f.put(secondPath, secondProof);
  f.files.push({ path: secondPath, role: 'consumption-proof', kind: 'output' });
  await f.refresh();
  assert.deepEqual((await checkLab(f.root)).errors, []);
  secondProof.consumer = 'res://wrong-sprite-consumer.tscn';
  await f.put(secondPath, secondProof); await f.refresh();
  await rejected(f, /receiver root and consumer must match/);
  await rejected(f, /valid consumption-proof for every export: .*atlas\.json/);
});
