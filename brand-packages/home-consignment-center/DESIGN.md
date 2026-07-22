# Home Consignment Center Design System

Package version: **1.0.0**  
Research snapshot: **July 21, 2026**  
Evidence status: **Mixed: verified first-party surface evidence plus labeled inferred production guidance**

This package is the portable source of brand truth for Home Consignment Center. Systems load brand.json, resolve the core files, and add only the capability modules needed for the output. Provider configuration, account credentials, renderer instructions, workflow state, performance data, and live commercial facts stay outside this directory.

## Brand in one sentence

Home Consignment Center balances upscale home discovery with approachable local retail. Large showroom photography and heavy Archivo headlines create impact; navy, warm cream, taupe, and red keep the experience grounded and action-oriented.

## Durable character

- Bold.
- Upscale.
- Local.
- Approachable.
- Discovery Led.
- Trustworthy.

Signature principle: **Find it. Love it. Give it a new home.**.

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

- **primary:** #BA232D
- **secondary:** #233D58
- **accent:** #A4928E
- **surface:** #FFFFFF
- **surface-muted:** #FBF4E9
- **on-surface:** #34312C
- **on-primary:** #FFFFFF
- **on-secondary:** #FFFFFF
- **border:** #DDDDDD
- **error:** #BA232D

- Red is the conversion color for store-finding and consignment actions.
- Navy supplies depth for full-width sections, footer areas, and photo overlays.
- Taupe and warm cream connect the interface to furniture, jewelry, and residential materials.

## Typography

Archivo carries both dramatic headlines and practical UI. Use very large, heavy headings over photography; shift to regular or light weights for supporting copy.

- **headline-display:** Archivo, Helvetica, Arial, sans-serif, 64px, weight 800, line height 1.05, tracking -0.02em
- **headline-lg:** Archivo, Helvetica, Arial, sans-serif, 48px, weight 700, line height 1.1, tracking -0.01em
- **headline-md:** Archivo, Helvetica, Arial, sans-serif, 32px, weight 700, line height 1.2, tracking 0em
- **body-lg:** Archivo, Helvetica, Arial, sans-serif, 18px, weight 300, line height 1.6, tracking 0em
- **body-md:** Archivo, Helvetica, Arial, sans-serif, 16px, weight 400, line height 1.55, tracking 0em
- **label-sm:** Archivo, Helvetica, Arial, sans-serif, 13px, weight 600, line height 1.2, tracking 0.04em

Licensed font files are consumer inputs. Use documented fallbacks when licensed families are unavailable.

## Layout, spacing, shape, and depth

Alternate full-bleed showroom photography with centered content bands. Desktop headlines may occupy half the canvas; local-store and consignment tasks should remain immediately visible in the header and hero.

Primary CTAs and content bands are square-edged. Round only badges, location markers, and small utility controls.

Photography, dark overlays, and tonal section changes create depth. Avoid card stacks; use a subtle shadow only for floating store or form panels.

Spacing values: 4px, 8px, 16px, 24px, 32px, 48px, 64px. Preserve a 44px minimum interactive target and explicit focus treatment.

## Actions and graphic hierarchy

Red buttons should be rectangular, uppercase, and compact. Navy panels can reverse text to white. Cards should feel like gallery placards: image-dominant with direct labels and minimal chrome.

Use one primary message and one primary action per decision area or fixed asset. Recompose every aspect ratio. Current promotion, price, inventory, fitment, availability, dates, and service scope are removable runtime layers.

## Web and interactive guidance

Navigation and decision hierarchy must support **location, condition, dimensions, material, uniqueness, price, pickup, and consignment process**. Collection, product, guide, and service patterns live in modules/interactive.json; product hierarchy and current-data behavior live in modules/commerce.json.

Compact layouts preserve the same decision order. Overlays must not cover identity, current facts, fitment or options, form errors, or the primary action.

## Photography and image direction

- **Environment:** real showrooms, styled residential rooms, jewelry cases, and local store context.
- **Camera:** gallery-scale room views, product vignettes, honest condition detail, and human store discovery.
- **Lighting:** warm showroom light balanced with natural residential daylight.
- **Palette and materials:** navy, warm cream, taupe, red, wood, brass, upholstery, and jewel tones.
- **People:** customers and staff browsing, evaluating, carrying, styling, or consigning; friendly and local rather than fashion-led.
- **Avoid:** infinite inventory implication, factory-new representation, hidden condition, generic luxury mansion, online-only fulfillment assumptions.

Product and service truth remains locked across studio, context, detail, and human-use images. Real product media remains the factual anchor.

## Image prompt structure

1. Job intent and real use case.
2. Stable subject and authorized references.
3. real showrooms, styled residential rooms, jewelry cases, and local store context.
4. Composition and copy-safe region.
5. gallery-scale room views, product vignettes, honest condition detail, and human store discovery.
6. warm showroom light balanced with natural residential daylight.
7. Material, geometry, scale, people, and safety locks.
8. Explicit exclusions and no generated words or logos.

Use modules/generative-image.json for environment-wide, product-studio, product-context, and people-in-use structures.

## Motion design

confident showroom reveals, object-to-room transitions, location-led wipes, and restrained red action accents.

Motion design uses controlled typography, layout, verified product media, and dimensional layers. One movement idea belongs to each beat. Identity and essential copy are composited as crisp controlled layers. Provide reduced motion.

## Generative video

Generative video produces clean visual plates. Each shot uses one stable subject, one subtle action, one camera move on one axis, explicit duration and ratio, light and material direction, continuity locks, and exclusions. Composite identity, verified copy, captions, interface, prices, and offers afterward.

Reject morphing products, drifting features, warping environments, anatomy failures, fake text, invented identity, and incoherent materials.

## Spatial and dimensional expression

furniture materials, real dimensions, showroom depth, framed art, upholstery, and jewelry reflectance. Dimensional scenes preserve verified scale, product geometry, contact, material response, and readable silhouettes. Effects must explain function, environment, or material.

## Marketing asset system

Supported brand-specific families:

- New Arrival discovery.
- Showroom walkthrough.
- How To Consign.
- Local store feature.
- One Of A Kind find.

Current public-surface observations:

- Full-width showroom imagery carries the brand while the navigation and identity sit in a light overlay.
- Red store-finding and consignment actions are the strongest persistent graphic signal.
- The current value proposition combines treasure hunting, local showroom discovery, and frictionless consignment.

Verified public channel references:

- No centralized standalone social profile was verified from the audited first-party surface.
- Meta Ad Library lookup: https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=US&q=Buy%20%26%20Sell%20Furniture%20on%20Consignment&search_type=keyword_unordered

Every marketing brief supplies objective, audience, one proposition, one action, destination, ratio, verified product or service facts, rights, accessibility and legal inputs, current offer source and expiration, variant axes, and approval owner.

Keep brand, campaign, product or service, offer, and channel layers separable. Public reference creative cannot establish performance, targeting, spend, channel priority, audience response, or reuse rights.

## Storyboards and sequential production

Preferred narrative rhythm:

1. Open on a distinctive find or room.
2. Show the local showroom context.
3. Prove condition, material, or story.
4. Explain buy or consign value.
5. Resolve with store or consignment action.

Every shot record states story function, duration, ratio, visual intent, composition, camera, action, lighting, exact approved copy, audio intent, continuity locks, asset selectors, rights, and evaluation references.

## Voice

Energetic local retail confidence with clear consignment guidance and no false permanence about one-of-a-kind inventory.

Prefer specific language about location, condition, dimensions, material, uniqueness, price, pickup, and consignment process. Avoid generic prestige, invented expertise, false urgency, unsupported results, and engagement claims without current evidence.

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
