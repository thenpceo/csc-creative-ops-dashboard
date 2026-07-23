# One Kings Lane → HyperFrames

Canonical source: `brand-packages/one-kings-lane` version `1.3.0`.

Editable example project:

`creative-ops-dashboard/examples/one-kings-lane/hyperframes-product-feature`

Rendered example:

`creative-ops-dashboard/public/examples/one-kings-lane/product-feature-motion-demo.mp4`

## Compile the brand system

Load `tokens.json`, `rules.json`, `recipes.json`, and `modules/motion.json`. Resolve `motion.full-bleed-feature`, `motion.editorial-title`, and `motion.brand-resolve` with the requested media IDs. The brand package supplies intent; HyperFrames owns the HTML, GSAP timeline, variable declarations, render settings, and composition checks.

For One Kings Lane:

- Use full-bleed approved image or video backgrounds.
- Prefer a solid or translucent heritage-green copy field when the background is busy.
- Enter the copy field with opacity or at most 48px of travel.
- Stagger eyebrow, title, support, action, and identity by 100–180ms.
- Use `power2.out` or `power3.out` for small arrivals, `expo.out` for the principal editorial title, and `sine.inOut` for slow background drift.
- Use `fromTo()` for deterministic initial states.
- Prefer a cut, editorial crossfade, square mask, or measured directional slide between scenes.
- Keep the official logo and all typography as crisp DOM or vector layers.
- Hold the final readable composition for at least 1.2 seconds.
- Provide a reduced-motion variant with drift and travel removed.
- Avoid bounce, elastic overshoot, glitch, strobe, aggressive zoom, liquid type, and distorted identity.

The demo is a single six-second scene, so it does not manufacture an unnecessary inter-scene transition. A multi-scene build should choose one of the package transition families and match direction and visual mass across the cut.

## Product-highlight composition

Resolve `motion.product-highlight-overlay` and `sequential.product-highlight-18` for an 18-second product introduction.

- Load only human-approved video plates.
- Keep every video source in a project-level media manifest or another durable, reconstructable declaration.
- Generate host video nodes from that durable source; do not destructively replace the only copy of a frame's media declaration.
- Apply the same transition start, duration, easing, and direction to each media plate and its scene wrapper.
- Keep scene wrappers above media plates without obscuring the product.
- Use white uppercase `EB Garamond` primary lines at `0.06em` tracking when licensed Chronicle Display is unavailable.
- Use `Inter` consistently for all supporting copy when licensed Sofia Pro is unavailable.
- Resolve font availability once before preview and use the same explicit family declarations for rendering.
- On quiet dark material plates, use borderless white copy and a restrained hairline.
- On pale or active plates, prefer a soft heritage-green edge-to-transparent scrim before adding a hard copy panel.
- Preserve at least `1.2s` for the official artwork resolve.
- Capture fixed-time snapshots, a timeline contact sheet, and a font-resolution report before requesting render approval.
- Do not render the final MP4 before explicit preview approval.

Assembly is idempotent. Running it twice must preserve the same number, order, source URLs, track assignments, scene timings, and transition tweens for approved media plates. Add or retain a regression fixture that assembles four video-backed frames twice and checks those invariants.

The local adapter utility `assemble-media-manifest.mjs` implements this durable marker block. It validates approval state and transition metadata, creates host video nodes from the manifest, and replaces the same controlled block on subsequent runs. `tests/hyperframes-media-manifest.test.mjs` verifies two consecutive assemblies, four playable sources, media/scene transition target pairs, and rejection of unapproved plates.

## Variables

The example exposes `eyebrow`, `title`, `productName`, `support`, and `action` through composition variables. Background media and official identity are asset inputs and should not be redrawn by a generative model.

## Verify and render

```sh
cd creative-ops-dashboard/examples/one-kings-lane/hyperframes-product-feature
npm run check
npx hyperframes@0.7.68 render . --output ../../../public/examples/one-kings-lane/product-feature-motion-demo.mp4 --quality standard
```

The checked demo uses documented fallback fonts because the package does not contain licensed Chronicle Display, Sofia Pro, or Lato files. Supply licensed font files before production approval.
