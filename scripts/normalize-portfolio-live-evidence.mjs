#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const rawPath = process.argv[2] || "/tmp/csc-portfolio-source-data.json";
const raw = JSON.parse(await fs.readFile(rawPath, "utf8"));
const capturedAt = "2026-07-21";

const statusBySlug = {
  "level-nine-sports": "redirect-successor",
  "western-bikeworks": "redirect-successor",
  trisports: "redirect-successor"
};

const observations = {
  backcountry: [
    "Wide black-and-white commerce shell with a serif wordmark and activity-first navigation.",
    "Editorial outdoor photography supplies nearly all emotional color; promotional rust is used as a bounded campaign band.",
    "Expert Help and Summit Club+ are persistent service and loyalty proof points."
  ],
  "competitive-cyclist": [
    "Dense specialist navigation is paired with a restrained white shell and red promotional bands.",
    "The current Ride Like a Pro campaign uses oversized typographic composition, cycling photography, black, white, and fluorescent yellow.",
    "Category language is pursuit- and component-specific rather than general sporting-goods language."
  ],
  "bike-tires-direct": [
    "The current storefront is intentionally dense: utility header, left category rail, central promotion, and daily-special commerce block.",
    "Navy, red, white, and gold organize service information, promotions, and direct-response actions.",
    "Marketing graphics combine embedded offer typography with real cycling products and race-oriented photography."
  ],
  "home-consignment-center": [
    "Full-width showroom imagery carries the brand while the navigation and identity sit in a light overlay.",
    "Red store-finding and consignment actions are the strongest persistent graphic signal.",
    "The current value proposition combines treasure hunting, local showroom discovery, and frictionless consignment."
  ],
  "home-designs": [
    "The CSC Home Designs evidence resolves to a service-led Cabinetry Unlimited operating surface rather than a general ecommerce store.",
    "Maroon, warm gold, white, and large cabinetry photography create a craft and consultation-led system.",
    "Primary marketing actions should lead to consultation, showroom, project proof, or service-area confirmation."
  ],
  "level-nine-sports": [
    "The Level Nine Sports domain currently redirects to Backcountry Outlet.",
    "The redirect is current operational evidence, not permission to treat Backcountry Outlet creative as Level Nine identity material.",
    "Use archived first-party Level Nine material only as historical reference and never imply a current standalone storefront."
  ],
  motosport: [
    "MotoSport uses a dense powersports commerce shell with a large red wordmark, blue fitment action, and black category navigation.",
    "Current campaign art is high-energy and typographic, with rider cutouts, motion photography, and embedded sale lettering.",
    "Vehicle selection, OEM compatibility, riding discipline, and safety context must remain more prominent than generic lifestyle messaging."
  ],
  "seattle-coffee-gear": [
    "A bright white commerce shell, red identity, and product-first merchandising make the system technical but approachable.",
    "Machine studio imagery, expert review content, and coffee education are equal parts of the current brand expression.",
    "Marketing should connect equipment proof to a credible brewing outcome rather than luxury language alone."
  ],
  "steep-and-cheap": [
    "The current brand is explicitly powered by Backcountry but maintains its own narrow wordmark and green deal signal.",
    "Campaign imagery is playful, collage-like, youthful, and offer-forward, with orange bands and irregular white photo frames.",
    "Discount messaging is central, but products and activities must remain identifiable and the offer must remain a removable runtime layer."
  ],
  "sur-la-table": [
    "The current homepage combines a handwritten identity with editorial serif headlines and restrained sans-serif commerce labels.",
    "Chef-led storytelling, colorful kitchen environments, classes, and product merchandising form one connected brand world.",
    "Warm culinary photography and ingredient color should lead; sales UI remains clean, white, and secondary."
  ],
  "western-bikeworks": [
    "The Western Bikeworks domain currently redirects to BikeTiresDirect and displays a migration notice.",
    "The migration notice is current operational evidence, not Western Bikeworks visual identity material.",
    "Preserve the standalone Western Bikeworks system as historical reference only and never imply active independent operations."
  ],
  trisports: [
    "The TriSports domain currently redirects to a Competitive Cyclist triathlon collection.",
    "The successor collection confirms triathlon category continuity but does not establish current TriSports identity rules.",
    "Preserve the standalone TriSports system as historical reference only and never imply active independent operations."
  ]
};

const manualMedia = {
  "level-nine-sports": [
    ["https://web.archive.org/web/20241106033639im_/https://levelninesports.bloomreach.io/delivery/resources/content/gallery/channel-templates/level-nine/assets/home-hero/dbf1_hero_desktop.jpg", "Historical Level Nine seasonal hero"],
    ["https://web.archive.org/web/20241106033739im_/https://levelninesports.bloomreach.io/delivery/resources/content/gallery/channel-templates/level-nine/assets/home-hero/october24_2025_newarrivals_hero_desktop.jpg", "Historical Level Nine new arrivals hero"],
    ["https://web.archive.org/web/20241106033651im_/https://levelninesports.bloomreach.io/delivery/resources/content/gallery/channel-templates/level-nine/assets/home-hero/rockshox_hero_desktop.jpg", "Historical Level Nine bike campaign"],
    ["https://web.archive.org/web/20241106033655im_/https://levelninesports.bloomreach.io/delivery/resources/content/gallery/channel-templates/level-nine/assets/home-page/cat-home-cyber-acc.jpg", "Historical Level Nine accessories category"],
    ["https://web.archive.org/web/20241106033640im_/https://levelninesports.bloomreach.io/delivery/resources/content/gallery/channel-templates/level-nine/assets/home-page/cat-home-cyber-jacket.jpg", "Historical Level Nine outerwear category"],
    ["https://web.archive.org/web/20240715125603im_/https://levelninesports.bloomreach.io/delivery/resources/content/gallery/channel-templates/level-nine/assets/home-page/home-summer-rentals-block-large.jpg", "Historical Level Nine summer rentals campaign"]
  ],
  "home-designs": [
    ["https://lirp.cdn-website.com/9319fdb5/dms3rep/multi/opt/IMG_1292-252b6b7c-1920w.jpg", "Cabinetry project environment"],
    ["https://lirp.cdn-website.com/9319fdb5/dms3rep/multi/opt/996710c8-4f6e-46b1-ae26-b8e87744597e-1920w.png", "Cabinetry and countertop project"],
    ["https://lirp.cdn-website.com/9319fdb5/dms3rep/multi/opt/1751473463869_WwvSPUsuo-1920w.png", "Interior cabinetry reference"],
    ["https://lirp.cdn-website.com/9319fdb5/dms3rep/multi/opt/manufacturing-facility-1920w.jpeg", "Manufacturing facility"],
    ["https://lirp.cdn-website.com/9319fdb5/dms3rep/multi/opt/building-sign-7d868e23-1920w.png", "Operating location exterior"],
    ["https://lirp.cdn-website.com/9319fdb5/dms3rep/multi/opt/83d59a16-e367-49a7-ba1c-4a0ad9e7466e-1920w.png", "Service and project reference"]
  ],
  motosport: [
    ["https://f-static.motosport.com/motographics/images/home/all_storefront/2026/260707_SummerGarage/SummerGarage_hero1_desktop.jpg", "Summer Garage campaign hero"],
    ["https://f-static.motosport.com/motographics/images/home/all_storefront/2026/260101_homepageupdates/NewGear_27Oneal_desktop.jpg", "O'Neal riding gear campaign"],
    ["https://f-static.motosport.com/motographics/images/home/all_storefront/2026/260101_homepageupdates/NewGear_26Fox1_desktop.jpg", "Fox Racing gear campaign"],
    ["https://f-static.motosport.com/motographics/images/home/all_storefront/2026/260101_homepageupdates/NewGear_AStarsL_desktop.jpg", "Alpinestars gear campaign"],
    ["https://f-static.motosport.com/motographics/images/home/all_storefront/2026/260101_homepageupdates/NewGear_TLDL_desktop.jpg", "Troy Lee Designs gear campaign"],
    ["https://f-static.motosport.com/motographics/images/home/all_storefront/2026/260101_homepageupdates/NewGear_26RDRCO_desktop.jpg", "RDRCO riding gear campaign"]
  ],
  "western-bikeworks": [
    ["https://web.archive.org/web/20250814005626im_/https://www.westernbikeworks.com/promoimages/Image50871.jpg", "Historical Western Bikeworks bicycle sale banner"],
    ["https://web.archive.org/web/20250814005626im_/https://www.westernbikeworks.com/promoimages/Image50870.jpg", "Historical Western Bikeworks mountain-bike tire campaign"],
    ["https://web.archive.org/web/20250814005626im_/https://www.westernbikeworks.com/promoimages/Image50872.jpg", "Historical Western Bikeworks apparel promotion"],
    ["https://web.archive.org/web/20250814005626im_/https://www.westernbikeworks.com/promoimages/image50873.jpg", "Historical Western Bikeworks wheel systems campaign"],
    ["https://web.archive.org/web/20250814005626im_/https://www.westernbikeworks.com/promoimages/image50874.jpg", "Historical Western Bikeworks electronics campaign"]
  ],
  trisports: [
    ["https://web.archive.org/web/20260220074004im_/https://www.trisports.com/promoimages/Image52944.jpg", "Historical mid-month cycling markdown campaign"],
    ["https://web.archive.org/web/20260217134140im_/https://www.trisports.com/promoimages/Image52956.jpg", "Historical 3D and adaptive saddle feature"],
    ["https://web.archive.org/web/20260220074004im_/https://www.trisports.com/promoimages/Image52960.jpg", "Historical bicycle maintenance tools feature"],
    ["https://web.archive.org/web/20260223101442im_/https://www.trisports.com/promoimages/Image52981.jpg", "Historical Sidi cycling shoe launch"],
    ["https://web.archive.org/web/20260202171003im_/https://www.trisports.com/promoimages/Image52817.jpg", "Historical Schwalbe premium tire sale"],
    ["https://web.archive.org/web/20260202171002im_/https://www.trisports.com/promoimages/Image52824.jpg", "Historical Castelli cycling apparel sale"]
  ]
};

const manualLogos = {
  backcountry: "https://content.backcountry.com/images/brand/bcs_logo.png",
  "competitive-cyclist": "https://content.competitivecyclist.com/images/brand/competitivecyclist_logo.png",
  "bike-tires-direct": "https://www.biketiresdirect.com/images/btd-logo.svg",
  "home-designs": "https://lirp.cdn-website.com/9319fdb5/dms3rep/multi/opt/1751473490419_OwWtmA3MV-1920w.png",
  "level-nine-sports": "https://web.archive.org/web/20241106033729im_/https://levelninesports.bloomreach.io/delivery/resources/content/gallery/channel-templates/level-nine/assets/icon-192x192.png",
  motosport: "https://f-static.motosport.com/motographics/images/motosport.logo.svg",
  "seattle-coffee-gear": "https://www.seattlecoffeegear.com/cdn/shop/files/SCG_LOGO_Primary_Red_Black.svg?v=1702922034&width=600",
  "steep-and-cheap": "https://content.steepandcheap.com/images/brand/steepcheap_logo.png",
  "sur-la-table": "https://www.surlatable.com/on/demandware.static/Sites-SLT-Site/-/default/dwb56ef7dd/images/SLT_Logo.png",
  "western-bikeworks": "https://web.archive.org/web/20250814005626im_/https://www.westernbikeworks.com/images/wbw-logo-white.svg",
  trisports: "https://web.archive.org/web/20260521164505im_/https://static.trisports.com/images/trisports_logo_flat.svg"
};

const historicalSocial = {
  "western-bikeworks": [
    { url: "https://www.youtube.com/westernbikeworks", label: "Historical first-party YouTube link" },
    { url: "https://www.instagram.com/westernbikeworks", label: "Historical first-party Instagram link" },
    { url: "https://www.facebook.com/pages/Western-Bikeworks/157762564281790", label: "Historical first-party Facebook link" }
  ],
  trisports: [
    { url: "https://www.instagram.com/trisportscom", label: "Historical first-party Instagram link" },
    { url: "https://www.facebook.com/trisports", label: "Historical first-party Facebook link" }
  ]
};

const sanitize = (value) => String(value || "").replace(/\s+/g, " ").trim();
const isUsefulImage = (image) => {
  const src = String(image?.src || "");
  const alt = String(image?.alt || "");
  if (!/^https?:/i.test(src) || src.startsWith("data:")) return false;
  if (/cookielaw|facebook-3|insta-3|strava-3|powered_by|footer-logo/i.test(src)) return false;
  if (/logo/i.test(alt) && !/campaign|new gear/i.test(alt)) return false;
  return Number(image?.w || 0) >= 500 && Number(image?.h || 0) >= 200;
};

const brands = {};
for (const item of raw) {
  const historicalRedirect = statusBySlug[item.slug] === "redirect-successor";
  const manual = manualMedia[item.slug] || [];
  const extracted = historicalRedirect ? [] : (item.images || []).filter(isUsefulImage).slice(0, 6).map((image) => [image.src, sanitize(image.alt) || "Current first-party marketing image"]);
  const marketingImages = (manual.length ? manual : extracted).map(([url, alt], index) => ({
    id: `marketing.${historicalRedirect ? "historical" : "current"}.${String(index + 1).padStart(2, "0")}`,
    url,
    alt,
    roles: ["marketing-reference", "image-direction", index === 0 ? "hero-reference" : "campaign-reference"]
  }));
  const social = historicalRedirect ? (historicalSocial[item.slug] || []) : (item.social || []).filter((entry) => /^https?:/i.test(entry.href)).map((entry) => ({
    url: entry.href,
    label: sanitize(entry.text) || new URL(entry.href).hostname.replace(/^www\./, "")
  }));
  brands[item.slug] = {
    requestedUrl: item.requested,
    finalUrl: item.final,
    title: item.title,
    capturedAt,
    viewport: { width: 1280, height: 720 },
    screenshot: `research/${item.slug}/audit-${capturedAt}/01-home-desktop.png`,
    historicalScreenshot: historicalRedirect && item.slug !== "level-nine-sports" ? `research/${item.slug}/audit-${capturedAt}/02-historical-home-desktop.png` : null,
    surfaceStatus: statusBySlug[item.slug] || "current",
    observations: observations[item.slug] || [],
    logoUrl: manualLogos[item.slug] || null,
    logoVariant: item.slug === "level-nine-sports" ? "compact-icon" : "primary-lockup",
    social,
    marketingImages,
    metaAdLibraryQuery: historicalRedirect ? null : `https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=US&q=${encodeURIComponent(item.title.split(" - ")[0].split(" | ")[0])}&search_type=keyword_unordered`
  };
}

const output = {
  schemaVersion: "1.0.0",
  capturedAt,
  method: "Rendered first-party homepage inspection in the in-app browser, DOM-linked source extraction, and explicit redirect verification.",
  limitations: [
    "Public social profiles and ad libraries are volatile and may require authentication or regional consent.",
    "A profile link or ad-library query does not establish performance, spend, targeting, ownership of every visible post, or current campaign priority.",
    "Downloaded first-party media is reference evidence only until rights are independently confirmed."
  ],
  brands
};

await fs.writeFile(path.join(root, "research/portfolio-live-evidence.json"), JSON.stringify(output, null, 2) + "\n");
console.log(`Wrote research/portfolio-live-evidence.json for ${Object.keys(brands).length} brands.`);
