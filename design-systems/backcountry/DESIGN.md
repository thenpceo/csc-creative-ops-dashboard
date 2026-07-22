---
version: alpha
name: "Backcountry"
description: "Editorial outdoor commerce with expert credibility and cinematic expedition imagery."
colors:
  primary: "#36827F"
  primary-hover: "#132E2C"
  secondary: "#AA4026"
  accent: "#DDC9A3"
  surface: "#FFFFFF"
  surface-muted: "#F5F5F5"
  on-surface: "#333333"
  on-primary: "#FFFFFF"
  on-secondary: "#FFFFFF"
  border: "#CCCCCC"
  error: "#D0021A"
typography:
  headline-display:
    fontFamily: "Tiempos Headline, Georgia, serif"
    fontSize: 48px
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: "Tiempos Headline, Georgia, serif"
    fontSize: 36px
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: -0.01em
  headline-md:
    fontFamily: "Flama, Helvetica, Arial, sans-serif"
    fontSize: 28px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0em
  body-lg:
    fontFamily: "Flama, Helvetica, Arial, sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0em
  body-md:
    fontFamily: "Flama, Helvetica, Arial, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0em
  label-sm:
    fontFamily: "Flama, Helvetica, Arial, sans-serif"
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: 0.05em
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

# Backcountry — DESIGN.md

## Overview

Backcountry combines premium outdoor authority with practical gear-finding. Interfaces should feel capable, direct, and field-tested: cinematic photography carries emotion while restrained utility UI keeps product decisions fast. The distinctive visual tension is warm editorial storytelling against deep teal interaction controls and crisp black-and-white commerce surfaces.

## Colors

- Primary is the archived first-party `btn-brand` teal; reserve it for decisive commerce actions and expert guidance.
- Secondary is the rust `bg-brand` tone for editorial bands, badges, and warm campaign moments.
- Accent is a quiet sand used to connect UI with natural-material photography.

- **primary (#36827F):** Normative token for the role described above.
- **primary-hover (#132E2C):** Normative token for the role described above.
- **secondary (#AA4026):** Normative token for the role described above.
- **accent (#DDC9A3):** Normative token for the role described above.
- **surface (#FFFFFF):** Normative token for the role described above.
- **surface-muted (#F5F5F5):** Normative token for the role described above.
- **on-surface (#333333):** Normative token for the role described above.
- **on-primary (#FFFFFF):** Normative token for the role described above.
- **on-secondary (#FFFFFF):** Normative token for the role described above.
- **border (#CCCCCC):** Normative token for the role described above.
- **error (#D0021A):** Normative token for the role described above.

## Typography

Use Tiempos Headline for adventure-led storytelling and Flama for every transactional or product-detail surface. Labels may be uppercase, but body copy should remain conversational and expert.

- **Display:** Use `headline-display` for the strongest campaign or editorial statement.
- **Section hierarchy:** Use `headline-lg` and `headline-md` to keep product and category structure consistent.
- **Reading:** Use `body-lg` for lead copy and `body-md` for product, instructional, and form content.
- **Labels:** Use `label-sm` for navigation, metadata, badges, and compact controls.

## Layout

Use a fluid product grid inside a 1280–1440px desktop canvas. Editorial modules may run full bleed, but filters, comparison details, and purchase controls should align to a disciplined 8px rhythm with 24px default gutters.

The spacing tokens are normative. Use `spacing.md` as the default component gap, `spacing.lg` for card or module padding, and `spacing.2xl`–`spacing.3xl` between major page sections.

## Elevation & Depth

Favor tonal surfaces and image overlays over decorative card shadows. Use thin gray borders for product containment and a restrained shadow only for menus, drawers, and sticky purchase trays.

## Shapes

Product and navigation UI is mostly square with 2–4px functional rounding. Pills are reserved for status, size, activity, and loyalty chips, never for every button.

## Components

Primary buttons are teal with white type; rust belongs to campaigns rather than routine checkout actions. Product cards stay quiet, image-first, and border-led. Expert-advice callouts may pair teal icons with sand or white surfaces.

- **Primary button:** Follow `components.button-primary`; keep one visually dominant primary action per module.
- **Secondary button:** Use the muted surface variant for lower-priority actions.
- **Promo banner:** Use the brand's secondary field with high-contrast `on-secondary` copy.
- **Product card:** Keep product media, name, price, and state in a stable scan order.
- **Inputs:** Use the body type token, explicit labels, visible focus treatment, and WCAG AA contrast.

## Do's and Don'ts

- Do lead campaign modules with authentic outdoor photography and specific activity context.
- Do keep the primary purchase path teal and visually singular.
- Do use dense utility information without shrinking body text below 14px.
- Don't turn the palette into generic forest green; the observed brand teal and rust are specific.
- Don't use serif type for filters, prices, specifications, or form controls.
- Don't soften every surface with large radii or floating glass effects.
- Do maintain WCAG AA contrast for text and interactive controls.
- Don't infer new permanent brand colors from a single seasonal campaign image.

## Research Notes

- **Capture date:** 2026-07-20
- **Live brand URL:** [https://www.backcountry.com/](https://www.backcountry.com/)
- **Primary evidence:** [first-party surface](https://web.archive.org/web/20251215082556/https://www.backcountry.com/)
- **Evidence note:** Live site returned human verification in automated capture; tokens come from the latest available first-party homepage snapshot and its embedded Chakra theme.
- **Synthesis confidence:** high
- **Method:** Rendered homepage inspection where accessible; first-party CSS variables, computed styles, font declarations, redirects, and archived first-party snapshots where the live surface blocked automated capture or had been consolidated.
