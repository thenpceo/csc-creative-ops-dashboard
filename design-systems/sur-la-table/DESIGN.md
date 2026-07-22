---
version: alpha
name: "Sur La Table"
description: "Culinary authority with black-and-white retail discipline, cranberry actions, and expressive seasonal food color."
colors:
  primary: "#C51A36"
  secondary: "#1E1E1E"
  accent: "#B85D0A"
  seasonal-olive: "#323C06"
  surface: "#FFFFFF"
  surface-muted: "#F8F8F8"
  on-surface: "#000000"
  on-primary: "#FFFFFF"
  on-secondary: "#FFFFFF"
  border: "#C4C4C4"
  error: "#B72F3B"
typography:
  headline-display:
    fontFamily: "Scotch Deck, Georgia, serif"
    fontSize: 44px
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: "TT Norms Pro, Lato, Helvetica, Arial, sans-serif"
    fontSize: 36px
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: 0em
  headline-md:
    fontFamily: "Lato, Helvetica, Arial, sans-serif"
    fontSize: 28px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0em
  body-lg:
    fontFamily: "Lato, Helvetica, Arial, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0.03em
  body-md:
    fontFamily: "Lato, Helvetica, Arial, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0.03em
  label-sm:
    fontFamily: "Lato, Helvetica, Arial, sans-serif"
    fontSize: 12px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0.06em
rounded:
  none: "0px"
  sm: "0px"
  md: "0px"
  lg: "4px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.md}"
    padding: 12px
  button-primary-hover:
    backgroundColor: "{colors.primary}"
  button-secondary:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.md}"
    padding: 12px
  promo-banner:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.on-secondary}"
    typography: "{typography.headline-md}"
    rounded: "{rounded.none}"
    padding: 24px
  product-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 16px
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: 12px
  accent-marker:
    backgroundColor: "{colors.accent}"
    rounded: "{rounded.full}"
    size: 8px
  divider:
    backgroundColor: "{colors.border}"
    height: 1px
  seasonal-marker:
    backgroundColor: "{colors.seasonal-olive}"
    rounded: "{rounded.full}"
    size: 8px
---

# Sur La Table — DESIGN.md

## Overview

Sur La Table blends culinary expertise with the warmth of cooking and gathering. The durable system is disciplined black, white, cranberry, and Lato; seasonal campaigns can introduce food-led palettes and Scotch Deck display type without changing core navigation, product, or class-booking behavior.

## Colors

- Cranberry is the persistent brand, sale, and interaction accent found throughout first-party CSS.
- Black and white form the stable commerce and culinary-instruction system.
- Rust and olive are current seasonal food colors; use them in campaigns, not as permanent control semantics.

- **primary (#C51A36):** Normative token for the role described above.
- **secondary (#1E1E1E):** Normative token for the role described above.
- **accent (#B85D0A):** Normative token for the role described above.
- **seasonal-olive (#323C06):** Normative token for the role described above.
- **surface (#FFFFFF):** Normative token for the role described above.
- **surface-muted (#F8F8F8):** Normative token for the role described above.
- **on-surface (#000000):** Normative token for the role described above.
- **on-primary (#FFFFFF):** Normative token for the role described above.
- **on-secondary (#FFFFFF):** Normative token for the role described above.
- **border (#C4C4C4):** Normative token for the role described above.
- **error (#B72F3B):** Normative token for the role described above.

## Typography

Lato is the stable commerce and instructional voice. TT Norms Pro and Scotch Deck support current editorial campaigns; use the serif only for high-impact culinary storytelling, not product data or booking forms.

- **Display:** Use `headline-display` for the strongest campaign or editorial statement.
- **Section hierarchy:** Use `headline-lg` and `headline-md` to keep product and category structure consistent.
- **Reading:** Use `body-lg` for lead copy and `body-md` for product, instructional, and form content.
- **Labels:** Use `label-sm` for navigation, metadata, badges, and compact controls.

## Layout

Use a structured multi-row retail header, broad seasonal hero, product-category grid, and clear separation between products, gifts, and cooking classes. Core modules align tightly; campaigns may use more expressive asymmetry and food imagery.

The spacing tokens are normative. Use `spacing.md` as the default component gap, `spacing.lg` for card or module padding, and `spacing.2xl`–`spacing.3xl` between major page sections.

## Elevation & Depth

The system is primarily flat. Use borders, dark promotional bands, and background color blocks; reserve shadows for navigation overlays, quick view, and booking dialogs.

## Shapes

Core buttons, search, navigation, and product modules are square. A slight 4px radius may appear in modern campaign modules; circular treatment is limited to carousel and utility controls.

## Components

Primary actions use cranberry or black with white type. Product and class cards remain image-led and square. Seasonal orange and olive belong in banners and food-led art direction, not checkout semantics.

- **Primary button:** Follow `components.button-primary`; keep one visually dominant primary action per module.
- **Secondary button:** Use the muted surface variant for lower-priority actions.
- **Promo banner:** Use the brand's secondary field with high-contrast `on-secondary` copy.
- **Product card:** Keep product media, name, price, and state in a stable scan order.
- **Inputs:** Use the body type token, explicit labels, visible focus treatment, and WCAG AA contrast.

## Do's and Don'ts

- Do use appetizing, ingredient-rich photography and real kitchen context.
- Do keep product shopping and cooking-class booking patterns distinct but related.
- Do maintain the disciplined square geometry of the core site.
- Don't make seasonal palette colors permanent UI semantics.
- Don't use decorative display type in prices, specifications, or forms.
- Don't soften the retail system with pervasive large radii.
- Do maintain WCAG AA contrast for text and interactive controls.
- Don't infer new permanent brand colors from a single seasonal campaign image.

## Research Notes

- **Capture date:** 2026-07-20
- **Live brand URL:** [https://www.surlatable.com/](https://www.surlatable.com/)
- **Primary evidence:** [first-party surface](https://www.surlatable.com/)
- **Evidence note:** Rendered live Salesforce Commerce homepage plus first-party CSS and current campaign font/color inspection.
- **Synthesis confidence:** high
- **Method:** Rendered homepage inspection where accessible; first-party CSS variables, computed styles, font declarations, redirects, and archived first-party snapshots where the live surface blocked automated capture or had been consolidated.
