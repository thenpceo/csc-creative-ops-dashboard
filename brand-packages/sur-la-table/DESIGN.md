# Sur La Table Design System

Package version: **1.0.0**  
Research snapshot: **July 21, 2026**  
Evidence status: **Mixed: verified first-party surface evidence plus labeled inferred production guidance**

This package is the portable source of brand truth for Sur La Table. Systems load brand.json, resolve the core files, and add only the capability modules needed for the output. Provider configuration, account credentials, renderer instructions, workflow state, performance data, and live commercial facts stay outside this directory.

## Brand in one sentence

Sur La Table blends culinary expertise with the warmth of cooking and gathering. The durable system is disciplined black, white, cranberry, and Lato; seasonal campaigns can introduce food-led palettes and Scotch Deck display type without changing core navigation, product, or class-booking behavior.

## Durable character

- Culinary.
- Warm.
- Expert.
- Celebratory.
- Tactile.
- Inviting.

Signature principle: **Make more of the kitchen**.

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

- **primary:** #C51A36
- **secondary:** #1E1E1E
- **accent:** #B85D0A
- **seasonal-olive:** #323C06
- **surface:** #FFFFFF
- **surface-muted:** #F8F8F8
- **on-surface:** #000000
- **on-primary:** #FFFFFF
- **on-secondary:** #FFFFFF
- **border:** #C4C4C4
- **error:** #B72F3B

- Cranberry is the persistent brand, sale, and interaction accent found throughout first-party CSS.
- Black and white form the stable commerce and culinary-instruction system.
- Rust and olive are current seasonal food colors; use them in campaigns, not as permanent control semantics.

## Typography

Lato is the stable commerce and instructional voice. TT Norms Pro and Scotch Deck support current editorial campaigns; use the serif only for high-impact culinary storytelling, not product data or booking forms.

- **headline-display:** Scotch Deck, Georgia, serif, 44px, weight 500, line height 1.05, tracking -0.01em
- **headline-lg:** TT Norms Pro, Lato, Helvetica, Arial, sans-serif, 36px, weight 600, line height 1.15, tracking 0em
- **headline-md:** Lato, Helvetica, Arial, sans-serif, 28px, weight 700, line height 1.2, tracking 0em
- **body-lg:** Lato, Helvetica, Arial, sans-serif, 16px, weight 400, line height 1.55, tracking 0.03em
- **body-md:** Lato, Helvetica, Arial, sans-serif, 14px, weight 400, line height 1.5, tracking 0.03em
- **label-sm:** Lato, Helvetica, Arial, sans-serif, 12px, weight 700, line height 1.2, tracking 0.06em

Licensed font files are consumer inputs. Use documented fallbacks when licensed families are unavailable.

## Layout, spacing, shape, and depth

Use a structured multi-row retail header, broad seasonal hero, product-category grid, and clear separation between products, gifts, and cooking classes. Core modules align tightly; campaigns may use more expressive asymmetry and food imagery.

Core buttons, search, navigation, and product modules are square. A slight 4px radius may appear in modern campaign modules; circular treatment is limited to carousel and utility controls.

The system is primarily flat. Use borders, dark promotional bands, and background color blocks; reserve shadows for navigation overlays, quick view, and booking dialogs.

Spacing values: 4px, 8px, 16px, 24px, 32px, 48px, 64px. Preserve a 44px minimum interactive target and explicit focus treatment.

## Actions and graphic hierarchy

Primary actions use cranberry or black with white type. Product and class cards remain image-led and square. Seasonal orange and olive belong in banners and food-led art direction, not checkout semantics.

Use one primary message and one primary action per decision area or fixed asset. Recompose every aspect ratio. Current promotion, price, inventory, fitment, availability, dates, and service scope are removable runtime layers.

## Web and interactive guidance

Navigation and decision hierarchy must support **cooking task, material, size, heat source, technique, care, occasion, class location, and giftability**. Collection, product, guide, and service patterns live in modules/interactive.json; product hierarchy and current-data behavior live in modules/commerce.json.

Compact layouts preserve the same decision order. Overlays must not cover identity, current facts, fitment or options, form errors, or the primary action.

## Photography and image direction

- **Environment:** real kitchens, prep tables, dining settings, cooking classrooms, and ingredient-rich product studios.
- **Camera:** overhead preparation, three-quarter cookware, ingredient macro, human technique, and generous table context.
- **Lighting:** warm directional kitchen light with appetizing highlights and accurate food and material color.
- **Palette and materials:** white, black, culinary red, cream, stainless steel, copper, wood, linen, produce, and food color.
- **People:** home cooks, instructors, families, and friends actively preparing or sharing food with correct technique.
- **Avoid:** inedible food styling, unsafe knife handling, impossible heat or steam, generic luxury kitchen, product copy without culinary use.

Product and service truth remains locked across studio, context, detail, and human-use images. Real product media remains the factual anchor.

## Image prompt structure

1. Job intent and real use case.
2. Stable subject and authorized references.
3. real kitchens, prep tables, dining settings, cooking classrooms, and ingredient-rich product studios.
4. Composition and copy-safe region.
5. overhead preparation, three-quarter cookware, ingredient macro, human technique, and generous table context.
6. warm directional kitchen light with appetizing highlights and accurate food and material color.
7. Material, geometry, scale, people, and safety locks.
8. Explicit exclusions and no generated words or logos.

Use modules/generative-image.json for environment-wide, product-studio, product-context, and people-in-use structures.

## Motion design

tactile preparation rhythm, ingredient-to-dish progression, clean recipe steps, and elegant but lively product movement.

Motion design uses controlled typography, layout, verified product media, and dimensional layers. One movement idea belongs to each beat. Identity and essential copy are composited as crisp controlled layers. Provide reduced motion.

## Generative video

Generative video produces clean visual plates. Each shot uses one stable subject, one subtle action, one camera move on one axis, explicit duration and ratio, light and material direction, continuity locks, and exclusions. Composite identity, verified copy, captions, interface, prices, and offers afterward.

Reject morphing products, drifting features, warping environments, anatomy failures, fake text, invented identity, and incoherent materials.

## Spatial and dimensional expression

cookware materials, knife geometry, ceramic, glass, food texture, steam, heat, and physically correct kitchen scale. Dimensional scenes preserve verified scale, product geometry, contact, material response, and readable silhouettes. Effects must explain function, environment, or material.

## Marketing asset system

Supported brand-specific families:

- Recipe and tool story.
- Cooking class.
- Seasonal table.
- Gift guide.
- Material or knife education.

Current public-surface observations:

- The current homepage combines a handwritten identity with editorial serif headlines and restrained sans-serif commerce labels.
- Chef-led storytelling, colorful kitchen environments, classes, and product merchandising form one connected brand world.
- Warm culinary photography and ingredient color should lead; sales UI remains clean, white, and secondary.

Verified public channel references:

- facebook.com: https://www.facebook.com/SurLaTable
- instagram.com: https://www.instagram.com/surlatable
- pinterest.com: https://www.pinterest.com/surlatable
- Meta Ad Library lookup: https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=US&q=Sur%20La%20table&search_type=keyword_unordered

Every marketing brief supplies objective, audience, one proposition, one action, destination, ratio, verified product or service facts, rights, accessibility and legal inputs, current offer source and expiration, variant axes, and approval owner.

Keep brand, campaign, product or service, offer, and channel layers separable. Public reference creative cannot establish performance, targeting, spend, channel priority, audience response, or reuse rights.

## Storyboards and sequential production

Preferred narrative rhythm:

1. Open on the dish, technique, or occasion.
2. Show the tool or class in action.
3. Prove material or method.
4. Reveal the finished result.
5. Resolve with shop, learn, or gift action.

Every shot record states story function, duration, ratio, visual intent, composition, camera, action, lighting, exact approved copy, audio intent, continuity locks, asset selectors, rights, and evaluation references.

## Voice

Appetizing culinary expertise with specific technique, material, occasion, and gifting language.

Prefer specific language about cooking task, material, size, heat source, technique, care, occasion, class location, and giftability. Avoid generic prestige, invented expertise, false urgency, unsupported results, and engagement claims without current evidence.

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
