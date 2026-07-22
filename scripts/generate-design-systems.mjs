import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

// Legacy research exporter. Its DESIGN.md output is not a canonical production
// brand package. New work should follow BRAND-PACKAGE-SPEC.md and treat any
// tool-specific DESIGN.md format as a generated external export.

export const capturedAt = "2026-07-20";
const cscHomepage = "https://www.cscgeneration.com/";
const cscBundle = "https://www.cscgeneration.com/assets/index-Cb18k8f7.js";
const velotechAnnouncement =
  "https://www.linkedin.com/posts/csc-generation_were-stoked-to-welcome-velotech-inc-activity-7369465759531577347-CDX2";

const commonSpacing = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  "2xl": "48px",
  "3xl": "64px",
};

export const brands = [
  {
    slug: "backcountry",
    name: "Backcountry",
    description: "Editorial outdoor commerce with expert credibility and cinematic expedition imagery.",
    overview:
      "Backcountry combines premium outdoor authority with practical gear-finding. Interfaces should feel capable, direct, and field-tested: cinematic photography carries emotion while restrained utility UI keeps product decisions fast. The distinctive visual tension is warm editorial storytelling against deep teal interaction controls and crisp black-and-white commerce surfaces.",
    liveUrl: "https://www.backcountry.com/",
    evidenceUrl: "https://web.archive.org/web/20251215082556/https://www.backcountry.com/",
    evidenceNote: "Live site returned human verification in automated capture; tokens come from the latest available first-party homepage snapshot and its embedded Chakra theme.",
    confidence: "high",
    colors: {
      primary: "#36827F",
      "primary-hover": "#132E2C",
      secondary: "#AA4026",
      accent: "#DDC9A3",
      surface: "#FFFFFF",
      "surface-muted": "#F5F5F5",
      "on-surface": "#333333",
      "on-primary": "#FFFFFF",
      "on-secondary": "#FFFFFF",
      border: "#CCCCCC",
      error: "#D0021A",
    },
    colorNotes: [
      "Primary is the archived first-party `btn-brand` teal; reserve it for decisive commerce actions and expert guidance.",
      "Secondary is the rust `bg-brand` tone for editorial bands, badges, and warm campaign moments.",
      "Accent is a quiet sand used to connect UI with natural-material photography.",
    ],
    typography: {
      "headline-display": ["Tiempos Headline, Georgia, serif", "48px", 500, 1.05, "-0.02em"],
      "headline-lg": ["Tiempos Headline, Georgia, serif", "36px", 500, 1.1, "-0.01em"],
      "headline-md": ["Flama, Helvetica, Arial, sans-serif", "28px", 600, 1.2, "0em"],
      "body-lg": ["Flama, Helvetica, Arial, sans-serif", "18px", 400, 1.5, "0em"],
      "body-md": ["Flama, Helvetica, Arial, sans-serif", "16px", 400, 1.5, "0em"],
      "label-sm": ["Flama, Helvetica, Arial, sans-serif", "12px", 600, 1.25, "0.05em"],
    },
    typeNotes: "Use Tiempos Headline for adventure-led storytelling and Flama for every transactional or product-detail surface. Labels may be uppercase, but body copy should remain conversational and expert.",
    spacing: commonSpacing,
    rounded: { none: "0px", sm: "2px", md: "4px", lg: "8px", full: "9999px" },
    layout: "Use a fluid product grid inside a 1280–1440px desktop canvas. Editorial modules may run full bleed, but filters, comparison details, and purchase controls should align to a disciplined 8px rhythm with 24px default gutters.",
    elevation: "Favor tonal surfaces and image overlays over decorative card shadows. Use thin gray borders for product containment and a restrained shadow only for menus, drawers, and sticky purchase trays.",
    shapes: "Product and navigation UI is mostly square with 2–4px functional rounding. Pills are reserved for status, size, activity, and loyalty chips, never for every button.",
    componentNotes: "Primary buttons are teal with white type; rust belongs to campaigns rather than routine checkout actions. Product cards stay quiet, image-first, and border-led. Expert-advice callouts may pair teal icons with sand or white surfaces.",
    dos: [
      "Lead campaign modules with authentic outdoor photography and specific activity context.",
      "Keep the primary purchase path teal and visually singular.",
      "Use dense utility information without shrinking body text below 14px.",
    ],
    donts: [
      "Do not turn the palette into generic forest green; the observed brand teal and rust are specific.",
      "Do not use serif type for filters, prices, specifications, or form controls.",
      "Do not soften every surface with large radii or floating glass effects.",
    ],
  },
  {
    slug: "competitive-cyclist",
    name: "Competitive Cyclist",
    description: "High-performance cycling commerce with race-day precision and a disciplined red signal color.",
    overview:
      "Competitive Cyclist should feel exacting, fast, and enthusiast-grade. It is a technical retail system, not a lifestyle boutique: large product imagery, crisp specifications, and decisive red actions sit on a near-monochrome foundation. The voice assumes informed riders and rewards comparison.",
    liveUrl: "https://www.competitivecyclist.com/",
    evidenceUrl: "https://web.archive.org/web/20250815055409/https://www.competitivecyclist.com/",
    evidenceNote: "Live site returned human verification; values are taken from the first-party archived homepage Chakra theme.",
    confidence: "high",
    colors: {
      primary: "#CC0000",
      "primary-hover": "#B40400",
      secondary: "#333333",
      accent: "#D74009",
      surface: "#FFFFFF",
      "surface-muted": "#F5F5F5",
      "on-surface": "#333333",
      "on-primary": "#FFFFFF",
      "on-secondary": "#FFFFFF",
      border: "#CCCCCC",
      error: "#D0021A",
    },
    colorNotes: [
      "Primary red is the first-party `brand`, `btn-brand`, and `border-brand` token.",
      "Charcoal carries navigation and technical hierarchy; most surfaces remain white.",
      "Use orange only for urgent editorial callouts, not as a second primary action color.",
    ],
    typography: {
      "headline-display": ["proxima-nova, Helvetica, Arial, sans-serif", "40px", 700, 1.05, "-0.02em"],
      "headline-lg": ["proxima-nova, Helvetica, Arial, sans-serif", "36px", 700, 1.1, "-0.01em"],
      "headline-md": ["proxima-nova, Helvetica, Arial, sans-serif", "28px", 600, 1.2, "0em"],
      "body-lg": ["proxima-nova, Helvetica, Arial, sans-serif", "18px", 400, 1.5, "0em"],
      "body-md": ["proxima-nova, Helvetica, Arial, sans-serif", "16px", 400, 1.5, "0em"],
      "label-sm": ["proxima-nova, Helvetica, Arial, sans-serif", "12px", 600, 1.25, "0.06em"],
    },
    typeNotes: "Proxima Nova is the single voice across editorial and commerce. Use weight, scale, and uppercase labels for hierarchy; avoid adding a decorative display face.",
    spacing: commonSpacing,
    rounded: { none: "0px", sm: "2px", md: "4px", lg: "8px", full: "9999px" },
    layout: "Use a wide, high-density commerce grid with strong alignment between imagery, specifications, price, and availability. Desktop gutters sit near 24px; comparison tables and product data may be denser than editorial modules.",
    elevation: "Hierarchy comes from borders, white space, and black/red contrast. Shadows are limited to transient navigation, filter drawers, and cart overlays.",
    shapes: "Keep geometry engineered and compact: square product tiles, 2–4px control radii, and circular icon buttons only where the icon itself needs a hit target.",
    componentNotes: "Red is the single purchase and active-selection signal. Product cards use white surfaces and restrained borders. Technical tables should privilege scanability and use charcoal labels with red only for selected or promotional states.",
    dos: [
      "Make technical comparison and fit information easy to scan.",
      "Use red for the primary action and current selection.",
      "Let product photography and equipment detail do most of the visual storytelling.",
    ],
    donts: [
      "Do not dilute performance cues with playful illustration or pastel UI.",
      "Do not introduce multiple competing CTA colors.",
      "Do not over-round cards, filters, or data tables.",
    ],
  },
  {
    slug: "bike-tires-direct",
    name: "BikeTiresDirect",
    description: "Dense enthusiast cycling retail with navy utility chrome, red promotions, and gold deal accents.",
    overview:
      "BikeTiresDirect is information-rich and deal-forward. Its design should prioritize fast category access, visible pricing, trust signals, and a compact product grid. The look is unapologetically functional: navy navigation, red promotion mechanics, gold emphasis, and dark slate copy.",
    liveUrl: "https://www.biketiresdirect.com/",
    evidenceUrl: "https://www.biketiresdirect.com/",
    evidenceNote: "Rendered live homepage audit and first-party CSS variables.",
    confidence: "high",
    colors: {
      primary: "#163178",
      secondary: "#D8202A",
      accent: "#EFC62D",
      surface: "#FFFFFF",
      "surface-muted": "#EFEFEF",
      "on-surface": "#3B464A",
      "on-primary": "#FFFFFF",
      "on-secondary": "#FFFFFF",
      border: "#CCCCCC",
      error: "#D8202A",
    },
    colorNotes: [
      "Navy anchors the header, navigation, and utility frame.",
      "Red marks promotions, urgency, and selected commerce states.",
      "Gold is a high-visibility deal and footer-heading accent; do not use it for long text.",
    ],
    typography: {
      "headline-display": ["Open Sans, Arial, sans-serif", "32px", 700, 1.1, "-0.01em"],
      "headline-lg": ["Open Sans, Arial, sans-serif", "22px", 600, 1.2, "0em"],
      "headline-md": ["Open Sans, Arial, sans-serif", "20px", 600, 1.25, "0em"],
      "body-lg": ["Open Sans, Arial, sans-serif", "16px", 400, 1.45, "0em"],
      "body-md": ["Open Sans, Arial, sans-serif", "14px", 400, 1.45, "0em"],
      "label-sm": ["Open Sans, Arial, sans-serif", "12px", 700, 1.2, "0.03em"],
    },
    typeNotes: "Open Sans is the operative UI face. Keep the scale compact and use semibold/bold for category, price, and promotion hierarchy rather than oversized editorial headlines.",
    spacing: { xs: "4px", sm: "8px", md: "12px", lg: "16px", xl: "24px", "2xl": "32px", "3xl": "48px" },
    rounded: { none: "0px", sm: "3px", md: "5px", lg: "15px", full: "9999px" },
    layout: "Use a centered desktop shell with a narrow category rail, broad promotional/product region, and compact modules. The system is denser than the other CSC brands; 12–16px gaps are standard inside commerce grids.",
    elevation: "Use borders and background blocks for containment. Shadows are rare and belong to chat, dialogs, and menu overlays rather than product cards.",
    shapes: "Most structural elements are square. Small 3–5px radii support controls; larger 15–20px radii are reserved for badges, chat, and isolated promotional UI.",
    componentNotes: "Navy frames navigation, red handles urgent promotions, and gold signals special-value content. Product cards should expose price and availability without decorative overlays.",
    dos: [
      "Preserve compact category navigation and visible deal hierarchy.",
      "Use dark slate copy instead of pure black for most body text.",
      "Keep trust, shipping, and pricing signals near product decisions.",
    ],
    donts: [
      "Do not redesign the brand as spacious editorial luxury.",
      "Do not use gold text on white at small sizes.",
      "Do not hide core categories behind abstract icon-only navigation.",
    ],
  },
  {
    slug: "home-consignment-center",
    name: "Home Consignment Center",
    description: "Bold upscale consignment retail combining gallery-scale imagery, navy depth, and decisive red actions.",
    overview:
      "Home Consignment Center balances upscale home discovery with approachable local retail. Large showroom photography and heavy Archivo headlines create impact; navy, warm cream, taupe, and red keep the experience grounded and action-oriented.",
    liveUrl: "https://thehomeconsignmentcenter.com/",
    evidenceUrl: "https://thehomeconsignmentcenter.com/",
    evidenceNote: "Rendered live homepage, computed styles, and exposed Elementor/Astra variables.",
    confidence: "high",
    colors: {
      primary: "#BA232D",
      secondary: "#233D58",
      accent: "#A4928E",
      surface: "#FFFFFF",
      "surface-muted": "#FBF4E9",
      "on-surface": "#34312C",
      "on-primary": "#FFFFFF",
      "on-secondary": "#FFFFFF",
      border: "#DDDDDD",
      error: "#BA232D",
    },
    colorNotes: [
      "Red is the conversion color for store-finding and consignment actions.",
      "Navy supplies depth for full-width sections, footer areas, and photo overlays.",
      "Taupe and warm cream connect the interface to furniture, jewelry, and residential materials.",
    ],
    typography: {
      "headline-display": ["Archivo, Helvetica, Arial, sans-serif", "64px", 800, 1.05, "-0.02em"],
      "headline-lg": ["Archivo, Helvetica, Arial, sans-serif", "48px", 700, 1.1, "-0.01em"],
      "headline-md": ["Archivo, Helvetica, Arial, sans-serif", "32px", 700, 1.2, "0em"],
      "body-lg": ["Archivo, Helvetica, Arial, sans-serif", "18px", 300, 1.6, "0em"],
      "body-md": ["Archivo, Helvetica, Arial, sans-serif", "16px", 400, 1.55, "0em"],
      "label-sm": ["Archivo, Helvetica, Arial, sans-serif", "13px", 600, 1.2, "0.04em"],
    },
    typeNotes: "Archivo carries both dramatic headlines and practical UI. Use very large, heavy headings over photography; shift to regular or light weights for supporting copy.",
    spacing: commonSpacing,
    rounded: { none: "0px", sm: "2px", md: "4px", lg: "15px", full: "9999px" },
    layout: "Alternate full-bleed showroom photography with centered content bands. Desktop headlines may occupy half the canvas; local-store and consignment tasks should remain immediately visible in the header and hero.",
    elevation: "Photography, dark overlays, and tonal section changes create depth. Avoid card stacks; use a subtle shadow only for floating store or form panels.",
    shapes: "Primary CTAs and content bands are square-edged. Round only badges, location markers, and small utility controls.",
    componentNotes: "Red buttons should be rectangular, uppercase, and compact. Navy panels can reverse text to white. Cards should feel like gallery placards: image-dominant with direct labels and minimal chrome.",
    dos: [
      "Use real showroom and product photography at generous scale.",
      "Keep Find Your Store and Consign actions visually dominant.",
      "Pair cream or taupe sections with dark brown-gray copy for warmth.",
    ],
    donts: [
      "Do not make the experience feel like a generic marketplace feed.",
      "Do not use delicate serif type in place of the observed bold Archivo voice.",
      "Do not round the primary buttons.",
    ],
  },
  {
    slug: "home-designs",
    name: "Home Designs",
    description: "Residential design services grounded in architectural imagery, heritage serif headlines, maroon, and gold.",
    overview:
      "Home Designs presents permanence, craft, and local service. The public CSC logo tile supplies the Home Designs identity; the active Cabinetry Unlimited operating surface supplies the observable digital system. Architectural and finished-interior photography should lead, supported by heritage serif headlines, calm sans-serif UI, deep maroon, and warm gold.",
    liveUrl: "https://www.cabinetryunlimited.com/",
    evidenceUrl: cscHomepage,
    evidenceNote: "CSC publishes a Home Designs logo without a consumer URL. The file combines that logo tile with the live Cabinetry Unlimited surface used by CSC's Home Designs hiring organization.",
    confidence: "medium",
    colors: {
      primary: "#5A0D0D",
      secondary: "#E49E0A",
      accent: "#0E6897",
      surface: "#FFFFFF",
      "surface-muted": "#F1F1F1",
      "on-surface": "#333333",
      "on-primary": "#FFFFFF",
      "on-secondary": "#191919",
      border: "#C9C9C9",
      error: "#821B1B",
    },
    colorNotes: [
      "Deep maroon anchors the brand and mirrors the active cabinetry operation.",
      "Gold signals consultation, phone, and craftsmanship calls to action.",
      "Blue is a limited supporting accent observed in the live surface; do not let it compete with maroon and gold.",
    ],
    typography: {
      "headline-display": ["Marcellus, Georgia, serif", "50px", 700, 1.1, "-0.01em"],
      "headline-lg": ["Marcellus, Georgia, serif", "40px", 700, 1.15, "0em"],
      "headline-md": ["Marcellus, Georgia, serif", "30px", 700, 1.2, "0em"],
      "body-lg": ["Mulish, Helvetica, Arial, sans-serif", "18px", 400, 1.55, "0em"],
      "body-md": ["Mulish, Helvetica, Arial, sans-serif", "16px", 400, 1.55, "0em"],
      "label-sm": ["Montserrat, Helvetica, Arial, sans-serif", "12px", 700, 1.2, "0.06em"],
    },
    typeNotes: "Marcellus provides the established craft voice. Mulish handles explanatory text and forms; Montserrat may appear in compact uppercase labels and buttons.",
    spacing: commonSpacing,
    rounded: { none: "0px", sm: "6px", md: "12px", lg: "25px", full: "9999px" },
    layout: "Use wide architectural hero imagery, centered proof points, and service cards that move from residential inspiration to consultation. Give photography breathing room and keep phone/showroom actions persistent but unobtrusive.",
    elevation: "Use image overlays and light gray section changes. Service cards may have a restrained shadow or border, but the system should feel constructed and material rather than floaty.",
    shapes: "Structural bands and image frames can remain square; consultation buttons use the observed pill treatment. Avoid applying pills to every navigation item or card.",
    componentNotes: "Maroon and gold work as a pair: maroon for brand anchoring, gold for consultation actions. Service tiles should pair an architectural image with a serif title and plain-language scope.",
    dos: [
      "Lead with completed-room and material photography.",
      "Use gold for consultation and contact actions with dark text when necessary for contrast.",
      "State service area, experience, and proof points prominently.",
    ],
    donts: [
      "Do not present Home Designs as a pure ecommerce storefront; its observed surface is service-led.",
      "Do not use the gold as body text on white.",
      "Do not replace the craft-oriented serif voice with a generic geometric display font.",
    ],
  },
  {
    slug: "level-nine-sports",
    name: "Level Nine Sports",
    description: "Accessible outdoor performance retail with electric blue utility, warm campaign accents, and Poppins typography.",
    overview:
      "Level Nine Sports should feel energetic, practical, and value-conscious without becoming chaotic. Bright blue creates a clear action system; black and white keep product information legible; warm orange campaign accents inject seasonality and motion.",
    liveUrl: "https://www.levelninesports.com/",
    evidenceUrl: "https://web.archive.org/web/20250513141841/https://www.levelninesports.com/",
    evidenceNote: "As of July 21, 2026, the live domain redirects to Backcountry Outlet. Standalone Level Nine values come from the latest first-party archived Next.js homepage and CSS bundles and must be treated as historical identity evidence.",
    confidence: "high",
    colors: {
      primary: "#003ACD",
      secondary: "#000000",
      accent: "#F9AE50",
      surface: "#FFFFFF",
      "surface-muted": "#F3F3F3",
      "on-surface": "#222222",
      "on-primary": "#FFFFFF",
      "on-secondary": "#FFFFFF",
      border: "#DADADA",
      error: "#B30000",
    },
    colorNotes: [
      "Electric blue is the primary interactive and promotional system color.",
      "Black creates strong technical hierarchy and keeps the brand performance-oriented.",
      "Warm orange is campaign support, not a persistent second CTA color.",
    ],
    typography: {
      "headline-display": ["Poppins, Helvetica, Arial, sans-serif", "48px", 700, 1.05, "-0.02em"],
      "headline-lg": ["Poppins, Helvetica, Arial, sans-serif", "36px", 700, 1.1, "-0.01em"],
      "headline-md": ["Poppins, Helvetica, Arial, sans-serif", "28px", 600, 1.2, "0em"],
      "body-lg": ["Poppins, Helvetica, Arial, sans-serif", "18px", 400, 1.5, "0em"],
      "body-md": ["Poppins, Helvetica, Arial, sans-serif", "16px", 400, 1.5, "0em"],
      "label-sm": ["Poppins, Helvetica, Arial, sans-serif", "12px", 600, 1.25, "0.04em"],
    },
    typeNotes: "Poppins creates a friendly technical voice. Use bold, compact headlines and straightforward sentence-case body copy; handwritten display styles belong only inside campaign artwork.",
    spacing: commonSpacing,
    rounded: { none: "0px", sm: "4px", md: "8px", lg: "12px", full: "9999px" },
    layout: "Use responsive product and activity grids with broad hero modules. Desktop content should remain within a wide max-width shell; 16–24px gutters and 8px control spacing keep the experience approachable.",
    elevation: "Use light gray layers, small shadows on menus, and crisp card boundaries. Avoid deep or diffuse shadows on the product catalog.",
    shapes: "A 4–8px radius is appropriate for controls and cards. Keep action geometry compact; reserve full pills for filters, tags, and size/activity chips.",
    componentNotes: "Primary buttons are blue with white text. Black can anchor navigation and high-contrast editorial bands. Product cards should remain bright, practical, and easy to compare.",
    dos: [
      "Use blue consistently for selected and actionable states.",
      "Organize products around activity and season.",
      "Keep value messaging visible but secondary to product understanding.",
    ],
    donts: [
      "Do not let orange become a competing primary action color.",
      "Do not use script or marker fonts for system UI.",
      "Do not make the catalog feel as dense as a wholesale parts database.",
    ],
  },
  {
    slug: "motosport",
    name: "MotoSport",
    description: "High-energy powersports commerce combining blue fitment utility, red racing signals, and condensed Saira headlines.",
    overview:
      "MotoSport is fast, mechanical, and equipment-first. Blue guides fitment and shopping utility; red supplies racing urgency and brand energy; black, white, and dense product imagery keep the interface grounded in real machines and gear.",
    liveUrl: "https://www.motosport.com/",
    evidenceUrl: "https://www.motosport.com/",
    evidenceNote: "Rendered live homepage audit and computed first-party styles.",
    confidence: "high",
    colors: {
      primary: "#006BB8",
      "primary-bright": "#0088CC",
      secondary: "#CE160F",
      accent: "#41B1F9",
      surface: "#FFFFFF",
      "surface-muted": "#EEEEEE",
      "on-surface": "#1F1F1F",
      "on-primary": "#FFFFFF",
      "on-secondary": "#FFFFFF",
      border: "#DDDDDD",
      error: "#B20000",
    },
    colorNotes: [
      "Blue is the dominant interactive color across ride selection and commerce controls.",
      "Racing red belongs to logo, sale, urgency, and promotional moments.",
      "Keep the remaining interface neutral so machinery, gear, and sponsor imagery remain legible.",
    ],
    typography: {
      "headline-display": ["Saira, Helvetica, Arial, sans-serif", "40px", 700, 1.05, "-0.01em"],
      "headline-lg": ["Saira, Helvetica, Arial, sans-serif", "30px", 700, 1.15, "0em"],
      "headline-md": ["Saira, Helvetica, Arial, sans-serif", "24px", 700, 1.2, "0em"],
      "body-lg": ["Poppins, Helvetica, Arial, sans-serif", "16px", 400, 1.45, "0em"],
      "body-md": ["Poppins, Helvetica, Arial, sans-serif", "14px", 400, 1.45, "0em"],
      "label-sm": ["Poppins, Helvetica, Arial, sans-serif", "12px", 600, 1.2, "0.03em"],
    },
    typeNotes: "Saira carries bold category and campaign headlines; Poppins supports navigation, fitment, specifications, and forms. Keep the combination athletic and legible rather than decorative.",
    spacing: { xs: "4px", sm: "8px", md: "12px", lg: "16px", xl: "24px", "2xl": "32px", "3xl": "48px" },
    rounded: { none: "0px", sm: "4px", md: "4px", lg: "8px", full: "9999px" },
    layout: "Use a dense wide catalog with persistent ride/fitment selection near the top. Category photography may be dramatic, but specifications, OEM context, and compatibility must align tightly below it.",
    elevation: "Most hierarchy is flat and border-led. Use small shadows for fitment selectors, menus, and cart overlays only.",
    shapes: "Controls use a consistent 4px radius; navigation bands and promotional blocks remain square. Avoid lifestyle-oriented soft cards.",
    componentNotes: "The ride selector is a primary blue control and should precede product browsing when fitment matters. Red is best used for sale, brand, and urgent states. Category tiles may reverse white Saira type over action photography.",
    dos: [
      "Surface vehicle fitment before asking users to compare parts.",
      "Use blue for operational progress and red for racing or sale emphasis.",
      "Keep OEM, compatibility, shipping, and availability information visible.",
    ],
    donts: [
      "Do not use red and blue as equal competing CTAs in the same module.",
      "Do not hide fitment behind generic search alone.",
      "Do not round category blocks or navigation bands excessively.",
    ],
  },
  {
    slug: "one-kings-lane",
    name: "One Kings Lane",
    description: "Editorial luxury home commerce with dark evergreen, antique gold, refined serif display type, and restrained geometry.",
    overview:
      "One Kings Lane is collected, editorial, and quietly luxurious. It should resemble a high-end interiors publication that happens to be shoppable: art-directed room photography, elegant serif display type, disciplined gray commerce UI, evergreen brand moments, and antique-gold focus details.",
    liveUrl: "https://www.onekingslane.com/",
    evidenceUrl: "https://www.onekingslane.com/",
    evidenceNote: "Rendered live homepage plus first-party Next.js CSS variables and Typekit font definitions.",
    confidence: "high",
    colors: {
      primary: "#323232",
      secondary: "#3B5F58",
      "secondary-dark": "#043730",
      accent: "#CEA058",
      surface: "#FFFFFF",
      "surface-muted": "#F5F7F7",
      "on-surface": "#323232",
      "on-primary": "#FFFFFF",
      "on-secondary": "#FFFFFF",
      border: "#D8D8D8",
      error: "#991B1B",
    },
    colorNotes: [
      "Charcoal is the default commerce and typography anchor.",
      "Evergreen carries offers, loyalty, and branded editorial moments.",
      "Antique gold is a focus and step accent; use it sparingly and never as small body text on white.",
    ],
    typography: {
      "headline-display": ["freight-display-pro, Georgia, serif", "62px", 500, 1.05, "-0.02em"],
      "headline-lg": ["freight-display-pro, Georgia, serif", "48px", 500, 1.1, "-0.01em"],
      "headline-md": ["sofia-pro, Helvetica, Arial, sans-serif", "24px", 500, 1.25, "0.02em"],
      "body-lg": ["sofia-pro, Helvetica, Arial, sans-serif", "18px", 400, 1.55, "0.02em"],
      "body-md": ["proxima-nova, Helvetica, Arial, sans-serif", "16px", 400, 1.55, "0em"],
      "label-sm": ["brandon-grotesque, Helvetica, Arial, sans-serif", "12px", 600, 1.2, "0.08em"],
    },
    typeNotes: "Freight Display is the editorial voice; Sofia Pro and Proxima Nova carry product and body content; Brandon Grotesque supports letter-spaced labels. Preserve the contrast instead of flattening the brand into one generic sans-serif.",
    spacing: commonSpacing,
    rounded: { none: "0px", sm: "2px", md: "4px", lg: "4px", full: "9999px" },
    layout: "Use generous editorial modules, large room photography, and a calm product grid inside a wide max-width shell. Allow 32–64px between major sections; product metadata stays compact and aligned.",
    elevation: "Favor layering through photography, tonal gray-green backgrounds, and fine rules. Shadows should be subtle and limited to modal, menu, and quick-view surfaces.",
    shapes: "Geometry is architectural and mostly square. Use 2–4px radii for inputs and dialogs; avoid the soft pill-card vocabulary common to generic ecommerce templates.",
    componentNotes: "Primary commerce buttons are charcoal. Evergreen is appropriate for offers and loyalty, with white type. Editorial product cards should be image-led, minimally bordered, and set with disciplined type hierarchy.",
    dos: [
      "Compose modules like an interiors editorial spread.",
      "Use evergreen and gold as selective brand signals around a neutral commerce core.",
      "Give photography and serif display type room to breathe.",
    ],
    donts: [
      "Do not use bright saturated CTA colors.",
      "Do not overuse antique gold or reduce its contrast below accessibility thresholds.",
      "Do not apply large radii, glass effects, or playful chips to core product UI.",
    ],
  },
  {
    slug: "seattle-coffee-gear",
    name: "Seattle Coffee Gear",
    description: "Friendly specialty-coffee commerce with raspberry red, ocean blue, warm yellow, and condensed merchandising headlines.",
    overview:
      "Seattle Coffee Gear is expert without being intimidating. Its interface pairs clean equipment merchandising with playful, high-energy campaign graphics. Raspberry red is the brand signature, ocean blue supports guidance and secondary actions, and warm yellow/green accents bring café warmth and educational energy.",
    liveUrl: "https://www.seattlecoffeegear.com/",
    evidenceUrl: "https://www.seattlecoffeegear.com/",
    evidenceNote: "Rendered live Shopify homepage, computed styles, theme variables, and first-party CSS.",
    confidence: "high",
    colors: {
      primary: "#D2324C",
      "primary-dark": "#962134",
      secondary: "#217A97",
      accent: "#EDAF44",
      success: "#218368",
      surface: "#FFFFFF",
      "surface-muted": "#F7F7FA",
      "on-surface": "#282828",
      "on-primary": "#FFFFFF",
      "on-secondary": "#FFFFFF",
      border: "#C8C8DD",
      error: "#BE2119",
    },
    colorNotes: [
      "Raspberry red is the primary brand and campaign action color.",
      "Ocean blue supports consultation, education, and secondary actions.",
      "Yellow is a warmth and highlight accent; green is reserved for success or coffee-community signals.",
    ],
    typography: {
      "headline-display": ["proxima-nova-condensed, Helvetica, Arial, sans-serif", "60px", 800, 1, "-0.01em"],
      "headline-lg": ["proxima-nova-condensed, Helvetica, Arial, sans-serif", "36px", 700, 1.1, "0em"],
      "headline-md": ["proxima-nova, Helvetica, Arial, sans-serif", "30px", 700, 1.2, "0em"],
      "body-lg": ["proxima-nova, Helvetica, Arial, sans-serif", "18px", 400, 1.55, "0em"],
      "body-md": ["proxima-nova, Helvetica, Arial, sans-serif", "16px", 400, 1.5, "0em"],
      "label-sm": ["proxima-nova, Helvetica, Arial, sans-serif", "12px", 600, 1.2, "0.04em"],
    },
    typeNotes: "Use Proxima Nova Condensed for bold merchandising and campaign headlines; standard Proxima Nova handles product, education, navigation, and forms.",
    spacing: commonSpacing,
    rounded: { none: "0px", sm: "2px", md: "5px", lg: "8px", xl: "12px", full: "9999px" },
    layout: "Use a bright retail canvas with full-width campaign heroes, clear product carousels, and educational modules. Maintain 16–24px grid gaps and give consultation content more breathing room than catalog rows.",
    elevation: "Use light cool-gray surfaces and small, crisp card shadows for interactive tools. Product cards can stay mostly flat; drawers and recommendation widgets may use medium elevation.",
    shapes: "Buttons use compact 5–8px radii; chips and carousel controls may be circular or full-pill. Avoid applying the larger 24–32px utility radii to core catalog cards.",
    componentNotes: "Primary campaign actions are raspberry red with white text. Secondary education or consultation actions may use ocean blue. Keep machine product cards clean and let campaign backgrounds carry expressive graphics.",
    dos: [
      "Balance equipment detail with friendly educational guidance.",
      "Use condensed type for energetic offer headlines.",
      "Reserve color variety for campaigns while keeping catalog UI calm.",
    ],
    donts: [
      "Do not let every component use a different brand accent.",
      "Do not use yellow for small text on white.",
      "Do not make technical coffee content feel clinical or overly luxury-coded.",
    ],
  },
  {
    slug: "steep-and-cheap",
    name: "Steep & Cheap",
    description: "Deal-driven outdoor retail with a bright green action system, Sofia Pro, and compact urgency.",
    overview:
      "Steep & Cheap is the scrappy, immediate deal surface in the outdoor portfolio. It should feel fast and value-rich without sacrificing trust: vivid green actions, charcoal utility UI, large product imagery, and compact deal metadata make urgency easy to understand.",
    liveUrl: "https://www.steepandcheap.com/",
    evidenceUrl: "https://web.archive.org/web/20250815023114/https://www.steepandcheap.com/",
    evidenceNote: "Live site returned human verification; values come from the first-party archived Chakra theme.",
    confidence: "high",
    colors: {
      primary: "#72A022",
      secondary: "#333333",
      accent: "#556F7C",
      surface: "#FFFFFF",
      "surface-muted": "#F5F5F5",
      "on-surface": "#333333",
      "on-primary": "#000000",
      "on-secondary": "#FFFFFF",
      border: "#CCCCCC",
      error: "#D0021A",
    },
    colorNotes: [
      "Bright green is the first-party `brand`, `btn-brand`, and `border-brand` value.",
      "Black text is used on green for accessible normal-size button copy.",
      "Blue-gray supports coupon and informational messages without competing with green.",
    ],
    typography: {
      "headline-display": ["sofia-pro, Helvetica, Arial, sans-serif", "30px", 700, 1.05, "-0.01em"],
      "headline-lg": ["sofia-pro, Helvetica, Arial, sans-serif", "28px", 700, 1.1, "0em"],
      "headline-md": ["sofia-pro, Helvetica, Arial, sans-serif", "24px", 600, 1.2, "0em"],
      "body-lg": ["sofia-pro, Helvetica, Arial, sans-serif", "18px", 500, 1.5, "0em"],
      "body-md": ["sofia-pro, Helvetica, Arial, sans-serif", "16px", 500, 1.5, "0em"],
      "label-sm": ["sofia-pro, Helvetica, Arial, sans-serif", "12px", 600, 1.2, "0.04em"],
    },
    typeNotes: "Sofia Pro is the single interface voice. Use bold but compact headings and clear numerical emphasis for discount, price, and inventory signals.",
    spacing: { xs: "4px", sm: "8px", md: "12px", lg: "16px", xl: "24px", "2xl": "32px", "3xl": "48px" },
    rounded: { none: "0px", sm: "2px", md: "4px", lg: "8px", full: "9999px" },
    layout: "Use a dense deal feed and product grid inside a wide shell. Surface discount, current price, former price, and availability in a consistent vertical order. Keep promotional bands full-width and easy to dismiss.",
    elevation: "Use flat white cards with borders and a restrained shadow only for menus, cart, and urgency overlays.",
    shapes: "Keep product and deal cards square or lightly rounded. Pills are appropriate for discount, inventory, and activity tags.",
    componentNotes: "Green marks the deal action and selected state; charcoal anchors navigation and checkout. Price hierarchy should be typographic first, not dependent on color alone.",
    dos: [
      "Show savings, price, and urgency together in a predictable structure.",
      "Use black type on the observed green for accessible small and medium controls.",
      "Keep value messaging energetic but credible.",
    ],
    donts: [
      "Do not use white normal-size text on the green primary; contrast is insufficient.",
      "Do not obscure product information with oversized promotional decoration.",
      "Do not add extra bright action colors.",
    ],
  },
  {
    slug: "sur-la-table",
    name: "Sur La Table",
    description: "Culinary authority with black-and-white retail discipline, cranberry actions, and expressive seasonal food color.",
    overview:
      "Sur La Table blends culinary expertise with the warmth of cooking and gathering. The durable system is disciplined black, white, cranberry, and Lato; seasonal campaigns can introduce food-led palettes and Scotch Deck display type without changing core navigation, product, or class-booking behavior.",
    liveUrl: "https://www.surlatable.com/",
    evidenceUrl: "https://www.surlatable.com/",
    evidenceNote: "Rendered live Salesforce Commerce homepage plus first-party CSS and current campaign font/color inspection.",
    confidence: "high",
    colors: {
      primary: "#C51A36",
      secondary: "#1E1E1E",
      accent: "#B85D0A",
      "seasonal-olive": "#323C06",
      surface: "#FFFFFF",
      "surface-muted": "#F8F8F8",
      "on-surface": "#000000",
      "on-primary": "#FFFFFF",
      "on-secondary": "#FFFFFF",
      border: "#C4C4C4",
      error: "#B72F3B",
    },
    colorNotes: [
      "Cranberry is the persistent brand, sale, and interaction accent found throughout first-party CSS.",
      "Black and white form the stable commerce and culinary-instruction system.",
      "Rust and olive are current seasonal food colors; use them in campaigns, not as permanent control semantics.",
    ],
    typography: {
      "headline-display": ["Scotch Deck, Georgia, serif", "44px", 500, 1.05, "-0.01em"],
      "headline-lg": ["TT Norms Pro, Lato, Helvetica, Arial, sans-serif", "36px", 600, 1.15, "0em"],
      "headline-md": ["Lato, Helvetica, Arial, sans-serif", "28px", 700, 1.2, "0em"],
      "body-lg": ["Lato, Helvetica, Arial, sans-serif", "16px", 400, 1.55, "0.03em"],
      "body-md": ["Lato, Helvetica, Arial, sans-serif", "14px", 400, 1.5, "0.03em"],
      "label-sm": ["Lato, Helvetica, Arial, sans-serif", "12px", 700, 1.2, "0.06em"],
    },
    typeNotes: "Lato is the stable commerce and instructional voice. TT Norms Pro and Scotch Deck support current editorial campaigns; use the serif only for high-impact culinary storytelling, not product data or booking forms.",
    spacing: commonSpacing,
    rounded: { none: "0px", sm: "0px", md: "0px", lg: "4px", full: "9999px" },
    layout: "Use a structured multi-row retail header, broad seasonal hero, product-category grid, and clear separation between products, gifts, and cooking classes. Core modules align tightly; campaigns may use more expressive asymmetry and food imagery.",
    elevation: "The system is primarily flat. Use borders, dark promotional bands, and background color blocks; reserve shadows for navigation overlays, quick view, and booking dialogs.",
    shapes: "Core buttons, search, navigation, and product modules are square. A slight 4px radius may appear in modern campaign modules; circular treatment is limited to carousel and utility controls.",
    componentNotes: "Primary actions use cranberry or black with white type. Product and class cards remain image-led and square. Seasonal orange and olive belong in banners and food-led art direction, not checkout semantics.",
    dos: [
      "Use appetizing, ingredient-rich photography and real kitchen context.",
      "Keep product shopping and cooking-class booking patterns distinct but related.",
      "Maintain the disciplined square geometry of the core site.",
    ],
    donts: [
      "Do not make seasonal palette colors permanent UI semantics.",
      "Do not use decorative display type in prices, specifications, or forms.",
      "Do not soften the retail system with pervasive large radii.",
    ],
  },
  {
    slug: "western-bikeworks",
    name: "Western Bikeworks",
    description: "Legacy enthusiast cycling retail with red, Portland teal, orange value accents, and compact Open Sans UI.",
    overview:
      "Western Bikeworks was a practical, enthusiast-focused cycling shop with compact product density and a distinctly Pacific Northwest teal accent. Its last standalone digital identity paired deep red, teal, and orange with a utilitarian Open Sans catalog. The live domain now redirects to BikeTiresDirect; this file preserves the final standalone system for migration or revival work.",
    liveUrl: "https://www.westernbikeworks.com/",
    evidenceUrl: "https://web.archive.org/web/20250815000000/https://www.westernbikeworks.com/",
    evidenceNote: "Current domain redirects to BikeTiresDirect. Values come from the last first-party standalone homepage/CSS before consolidation.",
    confidence: "high-historical",
    colors: {
      primary: "#C41230",
      secondary: "#008FB1",
      accent: "#F78429",
      surface: "#FFFFFF",
      "surface-muted": "#F8F8F8",
      "on-surface": "#222222",
      "on-primary": "#FFFFFF",
      "on-secondary": "#000000",
      border: "#CCCCCC",
      error: "#D00000",
    },
    colorNotes: [
      "Deep red was the dominant promotional and brand color in the final standalone CSS.",
      "Teal supplied the local cycling identity and secondary interaction system.",
      "Orange marked value and promotional energy; keep it subordinate to red and teal.",
    ],
    typography: {
      "headline-display": ["Open Sans, Arial, sans-serif", "42px", 700, 1.05, "-0.01em"],
      "headline-lg": ["Open Sans, Arial, sans-serif", "34px", 700, 1.1, "0em"],
      "headline-md": ["Open Sans, Arial, sans-serif", "22px", 600, 1.2, "0em"],
      "body-lg": ["Open Sans, Arial, sans-serif", "16px", 400, 1.45, "0em"],
      "body-md": ["Open Sans, Arial, sans-serif", "14px", 400, 1.45, "0em"],
      "label-sm": ["Open Sans, Arial, sans-serif", "12px", 700, 1.2, "0.03em"],
    },
    typeNotes: "Open Sans is the operative voice. Use compact, clear sizes and direct price/category hierarchy; campaign artwork may carry bolder display lettering inside images.",
    spacing: { xs: "4px", sm: "8px", md: "12px", lg: "16px", xl: "24px", "2xl": "32px", "3xl": "48px" },
    rounded: { none: "0px", sm: "3px", md: "5px", lg: "10px", full: "9999px" },
    layout: "Preserve the compact multi-column catalog, visible categories, and direct price/value presentation. Use a centered desktop shell and 12–16px product-grid gaps.",
    elevation: "Flat borders and background blocks do most of the work. Shadows are for menus, modals, and chat only.",
    shapes: "Structure remains square with small 3–5px control radii. Larger radii are reserved for badges and isolated utility UI.",
    componentNotes: "Red handles primary promotions, teal supports navigation or secondary actions, and orange highlights value. Product cards should remain compact and comparison-friendly.",
    dos: [
      "Preserve the distinct red/teal/orange identity when reviving legacy assets.",
      "Keep cycling categories and product detail immediately scannable.",
      "Label this system as historical wherever it is used in production planning.",
    ],
    donts: [
      "Do not claim the standalone Western Bikeworks storefront is still live.",
      "Do not silently replace its teal/orange identity with BikeTiresDirect navy/gold.",
      "Do not make the product grid editorially sparse.",
    ],
  },
  {
    slug: "trisports",
    name: "TriSports",
    description: "Legacy triathlon specialty commerce with magenta-red urgency, endurance blue, orange accents, and compact Open Sans UI.",
    overview:
      "TriSports was a specialist endurance-commerce surface for athletes who shop across swim, bike, and run. Its final standalone design was dense and equipment-led, using magenta-red for action, endurance blue for secondary structure, and orange for energy. The live domain now redirects to Competitive Cyclist's triathlon collection; this file preserves the last first-party identity.",
    liveUrl: "https://www.trisports.com/",
    evidenceUrl: "https://web.archive.org/web/20260521164505/https://www.trisports.com/",
    evidenceNote: "Current domain redirects to Competitive Cyclist. Values come from a May 2026 first-party archived homepage and its standalone CSS.",
    confidence: "high-historical",
    colors: {
      primary: "#DD1242",
      secondary: "#005CAB",
      accent: "#F58427",
      surface: "#FFFFFF",
      "surface-muted": "#F8F8F8",
      "on-surface": "#222222",
      "on-primary": "#FFFFFF",
      "on-secondary": "#FFFFFF",
      border: "#CCCCCC",
      error: "#CC181E",
    },
    colorNotes: [
      "Magenta-red was the dominant first-party action and brand color.",
      "Endurance blue organized supporting navigation and category structure.",
      "Orange supplied energy for promotion and event-adjacent highlights.",
    ],
    typography: {
      "headline-display": ["Open Sans, Arial, sans-serif", "44px", 700, 1.05, "-0.01em"],
      "headline-lg": ["Open Sans, Arial, sans-serif", "33px", 700, 1.1, "0em"],
      "headline-md": ["Open Sans, Arial, sans-serif", "22px", 600, 1.2, "0em"],
      "body-lg": ["Open Sans, Arial, sans-serif", "16px", 400, 1.45, "0em"],
      "body-md": ["Open Sans, Arial, sans-serif", "14px", 400, 1.45, "0em"],
      "label-sm": ["Open Sans, Arial, sans-serif", "12px", 700, 1.2, "0.03em"],
    },
    typeNotes: "Open Sans is the core storefront face. Use numerical emphasis and compact label structure for fit, distance, discipline, compatibility, and price.",
    spacing: { xs: "4px", sm: "8px", md: "12px", lg: "16px", xl: "24px", "2xl": "32px", "3xl": "48px" },
    rounded: { none: "0px", sm: "3px", md: "5px", lg: "10px", full: "9999px" },
    layout: "Organize the catalog around swim, bike, run, and complete triathlon systems. Use a compact grid and preserve cross-discipline comparison context; key fit and compatibility details belong close to price and stock.",
    elevation: "Use borders and pale neutral layers. Menus, filters, and quick-view overlays may have a restrained shadow; product cards stay flat.",
    shapes: "Small 3–5px radii support controls and badges. The core catalog remains rectilinear and utilitarian.",
    componentNotes: "Primary actions use magenta-red; blue supports navigation and informational states. Orange is a controlled energy accent. Discipline tags should remain textual and understandable without color alone.",
    dos: [
      "Preserve cross-discipline context and specialist equipment detail.",
      "Use the historical magenta-red and blue identity when migrating legacy content.",
      "Label this system as historical wherever it informs new production work.",
    ],
    donts: [
      "Do not claim a standalone TriSports storefront is currently live.",
      "Do not collapse triathlon specificity into generic road-cycling UI.",
      "Do not rely on discipline color without text labels.",
    ],
  },
];

function yamlString(value) {
  return JSON.stringify(String(value));
}

function renderTypography(tokens) {
  return Object.entries(tokens)
    .map(([name, [fontFamily, fontSize, fontWeight, lineHeight, letterSpacing]]) =>
      [
        `  ${name}:`,
        `    fontFamily: ${yamlString(fontFamily)}`,
        `    fontSize: ${fontSize}`,
        `    fontWeight: ${fontWeight}`,
        `    lineHeight: ${lineHeight}`,
        `    letterSpacing: ${letterSpacing}`,
      ].join("\n")
    )
    .join("\n");
}

function renderMap(map, indent = 2) {
  const pad = " ".repeat(indent);
  return Object.entries(map)
    .map(([key, value]) => `${pad}${key}: ${yamlString(value)}`)
    .join("\n");
}

function componentsFor(brand) {
  const cardRadius = brand.rounded.md ? "md" : "sm";
  const hoverToken = brand.colors["primary-hover"]
    ? "primary-hover"
    : brand.colors["primary-dark"]
      ? "primary-dark"
      : "primary";
  const components = [
    "  button-primary:",
    '    backgroundColor: "{colors.primary}"',
    '    textColor: "{colors.on-primary}"',
    '    typography: "{typography.label-sm}"',
    '    rounded: "{rounded.md}"',
    "    padding: 12px",
    "  button-primary-hover:",
    `    backgroundColor: "{colors.${hoverToken}}"`,
    "  button-secondary:",
    '    backgroundColor: "{colors.surface-muted}"',
    '    textColor: "{colors.on-surface}"',
    '    typography: "{typography.label-sm}"',
    '    rounded: "{rounded.md}"',
    "    padding: 12px",
    "  promo-banner:",
    '    backgroundColor: "{colors.secondary}"',
    '    textColor: "{colors.on-secondary}"',
    '    typography: "{typography.headline-md}"',
    '    rounded: "{rounded.none}"',
    "    padding: 24px",
    "  product-card:",
    '    backgroundColor: "{colors.surface}"',
    '    textColor: "{colors.on-surface}"',
    '    typography: "{typography.body-md}"',
    `    rounded: "{rounded.${cardRadius}}"`,
    "    padding: 16px",
    "  input:",
    '    backgroundColor: "{colors.surface}"',
    '    textColor: "{colors.on-surface}"',
    '    typography: "{typography.body-md}"',
    '    rounded: "{rounded.sm}"',
    "    padding: 12px",
    "  accent-marker:",
    '    backgroundColor: "{colors.accent}"',
    '    rounded: "{rounded.full}"',
    "    size: 8px",
    "  divider:",
    '    backgroundColor: "{colors.border}"',
    "    height: 1px",
  ];

  if (brand.colors["primary-bright"]) {
    components.push("  button-primary-active:", '    backgroundColor: "{colors.primary-bright}"');
  }
  if (brand.colors["secondary-dark"]) {
    components.push("  promo-banner-hover:", '    backgroundColor: "{colors.secondary-dark}"');
  }
  if (brand.colors.success) {
    components.push(
      "  status-success:",
      '    backgroundColor: "{colors.success}"',
      '    rounded: "{rounded.full}"',
      "    size: 8px"
    );
  }
  if (brand.colors["seasonal-olive"]) {
    components.push(
      "  seasonal-marker:",
      '    backgroundColor: "{colors.seasonal-olive}"',
      '    rounded: "{rounded.full}"',
      "    size: 8px"
    );
  }

  return components.join("\n");
}

function renderDesignMd(brand) {
  const colorBullets = brand.colorNotes.map((note) => `- ${note}`).join("\n");
  const colorTokenBullets = Object.entries(brand.colors)
    .map(([name, value]) => `- **${name} (${value}):** Normative token for the role described above.`)
    .join("\n");
  const dos = brand.dos.map((item) => `- Do ${item[0].toLowerCase()}${item.slice(1)}`).join("\n");
  const donts = brand.donts
    .map((item) => {
      const normalized = item.replace(/^Do not\s+/i, "");
      return `- Don't ${normalized[0].toLowerCase()}${normalized.slice(1)}`;
    })
    .join("\n");

  return `---
version: alpha
name: ${yamlString(brand.name)}
description: ${yamlString(brand.description)}
colors:
${renderMap(brand.colors)}
typography:
${renderTypography(brand.typography)}
rounded:
${renderMap(brand.rounded)}
spacing:
${renderMap(brand.spacing)}
components:
${componentsFor(brand)}
---

# ${brand.name} — DESIGN.md

## Overview

${brand.overview}

## Colors

${colorBullets}

${colorTokenBullets}

## Typography

${brand.typeNotes}

- **Display:** Use \`${Object.keys(brand.typography)[0]}\` for the strongest campaign or editorial statement.
- **Section hierarchy:** Use \`headline-lg\` and \`headline-md\` to keep product and category structure consistent.
- **Reading:** Use \`body-lg\` for lead copy and \`body-md\` for product, instructional, and form content.
- **Labels:** Use \`label-sm\` for navigation, metadata, badges, and compact controls.

## Layout

${brand.layout}

The spacing tokens are normative. Use \`spacing.md\` as the default component gap, \`spacing.lg\` for card or module padding, and \`spacing.2xl\`–\`spacing.3xl\` between major page sections.

## Elevation & Depth

${brand.elevation}

## Shapes

${brand.shapes}

## Components

${brand.componentNotes}

- **Primary button:** Follow \`components.button-primary\`; keep one visually dominant primary action per module.
- **Secondary button:** Use the muted surface variant for lower-priority actions.
- **Promo banner:** Use the brand's secondary field with high-contrast \`on-secondary\` copy.
- **Product card:** Keep product media, name, price, and state in a stable scan order.
- **Inputs:** Use the body type token, explicit labels, visible focus treatment, and WCAG AA contrast.

## Do's and Don'ts

${dos}
${donts}
- Do maintain WCAG AA contrast for text and interactive controls.
- Don't infer new permanent brand colors from a single seasonal campaign image.

## Research Notes

- **Capture date:** ${capturedAt}
- **Live brand URL:** [${brand.liveUrl}](${brand.liveUrl})
- **Primary evidence:** [first-party surface](${brand.evidenceUrl})
- **Evidence note:** ${brand.evidenceNote}
- **Synthesis confidence:** ${brand.confidence}
- **Method:** Rendered homepage inspection where accessible; first-party CSS variables, computed styles, font declarations, redirects, and archived first-party snapshots where the live surface blocked automated capture or had been consolidated.
`;
}

async function generateLegacyDesignSystems() {
const outRoot = path.resolve("design-systems");
await fs.mkdir(outRoot, { recursive: true });

for (const brand of brands) {
  const dir = path.join(outRoot, brand.slug);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, "DESIGN.md"), renderDesignMd(brand));
}

const manifest = {
  capturedAt,
  declaredBrandCount: 13,
  basis: {
    cscHomepage,
    cscProductionBundle: cscBundle,
    velotechAnnouncement,
    explanation:
      "CSC's production homepage bundle names 11 brands. CSC's public Velotech announcement identifies Western Bikeworks and TriSports alongside BikeTiresDirect, resolving the declared 13-brand count.",
  },
  caveats: [
    "Western Bikeworks now redirects to BikeTiresDirect; its DESIGN.md preserves the last standalone first-party identity.",
    "TriSports now redirects to Competitive Cyclist; its DESIGN.md preserves the last standalone first-party identity.",
    "CSC's Home Designs logo has no public consumer URL; its DESIGN.md combines the CSC logo tile with the active Cabinetry Unlimited operating surface.",
    "Coalatree is a recent Backcountry incubator acquisition but is not included in the exact 13-brand set resolved from CSC's homepage count and Velotech sites.",
  ],
  brands: brands.map(({ slug, name, liveUrl, evidenceUrl, evidenceNote, confidence }) => ({
    slug,
    name,
    designFile: `${slug}/DESIGN.md`,
    liveUrl,
    evidenceUrl,
    evidenceNote,
    confidence,
  })),
};

await fs.writeFile(path.join(outRoot, "portfolio-manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);

const rows = brands
  .map(
    (brand, index) =>
      `| ${index + 1} | [${brand.name}](./${brand.slug}/DESIGN.md) | ${brand.confidence} | ${brand.liveUrl} |`
  )
  .join("\n");

const readme = `# CSC Generation — 13 Brand DESIGN.md Library

This package translates CSC Generation's 13-brand retail portfolio into Google's open \`DESIGN.md\` alpha format. Each file contains normative YAML design tokens plus brand-specific guidance for layout, depth, shapes, components, and usage guardrails.

## Brand Set

| # | Brand file | Confidence | Live URL |
|---:|---|---|---|
${rows}

## How the 13 were resolved

CSC's [current homepage](${cscHomepage}) says it powers 13 brands, while its production bundle explicitly names 11: Backcountry, Competitive Cyclist, BikeTiresDirect, Home Consignment Center, Home Designs, Level Nine Sports, MotoSport, One Kings Lane, Seattle Coffee Gear, Steep & Cheap, and Sur La Table.

CSC's [Velotech announcement](${velotechAnnouncement}) identifies the two additional specialty sites, Western Bikeworks and TriSports. That produces the declared set of 13. The exact source trail and per-brand caveats live in [portfolio-manifest.json](./portfolio-manifest.json).

## Caveats that matter

- Western Bikeworks now redirects to BikeTiresDirect. Its file preserves the last standalone first-party system.
- TriSports now redirects to Competitive Cyclist. Its file preserves the last standalone first-party system.
- Home Designs has no linked consumer site in CSC's bundle. Its file uses CSC's Home Designs logo tile plus the active Cabinetry Unlimited surface associated with the Home Designs hiring organization.
- Coalatree is a recent Backcountry incubator acquisition, but it is not part of the exact 13-brand count resolved above.

## Validation

Run Google's official linter from this directory:


    for file in */DESIGN.md; do npx -y @google/design.md@0.3.0 lint "$file"; done

The format is currently alpha, so pin the CLI version before using this library in a production build pipeline.

## Suggested demo use

Treat each brand file as the policy layer for a shared creative-automation system. A campaign brief selects the brand, reads its \`DESIGN.md\`, generates the asset or interface, then validates token use and accessibility before review. The shared schema makes the thirteen identities portable without flattening them into one CSC house style.
`;

await fs.writeFile(path.join(outRoot, "README.md"), readme);

console.log(`Generated ${brands.length} DESIGN.md files in ${outRoot}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  await generateLegacyDesignSystems();
}
