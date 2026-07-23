# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Durable CSC Motion Production Decisions

For product-highlight videos, preserve product fidelity by generating a complete cinematic keyframe for each scene from the approved product reference and scene prompt. Do not default to cutout compositing. Animate each approved keyframe with restrained image-to-video motion so the result feels like a moving photograph; reject clips whose middle or final frames materially alter the product.

Treat the product silhouette, proportions, construction, materials, finish, and distinctive hardware as locked evidence. Do not invent components that are not visible in the source. When a scene fails this gate, regenerate the still before animating it.

Keep claims, prices, offers, typography, and logos deterministic in the motion-composition layer. Generative image and video prompts must request clean plates with no text or logo. For One Kings Lane product videos, use white all-caps display headlines with visibly generous tracking; keep supporting copy consistent across scenes. Prefer a subtle full-frame heritage-green contrast scrim over opaque text boxes when readability needs help.

Use the product-highlight rhythm as the reusable default: distinction, benefit, material or craft proof, then a cinematic environmental brand resolve. The final scene must show the product at a useful scale in context and end with the approved brand mark.

Require explicit approval of scene plates and animated clips before the final render. Record each revision with the affected scene, observed failure, requested change, gate category, replacement asset, and approval status. Keep assembly idempotent: rerunning the composition step must not delete, duplicate, or reorder video layers.
