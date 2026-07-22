# One Kings Lane Design System

Package version: **1.2.0**  
Research snapshot: **July 21, 2026**  
Evidence status: **Mixed — observed brand behavior plus clearly labeled inferred production guidance**

This is the human-readable view of the canonical files beside it. Systems should load `brand.json`, then resolve the core files and only the capability modules required for the job. Provider, renderer, framework, export, and workflow adapters belong outside this package.

## Brand in one sentence

One Kings Lane is a design-led home destination that pairs collected, livable editorial inspiration with curated products and warm expert help so customers can **Live Your Style**.

## The durable idea

- Cultivated, not aloof.
- Personal, not prescriptive.
- Material-rich, not flashy.
- Editorial, but still useful and shoppable.
- Timeless, but not frozen in one decorating era.
- Spacious, structured, and square-edged.

The current summer campaign, pale botanical art, promotion codes, and sale messages are seasonal inputs. They are not permanent identity rules.

## How to load the package

1. Read `brand.json` for package identity, paths, modules, and provenance.
2. Load `tokens.json`, `rules.json`, `recipes.json`, `media.json`, and `evaluation.json`.
3. Load only the modules needed for the output, such as `interactive`, `static`, `motion`, or `sequential`.
4. Resolve references by ID. Required rules and hard gates override preferred recipes.
5. Supply job-specific facts separately: dimensions, channel, audience, product data, offer data, rights, accessibility target, and delivery constraints.
6. Translate semantic values into the destination through an external adapter.
7. Score the result and stop on any reject gate.

## Identity

### Signature

“Live Your Style” is a behavioral principle, not merely a tagline. The work should help someone recognize and express their taste rather than tell them there is one correct way to live.

### Logo

- Primary wordmark: `media/official/logo-primary.webp`
- Compact elephant mark: `media/official/logo-compact.webp`
- Use only the supplied official wordmark or compact elephant artwork.
- Preserve artwork proportions and internal spacing.
- Keep at least one compact-mark height of clear space as an inferred working minimum.
- Prefer white, heritage green, or a quiet neutral field.
- Never redraw, synthesize, distort, bevel, pattern-fill, shadow, or animate the mark by deformation.
- Publicly captured logo files still require authorization for production use.

Every local asset, including both logos, is indexed in `media.json` with dimensions, source URL, capture date, checksum, permitted reference uses, and review requirements. Social and advertising references are stored separately under `media/marketing-reference/`; they are not alternate logo or production-asset folders.

## Core palette

| Role | Value | Use |
|---|---:|---|
| Heritage deep | `#06312B` | Major brand fields and deep promotional surfaces |
| Heritage green | `#3B5F58` | Primary actions, service fields, key anchors |
| Heritage bright | `#1E5F53` | Selected headings and active green emphasis |
| Powder | `#C6D0DC` | Supporting badges and calm secondary fields |
| Sale | `#CA3B4C` | Verified markdown and time-sensitive transaction states only |
| Ink | `#000000` | Primary commerce and interface text |
| Editorial ink | `#323232` | Editorial headings and supporting copy |
| White | `#FFFFFF` | Primary surface and inverse text |
| Muted surface | `#F5F5F5` | Product cutout ground and quiet grouping |
| Cool surface | `#F5F7F7` | Secondary calm surface |
| Subtle border | `#E5E7EB` | Dividers and quiet control boundaries |

Natural wood, warm white, linen, brass, raffia, ceramic, moss, sage, and stone belong primarily inside photography and rendered material systems. They do not need to become extra interface accents.

## Typography

| Role | Family | Typical size | Treatment |
|---|---|---:|---|
| Editorial display | Chronicle Display | 48 / 40 / 34 | Regular, sentence case, tight but comfortable |
| Editorial heading | Chronicle Display | 30 / 26 | Regular, sentence case |
| Section heading | Sofia Pro | 30 / 25 | Regular, uppercase, wide tracking |
| Product title | Sofia Pro | 20 / 18 | Heavy, title case |
| Body | Lato | 16 | Regular, `1.55` line height |
| Small body | Lato | 14 | Regular, `1.5` line height |
| Navigation | Sofia Pro | 14 | Medium, title case |
| Action | Sofia Pro | 12 | Heavy, uppercase, `0.145em` tracking |
| Label | Sofia Pro | 12 | Heavy, uppercase, restrained tracking |

Use the serif for emotional and editorial storytelling, the interface sans for navigation and decisions, and the reading sans for paragraphs. Do not set long headlines or paragraphs in spaced uppercase. Consumers must provide licensed font files or use the documented fallbacks.

## Spacing, shape, and layout

- Base spacing scale: `4, 8, 12, 16, 24, 32, 48, 64, 80, 96` pixels.
- Default corner radius: `0`.
- A `2px` radius is permitted for small status chips only.
- Circles are reserved for icon controls and avatars.
- Controls are generally `44–52px` tall, with a `44px` minimum touch target.
- Use a 12-column expanded grid, 8-column medium grid, and 4-column compact grid.
- Working content maximum: `1280px`; page maximum: `1440px`.
- Gutters: `32px` expanded, `24px` medium, `16px` compact.
- Prefer clear section breaks and generous breathing room to dense card stacks.

These layout measurements are inferred working tokens from the current site, not an official published specification.

## Buttons and actions

### Primary

- Solid heritage green.
- White Sofia Pro action text.
- Uppercase with measured tracking.
- Rectangular with no visible radius.
- `48–52px` tall with generous inline padding.
- Use for the single highest-priority action in a decision area.

### Secondary

- Text-led uppercase action, optionally underlined or paired with a simple directional cue.
- Use inside editorial and service compositions where another filled control would feel heavy.

Every interactive action needs visible focus, keyboard operation, non-color state cues, and a meaningful accessible label.

## Web and interactive patterns

### Global header

On expanded screens: optional promotion layer, then logo/utilities, then category navigation. On compact screens: menu, centered wordmark, search, and cart. Promotional content remains removable and must not destabilize the core header.

### Collection page

Use breadcrumb, uppercase tracked title, filter/sort utility row, then a consistent product grid. Cards lead with square product imagery on pale neutral grounds. Badges and sale styling are factual states supplied by current commerce data.

### Product detail

Use a large gallery beside a narrower decision column. Order product identity, price and promotion, availability, options, delivery summary, and primary action before extended content. On compact screens, preserve this same decision sequence.

Support, consent, and promotion overlays must never cover the product identity, price, options, or primary action.

## Static and graphic design

Use one dominant idea, one clear message hierarchy, and no more than one primary action. Lead with a strong room or product composition instead of a busy collage. Recompose each aspect ratio rather than center-cropping one master.

Supported patterns include:

- Editorial ad: room-led image, protected copy group, small official logo, one action.
- Product feature: verified product, one specific material or functional point, compact commerce detail.
- Shoppable assortment: two to four verified products with matched scale and restrained metadata.
- Business card: centered logo front; left-aligned identity and verified contact block back; heritage green or white field; production specs supplied by the printer.

## Marketing asset system

Load `modules/marketing.json` whenever the job is an advertisement, social post, creator feature, campaign hero, email feature, promotion, community post, or marketing video. The module holds output-neutral rules, recipes, format guidance, evidence selectors, and checks. It deliberately contains no account credentials, delivery API, renderer instructions, campaign performance, or fixed offer data.

### Required brief

Every marketing job supplies:

1. Objective and audience.
2. One proposition and one primary action.
3. Authorized product, collection, person, or program facts.
4. Destination and aspect ratio.
5. Required copy, legal, accessibility, and localization inputs.
6. Asset source and rights status.
7. Current offer source and expiration time, if applicable.
8. Variant axes, approval owner, and destination URL.

The package provides brand behavior; current prices, inventory, dates, offer terms, targeting, spend, and performance remain runtime inputs.

### Creative families

| Family | Best use | Structure |
|---|---|---|
| Curated collection | Awareness and consideration | Room or hero product, one collection idea, one proof point, one action |
| Dynamic product | Conversion | Verified product image, warm benefit line, product identity, current commerce fact |
| Maker or designer story | Trust and consideration | Human hook, point of view, material or craft proof, lived result, invitation |
| Creator room feature | Social proof | Rights-cleared room, creator context, verified product, credit, optional action |
| Vertical style note | Short-form discovery | Immediate visual, one design observation, one detail, clean resolve |
| Inspiration pin | Discovery and evergreen traffic | Complete room or vignette, searchable design idea, light identity, destination |
| Trade/community post | Professional community | Program or event premise, participant proof, value, next step |
| Campaign hero | Email and site promotion | Editorial image, title group, one current value or offer, one action |

Current public advertising shows two useful layers: catalog-style product units with replaceable commerce data, and curated room-led brand units with compact promises such as style, selection, or a more considered home. Keep those layers distinct so a campaign can change without changing the core identity.

### Channel observations

| Surface | What the July 21, 2026 snapshot supports | How to use it |
|---|---|---|
| Facebook video | Maker/designer interviews, craft proof, creator room features, seasonal human stories, and short product-led clips | Strong current reference for story families, not a performance claim |
| Meta public ads | Product catalog cards, room-led collection messages, single actions, and short commerce video | Current creative reference only; no spend, targeting, return, or complete-count inference |
| Pinterest | Collected rooms, vignettes, materials, seasonal inspiration, and design discovery | Build complete 2:3 compositions and searchable ideas; board covers are reference-only |
| TikTok | Full-bleed vertical rooms/products with direct headline cards | Historical execution reference; do not make the older white-card treatment mandatory |
| YouTube | Style shorts, product arrivals, home tours, and designer stories | Low-volume archive; useful for format families, not current cadence |
| LinkedIn | Trade/community activations, design contests, partnerships, press, and brand-platform stories | Use verified dates, partners, results, eligibility, and permissions |
| Instagram | Official profile is verified from the site, but the public content surface was blocked during this audit | Refresh through an authorized source before deriving current patterns |

### Variant architecture

Use a controlled matrix of hook, visual, proof, action, and format. Vary one or two named axes at a time. Keep product facts, rights, legal, offer terms, and destination locked. Every derivative retains its parent brief, source IDs, capture date, variant ID, approval state, and expiration conditions.

### Creator and customer content

One Kings Lane publishes UGC terms and a rights-request process. A production record must still capture the original post, creator handle, explicit permission or applicable rights grant, permitted edits and channels, credit, term, geography, and revocation status. A public post, tag, or hashtag is evidence of availability, not by itself authorization for production reuse.

## Photography and visual references

### Environment

- Light-filled rooms and outdoor settings composed as rooms.
- Soft directional daylight with believable window falloff.
- Warm practical lighting only as restrained support.
- Natural perspective and controlled verticals.
- Layered objects, art, books, textiles, and crafted materials with one clear anchor.
- A collected, lived-in feeling without clutter.
- Calm negative space when copy will be added.

### Product

- Centered straight-on or three-quarter views.
- White or `#F5F5F5` background.
- Soft source, natural grounding, honest color, and consistent scale.
- Context images must preserve geometry, material, finish, and real scale.

### People

People are optional and secondary. When used, show candid domestic behavior, hosting, design consultation, or scale. Favor natural posture and timeless styling; avoid fashion-campaign posing or making the model more important than the room.

The cataloged internal example `example.generated.people-secondary-room` demonstrates the intended hierarchy: one person in the back third performing a believable domestic action while the room, furnishings, and material story remain primary. It is a generated reference, not an approved likeness or catalog asset.

### Avoid

Generic hotel luxury, sterile minimalism, plastic materials, impossible reflections, neon color casts, ultra-wide distortion, floating furniture, excessive depth blur, symmetry without life, and over-styled clutter.

## Image prompt structures

Prompt instructions live in `modules/generative-image.json`. Each recipe structures intent rather than binding to a model.

### Reference transformation contract

Product-reference generation is a controlled transformation, not open-ended restyling. A consumer must expose three visibly separate groups:

1. **Reference input:** one or more rights-cleared product images that jointly resolve silhouette, proportions, materials, finish, hardware, seams, and countable details.
2. **Editable scene variables:** environment, time of day, weather, camera, framing, scale cues, supporting materials, copy-safe region, and aspect ratio.
3. **Locked invariants:** every product identity detail plus any approved brand marks. These are never user-editable scene variables.

The consumer assembles those groups with the recipe's semantic prompt blocks, then compares the result side by side with the authorized reference. Any geometry, finish, scale, hardware, seam, or countable-detail mismatch is a rejection and regeneration event. Prompt wording alone is not a fidelity guarantee.

`example.generated.fountain-winter-garden` demonstrates a valid internal workflow: the Austin fountain stays the locked subject while the environment, season, time, camera, and copy-safe region change. It is not a catalog replacement and still requires human fidelity review.

### Wide environment

1. Room purpose and design story.
2. Hero furnishing and material palette.
3. Natural wide camera intent with controlled verticals.
4. Soft directional light and restrained practicals.
5. Explicit copy-safe side or region.
6. Physical and stylistic exclusions.
7. No words, labels, or logos.

### Product studio

1. Authorized product reference and required angle.
2. Exact geometry, finish, materials, seams, hardware, and countable features.
3. White or very light gray background.
4. Large soft source and restrained contact shadow.
5. Normal perspective and whole product in frame.
6. No props, text, invented variants, or altered scale.

### Product in room

1. Product remains unchanged and primary.
2. Name the room context and supporting materials.
3. Supply believable scale cues.
4. Match contact, shadow, reflection, and perspective.
5. Reserve copy space.
6. Reject generic hotel styling and all product mutations.

### People in room

1. Name the room purpose before the person.
2. Give one person one believable domestic action.
3. Place the person in the middle or back third and keep them below one quarter of the frame.
4. Specify natural posture, timeless styling, no direct gaze, and no fashion pose.
5. Preserve the room as the visual anchor and reserve any required copy-safe region.

## Motion design

Motion design uses brand typography, layout, product imagery, and controlled dimensional layers. It is distinct from synthesized footage.

- Micro `160ms`, short `240ms`, standard `360ms`, feature `600ms`.
- Favor fades, small rises, square masks, restrained image drift, and readable holds.
- Use one movement idea per beat.
- Composite logos and typography as crisp controlled layers.
- Subtle depth, material response, or light motion may heighten craft.
- Avoid bounce, glitch, strobe, rapid spins, aggressive zooms, liquid type, and distorted logos.
- Provide a reduced-motion treatment that removes parallax, looping, and nonessential travel.

For full-bleed features, crop an approved image or video to the entire frame, optionally drift from `104%` to `100%`, then introduce the copy field, eyebrow, title, support, action, and official logo in hierarchy order. Stagger levels by `100–180ms`. Use the enter curve for arrivals, the standard curve for image drift, and the exit curve only for elements that leave. Preferred transitions are a direct cut, editorial crossfade, square mask, or measured directional slide. Preserve at least `1.2s` of readable hold.

`example.motion.product-feature` is the cataloged internal six-second example. It keeps the environment full bleed, the identity mark crisp, and the title system editable. Its executable source belongs to an external consuming adapter, not this canonical package.

The `spatial` module defines output-neutral camera, material, light, and effect behavior so a rendering adapter can implement dimensional scenes without putting renderer-specific instructions in the brand itself.

## Generative video

Synthesized video is primarily visual-plate generation. Brand copy, interface, offers, and logos are composited afterward.

Every shot prompt should include:

1. One stable subject and room state.
2. One subtle environmental action.
3. One camera movement on one axis.
4. Soft directional light and material palette.
5. Intended duration and aspect ratio.
6. Locked product, geometry, object, and lighting continuity.
7. Explicit exclusions: no morphing furniture, warping architecture, sliding objects, rubbery materials, frantic camera, fake text, or invented identity.

Recommended shot types are a room reveal, product-in-context move, material study, outdoor-living drift, and clean visual plate for a composited brand resolve.

### Image-to-video contract

A consumer begins with an authorized start image and exposes only the subject action, environmental motion, camera move, camera distance, duration, and final hold as editable variables. Product identity, room geometry, object count and placement, material behavior, and light direction remain locked.

Use one continuous shot, one subtle subject or environmental action, and one slow camera move. Sample the first, middle, and final frames against the start image. Reject the full clip if the product changes, architecture warps, objects slide, textures crawl, or the final hold is unusable. Brand copy and the official logo are composited after the visual plate is approved.

`example.video.fountain-winter-garden` is the cataloged internal five-second visual-plate example. It uses a restrained push-in and subtle water motion while keeping the scene stable across sampled early, middle, and late frames. It remains experimental, requires human fidelity review, and contains no brand copy or identity overlay.

## Storyboards and sequential systems

The `sequential` module is designed to feed any storyboard agent or production orchestrator. Each shot record contains:

- Story function and duration.
- Visual intent and composition.
- Camera, action, and lighting.
- Exact copy and audio intent.
- Continuity locks.
- Asset selectors and rights status.
- Evaluation references.

A useful brand arc is:

1. Establish a distinctive room or lifestyle premise.
2. Curate around one hero furnishing.
3. Reveal material, craft, or function.
4. Return the product to a truthful lived context.
5. Resolve with helpful expertise or one clear invitation.

Each shot must advance a story function. Product, room, material, light, people, offer, and copy facts are locked in a shared continuity ledger before shots are generated.

## Voice and copy

Write with warm expertise. Use specific design, material, craft, provenance, room, and function language. Keep actions short and inviting. Respect the customer's own taste.

Prefer:

- “Live Your Style.”
- “Find the piece that pulls the room together.”
- “A hand-finished detail with real presence.”
- “Work with a designer on your space.”

Avoid:

- Empty prestige claims.
- Snobbery or insider gatekeeping.
- “Elevate your lifestyle” without a concrete idea.
- Urgency, scarcity, service scope, or popularity that is not currently sourced.

## Commerce truth

Prices, offers, inventory, shipping, delivery timing, badges, specifications, reviews, and eligibility are runtime facts. The design system defines how to present them, not what they are. A generator must receive these values from a current authoritative source and record that source.

## Rights and asset handling

The included media was captured from official public One Kings Lane surfaces as design evidence. Its default status is `unverified-public-reference`.

- Analysis and internal storyboard reference are allowed.
- Production reuse requires independent authorization.
- Model upload is prohibited unless an authorized reviewer upgrades the rights record.
- Redistribution is prohibited by default.
- Generated interpretation cannot stand in for a verified catalog product image.

Reference media layout:

- `media/official/` — captured official wordmarks, product imagery, and site campaign/editorial evidence.
- `media/marketing-reference/` — downloaded social-profile references for internal analysis, each cataloged with source, date, checksum, recency, and restricted rights.
- `../../research/one-kings-lane/marketing-audit-2026-07-21/` — dated screenshots and the written channel/ad audit.

Public advertising-library results are not a substitute for access to an authorized advertising account. They do not expose a reliable view of spend, targeting, performance, internal naming, approvals, or complete account structure.

## Evaluation

Every output passes hard gates for official identity, product truth, rights, offer truth, readability, and medium-appropriate accessibility. Then score:

| Dimension | Weight |
|---|---:|
| Visual identity | 20% |
| Imagery | 20% |
| Editorial-commerce balance | 15% |
| Typography | 15% |
| Composition | 12% |
| Accessibility | 10% |
| Voice | 8% |

`0.85+` is approved when all reject gates pass. `0.70–0.849` requires human review. Below `0.70`, or any reject-gate failure, is rejected.

## Evidence limits

- This is an independent synthesis of public current surfaces, not an official internal brand manual.
- Font families and several core colors were directly observed; some layout dimensions and motion behavior are inferred working guidance.
- The audit does not prove keyboard support, focus quality, screen-reader behavior, or full WCAG compliance.
- Current campaign art is retained only as reference evidence and must expire independently of the core system.
- Social examples are dated evidence; TikTok and YouTube material observed in this audit is substantially historical and must not define current cadence.
- Direct Instagram review was blocked, LinkedIn introduced an authentication wall, an exact Google Ads Transparency advertiser record was not verified, and no private ad account or analytics export was available.
- Refresh live surfaces, product truth, offers, rights, and campaign status before production.
