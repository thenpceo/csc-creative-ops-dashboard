---
version: alpha
name: "Competitive Cyclist"
description: "High-performance cycling commerce with race-day precision and a disciplined red signal color."
colors:
  primary: "#CC0000"
  primary-hover: "#B40400"
  secondary: "#333333"
  accent: "#D74009"
  surface: "#FFFFFF"
  surface-muted: "#F5F5F5"
  on-surface: "#333333"
  on-primary: "#FFFFFF"
  on-secondary: "#FFFFFF"
  border: "#CCCCCC"
  error: "#D0021A"
typography:
  headline-display:
    fontFamily: "proxima-nova, Helvetica, Arial, sans-serif"
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: "proxima-nova, Helvetica, Arial, sans-serif"
    fontSize: 36px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.01em
  headline-md:
    fontFamily: "proxima-nova, Helvetica, Arial, sans-serif"
    fontSize: 28px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0em
  body-lg:
    fontFamily: "proxima-nova, Helvetica, Arial, sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0em
  body-md:
    fontFamily: "proxima-nova, Helvetica, Arial, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0em
  label-sm:
    fontFamily: "proxima-nova, Helvetica, Arial, sans-serif"
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: 0.06em
rounded:
  none: "0px"
  sm: "2px"
  md: "4px"
  lg: "8px"
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
    backgroundColor: "{colors.primary-hover}"
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

# Competitive Cyclist — DESIGN.md

## Overview

Competitive Cyclist should feel exacting, fast, and enthusiast-grade. It is a technical retail system, not a lifestyle boutique: large product imagery, crisp specifications, and decisive red actions sit on a near-monochrome foundation. The voice assumes informed riders and rewards comparison.

## Colors

- Primary red is the first-party `brand`, `btn-brand`, and `border-brand` token.
- Charcoal carries navigation and technical hierarchy; most surfaces remain white.
- Use orange only for urgent editorial callouts, not as a second primary action color.

- **primary (#CC0000):** Normative token for the role described above.
- **primary-hover (#B40400):** Normative token for the role described above.
- **secondary (#333333):** Normative token for the role described above.
- **accent (#D74009):** Normative token for the role described above.
- **surface (#FFFFFF):** Normative token for the role described above.
- **surface-muted (#F5F5F5):** Normative token for the role described above.
- **on-surface (#333333):** Normative token for the role described above.
- **on-primary (#FFFFFF):** Normative token for the role described above.
- **on-secondary (#FFFFFF):** Normative token for the role described above.
- **border (#CCCCCC):** Normative token for the role described above.
- **error (#D0021A):** Normative token for the role described above.

## Typography

Proxima Nova is the single voice across editorial and commerce. Use weight, scale, and uppercase labels for hierarchy; avoid adding a decorative display face.

- **Display:** Use `headline-display` for the strongest campaign or editorial statement.
- **Section hierarchy:** Use `headline-lg` and `headline-md` to keep product and category structure consistent.
- **Reading:** Use `body-lg` for lead copy and `body-md` for product, instructional, and form content.
- **Labels:** Use `label-sm` for navigation, metadata, badges, and compact controls.

## Layout

Use a wide, high-density commerce grid with strong alignment between imagery, specifications, price, and availability. Desktop gutters sit near 24px; comparison tables and product data may be denser than editorial modules.

The spacing tokens are normative. Use `spacing.md` as the default component gap, `spacing.lg` for card or module padding, and `spacing.2xl`–`spacing.3xl` between major page sections.

## Elevation & Depth

Hierarchy comes from borders, white space, and black/red contrast. Shadows are limited to transient navigation, filter drawers, and cart overlays.

## Shapes

Keep geometry engineered and compact: square product tiles, 2–4px control radii, and circular icon buttons only where the icon itself needs a hit target.

## Components

Red is the single purchase and active-selection signal. Product cards use white surfaces and restrained borders. Technical tables should privilege scanability and use charcoal labels with red only for selected or promotional states.

- **Primary button:** Follow `components.button-primary`; keep one visually dominant primary action per module.
- **Secondary button:** Use the muted surface variant for lower-priority actions.
- **Promo banner:** Use the brand's secondary field with high-contrast `on-secondary` copy.
- **Product card:** Keep product media, name, price, and state in a stable scan order.
- **Inputs:** Use the body type token, explicit labels, visible focus treatment, and WCAG AA contrast.

## Do's and Don'ts

- Do make technical comparison and fit information easy to scan.
- Do use red for the primary action and current selection.
- Do let product photography and equipment detail do most of the visual storytelling.
- Don't dilute performance cues with playful illustration or pastel UI.
- Don't introduce multiple competing CTA colors.
- Don't over-round cards, filters, or data tables.
- Do maintain WCAG AA contrast for text and interactive controls.
- Don't infer new permanent brand colors from a single seasonal campaign image.

## Research Notes

- **Capture date:** 2026-07-20
- **Live brand URL:** [https://www.competitivecyclist.com/](https://www.competitivecyclist.com/)
- **Primary evidence:** [first-party surface](https://web.archive.org/web/20250815055409/https://www.competitivecyclist.com/)
- **Evidence note:** Live site returned human verification; values are taken from the first-party archived homepage Chakra theme.
- **Synthesis confidence:** high
- **Method:** Rendered homepage inspection where accessible; first-party CSS variables, computed styles, font declarations, redirects, and archived first-party snapshots where the live surface blocked automated capture or had been consolidated.
