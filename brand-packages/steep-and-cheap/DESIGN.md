# Steep & Cheap Design System

Package version: **1.0.0**  
Research snapshot: **July 21, 2026**  
Evidence status: **Mixed: verified first-party surface evidence plus labeled inferred production guidance**

This package is the portable source of brand truth for Steep & Cheap. Systems load brand.json, resolve the core files, and add only the capability modules needed for the output. Provider configuration, account credentials, renderer instructions, workflow state, performance data, and live commercial facts stay outside this directory.

## Brand in one sentence

Steep & Cheap is the scrappy, immediate deal surface in the outdoor portfolio. It should feel fast and value-rich without sacrificing trust: vivid green actions, charcoal utility UI, large product imagery, and compact deal metadata make urgency easy to understand.

## Durable character

- Scrappy.
- Immediate.
- Clear.
- Outdoorsy.
- Value Led.
- Trustworthy.

Signature principle: **The deal is the point**.

## Package loading

1. Read brand.json for identity, paths, modules, and provenance.
2. Load tokens.json, rules.json, recipes.json, media.json, and evaluation.json.
3. Load only the output capabilities required for the job.
4. Resolve rules, recipes, and media by ID; required rules and reject gates override preferred patterns.
5. Supply current product, service, offer, audience, channel, rights, accessibility, and delivery facts separately.
6. Translate semantic values through an external destination adapter.
7. Evaluate and stop on any reject gate.

## Identity and logo

Bundled public reference: media/official/logo-primary.png.

- Preserve official artwork proportions and spacing.
- Use one deliberate identity instance rather than logo repetition.
- Never redraw, synthesize, distort, bevel, shadow, animate by deformation, or build a substitute mark.
- Public references require authorization before production use.

## Palette

- **primary:** #72A022
- **secondary:** #333333
- **accent:** #556F7C
- **surface:** #FFFFFF
- **surface-muted:** #F5F5F5
- **on-surface:** #333333
- **on-primary:** #000000
- **on-secondary:** #FFFFFF
- **border:** #CCCCCC
- **error:** #D0021A

- Bright green is the first-party `brand`, `btn-brand`, and `border-brand` value.
- Black text is used on green for accessible normal-size button copy.
- Blue-gray supports coupon and informational messages without competing with green.

## Typography

Sofia Pro is the single interface voice. Use bold but compact headings and clear numerical emphasis for discount, price, and inventory signals.

- **headline-display:** sofia-pro, Helvetica, Arial, sans-serif, 30px, weight 700, line height 1.05, tracking -0.01em
- **headline-lg:** sofia-pro, Helvetica, Arial, sans-serif, 28px, weight 700, line height 1.1, tracking 0em
- **headline-md:** sofia-pro, Helvetica, Arial, sans-serif, 24px, weight 600, line height 1.2, tracking 0em
- **body-lg:** sofia-pro, Helvetica, Arial, sans-serif, 18px, weight 500, line height 1.5, tracking 0em
- **body-md:** sofia-pro, Helvetica, Arial, sans-serif, 16px, weight 500, line height 1.5, tracking 0em
- **label-sm:** sofia-pro, Helvetica, Arial, sans-serif, 12px, weight 600, line height 1.2, tracking 0.04em

Licensed font files are consumer inputs. Use documented fallbacks when licensed families are unavailable.

## Layout, spacing, shape, and depth

Use a dense deal feed and product grid inside a wide shell. Surface discount, current price, former price, and availability in a consistent vertical order. Keep promotional bands full-width and easy to dismiss.

Keep product and deal cards square or lightly rounded. Pills are appropriate for discount, inventory, and activity tags.

Use flat white cards with borders and a restrained shadow only for menus, cart, and urgency overlays.

Spacing values: 4px, 8px, 12px, 16px, 24px, 32px, 48px. Preserve a 44px minimum interactive target and explicit focus treatment.

## Actions and graphic hierarchy

Green marks the deal action and selected state; charcoal anchors navigation and checkout. Price hierarchy should be typographic first, not dependent on color alone.

Use one primary message and one primary action per decision area or fixed asset. Recompose every aspect ratio. Current promotion, price, inventory, fitment, availability, dates, and service scope are removable runtime layers.

## Web and interactive guidance

Navigation and decision hierarchy must support **activity, size, color, current price, verified discount, remaining inventory, brand, and shipping**. Collection, product, guide, and service patterns live in modules/interactive.json; product hierarchy and current-data behavior live in modules/commerce.json.

Compact layouts preserve the same decision order. Overlays must not cover identity, current facts, fitment or options, form errors, or the primary action.

## Photography and image direction

- **Environment:** outdoor action and straightforward product contexts that explain why the deal is useful.
- **Camera:** large product imagery, clear outdoor use, quick detail proof, and uncluttered value framing.
- **Lighting:** bright legible product light with authentic outdoor conditions.
- **Palette and materials:** charcoal, white, vivid deal green, product color, snow, trail, and restrained neutral surfaces.
- **People:** real outdoor participants; deal communication is prominent but does not replace activity credibility.
- **Avoid:** fake scarcity, unsourced countdown, hidden original-price basis, luxury editorial pacing, discount graphics that cover the product.

Product and service truth remains locked across studio, context, detail, and human-use images. Real product media remains the factual anchor.

## Image prompt structure

1. Job intent and real use case.
2. Stable subject and authorized references.
3. outdoor action and straightforward product contexts that explain why the deal is useful.
4. Composition and copy-safe region.
5. large product imagery, clear outdoor use, quick detail proof, and uncluttered value framing.
6. bright legible product light with authentic outdoor conditions.
7. Material, geometry, scale, people, and safety locks.
8. Explicit exclusions and no generated words or logos.

Use modules/generative-image.json for environment-wide, product-studio, product-context, and people-in-use structures.

## Motion design

fast deal reveal, product-first cuts, countdown only when verified, and stable price or discount holds.

Motion design uses controlled typography, layout, verified product media, and dimensional layers. One movement idea belongs to each beat. Identity and essential copy are composited as crisp controlled layers. Provide reduced motion.

## Generative video

Generative video produces clean visual plates. Each shot uses one stable subject, one subtle action, one camera move on one axis, explicit duration and ratio, light and material direction, continuity locks, and exclusions. Composite identity, verified copy, captions, interface, prices, and offers afterward.

Reject morphing products, drifting features, warping environments, anatomy failures, fake text, invented identity, and incoherent materials.

## Spatial and dimensional expression

product silhouettes, gear materials, packaging, topographic accents, and simple physically credible depth. Dimensional scenes preserve verified scale, product geometry, contact, material response, and readable silhouettes. Effects must explain function, environment, or material.

## Marketing asset system

Supported brand-specific families:

- Bargain Bin drop.
- Category deal edit.
- Past Season value.
- Brand deal.
- Seasonal clearance.

Current public-surface observations:

- The current brand is explicitly powered by Backcountry but maintains its own narrow wordmark and green deal signal.
- Campaign imagery is playful, collage-like, youthful, and offer-forward, with orange bands and irregular white photo frames.
- Discount messaging is central, but products and activities must remain identifiable and the offer must remain a removable runtime layer.

Verified public channel references:

- Like us on Facebook: https://www.facebook.com/SteepAndCheap
- Follow us on Instagram: https://www.instagram.com/steepcheap
- Meta Ad Library lookup: https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=US&q=Steep%20%26%20Cheap&search_type=keyword_unordered

Every marketing brief supplies objective, audience, one proposition, one action, destination, ratio, verified product or service facts, rights, accessibility and legal inputs, current offer source and expiration, variant axes, and approval owner.

Keep brand, campaign, product or service, offer, and channel layers separable. Public reference creative cannot establish performance, targeting, spend, channel priority, audience response, or reuse rights.

## Storyboards and sequential production

Preferred narrative rhythm:

1. Show the product or category immediately.
2. State the verified value.
3. Prove one useful feature.
4. Clarify size or inventory condition.
5. Resolve with one shop action.

Every shot record states story function, duration, ratio, visual intent, composition, camera, action, lighting, exact approved copy, audio intent, continuity locks, asset selectors, rights, and evaluation references.

## Voice

Fast, candid value language that states the product and verified savings without manufactured drama.

Prefer specific language about activity, size, color, current price, verified discount, remaining inventory, brand, and shipping. Avoid generic prestige, invented expertise, false urgency, unsupported results, and engagement claims without current evidence.

## Rights, facts, and media

media.json is the only asset catalog. Local folders are storage conveniences; consumers resolve catalog IDs and rights metadata.

- Publicly captured site and identity media is analysis/reference evidence.
- Production reuse requires authorization.
- Model upload and redistribution are disabled by default.
- Prices, offers, inventory, availability, service scope, compatibility, reviews, dates, and results are runtime facts.

## Evaluation

Outputs must pass identity, product or service truth, claims, rights, readability gates. A score of 0.85 or higher is approved only when every gate passes; 0.70 to 0.849 requires human review.

## Capability files

- modules/interactive.json
- modules/static.json
- modules/imagery.json
- modules/commerce.json
- modules/marketing.json
- modules/motion.json
- modules/generative-image.json
- modules/generative-video.json
- modules/spatial.json
- modules/sequential.json

## Evidence limits

- This is an independent synthesis of public surfaces, not an official internal brand manual.
- Core colors, typography, layout, and visible components come from cited first-party or archived evidence; image, motion, generative, spatial, storyboard, and some accessibility guidance is inferred and labeled.
- Screenshots do not prove keyboard support, semantic quality, assistive-technology behavior, or complete accessibility compliance.
- Refresh current surfaces, authorized identity files, product or service truth, campaigns, rights, and operational facts before production.
