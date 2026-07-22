---
version: alpha
name: "MotoSport"
description: "High-energy powersports commerce combining blue fitment utility, red racing signals, and condensed Saira headlines."
colors:
  primary: "#006BB8"
  primary-bright: "#0088CC"
  secondary: "#CE160F"
  accent: "#41B1F9"
  surface: "#FFFFFF"
  surface-muted: "#EEEEEE"
  on-surface: "#1F1F1F"
  on-primary: "#FFFFFF"
  on-secondary: "#FFFFFF"
  border: "#DDDDDD"
  error: "#B20000"
typography:
  headline-display:
    fontFamily: "Saira, Helvetica, Arial, sans-serif"
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: "Saira, Helvetica, Arial, sans-serif"
    fontSize: 30px
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: 0em
  headline-md:
    fontFamily: "Saira, Helvetica, Arial, sans-serif"
    fontSize: 24px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0em
  body-lg:
    fontFamily: "Poppins, Helvetica, Arial, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: 0em
  body-md:
    fontFamily: "Poppins, Helvetica, Arial, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: 0em
  label-sm:
    fontFamily: "Poppins, Helvetica, Arial, sans-serif"
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.03em
rounded:
  none: "0px"
  sm: "4px"
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
  button-primary-active:
    backgroundColor: "{colors.primary-bright}"
---

# MotoSport — DESIGN.md

## Overview

MotoSport is fast, mechanical, and equipment-first. Blue guides fitment and shopping utility; red supplies racing urgency and brand energy; black, white, and dense product imagery keep the interface grounded in real machines and gear.

## Colors

- Blue is the dominant interactive color across ride selection and commerce controls.
- Racing red belongs to logo, sale, urgency, and promotional moments.
- Keep the remaining interface neutral so machinery, gear, and sponsor imagery remain legible.

- **primary (#006BB8):** Normative token for the role described above.
- **primary-bright (#0088CC):** Normative token for the role described above.
- **secondary (#CE160F):** Normative token for the role described above.
- **accent (#41B1F9):** Normative token for the role described above.
- **surface (#FFFFFF):** Normative token for the role described above.
- **surface-muted (#EEEEEE):** Normative token for the role described above.
- **on-surface (#1F1F1F):** Normative token for the role described above.
- **on-primary (#FFFFFF):** Normative token for the role described above.
- **on-secondary (#FFFFFF):** Normative token for the role described above.
- **border (#DDDDDD):** Normative token for the role described above.
- **error (#B20000):** Normative token for the role described above.

## Typography

Saira carries bold category and campaign headlines; Poppins supports navigation, fitment, specifications, and forms. Keep the combination athletic and legible rather than decorative.

- **Display:** Use `headline-display` for the strongest campaign or editorial statement.
- **Section hierarchy:** Use `headline-lg` and `headline-md` to keep product and category structure consistent.
- **Reading:** Use `body-lg` for lead copy and `body-md` for product, instructional, and form content.
- **Labels:** Use `label-sm` for navigation, metadata, badges, and compact controls.

## Layout

Use a dense wide catalog with persistent ride/fitment selection near the top. Category photography may be dramatic, but specifications, OEM context, and compatibility must align tightly below it.

The spacing tokens are normative. Use `spacing.md` as the default component gap, `spacing.lg` for card or module padding, and `spacing.2xl`–`spacing.3xl` between major page sections.

## Elevation & Depth

Most hierarchy is flat and border-led. Use small shadows for fitment selectors, menus, and cart overlays only.

## Shapes

Controls use a consistent 4px radius; navigation bands and promotional blocks remain square. Avoid lifestyle-oriented soft cards.

## Components

The ride selector is a primary blue control and should precede product browsing when fitment matters. Red is best used for sale, brand, and urgent states. Category tiles may reverse white Saira type over action photography.

- **Primary button:** Follow `components.button-primary`; keep one visually dominant primary action per module.
- **Secondary button:** Use the muted surface variant for lower-priority actions.
- **Promo banner:** Use the brand's secondary field with high-contrast `on-secondary` copy.
- **Product card:** Keep product media, name, price, and state in a stable scan order.
- **Inputs:** Use the body type token, explicit labels, visible focus treatment, and WCAG AA contrast.

## Do's and Don'ts

- Do surface vehicle fitment before asking users to compare parts.
- Do use blue for operational progress and red for racing or sale emphasis.
- Do keep OEM, compatibility, shipping, and availability information visible.
- Don't use red and blue as equal competing CTAs in the same module.
- Don't hide fitment behind generic search alone.
- Don't round category blocks or navigation bands excessively.
- Do maintain WCAG AA contrast for text and interactive controls.
- Don't infer new permanent brand colors from a single seasonal campaign image.

## Research Notes

- **Capture date:** 2026-07-20
- **Live brand URL:** [https://www.motosport.com/](https://www.motosport.com/)
- **Primary evidence:** [first-party surface](https://www.motosport.com/)
- **Evidence note:** Rendered live homepage audit and computed first-party styles.
- **Synthesis confidence:** high
- **Method:** Rendered homepage inspection where accessible; first-party CSS variables, computed styles, font declarations, redirects, and archived first-party snapshots where the live surface blocked automated capture or had been consolidated.
