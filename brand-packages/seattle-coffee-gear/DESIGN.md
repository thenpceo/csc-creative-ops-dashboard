# Seattle Coffee Gear Design System

Package version: **1.0.0**  
Research snapshot: **July 21, 2026**  
Evidence status: **Mixed: verified first-party surface evidence plus labeled inferred production guidance**

This package is the portable source of brand truth for Seattle Coffee Gear. Systems load brand.json, resolve the core files, and add only the capability modules needed for the output. Provider configuration, account credentials, renderer instructions, workflow state, performance data, and live commercial facts stay outside this directory.

## Brand in one sentence

Seattle Coffee Gear is expert without being intimidating. Its interface pairs clean equipment merchandising with playful, high-energy campaign graphics. Raspberry red is the brand signature, ocean blue supports guidance and secondary actions, and warm yellow/green accents bring café warmth and educational energy.

## Durable character

- Knowledgeable.
- Friendly.
- Curious.
- Hands On.
- Precise.
- Unpretentious.

Signature principle: **Make coffee you love**.

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

- **primary:** #D2324C
- **primary-dark:** #962134
- **secondary:** #217A97
- **accent:** #EDAF44
- **success:** #218368
- **surface:** #FFFFFF
- **surface-muted:** #F7F7FA
- **on-surface:** #282828
- **on-primary:** #FFFFFF
- **on-secondary:** #FFFFFF
- **border:** #C8C8DD
- **error:** #BE2119

- Raspberry red is the primary brand and campaign action color.
- Ocean blue supports consultation, education, and secondary actions.
- Yellow is a warmth and highlight accent; green is reserved for success or coffee-community signals.

## Typography

Use Proxima Nova Condensed for bold merchandising and campaign headlines; standard Proxima Nova handles product, education, navigation, and forms.

- **headline-display:** proxima-nova-condensed, Helvetica, Arial, sans-serif, 60px, weight 800, line height 1, tracking -0.01em
- **headline-lg:** proxima-nova-condensed, Helvetica, Arial, sans-serif, 36px, weight 700, line height 1.1, tracking 0em
- **headline-md:** proxima-nova, Helvetica, Arial, sans-serif, 30px, weight 700, line height 1.2, tracking 0em
- **body-lg:** proxima-nova, Helvetica, Arial, sans-serif, 18px, weight 400, line height 1.55, tracking 0em
- **body-md:** proxima-nova, Helvetica, Arial, sans-serif, 16px, weight 400, line height 1.5, tracking 0em
- **label-sm:** proxima-nova, Helvetica, Arial, sans-serif, 12px, weight 600, line height 1.2, tracking 0.04em

Licensed font files are consumer inputs. Use documented fallbacks when licensed families are unavailable.

## Layout, spacing, shape, and depth

Use a bright retail canvas with full-width campaign heroes, clear product carousels, and educational modules. Maintain 16–24px grid gaps and give consultation content more breathing room than catalog rows.

Buttons use compact 5–8px radii; chips and carousel controls may be circular or full-pill. Avoid applying the larger 24–32px utility radii to core catalog cards.

Use light cool-gray surfaces and small, crisp card shadows for interactive tools. Product cards can stay mostly flat; drawers and recommendation widgets may use medium elevation.

Spacing values: 4px, 8px, 16px, 24px, 32px, 48px, 64px. Preserve a 44px minimum interactive target and explicit focus treatment.

## Actions and graphic hierarchy

Primary campaign actions are raspberry red with white text. Secondary education or consultation actions may use ocean blue. Keep machine product cards clean and let campaign backgrounds carry expressive graphics.

Use one primary message and one primary action per decision area or fixed asset. Recompose every aspect ratio. Current promotion, price, inventory, fitment, availability, dates, and service scope are removable runtime layers.

## Web and interactive guidance

Navigation and decision hierarchy must support **brew method, workflow, capacity, grind, temperature, pressure, counter space, maintenance, and budget**. Collection, product, guide, and service patterns live in modules/interactive.json; product hierarchy and current-data behavior live in modules/commerce.json.

Compact layouts preserve the same decision order. Overlays must not cover identity, current facts, fitment or options, form errors, or the primary action.

## Photography and image direction

- **Environment:** real home kitchens, coffee bars, testing benches, roaster context, and clean product studios.
- **Camera:** inviting countertop context, straight product coverage, workflow overviews, coffee texture macro, and human demonstration.
- **Lighting:** warm natural kitchen light with crisp neutral equipment light and controlled metal reflections.
- **Palette and materials:** brand red, black, cream, stainless steel, coffee brown, ceramic, wood, and restrained cafe color.
- **People:** approachable educators and home brewers demonstrating real technique with safe, correct equipment use.
- **Avoid:** coffee snobbery, impossible crema, unsafe steam handling, invented machine specifications, luxury kitchen imagery that hides workflow.

Product and service truth remains locked across studio, context, detail, and human-use images. Real product media remains the factual anchor.

## Image prompt structure

1. Job intent and real use case.
2. Stable subject and authorized references.
3. real home kitchens, coffee bars, testing benches, roaster context, and clean product studios.
4. Composition and copy-safe region.
5. inviting countertop context, straight product coverage, workflow overviews, coffee texture macro, and human demonstration.
6. warm natural kitchen light with crisp neutral equipment light and controlled metal reflections.
7. Material, geometry, scale, people, and safety locks.
8. Explicit exclusions and no generated words or logos.

Use modules/generative-image.json for environment-wide, product-studio, product-context, and people-in-use structures.

## Motion design

clear stepwise demos, satisfying grind-pour-extract rhythm, readable comparison beats, and friendly presenter pacing.

Motion design uses controlled typography, layout, verified product media, and dimensional layers. One movement idea belongs to each beat. Identity and essential copy are composited as crisp controlled layers. Provide reduced motion.

## Generative video

Generative video produces clean visual plates. Each shot uses one stable subject, one subtle action, one camera move on one axis, explicit duration and ratio, light and material direction, continuity locks, and exclusions. Composite identity, verified copy, captions, interface, prices, and offers afterward.

Reject morphing products, drifting features, warping environments, anatomy failures, fake text, invented identity, and incoherent materials.

## Spatial and dimensional expression

stainless steel, glass, ceramic, water, steam, coffee particles, machine scale, and physically correct liquid behavior. Dimensional scenes preserve verified scale, product geometry, contact, material response, and readable silhouettes. Effects must explain function, environment, or material.

## Marketing asset system

Supported brand-specific families:

- Machine comparison.
- How To brew.
- Coffee subscription.
- New equipment launch.
- Maintenance guide.

Current public-surface observations:

- A bright white commerce shell, red identity, and product-first merchandising make the system technical but approachable.
- Machine studio imagery, expert review content, and coffee education are equal parts of the current brand expression.
- Marketing should connect equipment proof to a credible brewing outcome rather than luxury language alone.

Verified public channel references:

- #1 COFFEE YOUTUBE CHANNEL 690,000+ subscribers fill their cup with our expert coffee content. View Channel: https://www.youtube.com/@SeattleCoffeeGear
- tiktok.com: https://www.tiktok.com/@seattlecoffeegear
- instagram.com: https://www.instagram.com/seattlecoffeegear
- facebook.com: https://www.facebook.com/SeattleCoffeeGear
- pinterest.com: https://www.pinterest.com/seattlecoffeegear/
- linkedin.com: https://linkedin.com/company/seattle-coffee-gear
- youtube.com: https://youtube.com/c/Seattlecoffeegearinfo
- Meta Ad Library lookup: https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=US&q=Espresso%20Machines&search_type=keyword_unordered

Every marketing brief supplies objective, audience, one proposition, one action, destination, ratio, verified product or service facts, rights, accessibility and legal inputs, current offer source and expiration, variant axes, and approval owner.

Keep brand, campaign, product or service, offer, and channel layers separable. Public reference creative cannot establish performance, targeting, spend, channel priority, audience response, or reuse rights.

## Storyboards and sequential production

Preferred narrative rhythm:

1. Name the coffee goal or problem.
2. Show the equipment and workflow.
3. Prove one technique or feature.
4. Show the cup result.
5. Resolve with education or product action.

Every shot record states story function, duration, ratio, visual intent, composition, camera, action, lighting, exact approved copy, audio intent, continuity locks, asset selectors, rights, and evaluation references.

## Voice

Warm coffee-nerd expertise. Explain technique and equipment clearly without gatekeeping.

Prefer specific language about brew method, workflow, capacity, grind, temperature, pressure, counter space, maintenance, and budget. Avoid generic prestige, invented expertise, false urgency, unsupported results, and engagement claims without current evidence.

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
