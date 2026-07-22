---
version: alpha
name: "Seattle Coffee Gear"
description: "Friendly specialty-coffee commerce with raspberry red, ocean blue, warm yellow, and condensed merchandising headlines."
colors:
  primary: "#D2324C"
  primary-dark: "#962134"
  secondary: "#217A97"
  accent: "#EDAF44"
  success: "#218368"
  surface: "#FFFFFF"
  surface-muted: "#F7F7FA"
  on-surface: "#282828"
  on-primary: "#FFFFFF"
  on-secondary: "#FFFFFF"
  border: "#C8C8DD"
  error: "#BE2119"
typography:
  headline-display:
    fontFamily: "proxima-nova-condensed, Helvetica, Arial, sans-serif"
    fontSize: 60px
    fontWeight: 800
    lineHeight: 1
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: "proxima-nova-condensed, Helvetica, Arial, sans-serif"
    fontSize: 36px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: 0em
  headline-md:
    fontFamily: "proxima-nova, Helvetica, Arial, sans-serif"
    fontSize: 30px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0em
  body-lg:
    fontFamily: "proxima-nova, Helvetica, Arial, sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.55
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
    lineHeight: 1.2
    letterSpacing: 0.04em
rounded:
  none: "0px"
  sm: "2px"
  md: "5px"
  lg: "8px"
  xl: "12px"
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
    backgroundColor: "{colors.primary-dark}"
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
  status-success:
    backgroundColor: "{colors.success}"
    rounded: "{rounded.full}"
    size: 8px
---

# Seattle Coffee Gear — DESIGN.md

## Overview

Seattle Coffee Gear is expert without being intimidating. Its interface pairs clean equipment merchandising with playful, high-energy campaign graphics. Raspberry red is the brand signature, ocean blue supports guidance and secondary actions, and warm yellow/green accents bring café warmth and educational energy.

## Colors

- Raspberry red is the primary brand and campaign action color.
- Ocean blue supports consultation, education, and secondary actions.
- Yellow is a warmth and highlight accent; green is reserved for success or coffee-community signals.

- **primary (#D2324C):** Normative token for the role described above.
- **primary-dark (#962134):** Normative token for the role described above.
- **secondary (#217A97):** Normative token for the role described above.
- **accent (#EDAF44):** Normative token for the role described above.
- **success (#218368):** Normative token for the role described above.
- **surface (#FFFFFF):** Normative token for the role described above.
- **surface-muted (#F7F7FA):** Normative token for the role described above.
- **on-surface (#282828):** Normative token for the role described above.
- **on-primary (#FFFFFF):** Normative token for the role described above.
- **on-secondary (#FFFFFF):** Normative token for the role described above.
- **border (#C8C8DD):** Normative token for the role described above.
- **error (#BE2119):** Normative token for the role described above.

## Typography

Use Proxima Nova Condensed for bold merchandising and campaign headlines; standard Proxima Nova handles product, education, navigation, and forms.

- **Display:** Use `headline-display` for the strongest campaign or editorial statement.
- **Section hierarchy:** Use `headline-lg` and `headline-md` to keep product and category structure consistent.
- **Reading:** Use `body-lg` for lead copy and `body-md` for product, instructional, and form content.
- **Labels:** Use `label-sm` for navigation, metadata, badges, and compact controls.

## Layout

Use a bright retail canvas with full-width campaign heroes, clear product carousels, and educational modules. Maintain 16–24px grid gaps and give consultation content more breathing room than catalog rows.

The spacing tokens are normative. Use `spacing.md` as the default component gap, `spacing.lg` for card or module padding, and `spacing.2xl`–`spacing.3xl` between major page sections.

## Elevation & Depth

Use light cool-gray surfaces and small, crisp card shadows for interactive tools. Product cards can stay mostly flat; drawers and recommendation widgets may use medium elevation.

## Shapes

Buttons use compact 5–8px radii; chips and carousel controls may be circular or full-pill. Avoid applying the larger 24–32px utility radii to core catalog cards.

## Components

Primary campaign actions are raspberry red with white text. Secondary education or consultation actions may use ocean blue. Keep machine product cards clean and let campaign backgrounds carry expressive graphics.

- **Primary button:** Follow `components.button-primary`; keep one visually dominant primary action per module.
- **Secondary button:** Use the muted surface variant for lower-priority actions.
- **Promo banner:** Use the brand's secondary field with high-contrast `on-secondary` copy.
- **Product card:** Keep product media, name, price, and state in a stable scan order.
- **Inputs:** Use the body type token, explicit labels, visible focus treatment, and WCAG AA contrast.

## Do's and Don'ts

- Do balance equipment detail with friendly educational guidance.
- Do use condensed type for energetic offer headlines.
- Do reserve color variety for campaigns while keeping catalog UI calm.
- Don't let every component use a different brand accent.
- Don't use yellow for small text on white.
- Don't make technical coffee content feel clinical or overly luxury-coded.
- Do maintain WCAG AA contrast for text and interactive controls.
- Don't infer new permanent brand colors from a single seasonal campaign image.

## Research Notes

- **Capture date:** 2026-07-20
- **Live brand URL:** [https://www.seattlecoffeegear.com/](https://www.seattlecoffeegear.com/)
- **Primary evidence:** [first-party surface](https://www.seattlecoffeegear.com/)
- **Evidence note:** Rendered live Shopify homepage, computed styles, theme variables, and first-party CSS.
- **Synthesis confidence:** high
- **Method:** Rendered homepage inspection where accessible; first-party CSS variables, computed styles, font declarations, redirects, and archived first-party snapshots where the live surface blocked automated capture or had been consolidated.
