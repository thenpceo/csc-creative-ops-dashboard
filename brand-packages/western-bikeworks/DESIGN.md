# Western Bikeworks Design System

Package version: **1.0.0**  
Research snapshot: **July 21, 2026**  
Evidence status: **Mixed: verified first-party surface evidence plus labeled inferred production guidance; historical standalone identity**

This package is the portable source of brand truth for Western Bikeworks. Systems load brand.json, resolve the core files, and add only the capability modules needed for the output. Provider configuration, account credentials, renderer instructions, workflow state, performance data, and live commercial facts stay outside this directory.

## Brand in one sentence

Western Bikeworks was a practical, enthusiast-focused cycling shop with compact product density and a distinctly Pacific Northwest teal accent. Its last standalone digital identity paired deep red, teal, and orange with a utilitarian Open Sans catalog. The live domain now redirects to BikeTiresDirect; this file preserves the final standalone system for migration or revival work.

## Durable character

- Local.
- Practical.
- Dependable.
- Cycling Led.
- Service Minded.
- Unfussy.

Signature principle: **Local ride utility**.

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

- **primary:** #C41230
- **secondary:** #008FB1
- **accent:** #F78429
- **surface:** #FFFFFF
- **surface-muted:** #F8F8F8
- **on-surface:** #222222
- **on-primary:** #FFFFFF
- **on-secondary:** #000000
- **border:** #CCCCCC
- **error:** #D00000

- Deep red was the dominant promotional and brand color in the final standalone CSS.
- Teal supplied the local cycling identity and secondary interaction system.
- Orange marked value and promotional energy; keep it subordinate to red and teal.

## Typography

Open Sans is the operative voice. Use compact, clear sizes and direct price/category hierarchy; campaign artwork may carry bolder display lettering inside images.

- **headline-display:** Open Sans, Arial, sans-serif, 42px, weight 700, line height 1.05, tracking -0.01em
- **headline-lg:** Open Sans, Arial, sans-serif, 34px, weight 700, line height 1.1, tracking 0em
- **headline-md:** Open Sans, Arial, sans-serif, 22px, weight 600, line height 1.2, tracking 0em
- **body-lg:** Open Sans, Arial, sans-serif, 16px, weight 400, line height 1.45, tracking 0em
- **body-md:** Open Sans, Arial, sans-serif, 14px, weight 400, line height 1.45, tracking 0em
- **label-sm:** Open Sans, Arial, sans-serif, 12px, weight 700, line height 1.2, tracking 0.03em

Licensed font files are consumer inputs. Use documented fallbacks when licensed families are unavailable.

## Layout, spacing, shape, and depth

Preserve the compact multi-column catalog, visible categories, and direct price/value presentation. Use a centered desktop shell and 12–16px product-grid gaps.

Structure remains square with small 3–5px control radii. Larger radii are reserved for badges and isolated utility UI.

Flat borders and background blocks do most of the work. Shadows are for menus, modals, and chat only.

Spacing values: 4px, 8px, 12px, 16px, 24px, 32px, 48px. Preserve a 44px minimum interactive target and explicit focus treatment.

## Actions and graphic hierarchy

Red handles primary promotions, teal supports navigation or secondary actions, and orange highlights value. Product cards should remain compact and comparison-friendly.

Use one primary message and one primary action per decision area or fixed asset. Recompose every aspect ratio. Current promotion, price, inventory, fitment, availability, dates, and service scope are removable runtime layers.

## Web and interactive guidance

Navigation and decision hierarchy must support **ride type, local conditions, compatibility, maintenance, availability, and value**. Collection, product, guide, and service patterns live in modules/interactive.json; product hierarchy and current-data behavior live in modules/commerce.json.

Compact layouts preserve the same decision order. Overlays must not cover identity, current facts, fitment or options, form errors, or the primary action.

## Photography and image direction

- **Environment:** Pacific Northwest roads, commutes, trails, wet-weather riding, workshops, and local store context.
- **Camera:** functional riding context, clear product imagery, weather detail, and approachable service coverage.
- **Lighting:** soft overcast outdoor light and neutral workshop light.
- **Palette and materials:** historical blue, orange, white, wet asphalt, evergreen, alloy, and rubber.
- **People:** local riders and mechanics with practical clothing, equipment, and weather credibility.
- **Avoid:** presenting the identity as currently standalone, invented current store claims, sunny generic cycling stock, race-only elitism, compatibility invention.

Product and service truth remains locked across studio, context, detail, and human-use images. Real product media remains the factual anchor.

## Image prompt structure

1. Job intent and real use case.
2. Stable subject and authorized references.
3. Pacific Northwest roads, commutes, trails, wet-weather riding, workshops, and local store context.
4. Composition and copy-safe region.
5. functional riding context, clear product imagery, weather detail, and approachable service coverage.
6. soft overcast outdoor light and neutral workshop light.
7. Material, geometry, scale, people, and safety locks.
8. Explicit exclusions and no generated words or logos.

Use modules/generative-image.json for environment-wide, product-studio, product-context, and people-in-use structures.

## Motion design

steady route movement, service steps, rain and road texture, and compact product or value beats.

Motion design uses controlled typography, layout, verified product media, and dimensional layers. One movement idea belongs to each beat. Identity and essential copy are composited as crisp controlled layers. Provide reduced motion.

## Generative video

Generative video produces clean visual plates. Each shot uses one stable subject, one subtle action, one camera move on one axis, explicit duration and ratio, light and material direction, continuity locks, and exclusions. Composite identity, verified copy, captions, interface, prices, and offers afterward.

Reject morphing products, drifting features, warping environments, anatomy failures, fake text, invented identity, and incoherent materials.

## Spatial and dimensional expression

wheel and component geometry, rain surfaces, repair benches, route lines, and correct bicycle scale. Dimensional scenes preserve verified scale, product geometry, contact, material response, and readable silhouettes. Effects must explain function, environment, or material.

## Marketing asset system

Supported brand-specific families:

- Historical local ride guide.
- Wet Weather essential.
- Service story.
- Commuter setup.
- Component value.

Current public-surface observations:

- The Western Bikeworks domain currently redirects to BikeTiresDirect and displays a migration notice.
- The migration notice is current operational evidence, not Western Bikeworks visual identity material.
- Preserve the standalone Western Bikeworks system as historical reference only and never imply active independent operations.

Verified public channel references:

- Historical first-party YouTube link: https://www.youtube.com/westernbikeworks
- Historical first-party Instagram link: https://www.instagram.com/westernbikeworks
- Historical first-party Facebook link: https://www.facebook.com/pages/Western-Bikeworks/157762564281790

Every marketing brief supplies objective, audience, one proposition, one action, destination, ratio, verified product or service facts, rights, accessibility and legal inputs, current offer source and expiration, variant axes, and approval owner.

Keep brand, campaign, product or service, offer, and channel layers separable. Public reference creative cannot establish performance, targeting, spend, channel priority, audience response, or reuse rights.

## Storyboards and sequential production

Preferred narrative rhythm:

1. Name the local ride need.
2. Show the real condition.
3. Prove product or service utility.
4. Connect fit or maintenance.
5. Resolve with a practical next step.

Every shot record states story function, duration, ratio, visual intent, composition, camera, action, lighting, exact approved copy, audio intent, continuity locks, asset selectors, rights, and evaluation references.

## Voice

Straightforward local cycling help with product, route, weather, and maintenance context.

Prefer specific language about ride type, local conditions, compatibility, maintenance, availability, and value. Avoid generic prestige, invented expertise, false urgency, unsupported results, and engagement claims without current evidence.

## Rights, facts, and media

media.json is the only asset catalog. Local folders are storage conveniences; consumers resolve catalog IDs and rights metadata.

- Publicly captured site and identity media is analysis/reference evidence.
- Production reuse requires authorization.
- Model upload and redistribution are disabled by default.
- Prices, offers, inventory, availability, service scope, compatibility, reviews, dates, and results are runtime facts.
- This is a historical standalone identity. Never imply current standalone operations without a current authoritative source.

## Evaluation

Outputs must pass identity, product or service truth, claims, rights, readability, and historical-scope gates. A score of 0.85 or higher is approved only when every gate passes; 0.70 to 0.849 requires human review.

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
