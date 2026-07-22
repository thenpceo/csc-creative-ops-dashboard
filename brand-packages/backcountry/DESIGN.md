# Backcountry Design System

Package version: **1.0.0**  
Research snapshot: **July 21, 2026**  
Evidence status: **Mixed: verified first-party surface evidence plus labeled inferred production guidance**

This package is the portable source of brand truth for Backcountry. Systems load brand.json, resolve the core files, and add only the capability modules needed for the output. Provider configuration, account credentials, renderer instructions, workflow state, performance data, and live commercial facts stay outside this directory.

## Brand in one sentence

Backcountry combines premium outdoor authority with practical gear-finding. Interfaces should feel capable, direct, and field-tested: cinematic photography carries emotion while restrained utility UI keeps product decisions fast. The distinctive visual tension is warm editorial storytelling against deep teal interaction controls and crisp black-and-white commerce surfaces.

## Durable character

- Capable.
- Expert.
- Adventurous.
- Direct.
- Field Tested.
- Welcoming.

Signature principle: **Gearhead expertise**.

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

- **primary:** #36827F
- **primary-hover:** #132E2C
- **secondary:** #AA4026
- **accent:** #DDC9A3
- **surface:** #FFFFFF
- **surface-muted:** #F5F5F5
- **on-surface:** #333333
- **on-primary:** #FFFFFF
- **on-secondary:** #FFFFFF
- **border:** #CCCCCC
- **error:** #D0021A

- Primary is the archived first-party `btn-brand` teal; reserve it for decisive commerce actions and expert guidance.
- Secondary is the rust `bg-brand` tone for editorial bands, badges, and warm campaign moments.
- Accent is a quiet sand used to connect UI with natural-material photography.

## Typography

Use Tiempos Headline for adventure-led storytelling and Flama for every transactional or product-detail surface. Labels may be uppercase, but body copy should remain conversational and expert.

- **headline-display:** Tiempos Headline, Georgia, serif, 48px, weight 500, line height 1.05, tracking -0.02em
- **headline-lg:** Tiempos Headline, Georgia, serif, 36px, weight 500, line height 1.1, tracking -0.01em
- **headline-md:** Flama, Helvetica, Arial, sans-serif, 28px, weight 600, line height 1.2, tracking 0em
- **body-lg:** Flama, Helvetica, Arial, sans-serif, 18px, weight 400, line height 1.5, tracking 0em
- **body-md:** Flama, Helvetica, Arial, sans-serif, 16px, weight 400, line height 1.5, tracking 0em
- **label-sm:** Flama, Helvetica, Arial, sans-serif, 12px, weight 600, line height 1.25, tracking 0.05em

Licensed font files are consumer inputs. Use documented fallbacks when licensed families are unavailable.

## Layout, spacing, shape, and depth

Use a fluid product grid inside a 1280–1440px desktop canvas. Editorial modules may run full bleed, but filters, comparison details, and purchase controls should align to a disciplined 8px rhythm with 24px default gutters.

Product and navigation UI is mostly square with 2–4px functional rounding. Pills are reserved for status, size, activity, and loyalty chips, never for every button.

Favor tonal surfaces and image overlays over decorative card shadows. Use thin gray borders for product containment and a restrained shadow only for menus, drawers, and sticky purchase trays.

Spacing values: 4px, 8px, 16px, 24px, 32px, 48px, 64px. Preserve a 44px minimum interactive target and explicit focus treatment.

## Actions and graphic hierarchy

Primary buttons are teal with white type; rust belongs to campaigns rather than routine checkout actions. Product cards stay quiet, image-first, and border-led. Expert-advice callouts may pair teal icons with sand or white surfaces.

Use one primary message and one primary action per decision area or fixed asset. Recompose every aspect ratio. Current promotion, price, inventory, fitment, availability, dates, and service scope are removable runtime layers.

## Web and interactive guidance

Navigation and decision hierarchy must support **activity, conditions, fit, technical performance, and expert recommendation**. Collection, product, guide, and service patterns live in modules/interactive.json; product hierarchy and current-data behavior live in modules/commerce.json.

Compact layouts preserve the same decision order. Overlays must not cover identity, current facts, fitment or options, form errors, or the primary action.

## Photography and image direction

- **Environment:** real alpine, trail, camp, snow, water, and desert locations with credible weather and terrain.
- **Camera:** wide environmental frames paired with honest medium action and material-detail coverage.
- **Lighting:** natural directional daylight that preserves terrain, weather, and product detail.
- **Palette and materials:** earth, rock, snow, water, evergreen, rust, and warm natural neutrals.
- **People:** real participants moving with competent, unforced body language and activity-correct equipment.
- **Avoid:** generic summit triumph, survivalist machismo, impossible terrain, unused pristine gear, fashion posing without activity context.

Product and service truth remains locked across studio, context, detail, and human-use images. Real product media remains the factual anchor.

## Image prompt structure

1. Job intent and real use case.
2. Stable subject and authorized references.
3. real alpine, trail, camp, snow, water, and desert locations with credible weather and terrain.
4. Composition and copy-safe region.
5. wide environmental frames paired with honest medium action and material-detail coverage.
6. natural directional daylight that preserves terrain, weather, and product detail.
7. Material, geometry, scale, people, and safety locks.
8. Explicit exclusions and no generated words or logos.

Use modules/generative-image.json for environment-wide, product-studio, product-context, and people-in-use structures.

## Motion design

measured expedition pacing, directional travel, map-like reveals, and restrained field-note overlays.

Motion design uses controlled typography, layout, verified product media, and dimensional layers. One movement idea belongs to each beat. Identity and essential copy are composited as crisp controlled layers. Provide reduced motion.

## Generative video

Generative video produces clean visual plates. Each shot uses one stable subject, one subtle action, one camera move on one axis, explicit duration and ratio, light and material direction, continuity locks, and exclusions. Composite identity, verified copy, captions, interface, prices, and offers afterward.

Reject morphing products, drifting features, warping environments, anatomy failures, fake text, invented identity, and incoherent materials.

## Spatial and dimensional expression

topographic relief, weather layers, technical textile response, and physically credible terrain scale. Dimensional scenes preserve verified scale, product geometry, contact, material response, and readable silhouettes. Effects must explain function, environment, or material.

## Marketing asset system

Supported brand-specific families:

- Activity Season story.
- Gearhead recommendation.
- Owned Brand field test.
- Technical product proof.
- Destination guide.

Current public-surface observations:

- Wide black-and-white commerce shell with a serif wordmark and activity-first navigation.
- Editorial outdoor photography supplies nearly all emotional color; promotional rust is used as a bounded campaign band.
- Expert Help and Summit Club+ are persistent service and loyalty proof points.

Verified public channel references:

- Like us on Facebook: https://www.facebook.com/Backcountry
- Follow us on Instagram: https://www.instagram.com/backcountry
- Subscribe to us on Youtube: https://www.youtube.com/@backcountry
- footer.tiktok: https://www.tiktok.com/@backcountrycom
- Meta Ad Library lookup: https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=US&q=Backcountry&search_type=keyword_unordered

Every marketing brief supplies objective, audience, one proposition, one action, destination, ratio, verified product or service facts, rights, accessibility and legal inputs, current offer source and expiration, variant axes, and approval owner.

Keep brand, campaign, product or service, offer, and channel layers separable. Public reference creative cannot establish performance, targeting, spend, channel priority, audience response, or reuse rights.

## Storyboards and sequential production

Preferred narrative rhythm:

1. Establish the real objective or terrain.
2. Show the participant and equipment in use.
3. Prove one technical detail.
4. Connect to Gearhead expertise.
5. Resolve with one useful next step.

Every shot record states story function, duration, ratio, visual intent, composition, camera, action, lighting, exact approved copy, audio intent, continuity locks, asset selectors, rights, and evaluation references.

## Voice

Practical outdoor expertise with firsthand specificity. Confident and encouraging, never macho or vague.

Prefer specific language about activity, conditions, fit, technical performance, and expert recommendation. Avoid generic prestige, invented expertise, false urgency, unsupported results, and engagement claims without current evidence.

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
