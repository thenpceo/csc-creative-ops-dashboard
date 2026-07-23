# Brand production router

This directory holds provider-neutral production routes and reusable template contracts consumed by the CSC Creative Ops MCP.

## Plain-language request flow

1. Resolve the brand name to a brand package ID.
2. Classify the requested output, such as a static product graphic or motion product explainer.
3. Load only the package modules declared by that route.
4. Resolve official identity, product references, examples, and rights from `media.json`.
5. Ask only for missing business facts or authorization. Do not ask the user to restate brand guidance already in the package.
6. Run the selected production skills and provider adapters.
7. Apply product-truth, claims, rights, continuity, and brand-fit gates before returning an output.
8. Record the package version, rules, recipes, media IDs, skills, adapters, and model endpoint used.

## Future MCP surface

The first useful server should stay small:

- `list_brands()` — IDs, names, package versions, and supported capabilities.
- `get_brand_context(brand_id, output_type)` — validated, capability-filtered context with resolved IDs.
- `resolve_brand_media(brand_id, roles, intended_use)` — candidate media plus rights decision.
- `compile_brand_job(brand_id, output_type, brief)` — route, variable slots, locked invariants, stages, and gates.
- `evaluate_brand_output(brand_id, output_type, artifact, evidence)` — hard-gate results and weighted brand score.

Generation and rendering do not need to be reimplemented inside the brand MCP. fal.ai already exposes model discovery, schemas, pricing, upload, job submission, and result polling through its hosted MCP. HyperFrames already exposes its production behavior through installed agent skills and a CLI. The brand MCP should orchestrate those systems by returning validated context and job contracts.

For this demo, route all still-image generation and reference editing through GPT Image by default so no external image-generation charge is incurred. Use fal.ai only for generated video, and use HyperFrames for deterministic motion composition. This is an orchestration policy, not a brand rule.

## Static product graphic

The clean scene is generated first from the authorized product reference and the brand's `generative-image` recipe. Product fidelity is evaluated before typography, offer copy, action treatment, and the official logo are composited with the static/UI guidance. This separation prevents generated logos, illegible text, or a mutated product from being hidden inside a finished ad.

## Motion product explainer

The generated-video adapter creates clean, continuity-checked background plates. HyperFrames then uses the brand's static, motion, sequential, and commerce guidance to add crisp benefit copy, official identity, transitions, timing, and the final end frame. Generated footage never owns brand typography or claims.

## Product highlight video

`templates/product-highlight-video.v1.json` is the reusable contract for short cinematic product introductions. It requires one distinct, approved unified keyframe per shot, restrained image-to-video motion, start/midpoint/end temporal review, cross-shot continuity, deterministic copy and identity, idempotent media assembly, and explicit preview approval before rendering.

The default 18-second arc is distinction, benefit, proof, then whole-product context and brand resolve. Brand packages specialize typography, color, layout, motion, imagery, and evaluation behavior without naming providers. Product URLs, facts, claims, reference images, rights, product-specific invariants, and approval state remain job inputs.
