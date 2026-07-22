# Competitive Cyclist Design System

Package version: **1.0.0**  
Research snapshot: **July 21, 2026**  
Evidence status: **Mixed: verified first-party surface evidence plus labeled inferred production guidance**

This package is the portable source of brand truth for Competitive Cyclist. Systems load brand.json, resolve the core files, and add only the capability modules needed for the output. Provider configuration, account credentials, renderer instructions, workflow state, performance data, and live commercial facts stay outside this directory.

## Brand in one sentence

Competitive Cyclist should feel exacting, fast, and enthusiast-grade. It is a technical retail system, not a lifestyle boutique: large product imagery, crisp specifications, and decisive red actions sit on a near-monochrome foundation. The voice assumes informed riders and rewards comparison.

## Durable character

- Precise.
- Technical.
- Fast.
- Disciplined.
- Informed.
- Performance Led.

Signature principle: **Race-day precision**.

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

- **primary:** #CC0000
- **primary-hover:** #B40400
- **secondary:** #333333
- **accent:** #D74009
- **surface:** #FFFFFF
- **surface-muted:** #F5F5F5
- **on-surface:** #333333
- **on-primary:** #FFFFFF
- **on-secondary:** #FFFFFF
- **border:** #CCCCCC
- **error:** #D0021A

- Primary red is the first-party `brand`, `btn-brand`, and `border-brand` token.
- Charcoal carries navigation and technical hierarchy; most surfaces remain white.
- Use orange only for urgent editorial callouts, not as a second primary action color.

## Typography

Proxima Nova is the single voice across editorial and commerce. Use weight, scale, and uppercase labels for hierarchy; avoid adding a decorative display face.

- **headline-display:** proxima-nova, Helvetica, Arial, sans-serif, 40px, weight 700, line height 1.05, tracking -0.02em
- **headline-lg:** proxima-nova, Helvetica, Arial, sans-serif, 36px, weight 700, line height 1.1, tracking -0.01em
- **headline-md:** proxima-nova, Helvetica, Arial, sans-serif, 28px, weight 600, line height 1.2, tracking 0em
- **body-lg:** proxima-nova, Helvetica, Arial, sans-serif, 18px, weight 400, line height 1.5, tracking 0em
- **body-md:** proxima-nova, Helvetica, Arial, sans-serif, 16px, weight 400, line height 1.5, tracking 0em
- **label-sm:** proxima-nova, Helvetica, Arial, sans-serif, 12px, weight 600, line height 1.25, tracking 0.06em

Licensed font files are consumer inputs. Use documented fallbacks when licensed families are unavailable.

## Layout, spacing, shape, and depth

Use a wide, high-density commerce grid with strong alignment between imagery, specifications, price, and availability. Desktop gutters sit near 24px; comparison tables and product data may be denser than editorial modules.

Keep geometry engineered and compact: square product tiles, 2–4px control radii, and circular icon buttons only where the icon itself needs a hit target.

Hierarchy comes from borders, white space, and black/red contrast. Shadows are limited to transient navigation, filter drawers, and cart overlays.

Spacing values: 4px, 8px, 16px, 24px, 32px, 48px, 64px. Preserve a 44px minimum interactive target and explicit focus treatment.

## Actions and graphic hierarchy

Red is the single purchase and active-selection signal. Product cards use white surfaces and restrained borders. Technical tables should privilege scanability and use charcoal labels with red only for selected or promotional states.

Use one primary message and one primary action per decision area or fixed asset. Recompose every aspect ratio. Current promotion, price, inventory, fitment, availability, dates, and service scope are removable runtime layers.

## Web and interactive guidance

Navigation and decision hierarchy must support **discipline, geometry, fit, compatibility, weight, travel, drivetrain, and ride characteristics**. Collection, product, guide, and service patterns live in modules/interactive.json; product hierarchy and current-data behavior live in modules/commerce.json.

Compact layouts preserve the same decision order. Overlays must not cover identity, current facts, fitment or options, form errors, or the primary action.

## Photography and image direction

- **Environment:** credible road, gravel, trail, workshop, and race-preparation settings.
- **Camera:** clean side profiles, engineered three-quarter product views, high-speed action, and exact component macro detail.
- **Lighting:** crisp controlled light for equipment with directional outdoor light for riding.
- **Palette and materials:** black, white, asphalt, carbon, metal, disciplined red, and terrain-specific natural color.
- **People:** experienced riders in correct kit and position, showing effort and technique rather than lifestyle posing.
- **Avoid:** generic fitness motivation, casual cruiser styling, invented specifications, wrong component compatibility, decorative speed effects that hide the bicycle.

Product and service truth remains locked across studio, context, detail, and human-use images. Real product media remains the factual anchor.

## Image prompt structure

1. Job intent and real use case.
2. Stable subject and authorized references.
3. credible road, gravel, trail, workshop, and race-preparation settings.
4. Composition and copy-safe region.
5. clean side profiles, engineered three-quarter product views, high-speed action, and exact component macro detail.
6. crisp controlled light for equipment with directional outdoor light for riding.
7. Material, geometry, scale, people, and safety locks.
8. Explicit exclusions and no generated words or logos.

Use modules/generative-image.json for environment-wide, product-studio, product-context, and people-in-use structures.

## Motion design

fast but legible cuts, precise tracking, data-led reveals, wheel rotation, and controlled race-energy accents.

Motion design uses controlled typography, layout, verified product media, and dimensional layers. One movement idea belongs to each beat. Identity and essential copy are composited as crisp controlled layers. Provide reduced motion.

## Generative video

Generative video produces clean visual plates. Each shot uses one stable subject, one subtle action, one camera move on one axis, explicit duration and ratio, light and material direction, continuity locks, and exclusions. Composite identity, verified copy, captions, interface, prices, and offers afterward.

Reject morphing products, drifting features, warping environments, anatomy failures, fake text, invented identity, and incoherent materials.

## Spatial and dimensional expression

carbon weave, machined metal, wheel geometry, aerodynamic flow, and workshop-grade lighting. Dimensional scenes preserve verified scale, product geometry, contact, material response, and readable silhouettes. Effects must explain function, environment, or material.

## Marketing asset system

Supported brand-specific families:

- New bike launch.
- Component technology story.
- Ride Like The Pros edit.
- Discipline buying guide.
- Gear review.

Current public-surface observations:

- Dense specialist navigation is paired with a restrained white shell and red promotional bands.
- The current Ride Like a Pro campaign uses oversized typographic composition, cycling photography, black, white, and fluorescent yellow.
- Category language is pursuit- and component-specific rather than general sporting-goods language.

Verified public channel references:

- Like us on Facebook: https://www.facebook.com/Competitive.Cyclist
- Subscribe to us on Youtube: https://www.youtube.com/@competitivecyclist
- Follow us on Instagram: https://www.instagram.com/competitivecyclist
- footer.tiktok: https://www.tiktok.com/@competitivecyclist
- Meta Ad Library lookup: https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=US&q=Competitive%20Cyclist&search_type=keyword_unordered

Every marketing brief supplies objective, audience, one proposition, one action, destination, ratio, verified product or service facts, rights, accessibility and legal inputs, current offer source and expiration, variant axes, and approval owner.

Keep brand, campaign, product or service, offer, and channel layers separable. Public reference creative cannot establish performance, targeting, spend, channel priority, audience response, or reuse rights.

## Storyboards and sequential production

Preferred narrative rhythm:

1. Name the discipline or performance question.
2. Show the machine in its intended terrain.
3. Reveal a measurable technical difference.
4. Connect fit or compatibility.
5. Resolve with a decisive product or expert action.

Every shot record states story function, duration, ratio, visual intent, composition, camera, action, lighting, exact approved copy, audio intent, continuity locks, asset selectors, rights, and evaluation references.

## Voice

Informed rider-to-rider expertise. Specific about discipline, geometry, compatibility, and performance without empty hype.

Prefer specific language about discipline, geometry, fit, compatibility, weight, travel, drivetrain, and ride characteristics. Avoid generic prestige, invented expertise, false urgency, unsupported results, and engagement claims without current evidence.

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
