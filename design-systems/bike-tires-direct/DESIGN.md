---
version: alpha
name: "BikeTiresDirect"
description: "Dense enthusiast cycling retail with navy utility chrome, red promotions, and gold deal accents."
colors:
  primary: "#163178"
  secondary: "#D8202A"
  accent: "#EFC62D"
  surface: "#FFFFFF"
  surface-muted: "#EFEFEF"
  on-surface: "#3B464A"
  on-primary: "#FFFFFF"
  on-secondary: "#FFFFFF"
  border: "#CCCCCC"
  error: "#D8202A"
typography:
  headline-display:
    fontFamily: "Open Sans, Arial, sans-serif"
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: "Open Sans, Arial, sans-serif"
    fontSize: 22px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0em
  headline-md:
    fontFamily: "Open Sans, Arial, sans-serif"
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.25
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
  lg: "15px"
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

# BikeTiresDirect — DESIGN.md

## Overview

BikeTiresDirect is information-rich and deal-forward. Its design should prioritize fast category access, visible pricing, trust signals, and a compact product grid. The look is unapologetically functional: navy navigation, red promotion mechanics, gold emphasis, and dark slate copy.

## Colors

- Navy anchors the header, navigation, and utility frame.
- Red marks promotions, urgency, and selected commerce states.
- Gold is a high-visibility deal and footer-heading accent; do not use it for long text.

- **primary (#163178):** Normative token for the role described above.
- **secondary (#D8202A):** Normative token for the role described above.
- **accent (#EFC62D):** Normative token for the role described above.
- **surface (#FFFFFF):** Normative token for the role described above.
- **surface-muted (#EFEFEF):** Normative token for the role described above.
- **on-surface (#3B464A):** Normative token for the role described above.
- **on-primary (#FFFFFF):** Normative token for the role described above.
- **on-secondary (#FFFFFF):** Normative token for the role described above.
- **border (#CCCCCC):** Normative token for the role described above.
- **error (#D8202A):** Normative token for the role described above.

## Typography

Open Sans is the operative UI face. Keep the scale compact and use semibold/bold for category, price, and promotion hierarchy rather than oversized editorial headlines.

- **Display:** Use `headline-display` for the strongest campaign or editorial statement.
- **Section hierarchy:** Use `headline-lg` and `headline-md` to keep product and category structure consistent.
- **Reading:** Use `body-lg` for lead copy and `body-md` for product, instructional, and form content.
- **Labels:** Use `label-sm` for navigation, metadata, badges, and compact controls.

## Layout

Use a centered desktop shell with a narrow category rail, broad promotional/product region, and compact modules. The system is denser than the other CSC brands; 12–16px gaps are standard inside commerce grids.

The spacing tokens are normative. Use `spacing.md` as the default component gap, `spacing.lg` for card or module padding, and `spacing.2xl`–`spacing.3xl` between major page sections.

## Elevation & Depth

Use borders and background blocks for containment. Shadows are rare and belong to chat, dialogs, and menu overlays rather than product cards.

## Shapes

Most structural elements are square. Small 3–5px radii support controls; larger 15–20px radii are reserved for badges, chat, and isolated promotional UI.

## Components

Navy frames navigation, red handles urgent promotions, and gold signals special-value content. Product cards should expose price and availability without decorative overlays.

- **Primary button:** Follow `components.button-primary`; keep one visually dominant primary action per module.
- **Secondary button:** Use the muted surface variant for lower-priority actions.
- **Promo banner:** Use the brand's secondary field with high-contrast `on-secondary` copy.
- **Product card:** Keep product media, name, price, and state in a stable scan order.
- **Inputs:** Use the body type token, explicit labels, visible focus treatment, and WCAG AA contrast.

## Do's and Don'ts

- Do preserve compact category navigation and visible deal hierarchy.
- Do use dark slate copy instead of pure black for most body text.
- Do keep trust, shipping, and pricing signals near product decisions.
- Don't redesign the brand as spacious editorial luxury.
- Don't use gold text on white at small sizes.
- Don't hide core categories behind abstract icon-only navigation.
- Do maintain WCAG AA contrast for text and interactive controls.
- Don't infer new permanent brand colors from a single seasonal campaign image.

## Research Notes

- **Capture date:** 2026-07-20
- **Live brand URL:** [https://www.biketiresdirect.com/](https://www.biketiresdirect.com/)
- **Primary evidence:** [first-party surface](https://www.biketiresdirect.com/)
- **Evidence note:** Rendered live homepage audit and first-party CSS variables.
- **Synthesis confidence:** high
- **Method:** Rendered homepage inspection where accessible; first-party CSS variables, computed styles, font declarations, redirects, and archived first-party snapshots where the live surface blocked automated capture or had been consolidated.
