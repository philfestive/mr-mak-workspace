// Read-only Character Lab registration and file-integrity check.
import { createHash } from 'node:crypto';
import { lstat, readFile, readdir, realpath } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { verifyManifest } from './asset-delivery/manifest.mjs';

export const CATALOG = 'workspace/2026-10-12_character-lab/catalog.json';
const TREE = 'projects/character-lab/characters';
const STAGES = ['concept', 'sheet', 'mesh', 'materials', 'rig', 'animation', 'engine'];
const STATES = ['candidate', 'reviewed', 'accepted', 'rejected', 'superseded'];
const DELIVERY_STATES = ['planned', 'delivered', 'verified'];
const HASH = /^[a-f0-9]{64}$/;
const PRIVATE = /^(?:\.env(?:\..*)?|\.git|node_modules|job\.json|result\.json|upload\.json|auth\.json|credentials\.json|tokens?\.json)$/i;
const slug = /^[a-z0-9][a-z0-9-]{0,30}$/;
const object = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const digest = bytes => createHash('sha256').update(bytes).digest('hex');
const nonempty = value => typeof value === 'string' && value.trim().length > 0;
// Receiver roots are locators only. Never stat, resolve or read a receiver tree.
const absoluteLocator = value => nonempty(value) && !/\0/.test(value)
  && (path.posix.isAbsolute(value) || /^[A-Za-z]:[\\/]/.test(value)
    || /^\\\\[^\\]+\\[^\\]+(?:\\|$)/.test(value));
const sameIdentity = (left, right) => left.sha256 === right.sha256 && left.bytes === right.bytes;
const portable = value => typeof value === 'string' && value.length > 0
  && !/[\\:\0]/.test(value) && !path.isAbsolute(value)
  && value.split('/').every(part => part && part !== '.' && part !== '..');

export async function checkLab(root) {
  const errors = [], indexed = new Set(), characterIds = new Set();
  const base = await realpath(root);
  const fail = message => errors.push(message);
  const known = (value, keys, label, optional = []) => {
    if (!object(value)) { fail(`${label}: object required`); return false; }
    for (const key of Object.keys(value)) if (!keys.includes(key) && !optional.includes(key)) fail(`${label}: unknown field ${key}`);
    for (const key of keys) if (!(key in value)) fail(`${label}: missing ${key}`);
    return true;
  };
  async function file(relative, index = true) {
    if (!portable(relative)) throw new Error(`unsafe relative path: ${relative}`);
    if (relative.split('/').some(part => PRIVATE.test(part))) throw new Error(`private path forbidden: ${relative}`);
    let cursor = base;
    for (const part of relative.split('/')) {
      cursor = path.join(cursor, part);
      if ((await lstat(cursor)).isSymbolicLink()) throw new Error(`linked path forbidden: ${relative}`);
    }
    if (!(await lstat(cursor)).isFile()) throw new Error(`regular file required: ${relative}`);
    if (index) indexed.add(relative.toLowerCase());
    return readFile(cursor);
  }
  async function pinned(ref, prefix, label) {
    if (!known(ref, ['path', 'sha256'], label)) return null;
    if (!portable(ref.path) || !ref.path.startsWith(prefix + '/')) { fail(`${label}: path must stay in ${prefix}`); return null; }
    if (!HASH.test(ref.sha256)) fail(`${label}: SHA-256 required`);
    try {
      const bytes = await file(ref.path);
      if (digest(bytes) !== ref.sha256) fail(`${label}: pinned content changed`);
      return JSON.parse(bytes.toString('utf8'));
    } catch (error) { fail(`${label}: ${error.message}`); return null; }
  }
  let catalog, source;
  try { source = await file(CATALOG, false); catalog = JSON.parse(source.toString('utf8')); }
  catch (error) { return { errors: [`catalog: ${error.message}`], characters: 0, files: 0 }; }
  if (!known(catalog, ['schema', 'card_id', 'characters'], 'catalog')) return { errors, characters: 0, files: 0 };
  if (catalog.schema !== 'mrmak.character-lab/v1' || catalog.card_id !== 'character-lab') fail('catalog: wrong schema or card_id');
  if (!Array.isArray(catalog.characters)) return { errors: [...errors, 'characters: array required'], characters: 0, files: 0 };
  let tasks = '';
  try {
    const registry = JSON.parse((await file('workspace/workspace.json', false)).toString('utf8'));
    const cards = registry.entities.filter(card => card.id === catalog.card_id);
    if (cards.length !== 1 || cards[0].folder !== path.posix.dirname(CATALOG).slice('workspace/'.length)) fail('registry: exactly one card must route to the canonical catalog folder');
    const home = registry.entities.find(card => card.id === 'team-hub');
    if (!home) fail('registry: Workspace Home route missing');
    else tasks = (await file(`workspace/${home.folder}/tasks.md`, false)).toString('utf8');
  } catch (error) { fail(`registry/tasks: ${error.message}`); }
  for (const character of catalog.characters) {
    if (!known(character, ['id', 'name', 'brief', 'selected', 'revisions'], 'character')) continue;
    if (typeof character.id !== 'string' || !slug.test(character.id) || characterIds.has(character.id)) { fail(`character: invalid or duplicate ID ${character.id}`); continue; }
    characterIds.add(character.id);
    const characterRoot = `${TREE}/${character.id}`;
    if (typeof character.name !== 'string' || !character.name.trim()) fail(`${character.id}: name required`);
    if (character.brief !== `${characterRoot}/brief.md`) fail(`${character.id}: brief must be character-local brief.md`);
    else try { if (!(await file(character.brief)).toString('utf8').trim()) fail(`${character.id}: brief is empty`); }
    catch (error) { fail(`${character.id} brief: ${error.message}`); }
    if (!Array.isArray(character.revisions) || !object(character.selected)) { fail(`${character.id}: revisions array and selected object required`); continue; }
    const revisions = new Map(), manifests = new Map();
    for (const revision of character.revisions) {
      const label = `${character.id}/${revision?.id}`;
      if (!known(revision, ['id', 'task_id', 'stage', 'parent', 'state', 'manifest', 'review', 'selection'], label, ['round', 'label', 'goal'])) continue;
      for (const key of ['round', 'label', 'goal']) if (key in revision && !nonempty(revision[key])) fail(label + ': optional ' + key + ' must be a nonempty string');
      if (typeof revision.id !== 'string' || !/^r[0-9]{3,}$/.test(revision.id) || /^r0+$/.test(revision.id) || revisions.has(revision.id)) { fail(`${label}: invalid or duplicate revision ID`); continue; }
      if (!STAGES.includes(revision.stage) || !STATES.includes(revision.state)) fail(`${label}: invalid stage or state`);
      if (typeof revision.task_id !== 'string' || !/^T[0-9]{3,}$/.test(revision.task_id) || !new RegExp(`\\b${revision.task_id}\\b`).test(tasks)) fail(`${label}: task must exist in Home Tasks`);
      if (revision.parent !== null && !revisions.has(revision.parent)) fail(`${label}: parent must name an earlier revision of this character`);
      // The first retained revision may enter at any stage; only concepts may
      // start additional roots rather than pretending to derive from a candidate.
      if (revision.parent === null && revisions.size && revision.stage !== 'concept') fail(label + ': only independent concept candidates may start an additional root');
      revisions.set(revision.id, revision);
      const revisionRoot = `${characterRoot}/revisions/${revision.id}`;
      const manifest = await pinned(revision.manifest, revisionRoot, `${label} manifest`);
      if (manifest) {
        if (manifest.card_id !== catalog.card_id || manifest.step !== `${character.id}-${revision.id}-${revision.stage}`) fail(`${label}: manifest card/step mismatch`);
        const seen = new Set(), assetBytes = new Map();
        let safeAssets = true;
        if (Array.isArray(manifest.files)) for (const asset of manifest.files) {
          if (!portable(asset?.path)) { fail(`${label}: unsafe asset path`); safeAssets = false; continue; }
          if (!asset.path.startsWith(characterRoot + '/') || (asset.kind === 'output' && !asset.path.startsWith(revisionRoot + '/'))) { fail(`${label}: asset outside owning character/revision`); safeAssets = false; continue; }
          if (asset.kind === 'input' && typeof character.brief === 'string' && asset.path.toLowerCase() === character.brief.toLowerCase()) {
            fail(label + ': mutable current brief cannot be a manifest input; retain revision-local brief-snapshot.md instead');
            safeAssets = false;
            continue;
          }
          if (seen.has(asset.path.toLowerCase())) fail(`${label}: case-aliased duplicate asset`);
          seen.add(asset.path.toLowerCase());
          if (asset.kind === 'input' && asset.path.startsWith(characterRoot + '/revisions/') && !asset.path.startsWith(revisionRoot + '/')) {
            const sourceId = asset.path.slice((characterRoot + '/revisions/').length).split('/')[0];
            const sourceFiles = manifests.get(sourceId)?.files;
            const earlierOutput = Array.isArray(sourceFiles) ? sourceFiles.find(source => source?.kind === 'output' && source.path === asset.path) : null;
            if (!earlierOutput || !sameIdentity(asset, earlierOutput)) {
              fail(label + ': cross-revision input must match an earlier declared output: ' + asset.path);
              safeAssets = false;
              continue;
            }
          }
          try { assetBytes.set(asset.path, await file(asset.path)); } catch (error) { fail(`${label}: ${error.message}`); safeAssets = false; }
        }
        if (safeAssets) try { for (const error of await verifyManifest(manifest, base)) fail(`${label}: ${error}`); }
        catch (error) { fail(`${label}: ${error.message}`); }
        if (!Array.isArray(manifest.files) || !manifest.files.some(asset => asset?.kind === 'input')) fail(`${label}: at least one retained input required`);
        if (revision.parent !== null) {
          const parentFiles = manifests.get(revision.parent)?.files;
          const parentOutputs = Array.isArray(parentFiles) ? parentFiles.filter(asset => asset?.kind === 'output') : [];
          if (!Array.isArray(manifest.files) || !manifest.files.some(asset => asset?.kind === 'input' && parentOutputs.some(output => sameIdentity(asset, output)))) {
            fail(label + ': primary parent requires a retained input matching its output SHA-256 and bytes');
          }
        }
        if (safeAssets && Array.isArray(manifest.files)) {
          const assets = new Map(manifest.files.map(asset => [asset.path, asset]));
          const records = role => manifest.files.filter(asset => asset.role === role);
          const parseRecord = (asset, kind) => {
            if (asset.kind !== 'output') { fail(label + ': ' + kind + ' must be a revision output'); return null; }
            try {
              const record = JSON.parse(assetBytes.get(asset.path).toString('utf8'));
              if (!object(record)) throw new Error('object required');
              return record;
            }
            catch (error) { fail(label + ': ' + kind + ': ' + error.message); return null; }
          };
          const paths = (values, kind, required) => {
            if (!Array.isArray(values) || (required && !values.length)) { fail(label + ': ' + kind + ' requires ' + (required ? 'nonempty ' : '') + 'indexed paths'); return false; }
            let valid = true;
            const seenPaths = new Set();
            for (const relative of values) {
              if (!portable(relative) || !assets.has(relative) || seenPaths.has(relative)) { fail(label + ': ' + kind + ' must name unique same-manifest files'); valid = false; }
              seenPaths.add(relative);
            }
            return valid;
          };
          // mrmak.character-handoff/v1 has no manifest hash: the manifest pins this
          // record, avoiding a hash cycle. All file references use this manifest.
          const handoffs = records('model-handoff');
          if (handoffs.length > 1) fail(label + ': only one model-handoff record is allowed');
          const handoff = handoffs.length === 1 ? parseRecord(handoffs[0], 'model-handoff') : null;
          const claimSchemas = new Set(['mrmak.character-handoff/v1', 'mrmak.character-consumption-proof/v1', 'mrmak.character-review/v1', 'mrmak.character-selection/v1']);
          const claimPaths = new Set([
            ...records('model-handoff').map(asset => asset.path),
            ...records('consumption-proof').map(asset => asset.path),
            revision.review?.path, revision.selection?.path,
            ...(Array.isArray(handoff?.editable_sources) ? handoff.editable_sources : []),
            ...(Array.isArray(handoff?.exports) ? handoff.exports.filter(object).map(exported => exported.path) : []),
          ]);
          const recordEvidence = new Map();
          const isClaimRecord = relative => {
            if (!recordEvidence.has(relative)) {
              const bytes = assetBytes.get(relative);
              let claim = false, offset = 0;
              if (bytes) {
                while ([9, 10, 13, 32].includes(bytes[offset])) offset += 1;
                if (bytes[offset] === 123) try {
                  claim = claimSchemas.has(JSON.parse(bytes.toString('utf8')).schema);
                } catch { /* A capture/report need not be a JSON record. */ }
              }
              recordEvidence.set(relative, claim);
            }
            return recordEvidence.get(relative);
          };
          const evidencePaths = (values, kind, required, recordPath) => {
            let valid = paths(values, kind, required);
            if (!Array.isArray(values)) return false;
            for (const relative of values) {
              const asset = assets.get(relative);
              if (!asset) continue; // The same-manifest check above reports this.
              if (asset.kind !== 'output' || asset.role !== 'evidence' || relative === recordPath || claimPaths.has(relative) || isClaimRecord(relative)) {
                fail(label + ': ' + kind + ' must name independent output files with role evidence');
                valid = false;
              }
            }
            return valid;
          };
          if (handoff) {
            known(handoff, ['schema', 'character_id', 'revision_id', 'editable_sources', 'exports', 'receiver', 'state', 'evidence', 'notes'], label + ' model-handoff');
            if (handoff.schema !== 'mrmak.character-handoff/v1' || handoff.character_id !== character.id || handoff.revision_id !== revision.id) fail(label + ': model-handoff must bind this exact character and revision');
            if (!DELIVERY_STATES.includes(handoff.state)) fail(label + ': invalid model-handoff state');
            const delivered = ['delivered', 'verified'].includes(handoff.state);
            paths(handoff.editable_sources, 'editable_sources', true);
            evidencePaths(handoff.evidence, 'handoff evidence', delivered, handoffs[0].path);
            if (!nonempty(handoff.notes)) fail(label + ': model-handoff notes required');
            if (!Array.isArray(handoff.exports) || (delivered && !handoff.exports.length)) fail(label + ': model-handoff exports required for delivery');
            else {
              const exportPaths = new Set(), destinations = new Set();
              for (const exported of handoff.exports) {
                if (!known(exported, ['path', 'destination_path'], label + ' export')) continue;
                if (!portable(exported.path) || assets.get(exported.path)?.kind !== 'output' || exportPaths.has(exported.path)) fail(label + ': export must name a unique same-manifest output');
                if (!portable(exported.destination_path) || destinations.has(exported.destination_path.toLowerCase())) fail(label + ': export destination_path must be a unique safe relative receiver path');
                exportPaths.add(exported.path);
                if (typeof exported.destination_path === 'string') destinations.add(exported.destination_path.toLowerCase());
              }
            }
            if (known(handoff.receiver, ['project', 'root', 'owner', 'task', 'consumer'], label + ' receiver')) {
              for (const key of ['project', 'owner', 'task']) if (!nonempty(handoff.receiver[key])) fail(label + ': receiver ' + key + ' required');
              if (!absoluteLocator(handoff.receiver.root)) fail(label + ': receiver root must be an absolute locator');
              if (typeof handoff.receiver.consumer !== 'string' || (handoff.state === 'verified' && !nonempty(handoff.receiver.consumer))) fail(label + ': verified receiver consumer required');
            }
            if (['mesh', 'rig', 'animation'].includes(revision.stage) && (!Array.isArray(handoff.editable_sources) || !handoff.editable_sources.some(relative => assets.get(relative)?.role === 'editable-source'))) fail(label + ': model-handoff for this stage requires a listed editable-source');
          }
          // Each proof binds one export hash to the receiver and observed run.
          // Verification covers every declared export, including bundle sidecars.
          // Independent retained captures/reports have role evidence; a claim
          // record cannot certify itself or substitute for those observations.
          const proofs = records('consumption-proof');
          const coveredExports = new Set();
          for (const asset of proofs) {
            const errorsBeforeProof = errors.length;
            const proof = parseRecord(asset, 'consumption-proof');
            if (!proof) continue;
            known(proof, ['schema', 'character_id', 'revision_id', 'export_sha256', 'receiver_root', 'consumer', 'receiver_revision', 'tool_version', 'run_id', 'result', 'evidence', 'observations'], label + ' consumption-proof');
            if (proof.schema !== 'mrmak.character-consumption-proof/v1' || proof.character_id !== character.id || proof.revision_id !== revision.id) fail(label + ': consumption-proof must bind this exact character and revision');
            const declared = Array.isArray(handoff?.exports) && handoff.exports.some(exported => object(exported) && assets.get(exported.path)?.sha256 === proof.export_sha256);
            if (!HASH.test(proof.export_sha256) || !declared) fail(label + ': consumption-proof must bind a declared export SHA-256');
            if (!handoff || proof.receiver_root !== handoff.receiver?.root || proof.consumer !== handoff.receiver?.consumer || !nonempty(proof.consumer)) fail(label + ': consumption-proof receiver root and consumer must match the handoff');
            for (const key of ['receiver_revision', 'tool_version', 'run_id', 'observations']) if (!nonempty(proof[key])) fail(label + ': consumption-proof ' + key + ' required');
            if (proof.result !== 'pass') fail(label + ': consumption-proof result must be pass');
            evidencePaths(proof.evidence, 'consumption-proof evidence', true, asset.path);
            if (errors.length === errorsBeforeProof) coveredExports.add(proof.export_sha256);
          }
          if (handoff?.state === 'verified' && !proofs.length) fail(label + ': verified model-handoff requires consumption-proof');
          if (handoff?.state === 'verified' && Array.isArray(handoff.exports)) {
            for (const exported of handoff.exports) {
              if (!object(exported)) continue;
              const output = assets.get(exported.path);
              if (output?.kind === 'output' && !coveredExports.has(output.sha256)) fail(label + ': verified model-handoff requires valid consumption-proof for every export: ' + exported.path);
            }
          }
        }
        manifests.set(revision.id, manifest);
      }
      const checkEvidence = async (ref, kind) => {
        if (ref === null) return null;
        const record = await pinned(ref, revisionRoot, `${label} ${kind}`);
        if (!record) return null;
        const fields = kind === 'review' ? ['schema', 'character_id', 'revision_id', 'manifest_sha256', 'verdict', 'notes']
          : ['schema', 'character_id', 'revision_id', 'manifest_sha256', 'by', 'date', 'scope', 'decision'];
        known(record, fields, `${label} ${kind} record`);
        if (record.schema !== `mrmak.character-${kind}/v1` || record.character_id !== character.id || record.revision_id !== revision.id || record.manifest_sha256 !== revision.manifest?.sha256) fail(`${label}: ${kind} must bind this exact character, revision and manifest`);
        if (kind === 'review' && (!['pass', 'fail'].includes(record.verdict) || typeof record.notes !== 'string' || !record.notes.trim())) fail(`${label}: review verdict and notes required`);
        if (kind === 'selection' && (record.scope !== revision.stage || typeof record.by !== 'string' || !record.by.trim() || !/^\d{4}-\d{2}-\d{2}$/.test(record.date) || typeof record.decision !== 'string' || !record.decision.trim())) fail(`${label}: scoped owner decision required`);
        return record;
      };
      const review = await checkEvidence(revision.review, 'review');
      const selection = await checkEvidence(revision.selection, 'selection');
      if (revision.state === 'reviewed' && !review) fail(`${label}: reviewed state lacks review evidence`);
      if (['accepted', 'superseded'].includes(revision.state) && (review?.verdict !== 'pass' || !selection)) fail(`${label}: accepted state lacks passing review or owner selection evidence`);
      if (revision.state === 'rejected' && review?.verdict !== 'fail') fail(`${label}: rejected state requires failed review`);
    }
    for (const [stage, id] of Object.entries(character.selected)) {
      const revision = revisions.get(id);
      if (!STAGES.includes(stage) || !revision || revision.stage !== stage || revision.state !== 'accepted') fail(`${character.id}: selected ${stage}/${id} must be accepted in that stage`);
    }
    for (const revision of revisions.values()) if (revision.state === 'accepted' && character.selected[revision.stage] !== revision.id) fail(`${character.id}/${revision.id}: accepted revision must be the selected pointer for its stage`);
  }
  async function inventory(relative) {
    for (const entry of await readdir(path.join(base, ...relative.split('/')), { withFileTypes: true })) {
      const target = `${relative}/${entry.name}`;
      if (entry.isSymbolicLink()) { fail(`inventory: linked path forbidden ${target}`); continue; }
      if (PRIVATE.test(entry.name)) { fail(`inventory: private receipt/credential file forbidden ${target}`); continue; }
      if (entry.isDirectory()) { await inventory(target); continue; }
      if (!entry.isFile()) { fail(`inventory: unsupported entry ${target}`); continue; }
      if (target === `${TREE}/.gitkeep`) continue;
      if (!indexed.has(target.toLowerCase())) fail(`inventory: unindexed file ${target}`);
    }
  }
  try {
    let cursor = base;
    for (const part of TREE.split('/')) { cursor = path.join(cursor, part); if ((await lstat(cursor)).isSymbolicLink()) throw new Error('linked character-tree ancestor forbidden'); }
    await inventory(TREE);
    if (!(await file(CATALOG, false)).equals(source)) fail('catalog changed during check; repeat against stable files');
  } catch (error) { fail(`inventory: ${error.message}`); }
  return { errors, characters: characterIds.size, files: indexed.size };
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  try {
    const result = await checkLab(root);
    for (const error of result.errors) console.error(error);
    if (result.errors.length) process.exitCode = 1;
    else console.log(`Character Lab check passed: ${result.characters} characters, ${result.files} indexed source files. Registration/integrity only; no visual or engine approval.`);
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
