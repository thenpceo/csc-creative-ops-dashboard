# BikeTiresDirect Design System

Package version: **1.0.0**  
Research snapshot: **July 21, 2026**  
Evidence status: **Mixed: verified first-party surface evidence plus labeled inferred production guidance**

This package is the portable source of brand truth for BikeTiresDirect. Systems load brand.json, resolve the core files, and add only the capability modules needed for the output. Provider configuration, account credentials, renderer instructions, workflow state, performance data, and live commercial facts stay outside this directory.

## Brand in one sentence

BikeTiresDirect is information-rich and deal-forward. Its design should prioritize fast category access, visible pricing, trust signals, and a compact product grid. The look is unapologetically functional: navy navigation, red promotion mechanics, gold emphasis, and dark slate copy.

## Durable character

- Practical.
- Dense.
- Trustworthy.
- Deal Aware.
- Enthusiast.
- Efficient.

Signature principle: **Selection and value made visible**.

## Package loading

1. Read brand.json for identity, paths, modules, and provenance.
2. Load tokens.json, rules.json, recipes.json, media.json, and evaluation.json.
3. Load only the output capabilities required for the job.
4. Resolve rules, recipes, and media by ID; required rules and reject gates override preferred patterns.
5. Supply current product, service, offer, audience, channel, rights, accessibility, and delivery facts separately.
6. Translate semantic values through an external destination adapter.
7. Evaluate and stop on any reject gate.

## Identity and logo

Bundled public reference: media/official/logo-primary.svg.

- Preserve official artwork proportions and spacing.
- Use one deliberate identity instance rather than logo repetition.
- Never redraw, synthesize, distort, bevel, shadow, animate by deformation, or build a substitute mark.
- Public references require authorization before production use.

## Palette

- **primary:** #163178
- **secondary:** #D8202A
- **accent:** #EFC62D
- **surface:** #FFFFFF
- **surface-muted:** #EFEFEF
- **on-surface:** #3B464A
- **on-primary:** #FFFFFF
- **on-secondary:** #FFFFFF
- **border:** #CCCCCC
- **error:** #D8202A

- Navy anchors the header, navigation, and utility frame.
- Red marks promotions, urgency, and selected commerce states.
- Gold is a high-visibility deal and footer-heading accent; do not use it for long text.

## Typography

Open Sans is the operative UI face. Keep the scale compact and use semibold/bold for category, price, and promotion hierarchy rather than oversized editorial headlines.

- **headline-display:** Open Sans, Arial, sans-serif, 32px, weight 700, line height 1.1, tracking -0.01em
- **headline-lg:** Open Sans, Arial, sans-serif, 22px, weight 600, line height 1.2, tracking 0em
- **headline-md:** Open Sans, Arial, sans-serif, 20px, weight 600, line height 1.25, tracking 0em
- **body-lg:** Open Sans, Arial, sans-serif, 16px, weight 400, line height 1.45, tracking 0em
- **body-md:** Open Sans, Arial, sans-serif, 14px, weight 400, line height 1.45, tracking 0em
- **label-sm:** Open Sans, Arial, sans-serif, 12px, weight 700, line height 1.2, tracking 0.03em

Licensed font files are consumer inputs. Use documented fallbacks when licensed families are unavailable.

## Layout, spacing, shape, and depth

Use a centered desktop shell with a narrow category rail, broad promotional/product region, and compact modules. The system is denser than the other CSC brands; 12–16px gaps are standard inside commerce grids.

Most structural elements are square. Small 3–5px radii support controls; larger 15–20px radii are reserved for badges, chat, and isolated promotional UI.

Use borders and background blocks for containment. Shadows are rare and belong to chat, dialogs, and menu overlays rather than product cards.

Spacing values: 4px, 8px, 12px, 16px, 24px, 32px, 48px. Preserve a 44px minimum interactive target and explicit focus treatment.

## Actions and graphic hierarchy

Navy frames navigation, red handles urgent promotions, and gold signals special-value content. Product cards should expose price and availability without decorative overlays.

Use one primary message and one primary action per decision area or fixed asset. Recompose every aspect ratio. Current promotion, price, inventory, fitment, availability, dates, and service scope are removable runtime layers.

## Web and interactive guidance

Navigation and decision hierarchy must support **category, dimensions, compatibility, price, stock, shipping, and rider use case**. Collection, product, guide, and service patterns live in modules/interactive.json; product hierarchy and current-data behavior live in modules/commerce.json.

Compact layouts preserve the same decision order. Overlays must not cover identity, current facts, fitment or options, form errors, or the primary action.

## Photography and image direction

- **Environment:** home workshop, bike room, local road, trail, commute, and clean product-studio contexts.
- **Camera:** functional product coverage, tread and component macro detail, and clear use-case imagery.
- **Lighting:** neutral honest studio light with natural outdoor context.
- **Palette and materials:** navy, red, gold, slate, white, rubber black, alloy, and restrained route color.
- **People:** real riders and mechanics with approachable skill; the product decision remains primary.
- **Avoid:** luxury editorial emptiness, hidden price, gold body text on white, invented compatibility, abstract navigation without category labels.

Product and service truth remains locked across studio, context, detail, and human-use images. Real product media remains the factual anchor.

## Image prompt structure

1. Job intent and real use case.
2. Stable subject and authorized references.
3. home workshop, bike room, local road, trail, commute, and clean product-studio contexts.
4. Composition and copy-safe region.
5. functional product coverage, tread and component macro detail, and clear use-case imagery.
6. neutral honest studio light with natural outdoor context.
7. Material, geometry, scale, people, and safety locks.
8. Explicit exclusions and no generated words or logos.

Use modules/generative-image.json for environment-wide, product-studio, product-context, and people-in-use structures.

## Motion design

compact deal and comparison pacing, quick product rotations, specification callouts, and clear holds.

Motion design uses controlled typography, layout, verified product media, and dimensional layers. One movement idea belongs to each beat. Identity and essential copy are composited as crisp controlled layers. Provide reduced motion.

## Generative video

Generative video produces clean visual plates. Each shot uses one stable subject, one subtle action, one camera move on one axis, explicit duration and ratio, light and material direction, continuity locks, and exclusions. Composite identity, verified copy, captions, interface, prices, and offers afterward.

Reject morphing products, drifting features, warping environments, anatomy failures, fake text, invented identity, and incoherent materials.

## Spatial and dimensional expression

tire tread, wheel section, component assembly, tool surfaces, and mechanically accurate exploded relationships. Dimensional scenes preserve verified scale, product geometry, contact, material response, and readable silhouettes. Effects must explain function, environment, or material.

## Marketing asset system

Supported brand-specific families:

- Weekly value feature.
- Tire finder.
- Maintenance essential.
- Category comparison.
- Shipping or loyalty message.

Current public-surface observations:

- The current storefront is intentionally dense: utility header, left category rail, central promotion, and daily-special commerce block.
- Navy, red, white, and gold organize service information, promotions, and direct-response actions.
- Marketing graphics combine embedded offer typography with real cycling products and race-oriented photography.

Verified public channel references:

- youtube.com: https://www.youtube.com/channel/UCNJY3VRHEnVZ3HIESTOywTQ?sub_confirmation=1
- facebook.com: https://www.facebook.com/BikeTiresDirect/
- instagram.com: https://www.instagram.com/biketiresdirect/
- Meta Ad Library lookup: https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=US&q=BikeTiresDirect&search_type=keyword_unordered

Every marketing brief supplies objective, audience, one proposition, one action, destination, ratio, verified product or service facts, rights, accessibility and legal inputs, current offer source and expiration, variant axes, and approval owner.

Keep brand, campaign, product or service, offer, and channel layers separable. Public reference creative cannot establish performance, targeting, spend, channel priority, audience response, or reuse rights.

## Storyboards and sequential production

Preferred narrative rhythm:

1. State the rider need.
2. Show the correct product category.
3. Prove fit or feature.
4. Surface the current value.
5. Resolve with a clear purchase or comparison action.

Every shot record states story function, duration, ratio, visual intent, composition, camera, action, lighting, exact approved copy, audio intent, continuity locks, asset selectors, rights, and evaluation references.

## Voice

Straightforward cycling retail language with concrete pricing, compatibility, and availability context.

Prefer specific language about category, dimensions, compatibility, price, stock, shipping, and rider use case. Avoid generic prestige, invented expertise, false urgency, unsupported results, and engagement claims without current evidence.

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
