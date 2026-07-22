---
version: alpha
name: "Level Nine Sports"
description: "Accessible outdoor performance retail with electric blue utility, warm campaign accents, and Poppins typography."
colors:
  primary: "#003ACD"
  secondary: "#000000"
  accent: "#F9AE50"
  surface: "#FFFFFF"
  surface-muted: "#F3F3F3"
  on-surface: "#222222"
  on-primary: "#FFFFFF"
  on-secondary: "#FFFFFF"
  border: "#DADADA"
  error: "#B30000"
typography:
  headline-display:
    fontFamily: "Poppins, Helvetica, Arial, sans-serif"
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: "Poppins, Helvetica, Arial, sans-serif"
    fontSize: 36px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.01em
  headline-md:
    fontFamily: "Poppins, Helvetica, Arial, sans-serif"
    fontSize: 28px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0em
  body-lg:
    fontFamily: "Poppins, Helvetica, Arial, sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0em
  body-md:
    fontFamily: "Poppins, Helvetica, Arial, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0em
  label-sm:
    fontFamily: "Poppins, Helvetica, Arial, sans-serif"
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: 0.04em
rounded:
  none: "0px"
  sm: "4px"
  md: "8px"
  lg: "12px"
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
---

# Level Nine Sports — DESIGN.md

## Overview

Level Nine Sports should feel energetic, practical, and value-conscious without becoming chaotic. Bright blue creates a clear action system; black and white keep product information legible; warm orange campaign accents inject seasonality and motion.

## Colors

- Electric blue is the primary interactive and promotional system color.
- Black creates strong technical hierarchy and keeps the brand performance-oriented.
- Warm orange is campaign support, not a persistent second CTA color.

- **primary (#003ACD):** Normative token for the role described above.
- **secondary (#000000):** Normative token for the role described above.
- **accent (#F9AE50):** Normative token for the role described above.
- **surface (#FFFFFF):** Normative token for the role described above.
- **surface-muted (#F3F3F3):** Normative token for the role described above.
- **on-surface (#222222):** Normative token for the role described above.
- **on-primary (#FFFFFF):** Normative token for the role described above.
- **on-secondary (#FFFFFF):** Normative token for the role described above.
- **border (#DADADA):** Normative token for the role described above.
- **error (#B30000):** Normative token for the role described above.

## Typography

Poppins creates a friendly technical voice. Use bold, compact headlines and straightforward sentence-case body copy; handwritten display styles belong only inside campaign artwork.

- **Display:** Use `headline-display` for the strongest campaign or editorial statement.
- **Section hierarchy:** Use `headline-lg` and `headline-md` to keep product and category structure consistent.
- **Reading:** Use `body-lg` for lead copy and `body-md` for product, instructional, and form content.
- **Labels:** Use `label-sm` for navigation, metadata, badges, and compact controls.

## Layout

Use responsive product and activity grids with broad hero modules. Desktop content should remain within a wide max-width shell; 16–24px gutters and 8px control spacing keep the experience approachable.

The spacing tokens are normative. Use `spacing.md` as the default component gap, `spacing.lg` for card or module padding, and `spacing.2xl`–`spacing.3xl` between major page sections.

## Elevation & Depth

Use light gray layers, small shadows on menus, and crisp card boundaries. Avoid deep or diffuse shadows on the product catalog.

## Shapes

A 4–8px radius is appropriate for controls and cards. Keep action geometry compact; reserve full pills for filters, tags, and size/activity chips.

## Components

Primary buttons are blue with white text. Black can anchor navigation and high-contrast editorial bands. Product cards should remain bright, practical, and easy to compare.

- **Primary button:** Follow `components.button-primary`; keep one visually dominant primary action per module.
- **Secondary button:** Use the muted surface variant for lower-priority actions.
- **Promo banner:** Use the brand's secondary field with high-contrast `on-secondary` copy.
- **Product card:** Keep product media, name, price, and state in a stable scan order.
- **Inputs:** Use the body type token, explicit labels, visible focus treatment, and WCAG AA contrast.

## Do's and Don'ts

- Do use blue consistently for selected and actionable states.
- Do organize products around activity and season.
- Do keep value messaging visible but secondary to product understanding.
- Don't let orange become a competing primary action color.
- Don't use script or marker fonts for system UI.
- Don't make the catalog feel as dense as a wholesale parts database.
- Do maintain WCAG AA contrast for text and interactive controls.
- Don't infer new permanent brand colors from a single seasonal campaign image.

## Research Notes

- **Capture date:** 2026-07-20
- **Live brand URL:** [https://www.levelninesports.com/](https://www.levelninesports.com/)
- **Primary evidence:** [first-party surface](https://web.archive.org/web/20250513141841/https://www.levelninesports.com/)
- **Evidence note:** Live site returned human verification; values come from the latest first-party archived Next.js homepage and CSS bundles.
- **Synthesis confidence:** high
- **Method:** Rendered homepage inspection where accessible; first-party CSS variables, computed styles, font declarations, redirects, and archived first-party snapshots where the live surface blocked automated capture or had been consolidated.
