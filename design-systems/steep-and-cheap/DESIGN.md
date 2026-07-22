---
version: alpha
name: "Steep & Cheap"
description: "Deal-driven outdoor retail with a bright green action system, Sofia Pro, and compact urgency."
colors:
  primary: "#72A022"
  secondary: "#333333"
  accent: "#556F7C"
  surface: "#FFFFFF"
  surface-muted: "#F5F5F5"
  on-surface: "#333333"
  on-primary: "#000000"
  on-secondary: "#FFFFFF"
  border: "#CCCCCC"
  error: "#D0021A"
typography:
  headline-display:
    fontFamily: "sofia-pro, Helvetica, Arial, sans-serif"
    fontSize: 30px
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: "sofia-pro, Helvetica, Arial, sans-serif"
    fontSize: 28px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: 0em
  headline-md:
    fontFamily: "sofia-pro, Helvetica, Arial, sans-serif"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0em
  body-lg:
    fontFamily: "sofia-pro, Helvetica, Arial, sans-serif"
    fontSize: 18px
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: 0em
  body-md:
    fontFamily: "sofia-pro, Helvetica, Arial, sans-serif"
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: 0em
  label-sm:
    fontFamily: "sofia-pro, Helvetica, Arial, sans-serif"
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.04em
rounded:
  none: "0px"
  sm: "2px"
  md: "4px"
  lg: "8px"
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

# Steep & Cheap — DESIGN.md

## Overview

Steep & Cheap is the scrappy, immediate deal surface in the outdoor portfolio. It should feel fast and value-rich without sacrificing trust: vivid green actions, charcoal utility UI, large product imagery, and compact deal metadata make urgency easy to understand.

## Colors

- Bright green is the first-party `brand`, `btn-brand`, and `border-brand` value.
- Black text is used on green for accessible normal-size button copy.
- Blue-gray supports coupon and informational messages without competing with green.

- **primary (#72A022):** Normative token for the role described above.
- **secondary (#333333):** Normative token for the role described above.
- **accent (#556F7C):** Normative token for the role described above.
- **surface (#FFFFFF):** Normative token for the role described above.
- **surface-muted (#F5F5F5):** Normative token for the role described above.
- **on-surface (#333333):** Normative token for the role described above.
- **on-primary (#000000):** Normative token for the role described above.
- **on-secondary (#FFFFFF):** Normative token for the role described above.
- **border (#CCCCCC):** Normative token for the role described above.
- **error (#D0021A):** Normative token for the role described above.

## Typography

Sofia Pro is the single interface voice. Use bold but compact headings and clear numerical emphasis for discount, price, and inventory signals.

- **Display:** Use `headline-display` for the strongest campaign or editorial statement.
- **Section hierarchy:** Use `headline-lg` and `headline-md` to keep product and category structure consistent.
- **Reading:** Use `body-lg` for lead copy and `body-md` for product, instructional, and form content.
- **Labels:** Use `label-sm` for navigation, metadata, badges, and compact controls.

## Layout

Use a dense deal feed and product grid inside a wide shell. Surface discount, current price, former price, and availability in a consistent vertical order. Keep promotional bands full-width and easy to dismiss.

The spacing tokens are normative. Use `spacing.md` as the default component gap, `spacing.lg` for card or module padding, and `spacing.2xl`–`spacing.3xl` between major page sections.

## Elevation & Depth

Use flat white cards with borders and a restrained shadow only for menus, cart, and urgency overlays.

## Shapes

Keep product and deal cards square or lightly rounded. Pills are appropriate for discount, inventory, and activity tags.

## Components

Green marks the deal action and selected state; charcoal anchors navigation and checkout. Price hierarchy should be typographic first, not dependent on color alone.

- **Primary button:** Follow `components.button-primary`; keep one visually dominant primary action per module.
- **Secondary button:** Use the muted surface variant for lower-priority actions.
- **Promo banner:** Use the brand's secondary field with high-contrast `on-secondary` copy.
- **Product card:** Keep product media, name, price, and state in a stable scan order.
- **Inputs:** Use the body type token, explicit labels, visible focus treatment, and WCAG AA contrast.

## Do's and Don'ts

- Do show savings, price, and urgency together in a predictable structure.
- Do use black type on the observed green for accessible small and medium controls.
- Do keep value messaging energetic but credible.
- Don't use white normal-size text on the green primary; contrast is insufficient.
- Don't obscure product information with oversized promotional decoration.
- Don't add extra bright action colors.
- Do maintain WCAG AA contrast for text and interactive controls.
- Don't infer new permanent brand colors from a single seasonal campaign image.

## Research Notes

- **Capture date:** 2026-07-20
- **Live brand URL:** [https://www.steepandcheap.com/](https://www.steepandcheap.com/)
- **Primary evidence:** [first-party surface](https://web.archive.org/web/20250815023114/https://www.steepandcheap.com/)
- **Evidence note:** Live site returned human verification; values come from the first-party archived Chakra theme.
- **Synthesis confidence:** high
- **Method:** Rendered homepage inspection where accessible; first-party CSS variables, computed styles, font declarations, redirects, and archived first-party snapshots where the live surface blocked automated capture or had been consolidated.
