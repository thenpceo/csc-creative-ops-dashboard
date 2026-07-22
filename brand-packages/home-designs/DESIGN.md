# Home Designs Design System

Package version: **1.0.0**  
Research snapshot: **July 21, 2026**  
Evidence status: **Mixed: verified first-party surface evidence plus labeled inferred production guidance**

This package is the portable source of brand truth for Home Designs. Systems load brand.json, resolve the core files, and add only the capability modules needed for the output. Provider configuration, account credentials, renderer instructions, workflow state, performance data, and live commercial facts stay outside this directory.

## Brand in one sentence

Home Designs presents permanence, craft, and local service. The public CSC logo tile supplies the Home Designs identity; the active Cabinetry Unlimited operating surface supplies the observable digital system. Architectural and finished-interior photography should lead, supported by heritage serif headlines, calm sans-serif UI, deep maroon, and warm gold.

## Durable character

- Established.
- Craft Led.
- Consultative.
- Local.
- Material.
- Reassuring.

Signature principle: **Designed for how the home is lived**.

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

- **primary:** #5A0D0D
- **secondary:** #E49E0A
- **accent:** #0E6897
- **surface:** #FFFFFF
- **surface-muted:** #F1F1F1
- **on-surface:** #333333
- **on-primary:** #FFFFFF
- **on-secondary:** #191919
- **border:** #C9C9C9
- **error:** #821B1B

- Deep maroon anchors the brand and mirrors the active cabinetry operation.
- Gold signals consultation, phone, and craftsmanship calls to action.
- Blue is a limited supporting accent observed in the live surface; do not let it compete with maroon and gold.

## Typography

Marcellus provides the established craft voice. Mulish handles explanatory text and forms; Montserrat may appear in compact uppercase labels and buttons.

- **headline-display:** Marcellus, Georgia, serif, 50px, weight 700, line height 1.1, tracking -0.01em
- **headline-lg:** Marcellus, Georgia, serif, 40px, weight 700, line height 1.15, tracking 0em
- **headline-md:** Marcellus, Georgia, serif, 30px, weight 700, line height 1.2, tracking 0em
- **body-lg:** Mulish, Helvetica, Arial, sans-serif, 18px, weight 400, line height 1.55, tracking 0em
- **body-md:** Mulish, Helvetica, Arial, sans-serif, 16px, weight 400, line height 1.55, tracking 0em
- **label-sm:** Montserrat, Helvetica, Arial, sans-serif, 12px, weight 700, line height 1.2, tracking 0.06em

Licensed font files are consumer inputs. Use documented fallbacks when licensed families are unavailable.

## Layout, spacing, shape, and depth

Use wide architectural hero imagery, centered proof points, and service cards that move from residential inspiration to consultation. Give photography breathing room and keep phone/showroom actions persistent but unobtrusive.

Structural bands and image frames can remain square; consultation buttons use the observed pill treatment. Avoid applying pills to every navigation item or card.

Use image overlays and light gray section changes. Service cards may have a restrained shadow or border, but the system should feel constructed and material rather than floaty.

Spacing values: 4px, 8px, 16px, 24px, 32px, 48px, 64px. Preserve a 44px minimum interactive target and explicit focus treatment.

## Actions and graphic hierarchy

Maroon and gold work as a pair: maroon for brand anchoring, gold for consultation actions. Service tiles should pair an architectural image with a serif title and plain-language scope.

Use one primary message and one primary action per decision area or fixed asset. Recompose every aspect ratio. Current promotion, price, inventory, fitment, availability, dates, and service scope are removable runtime layers.

## Web and interactive guidance

Navigation and decision hierarchy must support **project scope, room needs, materials, finish, storage, budget range, service area, and consultation**. Collection, product, guide, and service patterns live in modules/interactive.json; product hierarchy and current-data behavior live in modules/commerce.json.

Compact layouts preserve the same decision order. Overlays must not cover identity, current facts, fitment or options, form errors, or the primary action.

## Photography and image direction

- **Environment:** completed kitchens, baths, built-ins, material libraries, workshops, and client consultations.
- **Camera:** architectural wide views with controlled verticals, cabinet detail, hardware macro, and process documentation.
- **Lighting:** natural residential light with warm practicals and accurate material color.
- **Palette and materials:** deep maroon, warm gold, white, stone, wood, painted cabinetry, aged metal, and limited blue.
- **People:** designers, craftspeople, and homeowners collaborating naturally; completed rooms remain central.
- **Avoid:** pure ecommerce treatment, unverified before-and-after, impossible storage geometry, gold text with weak contrast, generic contractor stock imagery.

Product and service truth remains locked across studio, context, detail, and human-use images. Real product media remains the factual anchor.

## Image prompt structure

1. Job intent and real use case.
2. Stable subject and authorized references.
3. completed kitchens, baths, built-ins, material libraries, workshops, and client consultations.
4. Composition and copy-safe region.
5. architectural wide views with controlled verticals, cabinet detail, hardware macro, and process documentation.
6. natural residential light with warm practicals and accurate material color.
7. Material, geometry, scale, people, and safety locks.
8. Explicit exclusions and no generated words or logos.

Use modules/generative-image.json for environment-wide, product-studio, product-context, and people-in-use structures.

## Motion design

slow architectural reveals, plan-to-room transitions, material sequencing, and calm consultation pacing.

Motion design uses controlled typography, layout, verified product media, and dimensional layers. One movement idea belongs to each beat. Identity and essential copy are composited as crisp controlled layers. Provide reduced motion.

## Generative video

Generative video produces clean visual plates. Each shot uses one stable subject, one subtle action, one camera move on one axis, explicit duration and ratio, light and material direction, continuity locks, and exclusions. Composite identity, verified copy, captions, interface, prices, and offers afterward.

Reject morphing products, drifting features, warping environments, anatomy failures, fake text, invented identity, and incoherent materials.

## Spatial and dimensional expression

cabinet geometry, wood grain, stone, hardware, joinery, accurate room dimensions, and soft architectural light. Dimensional scenes preserve verified scale, product geometry, contact, material response, and readable silhouettes. Effects must explain function, environment, or material.

## Marketing asset system

Supported brand-specific families:

- Completed project case study.
- Material guide.
- Designer consultation.
- Craft process.
- Local service proof.

Current public-surface observations:

- The CSC Home Designs evidence resolves to a service-led Cabinetry Unlimited operating surface rather than a general ecommerce store.
- Maroon, warm gold, white, and large cabinetry photography create a craft and consultation-led system.
- Primary marketing actions should lead to consultation, showroom, project proof, or service-area confirmation.

Verified public channel references:

- facebook: https://facebook.com/CabinetryUnlimited/
- instagram: https://instagram.com/cabinetry_unlimited/
- Meta Ad Library lookup: https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=US&q=Custom%20Cabinets%20%26%20Countertops&search_type=keyword_unordered

Every marketing brief supplies objective, audience, one proposition, one action, destination, ratio, verified product or service facts, rights, accessibility and legal inputs, current offer source and expiration, variant axes, and approval owner.

Keep brand, campaign, product or service, offer, and channel layers separable. Public reference creative cannot establish performance, targeting, spend, channel priority, audience response, or reuse rights.

## Storyboards and sequential production

Preferred narrative rhythm:

1. Establish the household need.
2. Show design or material choices.
3. Reveal craft and process.
4. Show the completed lived result.
5. Resolve with consultation.

Every shot record states story function, duration, ratio, visual intent, composition, camera, action, lighting, exact approved copy, audio intent, continuity locks, asset selectors, rights, and evaluation references.

## Voice

Calm craft expertise. Explain scope, material, process, and next steps in plain language.

Prefer specific language about project scope, room needs, materials, finish, storage, budget range, service area, and consultation. Avoid generic prestige, invented expertise, false urgency, unsupported results, and engagement claims without current evidence.

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
