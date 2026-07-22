# MotoSport Design System

Package version: **1.0.0**  
Research snapshot: **July 21, 2026**  
Evidence status: **Mixed: verified first-party surface evidence plus labeled inferred production guidance**

This package is the portable source of brand truth for MotoSport. Systems load brand.json, resolve the core files, and add only the capability modules needed for the output. Provider configuration, account credentials, renderer instructions, workflow state, performance data, and live commercial facts stay outside this directory.

## Brand in one sentence

MotoSport is fast, mechanical, and equipment-first. Blue guides fitment and shopping utility; red supplies racing urgency and brand energy; black, white, and dense product imagery keep the interface grounded in real machines and gear.

## Durable character

- Fast.
- Mechanical.
- Confident.
- Fitment Led.
- Racing.
- Serviceable.

Signature principle: **Ride-specific selection**.

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

- **primary:** #006BB8
- **primary-bright:** #0088CC
- **secondary:** #CE160F
- **accent:** #41B1F9
- **surface:** #FFFFFF
- **surface-muted:** #EEEEEE
- **on-surface:** #1F1F1F
- **on-primary:** #FFFFFF
- **on-secondary:** #FFFFFF
- **border:** #DDDDDD
- **error:** #B20000

- Blue is the dominant interactive color across ride selection and commerce controls.
- Racing red belongs to logo, sale, urgency, and promotional moments.
- Keep the remaining interface neutral so machinery, gear, and sponsor imagery remain legible.

## Typography

Saira carries bold category and campaign headlines; Poppins supports navigation, fitment, specifications, and forms. Keep the combination athletic and legible rather than decorative.

- **headline-display:** Saira, Helvetica, Arial, sans-serif, 40px, weight 700, line height 1.05, tracking -0.01em
- **headline-lg:** Saira, Helvetica, Arial, sans-serif, 30px, weight 700, line height 1.15, tracking 0em
- **headline-md:** Saira, Helvetica, Arial, sans-serif, 24px, weight 700, line height 1.2, tracking 0em
- **body-lg:** Poppins, Helvetica, Arial, sans-serif, 16px, weight 400, line height 1.45, tracking 0em
- **body-md:** Poppins, Helvetica, Arial, sans-serif, 14px, weight 400, line height 1.45, tracking 0em
- **label-sm:** Poppins, Helvetica, Arial, sans-serif, 12px, weight 600, line height 1.2, tracking 0.03em

Licensed font files are consumer inputs. Use documented fallbacks when licensed families are unavailable.

## Layout, spacing, shape, and depth

Use a dense wide catalog with persistent ride/fitment selection near the top. Category photography may be dramatic, but specifications, OEM context, and compatibility must align tightly below it.

Controls use a consistent 4px radius; navigation bands and promotional blocks remain square. Avoid lifestyle-oriented soft cards.

Most hierarchy is flat and border-led. Use small shadows for fitment selectors, menus, and cart overlays only.

Spacing values: 4px, 8px, 12px, 16px, 24px, 32px, 48px. Preserve a 44px minimum interactive target and explicit focus treatment.

## Actions and graphic hierarchy

The ride selector is a primary blue control and should precede product browsing when fitment matters. Red is best used for sale, brand, and urgent states. Category tiles may reverse white Saira type over action photography.

Use one primary message and one primary action per decision area or fixed asset. Recompose every aspect ratio. Current promotion, price, inventory, fitment, availability, dates, and service scope are removable runtime layers.

## Web and interactive guidance

Navigation and decision hierarchy must support **vehicle year, make, model, submodel, fitment, part type, discipline, safety, stock, and shipping**. Collection, product, guide, and service patterns live in modules/interactive.json; product hierarchy and current-data behavior live in modules/commerce.json.

Compact layouts preserve the same decision order. Overlays must not cover identity, current facts, fitment or options, form errors, or the primary action.

## Photography and image direction

- **Environment:** motocross track, dirt trail, garage, paddock, road, dunes, and working vehicle contexts.
- **Camera:** low action angles, clean mechanical product views, correct vehicle context, and detailed installation coverage.
- **Lighting:** hard directional action light balanced by clean neutral product and garage light.
- **Palette and materials:** operational blue, racing red, black, white, metal, rubber, dirt, and high-visibility gear color.
- **People:** properly protected riders and mechanics with credible technique and vehicle-specific equipment.
- **Avoid:** riding without correct protection, wrong vehicle fitment, invented OEM compatibility, red and blue competing actions, speed effects that hide the part.

Product and service truth remains locked across studio, context, detail, and human-use images. Real product media remains the factual anchor.

## Image prompt structure

1. Job intent and real use case.
2. Stable subject and authorized references.
3. motocross track, dirt trail, garage, paddock, road, dunes, and working vehicle contexts.
4. Composition and copy-safe region.
5. low action angles, clean mechanical product views, correct vehicle context, and detailed installation coverage.
6. hard directional action light balanced by clean neutral product and garage light.
7. Material, geometry, scale, people, and safety locks.
8. Explicit exclusions and no generated words or logos.

Use modules/generative-image.json for environment-wide, product-studio, product-context, and people-in-use structures.

## Motion design

high-energy but legible race pacing, machine tracking, mechanical assembly, fitment steps, and concise specification holds.

Motion design uses controlled typography, layout, verified product media, and dimensional layers. One movement idea belongs to each beat. Identity and essential copy are composited as crisp controlled layers. Provide reduced motion.

## Generative video

Generative video produces clean visual plates. Each shot uses one stable subject, one subtle action, one camera move on one axis, explicit duration and ratio, light and material direction, continuity locks, and exclusions. Composite identity, verified copy, captions, interface, prices, and offers afterward.

Reject morphing products, drifting features, warping environments, anatomy failures, fake text, invented identity, and incoherent materials.

## Spatial and dimensional expression

mechanical assemblies, tire tread, suspension, plastics, exhaust, protective materials, and accurate machine scale. Dimensional scenes preserve verified scale, product geometry, contact, material response, and readable silhouettes. Effects must explain function, environment, or material.

## Marketing asset system

Supported brand-specific families:

- Vehicle Specific upgrade.
- Race gear launch.
- Fitment campaign.
- Maintenance part.
- Rider or team story.

Current public-surface observations:

- MotoSport uses a dense powersports commerce shell with a large red wordmark, blue fitment action, and black category navigation.
- Current campaign art is high-energy and typographic, with rider cutouts, motion photography, and embedded sale lettering.
- Vehicle selection, OEM compatibility, riding discipline, and safety context must remain more prominent than generic lifestyle messaging.

Verified public channel references:

- No centralized standalone social profile was verified from the audited first-party surface.
- Meta Ad Library lookup: https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=US&q=Shop%20MotoSport&search_type=keyword_unordered

Every marketing brief supplies objective, audience, one proposition, one action, destination, ratio, verified product or service facts, rights, accessibility and legal inputs, current offer source and expiration, variant axes, and approval owner.

Keep brand, campaign, product or service, offer, and channel layers separable. Public reference creative cannot establish performance, targeting, spend, channel priority, audience response, or reuse rights.

## Storyboards and sequential production

Preferred narrative rhythm:

1. Identify the machine and ride goal.
2. Show the part or gear in context.
3. Prove fitment or performance detail.
4. Show installation or use truth.
5. Resolve with confirmed-fit action.

Every shot record states story function, duration, ratio, visual intent, composition, camera, action, lighting, exact approved copy, audio intent, continuity locks, asset selectors, rights, and evaluation references.

## Voice

Direct powersports expertise. Lead with machine, fitment, part, safety, and riding outcome.

Prefer specific language about vehicle year, make, model, submodel, fitment, part type, discipline, safety, stock, and shipping. Avoid generic prestige, invented expertise, false urgency, unsupported results, and engagement claims without current evidence.

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
