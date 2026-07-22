---
version: alpha
name: "Western Bikeworks"
description: "Legacy enthusiast cycling retail with red, Portland teal, orange value accents, and compact Open Sans UI."
colors:
  primary: "#C41230"
  secondary: "#008FB1"
  accent: "#F78429"
  surface: "#FFFFFF"
  surface-muted: "#F8F8F8"
  on-surface: "#222222"
  on-primary: "#FFFFFF"
  on-secondary: "#000000"
  border: "#CCCCCC"
  error: "#D00000"
typography:
  headline-display:
    fontFamily: "Open Sans, Arial, sans-serif"
    fontSize: 42px
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: "Open Sans, Arial, sans-serif"
    fontSize: 34px
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

# Western Bikeworks — DESIGN.md

## Overview

Western Bikeworks was a practical, enthusiast-focused cycling shop with compact product density and a distinctly Pacific Northwest teal accent. Its last standalone digital identity paired deep red, teal, and orange with a utilitarian Open Sans catalog. The live domain now redirects to BikeTiresDirect; this file preserves the final standalone system for migration or revival work.

## Colors

- Deep red was the dominant promotional and brand color in the final standalone CSS.
- Teal supplied the local cycling identity and secondary interaction system.
- Orange marked value and promotional energy; keep it subordinate to red and teal.

- **primary (#C41230):** Normative token for the role described above.
- **secondary (#008FB1):** Normative token for the role described above.
- **accent (#F78429):** Normative token for the role described above.
- **surface (#FFFFFF):** Normative token for the role described above.
- **surface-muted (#F8F8F8):** Normative token for the role described above.
- **on-surface (#222222):** Normative token for the role described above.
- **on-primary (#FFFFFF):** Normative token for the role described above.
- **on-secondary (#000000):** Normative token for the role described above.
- **border (#CCCCCC):** Normative token for the role described above.
- **error (#D00000):** Normative token for the role described above.

## Typography

Open Sans is the operative voice. Use compact, clear sizes and direct price/category hierarchy; campaign artwork may carry bolder display lettering inside images.

- **Display:** Use `headline-display` for the strongest campaign or editorial statement.
- **Section hierarchy:** Use `headline-lg` and `headline-md` to keep product and category structure consistent.
- **Reading:** Use `body-lg` for lead copy and `body-md` for product, instructional, and form content.
- **Labels:** Use `label-sm` for navigation, metadata, badges, and compact controls.

## Layout

Preserve the compact multi-column catalog, visible categories, and direct price/value presentation. Use a centered desktop shell and 12–16px product-grid gaps.

The spacing tokens are normative. Use `spacing.md` as the default component gap, `spacing.lg` for card or module padding, and `spacing.2xl`–`spacing.3xl` between major page sections.

## Elevation & Depth

Flat borders and background blocks do most of the work. Shadows are for menus, modals, and chat only.

## Shapes

Structure remains square with small 3–5px control radii. Larger radii are reserved for badges and isolated utility UI.

## Components

Red handles primary promotions, teal supports navigation or secondary actions, and orange highlights value. Product cards should remain compact and comparison-friendly.

- **Primary button:** Follow `components.button-primary`; keep one visually dominant primary action per module.
- **Secondary button:** Use the muted surface variant for lower-priority actions.
- **Promo banner:** Use the brand's secondary field with high-contrast `on-secondary` copy.
- **Product card:** Keep product media, name, price, and state in a stable scan order.
- **Inputs:** Use the body type token, explicit labels, visible focus treatment, and WCAG AA contrast.

## Do's and Don'ts

- Do preserve the distinct red/teal/orange identity when reviving legacy assets.
- Do keep cycling categories and product detail immediately scannable.
- Do label this system as historical wherever it is used in production planning.
- Don't claim the standalone Western Bikeworks storefront is still live.
- Don't silently replace its teal/orange identity with BikeTiresDirect navy/gold.
- Don't make the product grid editorially sparse.
- Do maintain WCAG AA contrast for text and interactive controls.
- Don't infer new permanent brand colors from a single seasonal campaign image.

## Research Notes

- **Capture date:** 2026-07-20
- **Live brand URL:** [https://www.westernbikeworks.com/](https://www.westernbikeworks.com/)
- **Primary evidence:** [first-party surface](https://web.archive.org/web/20250815000000/https://www.westernbikeworks.com/)
- **Evidence note:** Current domain redirects to BikeTiresDirect. Values come from the last first-party standalone homepage/CSS before consolidation.
- **Synthesis confidence:** high-historical
- **Method:** Rendered homepage inspection where accessible; first-party CSS variables, computed styles, font declarations, redirects, and archived first-party snapshots where the live surface blocked automated capture or had been consolidated.
