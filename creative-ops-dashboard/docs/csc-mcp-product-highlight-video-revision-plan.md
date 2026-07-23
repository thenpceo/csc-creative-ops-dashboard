# CSC Creative Ops MCP revision plan: product-highlight video system

Status: implementation proposal
Source project: `/Users/nicholas/Documents/CSC Demo/videos/okl-eldin-product-introduction`
Reference product: One Kings Lane Eldin Table Lamp
Reference URL: `https://www.onekingslane.com/p-eldin-table-lamp-smoked-P112835756?sku=112835756`

Companion specifications:

- `docs/product-highlight-video-template.v1.proposed.json`
- `docs/one-kings-lane-eldin-iteration-ledger.proposed.json`

## 1. Outcome to preserve

Add a reusable `product-highlight-video` production template to CSC Creative Ops. The template should accept a product URL, resolve current product facts and authorized reference imagery, generate a separate cinematic still for every shot, animate each still with restrained image-to-video motion, and compose copy and official identity as deterministic layers.

The template must encode the distinction between:

1. Reusable production behavior shared by CSC brands.
2. Brand-specific motion, type, color, composition, and identity guidance.
3. Product-specific facts, imagery, claims, and fidelity locks.
4. Project-only creative choices that should not become permanent brand rules.

The completed Eldin workflow is the reference implementation, not a universal visual style. Its production method should become reusable; its One Kings Lane typography and palette should remain brand-scoped.

## 2. What the current MCP already gets right

The current server and package architecture already establishes several correct boundaries:

- `plan_creative` is the required first call.
- GPT Image or another still-image system creates clean visual plates.
- Fal image-to-video animates clean plates.
- HyperFrames owns deterministic typography, identity, transitions, timing, and rendering.
- Generated imagery and footage must not contain words, prices, offers, UI, or logos.
- Product truth, rights, readability, accessibility, and offer truth are hard gates.
- One Kings Lane already has `generative-image`, `generative-video`, `motion`, and `sequential` modules.

The revision should extend this architecture, not replace it.

## 3. Feedback and iteration captured from the Eldin run

### 3.1 Initial request

The requested artifact was an 18-second One Kings Lane product introduction with:

- three product-feature scenes;
- varied angles and lighting;
- one listing-supported feature or description per scene;
- a final cinematic room scene;
- an official One Kings Lane logo resolve.

### 3.2 Rejected approach: foreground cutout compositing

The first implementation direction treated the product as a separate deterministic cutout placed over a generated or animated room.

User feedback:

> This isn't the right approach for keeping the product fidelity.

Why it failed:

- The product and environment did not feel optically unified.
- Contact, shadow, light direction, scale, and room integration read as compositing.
- A deterministic cutout preserved pixels but reduced perceived realism.
- The technique made the product look pasted into the scene rather than photographed there.

Promote to reusable template rule:

> For cinematic product-highlight shots, generate one unified product-and-environment still from the authorized product reference. Do not default to a product cutout over a separately generated room.

Keep as an exception:

- Deterministic cutout compositing remains valid for catalog graphics, UI annotations, price cards, or intentionally graphic motion.
- It is not the default for a photoreal cinematic product introduction.

### 3.3 Accepted approach: one generated keyframe per scene

The accepted workflow was:

1. Select the official product image that best resolves the required angle or feature.
2. Use that image plus a scene-specific prompt in GPT Image 2.
3. Generate one unified cinematic still containing the product and environment.
4. Review product fidelity before video generation.
5. Animate the approved still with Fal image-to-video.
6. Add copy and logo afterward as deterministic layers.

User clarification:

> You should be generating new cinematic images for each scene with GPT Image 2, using the product image plus prompt as the input, then animating those with fal.ai for each of the scenes.

Promote to reusable template rule:

> Every product-highlight shot receives its own approved start image. Do not reuse one plate across multiple feature beats unless the brief explicitly calls for continuity in one environment.

### 3.4 Scene-by-scene production record

#### Scene 1: distinction

- Role: opening material and silhouette hook.
- Reference: official sculpted wood-profile image.
- Lighting: warm atelier raking light.
- Camera: restrained macro drift.
- Copy: `A SOPHISTICATED CREATION` / `BY CHAPMAN & MYERS`.
- Generated still: `assets/scene-stills/01-distinction-gpt.png`.
- Animated plate: `assets/scene-videos/01-distinction-kling-raw.mp4`.
- Fal request: `019f8d10-0392-78d0-a170-d7991fd72878`.

#### Scene 2: casual elegance

- Role: linen, brass, and smoked-finish relationship.
- Reference: official brass-and-shade product detail.
- Lighting: cool morning side light.
- Camera: restrained drift with open copy space at right.
- Copy: `CASUAL ELEGANCE` / `A graceful decorative presence`.
- Generated still: `assets/scene-stills/02-casual-elegance-gpt.png`.
- Animated plate: `assets/scene-videos/02-casual-elegance-kling-raw.mp4`.
- Fal request: `019f8d10-0038-7ad0-a173-18b7d27b1ccd`.

Rejected generation:

- An early output invented exposed hardware and changed the upper assembly.
- It was rejected rather than repaired.
- The corrected generation used one clean, correct reference image.

Promote to reusable gate:

> Reject a generated still when any visible part, connector, hardware element, seam, proportion, or countable feature is invented or removed. Do not hide the defect with crop, copy, or animation.

#### Scene 3: craftsmanship

- Role: material and finish proof.
- Reference: official finish-detail image.
- Lighting: low amber gallery light.
- Camera: restrained lateral material study.
- Copy: `TIMELESS DESIGN` / `Refined craftsmanship`.
- Generated still: `assets/scene-stills/03-craftsmanship-gpt.png`.
- Animated plate: `assets/scene-videos/03-craftsmanship-kling-raw.mp4`.
- Fal request: `019f8d0f-fe77-7d93-aba5-45b35706beaf`.

Accepted design revision:

- The original white copy panel felt like a card placed over the footage.
- The panel and border were removed.
- White typography and a white hairline were placed directly over the dark material field.

Promote to One Kings Lane motion pattern:

> On dark, quiet material photography, prefer borderless white editorial type directly on the plate. Use a panel only when contrast or visual noise requires one.

Do not promote as a universal rule:

- Other CSC brands may require cards, fields, outlines, or product-data containers.

#### Scene 4: environment and brand resolve

- Role: demonstrate ambiance, then close with brand identity.
- Reference: official full-product image plus the selected generated room.
- Lighting: soft collected-interior daylight.
- Camera: nearly locked room observation.
- Copy: `ENHANCES THE AMBIANCE` / `with understated charm`.
- Generated still: `assets/scene-stills/04-environment-gpt.png`.
- Animated plate: `assets/scene-videos/04-environment-kling.mp4`.
- Fal request: `019f8d10-0002-7c41-9309-f4910bf302e3`.

Rejected generation:

- The first unified room image made the shade too narrow relative to the base.
- The image was regenerated with the shade corrected to approximately `1.7×` the base width and the three sculptural body sections preserved.

Promote to reusable gate:

> Whole-product context shots require explicit proportion checks, not only general visual similarity. Record at least one product-specific ratio or countable structural invariant when the reference supports it.

### 3.5 Accepted motion behavior

All four approved stills were animated with:

- provider: Fal;
- model used in this run: `fal-ai/kling-video/v3/turbo/pro/image-to-video`;
- one subtle camera move per shot;
- minimal environmental motion;
- stable furniture and product geometry;
- no generated text or identity;
- calm ending frames for deterministic overlays.

Promote to reusable template rule:

> Product-highlight footage should behave like a moving photograph. The product itself is not the motion source. Motion comes from restrained camera travel, daylight, curtain movement, foliage, reflection, or another low-amplitude environmental cue.

### 3.6 Continuity review

The accepted continuity process sampled the beginning, middle, and end of every generated clip.

Reviewed invariants:

- shade geometry;
- brass neck and hardware;
- smoked finish;
- sculpted body count and silhouette;
- product placement and support contact;
- room geometry;
- light direction;
- object duplication;
- texture stability.

Evidence:

- `snapshots/kling-all-scenes-continuity.jpg`

Promote to reusable hard gate:

> A generated video plate cannot advance to motion composition until start, midpoint, and end samples pass product and geometry review.

### 3.7 Typography and hierarchy iteration

The accepted final treatment was:

- all overlay copy in white;
- primary scene lines in uppercase;
- primary font: deterministic `EB Garamond`;
- primary tracking: `0.06em`;
- supporting font: deterministic `Inter`;
- supporting scale: `1.4cqw`;
- supporting font kept consistent in every scene;
- official logo remains supplied artwork, never recreated as type.

Why:

- Tight negative serif tracking did not harmonize with the official One Kings Lane wordmark.
- The brand-observed Chronicle Display and Sofia Pro files were not licensed or bundled.
- HyperFrames maps common system fallbacks to deterministic render fonts.
- Naming `EB Garamond` and `Inter` directly prevents preview-to-render substitution.

Promote to One Kings Lane motion tokens:

```json
{
  "motionDisplay": {
    "family": "EB Garamond",
    "sourceRole": "render-safe substitute for Chronicle Display",
    "case": "uppercase",
    "weight": 400,
    "letterSpacingEm": 0.06
  },
  "motionSupport": {
    "family": "Inter",
    "sourceRole": "render-safe substitute for Sofia Pro",
    "weight": 400,
    "sizeCqw": 1.4,
    "letterSpacingEm": 0.06
  }
}
```

Promote to cross-brand runtime rule:

> Brand font tokens and render font tokens must be separate. A plan must name whether licensed font files are available. Preview and render must use the same resolved font family.

### 3.8 Contrast iteration

White type on the pale Scene 2 wall initially failed contrast.

Accepted correction:

- retain white typography;
- add a heritage-green edge-to-transparent gradient behind the right-side copy;
- do not add a rectangular copy card;
- rerun contrast sampling.

Final QA:

- `3/3` sampled text checks passed WCAG AA.

Promote to reusable rule:

> When copy color is brand-locked, repair contrast with a spatially soft plate treatment before introducing a hard card. The treatment must preserve product visibility and remain a deterministic layer.

### 3.9 Assembly failure discovered during revision

Re-running the HyperFrames assembly after the initial build removed the already-hoisted host video elements because the frame files had been destructively replaced with:

```html
<!-- approved frame video hoisted by assemble-index -->
```

The rebuilt host temporarily contained only typography and no moving plates.

Recovery:

- restore approved video declarations to all four frame files;
- reassemble once;
- retain host video elements;
- restore host-level transition tweens for the video plates;
- keep scene wrappers above video plates with `z-index: 1`;
- re-capture the full timeline.

Promote to adapter engineering requirement:

> Assembly must be idempotent. Approved media declarations must live in a durable manifest or remain reconstructable after hoisting. Re-running assembly must not remove media from the host.

Add a regression test:

1. Assemble a project with four approved frame videos.
2. Assemble the generated project a second time without manually restoring frame files.
3. Assert the host still contains four playable video elements.
4. Assert all video sources return `200`.
5. Assert transition tweens address both scene wrappers and video plates.

### 3.10 Review and approval behavior

The successful review loop used:

- a live HyperFrames Studio preview;
- fixed-time snapshots;
- contact sheets;
- continuity sheets for generated clips;
- direct user feedback on product fidelity, copy color, panel use, capitalization, tracking, and font consistency;
- validation after every material typography or layout change;
- no final MP4 render before explicit approval.

Promote to reusable workflow rule:

> Treat user visual feedback as structured QA evidence. Record the observation, rejected state, accepted change, promotion scope, and verifying artifact.

## 4. Proposed generic product-highlight template

Add a provider-neutral template:

`orchestration/templates/product-highlight-video.v1.json`

Proposed public ID:

`product-highlight-video.v1`

### Required inputs

- `brandId`
- `productUrls`
- `objective`
- `audience`
- `channel`
- `aspectRatio`
- `durationSeconds`
- `featureClaims`
- `rightsDecision`
- `approvalMode`

### Default 18-second structure

| Time | Function | Visual scale | Default lighting | Copy role |
|---|---|---|---|---|
| `0–4s` | distinction hook | macro silhouette/material | warm raking | product distinction |
| `4–8s` | aesthetic benefit | medium product detail | cool directional | benefit |
| `8–12s` | craft proof | macro construction/finish | low amber | proof |
| `12–18s` | contextual payoff and brand resolve | wide product-in-room | natural interior | ambiance + official identity |

The sequence is configurable. The invariant is scale progression and one new idea per beat, not the exact adjectives or lighting colors.

### Per-shot production contract

Each shot must include:

- one story function;
- one verified claim or no claim;
- one authorized product-reference selector;
- one scene-generation prompt;
- locked product invariants;
- editable scene variables;
- one generated start image;
- start-image fidelity decision;
- one image-to-video prompt;
- one camera move;
- one allowed environmental motion;
- start/mid/end sample evidence;
- deterministic overlay spec;
- transition and duration;
- rights status;
- evaluation references.

### Final resolve

- use official logo artwork only;
- preserve proportions and clear space;
- keep logo and type outside generated footage;
- use an uncluttered field or controlled translucent brand field;
- hold for at least `1.2s`;
- verify the final sampled frame.

## 5. Proposed MCP API changes

### 5.1 Add an explicit output type

In `mcp/server.mjs`, add:

```js
"product-highlight-video"
```

Recommended capabilities:

```js
[
  "generative-image",
  "generative-video",
  "motion",
  "sequential",
  "imagery",
  "commerce",
  "marketing"
]
```

Do not alias this to `motion-video`. The template requires both still generation and image-to-video generation before deterministic motion composition.

### 5.2 Extend `plan_creative`

Add optional inputs:

- `templateId`
- `durationSeconds`
- `featureClaims`
- `approvalMode`
- `referencePolicy`

Add returned fields:

- `templateContract`
- `shotPlan`
- `continuityLedger`
- `generationPolicy`
- `typographyResolution`
- `reviewPlan`
- `renderPolicy`
- `revisionLedgerSchema`

### 5.3 Keep provider names outside brand rules

The template should request capabilities:

- reference image editing;
- image-to-video;
- deterministic motion composition.

The runtime plan may recommend:

- GPT Image;
- Fal Kling;
- HyperFrames.

The One Kings Lane brand package must not require those providers by name.

### 5.4 Add template discoverability

Preferred minimal approach:

- include supported `templateIds` in `list_brands`;
- accept `templateId` in `plan_creative`;
- return the resolved template contract.

Optional later tool:

- `list_creative_templates(brand?, outputType?)`

Do not add a dedicated generation tool for each template.

### 5.5 Versioning

- MCP server: `1.1.0` → `1.2.0`.
- Template contract: independent `1.0.0`.
- One Kings Lane package: `1.2.0` → `1.3.0`.
- Preserve existing output types and response fields.

## 6. Proposed One Kings Lane package changes

### `tokens.json`

Add motion-specific typography resolution:

- observed brand family;
- licensed asset requirement;
- render-safe family;
- uppercase behavior;
- tracking;
- support family and scale;
- inverse text color;
- contrast scrim preference.

Do not overwrite web typography roles. Motion requires a distinct runtime resolution.

### `modules/generative-image.json`

Add:

- `gen-image.product-highlight-keyframe`;
- one reference choice per shot;
- explicit proportion/count checks;
- unified plate requirement;
- rejection of cutout-over-room as the cinematic default;
- clean-plate requirement with no words or logo.

### `modules/generative-video.json`

Add:

- `gen-video.product-highlight-shot`;
- moving-photograph motion doctrine;
- start/mid/end sampling requirement;
- no product-driven motion by default;
- calm final frame;
- whole-shot rejection on drift.

### `modules/sequential.json`

Add:

- `sequential.product-highlight-18`;
- distinction → benefit → proof → context/resolve;
- one reference and one claim per feature shot;
- scale progression;
- final identity hold.

Keep the current 10-second and 15-second recipes.

### `modules/motion.json`

Add:

- `motion.product-highlight-overlay`;
- white inverse copy over cinematic plates;
- uppercase tracked editorial primary lines;
- consistent interface support type;
- borderless direct type over quiet dark material fields;
- soft brand scrim over pale or visually active copy regions;
- logo resolve on controlled heritage field;
- scene and media transitions treated together.

### `evaluation.json`

Add reject gates:

- `gate.generated-keyframe-product-fidelity`
- `gate.temporal-product-continuity`
- `gate.cross-shot-product-continuity`
- `gate.deterministic-typography`
- `gate.media-presence`

Add evidence requirements:

- start-image comparison;
- start/mid/end clip samples;
- final contact sheet;
- font-resolution report;
- runtime/layout/motion/contrast report.

### `DESIGN.md`

Add a “Product-highlight motion video” section that documents:

- appropriate use;
- 18-second default beat structure;
- per-shot keyframe generation;
- restrained animation;
- typography resolution;
- contrast treatments;
- final resolve;
- reject examples;
- review evidence.

### `media.json`

After an approved MP4 is rendered and rights review is complete:

- register the Eldin example as `example.motion.eldin-product-highlight`;
- mark it `experimental` or `internal-review`, not approved catalog media;
- include source product URL, package version, model endpoints, request IDs, duration, dimensions, checksums, and human-review requirement;
- register a contact sheet and continuity sheet as evaluation evidence if the schema is extended to support evidence records.

Do not catalog API keys, local credential paths, or unrestricted public redistribution rights.

## 7. Adapter changes

### `adapters/fal/ONE-KINGS-LANE.md`

Document:

- one approved start image per shot;
- one camera move and one environmental action;
- sampled-frame review;
- request ID recording;
- whole-shot rejection;
- provider/model as runtime metadata rather than a brand invariant.

### `adapters/hyperframes/ONE-KINGS-LANE.md`

Document:

- deterministic `EB Garamond` and `Inter` motion fallback;
- `0.06em` primary tracking;
- persistent support type;
- video-plate and scene-wrapper transitions;
- idempotent media declarations;
- fixed-time snapshot plan;
- no render before approval.

### HyperFrames assembly

Open an upstream issue or patch the local workflow so approved video hoisting is not destructive.

Preferred fix:

- maintain a project-level media manifest;
- generate host video nodes from the manifest;
- leave frame source declarative and unchanged.

Minimum fix:

- preserve enough metadata in the replacement comment to reconstruct the video on a later assembly pass.

## 8. Proposed revision ledger

Every iterative creative job should produce a structured ledger.

Required fields:

- `revisionId`
- `timestamp`
- `trigger`
- `observation`
- `rejectedState`
- `acceptedChange`
- `promotionScope`
- `affectedCapabilities`
- `evidence`
- `verification`
- `status`

Promotion scopes:

- `project-only`
- `brand-token`
- `brand-rule`
- `brand-recipe`
- `generic-template`
- `adapter-runtime`
- `evaluation-gate`

The Eldin ledger is provided in:

`docs/one-kings-lane-eldin-iteration-ledger.proposed.json`

## 9. File-by-file implementation order

### Phase 1: generic contract

1. Add `orchestration/templates/product-highlight-video.v1.json`.
2. Add template fields to `orchestration/production-router.json`.
3. Update `mcp/server.mjs` output type, input schema, response contract, and server version.
4. Extend `tests/mcp-server.test.mjs`.

### Phase 2: One Kings Lane specialization

1. Update `tokens.json`.
2. Update `modules/generative-image.json`.
3. Update `modules/generative-video.json`.
4. Update `modules/sequential.json`.
5. Update `modules/motion.json`.
6. Update `evaluation.json`.
7. Update `DESIGN.md`.
8. Bump package version to `1.3.0`.

### Phase 3: adapters and example

1. Update Fal guidance.
2. Update HyperFrames guidance.
3. Add an editable Eldin example project after removing credentials and nonportable paths.
4. Render an approved internal MP4 only when requested.
5. Register example and evidence records with accurate rights status.

### Phase 4: generated data and validation

1. Run package validation.
2. Run `npm run sync:mcp`.
3. Run `npm run test:mcp`.
4. Run `npm run build`.
5. Run `npm run test:sites`.
6. Inspect the returned `plan_creative` payload for One Kings Lane and at least one other brand.

## 10. Required tests

### MCP contract tests

- `plan_creative` accepts `product-highlight-video`.
- The plan includes all seven required capability modules.
- The plan returns four default beats for an 18-second request.
- Every shot declares a reference, locked invariants, editable variables, copy overlay, and evidence plan.
- Fal and HyperFrames are recommended only when their capabilities are needed.
- Provider names are absent from permanent brand rules.

### Product-fidelity tests

- A missing product reference closes the plan.
- Unknown rights close model-upload stages.
- A failed keyframe fidelity decision prevents video generation.
- A failed midpoint or end-frame decision prevents composition.
- A failed cross-shot product check prevents render.

### Typography tests

- The plan returns observed, licensed, and render-safe typography separately.
- Missing licensed files resolve to deterministic render families.
- All support copy in one template resolves to one family token.
- Logo remains an image/vector asset, never a font approximation.

### HyperFrames tests

- Two consecutive assemblies retain all approved media.
- Every media URL resolves.
- Media and scene wrappers share transition timing.
- Fixed-time snapshots contain the expected plate and copy.
- Runtime, layout, motion, and contrast checks pass.

### Security and rights tests

- No API key or local credential path appears in plans, generated package data, examples, or manifests.
- Public product imagery remains `unverified-public-reference` until an authorized reviewer upgrades it.
- Model-upload permission is checked independently from general internal-reference permission.

## 11. Acceptance criteria

The revision is complete when:

1. A user can provide a CSC brand, product URL, and “make a product highlight video” request.
2. `plan_creative` returns a complete shot-by-shot execution contract without requiring the user to restate brand guidance.
3. Each shot requires a distinct approved start image unless the brief explicitly selects a continuous-scene variant.
4. The plan separates product facts, generated plates, deterministic copy, and official identity.
5. The product cannot advance after a still or temporal fidelity failure.
6. Typography resolves deterministically and identically in preview and render.
7. The generated-video workflow cannot synthesize brand identity or copy.
8. Assembly can run repeatedly without losing media.
9. The final delivery includes a live preview, contact sheet, continuity evidence, QA result, and revision ledger.
10. The example remains internal-review-only until rights and publication authorization are confirmed.

## 12. Decisions that should remain explicit

- The official One Kings Lane wordmark is artwork, not a font target to recreate.
- Chronicle Display and Sofia Pro require licensed font files; fallback behavior must be deterministic.
- GPT Image 2, Kling 3 Turbo Pro, and HyperFrames are the successful runtime combination from this project, not permanent brand dependencies.
- The user-approved white uppercase type and borderless material-detail treatment are One Kings Lane motion guidance, not universal CSC styling.
- The unified product-in-room plate is the preferred cinematic method; cutout compositing remains available for intentionally graphic outputs.
- “Done” means approved internal creative state. It does not by itself upgrade rights or authorize external publication.
