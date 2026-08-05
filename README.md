# CSC Creative Ops

CSC Creative Ops is a public brand-system dashboard and remote Model Context Protocol (MCP) server for creating governed, on-brand graphics, websites, image campaigns, motion systems, and videos across the CSC Generation portfolio.

- [Open the dashboard](https://creative-ops-dashboard-psi.vercel.app)
- [Explore the One Kings Lane system](https://creative-ops-dashboard-psi.vercel.app/brands/one-kings-lane)
- [Read the machine-readable MCP manifest](https://creative-ops-dashboard-psi.vercel.app/api/mcp-manifest)
- [Open the detailed operating guide](creative-ops-dashboard/README.md)

## Install the MCP

### Codex

```bash
codex mcp add csc-creative-ops --url https://creative-ops-dashboard-psi.vercel.app/api/mcp
```

### Claude Code

```bash
claude mcp add --transport http csc-creative-ops https://creative-ops-dashboard-psi.vercel.app/api/mcp
```

The CSC MCP is public and does not require an API key. After installation, ask the agent:

```text
Use CSC Creative Ops to plan an on-brand One Kings Lane graphic for this product URL. Resolve current product facts, preserve the product exactly, and run every returned approval gate before delivery.
```

## What the MCP does

The MCP gives an agent access to:

- All 13 CSC brand packages and their capability status.
- Canonical brand tokens, layout rules, typography, imagery, commerce, motion, and interaction guidance.
- Product-fidelity locks and reference-aware image prompt structures.
- Media provenance, rights status, and permitted-use records.
- Production-ready creative plans for graphics, websites, images, storyboards, and video.
- Evaluation gates for product fidelity, typography, identity, continuity, contrast, runtime behavior, and approval state.
- A gated four-shot `product-highlight-video.v1` template.

The server exposes five primary tools:

| Tool | Purpose |
| --- | --- |
| `list_brands` | Discover brands, versions, capabilities, and templates. |
| `get_brand_system` | Load canonical rules, tokens, recipes, and selected modules. |
| `plan_creative` | Turn a plain-language request into a governed production plan. |
| `get_media_guidance` | Retrieve rights-aware references and usage constraints. |
| `get_evaluation_gates` | Retrieve reject gates and approval criteria. |

The MCP is the brand and orchestration layer. It does not itself render an image or video; the connected agent uses its available creative tools to execute the returned plan.

## Supplemental capabilities

The MCP is provider-neutral, but the reference workflow recommends these optional capabilities when a request needs them.

### Still images

The demo defaults to GPT Image through the connected agent for reference-aware still generation and editing. An alternative image model can be used if it obeys the returned product locks, identity rules, and evaluation gates.

### fal.ai for generated video

fal.ai is optional and only needed for generated video or image-to-video plates. It uses the user's own API key and may incur model charges.

```bash
codex mcp add fal-ai \
  --url https://mcp.fal.ai/mcp \
  --bearer-token-env-var FAL_KEY
```

See fal's [official MCP setup](https://fal.ai/docs/documentation/setting-up/mcp). Never commit or paste a fal key into this repository or a brand package.

### HeyGen HyperFrames for motion composition

HyperFrames is the recommended deterministic motion layer for editable typography, official logos, buttons, timing, transitions, full-bleed media, and final rendering.

```bash
npx skills add heygen-com/hyperframes --full-depth
```

Choose **Core Skills** in the installer and restart the coding agent. Refresh later with:

```bash
npx hyperframes skills update
```

See the [HyperFrames quickstart](https://hyperframes.heygen.com/quickstart).

## How agents should operate

1. Start with `plan_creative`; do not guess which brand modules are needed.
2. Resolve current product facts and authorized references from supplied URLs.
3. Stop at blocked stages instead of inventing rights, claims, prices, inventory, or approvals.
4. Generate clean photographic plates without logos, UI, prices, offers, or typography.
5. Add verified copy, official identity, controls, and motion as deterministic editable layers.
6. Run every returned gate and require explicit approval where the workflow calls for it.

One Kings Lane is currently the production-depth reference implementation. The other brand packages use the same contract but should be treated as less mature until they receive the same research, asset, and evaluation depth.

## Repository map

```text
brand-packages/             Canonical brand packages and capability modules
brand-system-spec/          Portable system contract and schemas
creative-ops-dashboard/     Dashboard, remote MCP, orchestration, adapters, and tests
design-systems/             Source design-system research and documentation
research/                   Audits and source material
scripts/                    Validation and synchronization utilities
```

For example prompts, the full production sequence, rights guidance, local setup, and testing commands, see the [MCP operating guide](creative-ops-dashboard/README.md).

## Rights and security

Public visibility is evidence, not automatic production authorization. Media records retain provenance, rights status, permitted uses, and human-review requirements. Product facts must come from current authoritative sources, official identity must use supplied artwork, and API keys must never enter the repository, MCP responses, examples, or client bundle.

