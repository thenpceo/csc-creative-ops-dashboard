---
version: alpha
name: "TriSports"
description: "Legacy triathlon specialty commerce with magenta-red urgency, endurance blue, orange accents, and compact Open Sans UI."
colors:
  primary: "#DD1242"
  secondary: "#005CAB"
  accent: "#F58427"
  surface: "#FFFFFF"
  surface-muted: "#F8F8F8"
  on-surface: "#222222"
  on-primary: "#FFFFFF"
  on-secondary: "#FFFFFF"
  border: "#CCCCCC"
  error: "#CC181E"
typography:
  headline-display:
    fontFamily: "Open Sans, Arial, sans-serif"
    fontSize: 44px
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: "Open Sans, Arial, sans-serif"
    fontSize: 33px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: 0em
  headline-md:
    fontFamily: "Open Sans, Arial, sans-serif"
    fontSize: 22px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0em
  body-lg:
    fontFamily: "Open Sans, Arial, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: 0em
  body-md:
    fontFamily: "Open Sans, Arial, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: 0em
  label-sm:
    fontFamily: "Open Sans, Arial, sans-serif"
    fontSize: 12px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0.03em
rounded:
  none: "0px"
  sm: "3px"
  md: "5px"
  lg: "10px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  2xl: "32px"
  3xl: "48px"
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
---

# TriSports — DESIGN.md

## Overview

TriSports was a specialist endurance-commerce surface for athletes who shop across swim, bike, and run. Its final standalone design was dense and equipment-led, using magenta-red for action, endurance blue for secondary structure, and orange for energy. The live domain now redirects to Competitive Cyclist's triathlon collection; this file preserves the last first-party identity.

## Colors

- Magenta-red was the dominant first-party action and brand color.
- Endurance blue organized supporting navigation and category structure.
- Orange supplied energy for promotion and event-adjacent highlights.

- **primary (#DD1242):** Normative token for the role described above.
- **secondary (#005CAB):** Normative token for the role described above.
- **accent (#F58427):** Normative token for the role described above.
- **surface (#FFFFFF):** Normative token for the role described above.
- **surface-muted (#F8F8F8):** Normative token for the role described above.
- **on-surface (#222222):** Normative token for the role described above.
- **on-primary (#FFFFFF):** Normative token for the role described above.
- **on-secondary (#FFFFFF):** Normative token for the role described above.
- **border (#CCCCCC):** Normative token for the role described above.
- **error (#CC181E):** Normative token for the role described above.

## Typography

Open Sans is the core storefront face. Use numerical emphasis and compact label structure for fit, distance, discipline, compatibility, and price.

- **Display:** Use `headline-display` for the strongest campaign or editorial statement.
- **Section hierarchy:** Use `headline-lg` and `headline-md` to keep product and category structure consistent.
- **Reading:** Use `body-lg` for lead copy and `body-md` for product, instructional, and form content.
- **Labels:** Use `label-sm` for navigation, metadata, badges, and compact controls.

## Layout

Organize the catalog around swim, bike, run, and complete triathlon systems. Use a compact grid and preserve cross-discipline comparison context; key fit and compatibility details belong close to price and stock.

The spacing tokens are normative. Use `spacing.md` as the default component gap, `spacing.lg` for card or module padding, and `spacing.2xl`–`spacing.3xl` between major page sections.

## Elevation & Depth

Use borders and pale neutral layers. Menus, filters, and quick-view overlays may have a restrained shadow; product cards stay flat.

## Shapes

Small 3–5px radii support controls and badges. The core catalog remains rectilinear and utilitarian.

## Components

Primary actions use magenta-red; blue supports navigation and informational states. Orange is a controlled energy accent. Discipline tags should remain textual and understandable without color alone.

- **Primary button:** Follow `components.button-primary`; keep one visually dominant primary action per module.
- **Secondary button:** Use the muted surface variant for lower-priority actions.
- **Promo banner:** Use the brand's secondary field with high-contrast `on-secondary` copy.
- **Product card:** Keep product media, name, price, and state in a stable scan order.
- **Inputs:** Use the body type token, explicit labels, visible focus treatment, and WCAG AA contrast.

## Do's and Don'ts

- Do preserve cross-discipline context and specialist equipment detail.
- Do use the historical magenta-red and blue identity when migrating legacy content.
- Do label this system as historical wherever it informs new production work.
- Don't claim a standalone TriSports storefront is currently live.
- Don't collapse triathlon specificity into generic road-cycling UI.
- Don't rely on discipline color without text labels.
- Do maintain WCAG AA contrast for text and interactive controls.
- Don't infer new permanent brand colors from a single seasonal campaign image.

## Research Notes

- **Capture date:** 2026-07-20
- **Live brand URL:** [https://www.trisports.com/](https://www.trisports.com/)
- **Primary evidence:** [first-party surface](https://web.archive.org/web/20260521164505/https://www.trisports.com/)
- **Evidence note:** Current domain redirects to Competitive Cyclist. Values come from a May 2026 first-party archived homepage and its standalone CSS.
- **Synthesis confidence:** high-historical
- **Method:** Rendered homepage inspection where accessible; first-party CSS variables, computed styles, font declarations, redirects, and archived first-party snapshots where the live surface blocked automated capture or had been consolidated.
