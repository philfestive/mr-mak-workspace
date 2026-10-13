# Creative tools: setup and agent routing

Reviewed 2026-10-12. Lane 08 owns this report only. Recommendation: keep shared review skills, then select provider connections and local applications per task. A skill, an installed executable, a saved MCP definition and a successful live check are separate facts.

## Observed availability

| Route | Kind | Evidence and remaining check |
| --- | --- | --- |
| fal.ai generation | Hosted MCP or Python SDK | Repository skill and queue helper exist. No fal tool appears in this review session's tool metadata. Lane 04 found several fal client definitions under `E:/Dev/RecompileGodot/vendor/universal-modder`; they remain that project's configuration, with live access unverified. |
| Higgsfield | CLI/account plus optional Blender companion | Repository workflow exists. `Get-Command higgsfield` returned no command. Vendor tools are not bundled with this repository skill. Companion installation and authentication are unknown. |
| Blender authoring | Native application/scripts; optional third-party MCP | Animation workflow exists. No Blender MCP appears here, `blender` is absent from PATH, and no Blender-named directory appeared in the bounded `C:/Program Files` listing. This does not prove Blender is absent elsewhere. |
| imagegen | Built-in tool or separate API CLI | `image_gen__imagegen` is exposed in this session. That establishes callable tool availability; no generation or quota check was performed. The installed skill defaults to the built-in route without `OPENAI_API_KEY`. |
| video-watch | Local Python extractor | Helper and requirements exist. FFmpeg resolves to a WinGet package path. No repository `.venv` or `.venv-video` interpreter exists at the checked paths; package import/decode checks remain unverified. |

Python launcher execution returned **Python 3.12.10**. The fal helper's `--help` and `submit --dry-run` both exited 0. The dry run read neutral sample inputs, created no output folder and did not inspect credentials or contact fal. It establishes input plumbing, not SDK installation, account access or schema validity.

Sources: [fal workflow](../../../../../.agents/skills/fal-ai-generation/SKILL.md), [Higgsfield workflow](../../../../../.agents/skills/higgsfield-workflow/SKILL.md), [Blender workflow](../../../../../.agents/skills/blender-game-animation/SKILL.md), [video workflow](../../../../../knowledge/video-watch.md), [lane 04](04-d-e-drives.md). Imagegen source: `C:/Users/haslo/.codex/skills/.system/imagegen/SKILL.md`; availability comes from this session's tool metadata, not a disk configuration.

## Authentication routes must be reconciled

The current official fal guide uses Streamable HTTP at `https://mcp.fal.ai/mcp-relay` with OAuth browser sign-in, without a key/header. Its documentation-only server is `https://fal.ai/docs/mcp`. The active MCP billing account is separate from the website switcher. Confirm that account before spending. Model search is a non-generation connection check. [Official fal MCP guide](https://fal.ai/docs/documentation/setting-up/mcp).

The repository's [setup reference](../../../../../.agents/skills/fal-ai-generation/references/setup.md) instead documents historical `https://mcp.fal.ai/mcp` with Bearer authentication. Treat that as a reconciliation item; neither this review nor the current guide establishes that the older endpoint is broken. Do not automatically copy its header template into new OAuth setups.

| Route | Credential mechanism or variable names only |
| --- | --- |
| Current fal MCP | Client-managed OAuth; no environment variable required by the cited guide |
| Repository fal Python helper | `FAL_KEY`; accepts legacy `FALAI_KEY` and `MRMAK_MCP_FAL_AUTHORIZATION` |
| Historical Mr. Mak fal MCP template | `MRMAK_MCP_FAL_AUTHORIZATION`; retained for audit, not the proposed default |
| Higgsfield CLI | Official browser/account login via `higgsfield auth login`; no mandatory environment variable established by this review |
| Built-in imagegen | No `OPENAI_API_KEY` required by installed skill |
| Explicit imagegen API fallback | `OPENAI_API_KEY`; separate account/billing and dependencies |
| Blender and local video inspection | No provider key needed for local authoring/decoding |

The [official Higgsfield CLI](https://github.com/higgsfield-ai/cli) documents Windows npm installation, authentication, model/schema discovery, cost estimation and job retrieval. Its [vendor skills](https://github.com/higgsfield-ai/skills) are a distinct distribution. The reviewed primary READMEs did not establish a Blender companion setup contract: request its exact vendor/package before choosing that route. Do not assume a Higgsfield skill creates an MCP server.

## Proposed role profiles

| Task profile | Tools to expose | Deliverable |
| --- | --- | --- |
| Creative reviewer | Routing, image/reference inspection, video-watch | Timestamped observations and acceptance criteria |
| Concept/editor | Built-in imagegen, or the task's selected fal/Higgsfield route | Selected local images, prompts and review verdict |
| Generated asset producer | Selected provider, uploads and recoverable queue route | Downloaded mesh/maps/video/audio plus provenance |
| Blender animator | Known Blender executable and authoring skills; companion only if selected | Editable `.blend`, runtime export, clip manifest and clean reimport evidence |
| Engine integrator | Project-bound engine tools and integration/review skills | Import, materials, playback and gameplay evidence |

These are reusable task profiles, not permanent agent appointments or authorization to enable every service.

## Staged setup and checks

1. Record client/account home, owning project, selected route/model, output folder and spending allowance. Read that project's rules. Preserve existing configurations and external project ownership.
2. Prepare a reviewed change for the exact client scope. For fal, reconcile the historical templates against current OAuth instructions first. Keep credentials in the client's store or ignored scoped environment; share variable names only. Activation, installation and sign-in remain outside this review.
3. For local tooling, discover exact executable paths and versions. Use `py -3.12` or a declared tool venv, never the older docs' bare `python`. Check fal requirements (`fal-client`, `python-dotenv`) and video requirements (`yt-dlp`, `scenedetect`, `opencv-python`) before proposing installation.
4. In the intended new session, check tools and perform a model search/schema read without generation. Verify billing context separately. For local tools, use help/import checks and a supplied local clip or disposable scene after runtime work is authorized.
5. Only after a real production request, confirm exact schema and price, submit once, retain endpoint/job ID and private receipt, resume that job after timeout, download outputs and inspect them. Retry downloads from the same result. Keep estimates separate from observed billing.

Keep private receipts and signed upload links out of Git. Register approved local outputs in the existing task card; preserve editable sources. A completed provider job does not prove a game-ready mesh, accepted animation or engine integration. Native scene/import checks are separate. Unknowns remaining: account authorization, balances/quotas, SDK imports, Blender location/companion provenance, legacy fal compatibility and provider access for future client profiles.
