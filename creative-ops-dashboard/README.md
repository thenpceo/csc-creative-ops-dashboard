# CSC Creative Ops Dashboard + Brand MCP

CSC Creative Ops is a public dashboard and remote Model Context Protocol (MCP) server for generating brand-aware creative across the CSC Generation portfolio.

- Dashboard: [creative-ops-dashboard-psi.vercel.app](https://creative-ops-dashboard-psi.vercel.app)
- Remote MCP: `https://creative-ops-dashboard-psi.vercel.app/api/mcp`
- Machine-readable manifest: [MCP manifest](https://creative-ops-dashboard-psi.vercel.app/api/mcp-manifest)
- One Kings Lane reference system: [brand detail page](https://creative-ops-dashboard-psi.vercel.app/brands/one-kings-lane)

The MCP does not replace an image model, video model, design tool, or renderer. It gives an agent the brand context, product-fidelity rules, prompt structures, motion direction, media and rights records, production sequence, and hard approval gates needed to operate those tools consistently.

## Install the MCP

### Codex

```bash
codex mcp add csc-creative-ops --url https://creative-ops-dashboard-psi.vercel.app/api/mcp
```

Confirm that it is registered:

```bash
codex mcp list
```

Then tell the agent:

```text
Use CSC Creative Ops for this request. List the available brands, then create a plan for One Kings Lane.
```

### Claude Code

```bash
claude mcp add --transport http csc-creative-ops https://creative-ops-dashboard-psi.vercel.app/api/mcp
```

### Other MCP clients

Add a remote MCP server using Streamable HTTP:

```json
{
  "mcpServers": {
    "csc-creative-ops": {
      "url": "https://creative-ops-dashboard-psi.vercel.app/api/mcp"
    }
  }
}
```

The CSC MCP itself does not require an API key.

## What it does

The server currently exposes five production tools:

| Tool | Purpose |
| --- | --- |
| `list_brands` | Lists the 13 brand packages, capabilities, package versions, and supported templates. |
| `get_brand_system` | Returns canonical tokens, rules, recipes, evaluation gates, and selected capability modules. |
| `plan_creative` | Compiles a request into an execution-ready, brand-aware production plan. Start here for creative work. |
| `get_media_guidance` | Returns rights-aware source media, provenance, roles, and usage constraints. |
| `get_evaluation_gates` | Returns reject gates, weighted review criteria, and approval thresholds. |

It also publishes:

- `make_on_brand_creative`, a reusable MCP prompt for plain-language requests.
- `csc-brand://{brand}/system`, a machine-readable brand-system resource.
- `product-highlight-video.v1`, a gated four-shot product-video template.

Supported output types include:

- Graphics and business cards.
- Websites and interactive experiences.
- Generated product or environment images.
- Motion-design videos.
- Generated video plates.
- Announcement videos.
- Product-highlight videos.
- Storyboards and sequential systems.

One Kings Lane is the production-depth reference implementation. The other brand packages are available through the same contract but should be treated as less mature until their identity research, assets, and evaluation systems receive the same validation depth.

## How an agent should use it

For a normal request, the agent should:

1. Call `list_brands` if the brand slug or capabilities are uncertain.
2. Call `plan_creative` with the brand, output type, request, product URLs, channel, and aspect ratio.
3. Resolve current product facts and authorized product references from the supplied URLs.
4. Stop when the plan reports a blocked stage. Do not infer rights, claims, prices, inventory, or approvals.
5. Generate clean photographic plates without typography, prices, offers, UI, or logos.
6. Add copy, official identity, buttons, and motion as deterministic editable layers.
7. Run the returned product-fidelity, rights, continuity, typography, media-presence, contrast, and runtime gates.
8. Deliver or render only after the required approval state passes.

The MCP is intentionally provider-neutral. It can recommend the successful demo stack, but the permanent brand system does not require a specific image model, video model, or motion renderer.

## Supplemental tools and skills

The CSC MCP supplies direction and orchestration. The connected agent still needs the capabilities that execute the plan.

### Still-image generation

The demo defaults to GPT Image through the connected agent for reference-aware still generation and editing. No additional repository package is required when the agent already provides that image capability. Another reference-aware image model can be substituted as long as it obeys the returned identity locks and review gates.

For product work, every generated image must preserve the authorized product's silhouette, proportions, construction, materials, finish, hardware, seams, and countable details. Generated imagery must not contain brand copy or a synthesized logo.

### fal.ai for generated video

fal.ai is optional and only needed when the plan calls for generated video or image-to-video animation. It uses the user's own fal API key and may incur model charges.

Create a key in the [fal dashboard](https://fal.ai/dashboard/keys), expose it as `FAL_KEY` in the environment that launches Codex, then register fal's hosted MCP:

```bash
codex mcp add fal-ai \
  --url https://mcp.fal.ai/mcp \
  --bearer-token-env-var FAL_KEY
```

For Claude Code, follow fal's current [official MCP setup](https://fal.ai/docs/documentation/setting-up/mcp):

```bash
claude mcp add --transport http fal-ai \
  https://mcp.fal.ai/mcp \
  --header "Authorization: Bearer YOUR_FAL_KEY"
```

Never commit a fal key, paste it into a brand package, or reuse a shared demo credential. Generated-video model upload requires an independent rights decision; internal reference permission alone is not enough.

### HeyGen HyperFrames for motion composition

HyperFrames is the recommended deterministic motion layer for editable typography, official logos, buttons, transitions, timing, full-bleed media, and final rendering.

Install the current skills in the project where the video will be created:

```bash
npx skills add heygen-com/hyperframes --full-depth
```

Choose **Core Skills** in the installer, then restart the coding agent. Refresh installed skills later with:

```bash
npx hyperframes skills update
```

See the [HyperFrames quickstart](https://hyperframes.heygen.com/quickstart). HyperFrames local rendering is free and open-source; optional hosted or generated-media services can have separate costs.

The included HyperFrames adapter keeps approved media declarations durable and idempotent so repeated assembly does not remove, duplicate, or reorder video plates.

### Web and static composition

For websites, graphics, and business cards, use the connected agent's normal front-end or design implementation capabilities. The MCP returns the relevant layout, typography, color, interaction, image, commerce, and evaluation modules; no CSC-specific renderer is mandatory.

## Example requests

### Product graphic

```text
Use CSC Creative Ops to make a 4:5 One Kings Lane paid-social graphic for this product:
https://www.onekingslane.com/example-product

Place the unchanged product in a collected living room at early evening. Keep the image clean, then add the verified headline, official logo, and one action as editable layers. Run every returned gate before delivery.
```

### Product-highlight video

```text
Use CSC Creative Ops and the product-highlight-video.v1 template to create an 18-second 16:9 One Kings Lane product introduction for:
https://www.onekingslane.com/example-product

Build four beats: distinction, benefit, craft proof, and environmental resolve. Generate and approve one unified product-and-environment keyframe per shot, animate approved plates with restrained motion, then compose verified copy and official identity in HyperFrames. Show me the preview and QA evidence before any final render.
```

### Website or landing page

```text
Use CSC Creative Ops to design and implement a responsive One Kings Lane collection landing page. Load the interactive, imagery, commerce, and marketing modules; keep offers as current runtime data; and test the final responsive layouts against the brand evaluation gates.
```

## Product-highlight safeguards

The `product-highlight-video.v1` workflow uses a reusable four-beat arc:

1. Distinction.
2. Benefit.
3. Material or craft proof.
4. Whole-product context and official brand resolve.

It blocks downstream stages when any of the following is missing or failed:

- Product source or authorized reference.
- Model-upload permission.
- Verified feature claims.
- Generated-keyframe fidelity.
- Start, midpoint, or end-frame continuity.
- Cross-shot product continuity.
- Deterministic font resolution.
- Media presence, contrast, or runtime QA.
- Explicit preview approval.

This prevents an agent from hiding a mutated product behind motion, typography, cropping, or a polished final render.

## Repository structure

```text
brand-packages/one-kings-lane/   Canonical One Kings Lane system and capability modules
creative-ops-dashboard/mcp/      Remote MCP server and compiled brand data
creative-ops-dashboard/api/      Vercel MCP and manifest handlers
creative-ops-dashboard/src/      Dashboard interface
creative-ops-dashboard/orchestration/
                                 Provider-neutral routes and production templates
creative-ops-dashboard/adapters/ Provider-specific execution guidance
creative-ops-dashboard/examples/ Editable and rendered internal examples
creative-ops-dashboard/tests/    MCP, Sites, and adapter regression tests
```

## Local development

From `creative-ops-dashboard`:

```bash
npm install
npm run dev
```

Run validation and builds:

```bash
npm test
npm run build
```

Useful focused commands:

```bash
npm run test:mcp
npm run test:adapters
npm run test:sites
npm run sync:mcp
npm run sync:brands
```

## Rights and security

- Publicly visible brand imagery is evidence, not automatic production authorization.
- Every media record retains provenance, rights status, permitted uses, and human-review requirements.
- Prices, offers, inventory, specifications, dates, and claims must come from current authoritative sources.
- Official identity uses supplied artwork; it is never recreated as generated text.
- API keys and credential paths must never enter the repository, MCP responses, brand packages, examples, or client bundle.
- Public repository visibility does not grant reuse rights to third-party trademarks, product imagery, campaign media, or fonts.

## Current versions

- CSC Creative Ops MCP: `1.2.1`
- One Kings Lane package: `1.3.0`
- Product-highlight template: `product-highlight-video.v1`

