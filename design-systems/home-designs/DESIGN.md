---
version: alpha
name: "Home Designs"
description: "Residential design services grounded in architectural imagery, heritage serif headlines, maroon, and gold."
colors:
  primary: "#5A0D0D"
  secondary: "#E49E0A"
  accent: "#0E6897"
  surface: "#FFFFFF"
  surface-muted: "#F1F1F1"
  on-surface: "#333333"
  on-primary: "#FFFFFF"
  on-secondary: "#191919"
  border: "#C9C9C9"
  error: "#821B1B"
typography:
  headline-display:
    fontFamily: "Marcellus, Georgia, serif"
    fontSize: 50px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: "Marcellus, Georgia, serif"
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: 0em
  headline-md:
    fontFamily: "Marcellus, Georgia, serif"
    fontSize: 30px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0em
  body-lg:
    fontFamily: "Mulish, Helvetica, Arial, sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0em
  body-md:
    fontFamily: "Mulish, Helvetica, Arial, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0em
  label-sm:
    fontFamily: "Montserrat, Helvetica, Arial, sans-serif"
    fontSize: 12px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0.06em
rounded:
  none: "0px"
  sm: "6px"
  md: "12px"
  lg: "25px"
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

# Home Designs — DESIGN.md

## Overview

Home Designs presents permanence, craft, and local service. The public CSC logo tile supplies the Home Designs identity; the active Cabinetry Unlimited operating surface supplies the observable digital system. Architectural and finished-interior photography should lead, supported by heritage serif headlines, calm sans-serif UI, deep maroon, and warm gold.

## Colors

- Deep maroon anchors the brand and mirrors the active cabinetry operation.
- Gold signals consultation, phone, and craftsmanship calls to action.
- Blue is a limited supporting accent observed in the live surface; do not let it compete with maroon and gold.

- **primary (#5A0D0D):** Normative token for the role described above.
- **secondary (#E49E0A):** Normative token for the role described above.
- **accent (#0E6897):** Normative token for the role described above.
- **surface (#FFFFFF):** Normative token for the role described above.
- **surface-muted (#F1F1F1):** Normative token for the role described above.
- **on-surface (#333333):** Normative token for the role described above.
- **on-primary (#FFFFFF):** Normative token for the role described above.
- **on-secondary (#191919):** Normative token for the role described above.
- **border (#C9C9C9):** Normative token for the role described above.
- **error (#821B1B):** Normative token for the role described above.

## Typography

Marcellus provides the established craft voice. Mulish handles explanatory text and forms; Montserrat may appear in compact uppercase labels and buttons.

- **Display:** Use `headline-display` for the strongest campaign or editorial statement.
- **Section hierarchy:** Use `headline-lg` and `headline-md` to keep product and category structure consistent.
- **Reading:** Use `body-lg` for lead copy and `body-md` for product, instructional, and form content.
- **Labels:** Use `label-sm` for navigation, metadata, badges, and compact controls.

## Layout

Use wide architectural hero imagery, centered proof points, and service cards that move from residential inspiration to consultation. Give photography breathing room and keep phone/showroom actions persistent but unobtrusive.

The spacing tokens are normative. Use `spacing.md` as the default component gap, `spacing.lg` for card or module padding, and `spacing.2xl`–`spacing.3xl` between major page sections.

## Elevation & Depth

Use image overlays and light gray section changes. Service cards may have a restrained shadow or border, but the system should feel constructed and material rather than floaty.

## Shapes

Structural bands and image frames can remain square; consultation buttons use the observed pill treatment. Avoid applying pills to every navigation item or card.

## Components

Maroon and gold work as a pair: maroon for brand anchoring, gold for consultation actions. Service tiles should pair an architectural image with a serif title and plain-language scope.

- **Primary button:** Follow `components.button-primary`; keep one visually dominant primary action per module.
- **Secondary button:** Use the muted surface variant for lower-priority actions.
- **Promo banner:** Use the brand's secondary field with high-contrast `on-secondary` copy.
- **Product card:** Keep product media, name, price, and state in a stable scan order.
- **Inputs:** Use the body type token, explicit labels, visible focus treatment, and WCAG AA contrast.

## Do's and Don'ts

- Do lead with completed-room and material photography.
- Do use gold for consultation and contact actions with dark text when necessary for contrast.
- Do state service area, experience, and proof points prominently.
- Don't present Home Designs as a pure ecommerce storefront; its observed surface is service-led.
- Don't use the gold as body text on white.
- Don't replace the craft-oriented serif voice with a generic geometric display font.
- Do maintain WCAG AA contrast for text and interactive controls.
- Don't infer new permanent brand colors from a single seasonal campaign image.

## Research Notes

- **Capture date:** 2026-07-20
- **Live brand URL:** [https://www.cabinetryunlimited.com/](https://www.cabinetryunlimited.com/)
- **Primary evidence:** [first-party surface](https://www.cscgeneration.com/)
- **Evidence note:** CSC publishes a Home Designs logo without a consumer URL. The file combines that logo tile with the live Cabinetry Unlimited surface used by CSC's Home Designs hiring organization.
- **Synthesis confidence:** medium
- **Method:** Rendered homepage inspection where accessible; first-party CSS variables, computed styles, font declarations, redirects, and archived first-party snapshots where the live surface blocked automated capture or had been consolidated.
