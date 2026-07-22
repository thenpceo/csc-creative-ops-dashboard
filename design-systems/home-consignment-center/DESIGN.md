---
version: alpha
name: "Home Consignment Center"
description: "Bold upscale consignment retail combining gallery-scale imagery, navy depth, and decisive red actions."
colors:
  primary: "#BA232D"
  secondary: "#233D58"
  accent: "#A4928E"
  surface: "#FFFFFF"
  surface-muted: "#FBF4E9"
  on-surface: "#34312C"
  on-primary: "#FFFFFF"
  on-secondary: "#FFFFFF"
  border: "#DDDDDD"
  error: "#BA232D"
typography:
  headline-display:
    fontFamily: "Archivo, Helvetica, Arial, sans-serif"
    fontSize: 64px
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: "Archivo, Helvetica, Arial, sans-serif"
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.01em
  headline-md:
    fontFamily: "Archivo, Helvetica, Arial, sans-serif"
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0em
  body-lg:
    fontFamily: "Archivo, Helvetica, Arial, sans-serif"
    fontSize: 18px
    fontWeight: 300
    lineHeight: 1.6
    letterSpacing: 0em
  body-md:
    fontFamily: "Archivo, Helvetica, Arial, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0em
  label-sm:
    fontFamily: "Archivo, Helvetica, Arial, sans-serif"
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.04em
rounded:
  none: "0px"
  sm: "2px"
  md: "4px"
  lg: "15px"
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

# Home Consignment Center — DESIGN.md

## Overview

Home Consignment Center balances upscale home discovery with approachable local retail. Large showroom photography and heavy Archivo headlines create impact; navy, warm cream, taupe, and red keep the experience grounded and action-oriented.

## Colors

- Red is the conversion color for store-finding and consignment actions.
- Navy supplies depth for full-width sections, footer areas, and photo overlays.
- Taupe and warm cream connect the interface to furniture, jewelry, and residential materials.

- **primary (#BA232D):** Normative token for the role described above.
- **secondary (#233D58):** Normative token for the role described above.
- **accent (#A4928E):** Normative token for the role described above.
- **surface (#FFFFFF):** Normative token for the role described above.
- **surface-muted (#FBF4E9):** Normative token for the role described above.
- **on-surface (#34312C):** Normative token for the role described above.
- **on-primary (#FFFFFF):** Normative token for the role described above.
- **on-secondary (#FFFFFF):** Normative token for the role described above.
- **border (#DDDDDD):** Normative token for the role described above.
- **error (#BA232D):** Normative token for the role described above.

## Typography

Archivo carries both dramatic headlines and practical UI. Use very large, heavy headings over photography; shift to regular or light weights for supporting copy.

- **Display:** Use `headline-display` for the strongest campaign or editorial statement.
- **Section hierarchy:** Use `headline-lg` and `headline-md` to keep product and category structure consistent.
- **Reading:** Use `body-lg` for lead copy and `body-md` for product, instructional, and form content.
- **Labels:** Use `label-sm` for navigation, metadata, badges, and compact controls.

## Layout

Alternate full-bleed showroom photography with centered content bands. Desktop headlines may occupy half the canvas; local-store and consignment tasks should remain immediately visible in the header and hero.

The spacing tokens are normative. Use `spacing.md` as the default component gap, `spacing.lg` for card or module padding, and `spacing.2xl`–`spacing.3xl` between major page sections.

## Elevation & Depth

Photography, dark overlays, and tonal section changes create depth. Avoid card stacks; use a subtle shadow only for floating store or form panels.

## Shapes

Primary CTAs and content bands are square-edged. Round only badges, location markers, and small utility controls.

## Components

Red buttons should be rectangular, uppercase, and compact. Navy panels can reverse text to white. Cards should feel like gallery placards: image-dominant with direct labels and minimal chrome.

- **Primary button:** Follow `components.button-primary`; keep one visually dominant primary action per module.
- **Secondary button:** Use the muted surface variant for lower-priority actions.
- **Promo banner:** Use the brand's secondary field with high-contrast `on-secondary` copy.
- **Product card:** Keep product media, name, price, and state in a stable scan order.
- **Inputs:** Use the body type token, explicit labels, visible focus treatment, and WCAG AA contrast.

## Do's and Don'ts

- Do use real showroom and product photography at generous scale.
- Do keep Find Your Store and Consign actions visually dominant.
- Do pair cream or taupe sections with dark brown-gray copy for warmth.
- Don't make the experience feel like a generic marketplace feed.
- Don't use delicate serif type in place of the observed bold Archivo voice.
- Don't round the primary buttons.
- Do maintain WCAG AA contrast for text and interactive controls.
- Don't infer new permanent brand colors from a single seasonal campaign image.

## Research Notes

- **Capture date:** 2026-07-20
- **Live brand URL:** [https://thehomeconsignmentcenter.com/](https://thehomeconsignmentcenter.com/)
- **Primary evidence:** [first-party surface](https://thehomeconsignmentcenter.com/)
- **Evidence note:** Rendered live homepage, computed styles, and exposed Elementor/Astra variables.
- **Synthesis confidence:** high
- **Method:** Rendered homepage inspection where accessible; first-party CSS variables, computed styles, font declarations, redirects, and archived first-party snapshots where the live surface blocked automated capture or had been consolidated.
