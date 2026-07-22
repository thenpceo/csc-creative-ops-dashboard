#!/usr/bin/env node

import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { brands } from "./generate-design-systems.mjs";

const root = process.cwd();
const packageRoot = path.join(root, "brand-packages");
const buildDate = "2026-07-21";
const profiles = JSON.parse(await fs.readFile(path.join(root, "research/portfolio-brand-profiles.json"), "utf8"));
const audit = JSON.parse(await fs.readFile(path.join(root, "research/brand-site-audit.json"), "utf8"));
const liveEvidence = JSON.parse(await fs.readFile(path.join(root, "research/portfolio-live-evidence.json"), "utf8"));
const auditBySlug = new Map(audit.map((item) => [item.slug, item]));
const liveBySlug = new Map(Object.entries(liveEvidence.brands));
const capabilities = ["interactive", "static", "imagery", "commerce", "marketing", "motion", "generative-image", "generative-video", "spatial", "sequential"];

const formatJson = (value) => JSON.stringify(value, null, 2) + "\n";
const sha256 = (buffer) => createHash("sha256").update(buffer).digest("hex");
const words = (value) => value.split("-").map((part) => part.slice(0, 1).toUpperCase() + part.slice(1)).join(" ");
const slugify = (value) => String(value || "reference").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 48) || "reference";
const extensionFor = (url, contentType = "") => {
  let extension = "";
  try { extension = path.extname(new URL(url).pathname).toLowerCase(); } catch {}
  if ([".jpg", ".jpeg", ".png", ".webp", ".avif", ".svg", ".gif"].includes(extension)) return extension;
  if (contentType.includes("svg")) return ".svg";
  if (contentType.includes("png")) return ".png";
  if (contentType.includes("webp")) return ".webp";
  if (contentType.includes("avif")) return ".avif";
  if (contentType.includes("gif")) return ".gif";
  return ".jpg";
};
const pngDimensions = (buffer) => buffer.length >= 24 && buffer.subarray(1, 4).toString("ascii") === "PNG"
  ? { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) }
  : null;
const makeRule = (id, authority, confidence, appliesTo, statement, sourceIds = []) => ({
  id, authority, lifecycle: "active", confidence, appliesTo, statement, sourceIds
});
const makeRecipe = (id, appliesTo, inputs, structure, ruleRefs, authority = "preferred") => ({
  id, authority, appliesTo, inputs, structure, ruleRefs
});

function tokensFor(brand) {
  const color = {};
  for (const [name, value] of Object.entries(brand.colors)) {
    color[name.replaceAll("-", ".")] = { value, type: "color", confidence: "verified" };
  }
  const typography = {};
  for (const [name, values] of Object.entries(brand.typography)) {
    typography[name.replaceAll("-", ".")] = {
      fontFamily: values[0],
      fontSize: values[1],
      fontWeight: values[2],
      lineHeight: values[3],
      letterSpacing: values[4],
      confidence: "verified"
    };
  }
  const spacing = {};
  for (const [name, value] of Object.entries(brand.spacing)) {
    spacing[name] = { value: Number.parseFloat(value), unit: "px", type: "dimension", confidence: "inferred" };
  }
  const radius = {};
  for (const [name, value] of Object.entries(brand.rounded)) {
    radius[name] = { value: Number.parseFloat(value), unit: "px", type: "dimension", confidence: "verified" };
  }
  return {
    $schema: "../../brand-system-spec/v1/schemas/tokens.schema.json",
    schemaVersion: "1.0.0",
    color,
    typography,
    spacing,
    shape: { radius, defaultRadiusRef: "shape.radius.md" },
    layout: {
      contentMax: { value: 1280, unit: "px", confidence: "inferred" },
      pageMax: { value: 1440, unit: "px", confidence: "inferred" },
      columns: { expanded: 12, medium: 8, compact: 4 },
      gutters: { expanded: 24, medium: 20, compact: 16, unit: "px" }
    },
    interaction: {
      targetMinimum: { value: 44, unit: "px" },
      focusWidth: { value: 2, unit: "px" }
    },
    time: {
      micro: { value: 160, unit: "ms" },
      short: { value: 240, unit: "ms" },
      standard: { value: 360, unit: "ms" },
      feature: { value: 600, unit: "ms" }
    }
  };
}

function coreRules(brand, profile, hasLogo) {
  const logoSources = hasLogo ? ["asset.logo.primary"] : ["source.site.home"];
  return [
    makeRule("logo.official-artwork-only", "required", hasLogo ? "verified" : "inferred", ["all"], "Use only verified official identity artwork. Preserve proportions and internal spacing. Never redraw, synthesize, distort, outline, bevel, shadow, pattern-fill, or deform the mark.", logoSources),
    makeRule("logo.authorization", "required", "verified", ["all"], "Publicly observable identity artwork is reference evidence. Production use requires brand authorization and an approved source file.", ["source.site.home"]),
    makeRule("color.primary-role", "required", "verified", ["all"], "Use " + brand.colors.primary + " as the primary brand or action anchor in the role documented here. Seasonal imagery does not redefine the durable palette.", ["source.audit.home.desktop"]),
    makeRule("color.support-restraint", "preferred", "inferred", ["all"], "Use " + brand.colors.secondary + " and " + brand.colors.accent + " as bounded supporting signals. Keep one dominant action color in a decision area.", ["source.audit.home.desktop"]),
    makeRule("typography.role-separation", "required", "verified", ["all"], brand.typeNotes, ["source.audit.home.desktop"]),
    makeRule("typography.readability", "required", "inferred", ["all"], "Do not use spaced uppercase or display styling for paragraphs, specifications, instructions, prices, or form content. Preserve readable size, line length, contrast, and hold time.", []),
    makeRule("shape.character", "preferred", "verified", ["all"], brand.shapes, ["source.audit.home.desktop"]),
    makeRule("layout.character", "preferred", "verified", ["all"], brand.layout, ["source.audit.home.desktop"]),
    makeRule("depth.character", "preferred", "verified", ["all"], brand.elevation, ["source.audit.home.desktop"]),
    makeRule("action.one-primary", "required", "inferred", ["all"], "Use no more than one visually dominant action in a decision area. Secondary actions remain visibly subordinate and unambiguous.", ["source.audit.home.desktop"]),
    makeRule("action.concrete-copy", "preferred", "inferred", ["all"], "Use short, concrete actions connected to " + profile.decision + ". Avoid generic prestige or engagement language.", ["source.site.home"]),
    makeRule("voice.core", "required", "inferred", ["all"], profile.voice, ["source.site.home", "source.site.evidence"]),
    makeRule("voice.specificity", "preferred", "inferred", ["all"], "Prefer specific language about " + profile.decision + ". Explain why the product, service, or story matters.", ["source.site.home"]),
    makeRule("claims.runtime-truth", "required", "inferred", ["all"], "Prices, offers, inventory, dates, delivery, eligibility, availability, ratings, popularity, results, and urgency are runtime facts with an authoritative source and expiration.", []),
    makeRule("product.truth", "required", "inferred", ["all"], "Represent " + profile.product + " using current authorized data. Preserve countable features, dimensions, materials, finish, compatibility, condition, and safety context.", ["source.site.home"]),
    makeRule("rights.record", "required", "inferred", ["all"], "Every external asset record includes source, capture date, rights status, allowed uses, model-upload permission, redistribution permission, and required review.", []),
    makeRule("people.permission", "required", "inferred", ["imagery", "motion", "marketing"], "Require likeness, creator, location, and music permissions appropriate to the intended media, channels, term, geography, and edit scope.", []),
    makeRule("accessibility.contrast", "required", "inferred", ["all"], "Provide readable contrast for text, controls, captions, and information graphics. Do not place critical copy over uncontrolled image detail.", []),
    makeRule("accessibility.non-color", "required", "inferred", ["all"], "Do not rely on color alone for selection, errors, discounts, fitment, inventory, progress, or status.", []),
    makeRule("accessibility.motion", "required", "inferred", ["interactive", "motion"], "Provide reduced-motion behavior and remove nonessential parallax, auto-travel, flashes, and looping while preserving message and hierarchy.", []),
    makeRule("history.scope", profile.historical ? "required" : "permitted", profile.historical ? "verified" : "inferred", ["all"], profile.historical ? "This package preserves a historical standalone identity. Never imply that the legacy storefront, inventory, services, prices, locations, or operations are currently active without a current authoritative source." : "Historical references may explain durable visual behavior but cannot establish current offers, operations, inventory, or campaign direction.", ["source.site.evidence"])
  ];
}

function coreRecipes(profile) {
  return [
    makeRecipe("hero.editorial", ["interactive", "static", "motion"], ["approvedEnvironmentOrProductMedia", "headline", "optionalSupport", "action"], ["image story", "specific headline", "one proof point", "one action"], ["layout.character", "voice.core", "action.one-primary", "accessibility.contrast"]),
    makeRecipe("hero.product", ["interactive", "static", "commerce"], ["verifiedProduct", "decisionContext", "currentCommerceFacts", "action"], ["verified product", "decision context", "current facts", "action"], ["product.truth", "claims.runtime-truth", "action.one-primary"]),
    makeRecipe("feature.expert-proof", ["interactive", "static", "motion", "marketing"], ["verifiedExpertOrService", "specificQuestion", "evidence", "nextStep"], ["real question", "specific expertise", "proof", "next step"], ["voice.specificity", "people.permission"]),
    makeRecipe("feature.material-detail", ["imagery", "static", "motion"], ["verifiedProduct", "specificMaterialOrFeature", "macroMedia", "explanation"], ["material detail", "what it is", "why it matters", "product context"], ["product.truth", "voice.specificity"]),
    makeRecipe("feature.environment", ["imagery", "motion", "marketing"], ["approvedEnvironment", "productOrService", "realUseCase", "action"], ["real place", "real use", "specific proof", "action"], ["product.truth", "voice.core"]),
    makeRecipe("comparison.decision", ["interactive", "static", "commerce"], ["verifiedOptions", "decisionCriteria", "currentFacts"], ["decision question", "comparable options", "shared criteria", "differences", "action"], ["product.truth", "claims.runtime-truth", "accessibility.non-color"]),
    makeRecipe("guide.educational", ["interactive", "static", "sequential", "marketing"], ["audienceQuestion", "verifiedSteps", "productOrServiceContext", "nextStep"], ["question", "ordered guidance", "proof or example", "next step"], ["voice.core", "voice.specificity"]),
    makeRecipe("promo.current", ["interactive", "static", "marketing"], ["currentOffer", "offerSource", "expiration", "verifiedProducts", "action"], ["offer", "scope", "verified products", "terms", "action"], ["claims.runtime-truth", "product.truth", "action.one-primary"], "permitted"),
    makeRecipe("testimonial.permissioned", ["interactive", "static", "motion", "marketing"], ["verifiedQuote", "speaker", "permission", "context"], ["short quote", "attribution", "relevant context"], ["people.permission", "rights.record"], "permitted"),
    makeRecipe("title.brand", ["static", "motion", "sequential"], ["title", "optionalKicker", "approvedBackground"], ["optional kicker", "title", "readable hold"], ["typography.role-separation", "color.primary-role", "accessibility.contrast"]),
    makeRecipe("end-frame.action", ["static", "motion", "sequential", "marketing"], ["officialIdentity", "singleAction", "verifiedDestination"], ["identity", "single action", "destination when required"], ["logo.official-artwork-only", "action.one-primary", "action.concrete-copy"]),
    makeRecipe("co-brand.partner", ["all"], ["approvedBrandAssets", "approvedPartnerAssets", "relationship", "clearSpaceRules"], ["neutral relationship field", "preserved identities", "explicit relationship"], ["logo.official-artwork-only", "rights.record"], "permitted")
  ];
}

function interactiveModule(profile) {
  return {
    tokens: { primaryDecision: profile.decision, responsiveColumns: { expanded: 12, medium: 8, compact: 4 } },
    rules: [
      makeRule("interactive.navigation", "required", "verified", ["interactive"], "Expose categories and decisions supporting " + profile.decision + ". Do not hide the primary path behind icon-only navigation.", ["source.audit.home.desktop"]),
      makeRule("interactive.decision-order", "required", "inferred", ["interactive"], "Order content from identity and context through " + profile.decision + ", current facts, and then the primary action.", ["source.site.home"]),
      makeRule("interactive.state-feedback", "required", "inferred", ["interactive"], "Give focus, hover, selected, loading, success, error, unavailable, and disabled states explicit visual and semantic treatment.", []),
      makeRule("interactive.overlays", "required", "inferred", ["interactive"], "Consent, support, promotion, and chat overlays must not cover identity, price, fitment, options, form errors, or the primary action.", [])
    ],
    recipes: [
      makeRecipe("interactive.collection", ["interactive"], ["category", "filters", "sort", "verifiedProducts"], ["context", "title", "filter and sort", "product grid", "support"], ["interactive.navigation", "product.truth"]),
      makeRecipe("interactive.product-detail", ["interactive", "commerce"], ["gallery", "identity", "decisionFacts", "currentFacts", "action"], ["gallery", "identity", "decision facts", "current facts", "action", "extended proof"], ["interactive.decision-order", "claims.runtime-truth"]),
      makeRecipe("interactive.guide", ["interactive"], ["question", "steps", "recommendation", "supportAction"], ["question", "bounded steps", "recommendation rationale", "next action"], ["interactive.state-feedback", "voice.specificity"]),
      makeRecipe("interactive.service-entry", ["interactive"], ["service", "scope", "proof", "availability", "action"], ["service value", "scope", "proof", "current availability", "action"], ["claims.runtime-truth", "voice.specificity"])
    ],
    evaluation: [
      { id: "interactive.path", question: "Can a user identify the primary category, decision, and next action without guessing?" },
      { id: "interactive.states", question: "Are interaction, loading, error, unavailable, and success states explicit and accessible?" },
      { id: "interactive.compact", question: "Does compact layout preserve decision order and touch targets?" }
    ]
  };
}

function staticModule(hasLogo) {
  return {
    tokens: { formats: { square: "1:1", portrait: "4:5", vertical: "9:16", landscape: "1.91:1", printCard: "3.5:2" }, safeAreaPercent: 6 },
    rules: [
      makeRule("static.one-idea", "required", "inferred", ["static"], "Use one dominant visual idea, one message hierarchy, and no more than one primary action.", ["source.audit.home.desktop"]),
      makeRule("static.recompose", "required", "inferred", ["static"], "Recompose imagery, title, proof, and action for every ratio. Do not center-crop one master and assume the hierarchy survives.", []),
      makeRule("static.logo-restraint", "preferred", "inferred", ["static"], "Use one deliberate official identity instance. Do not repeat the logo as a watermark pattern or substitute logo size for a clear message.", hasLogo ? ["asset.logo.primary"] : ["source.site.home"]),
      makeRule("static.production-inputs", "required", "inferred", ["static"], "Bleed, trim, resolution, color profile, stock, finishing, legal, and export requirements are destination inputs verified before production.", [])
    ],
    recipes: [
      makeRecipe("static.editorial-ad", ["static"], ["approvedImage", "headline", "proof", "action", "officialIdentity"], ["dominant image", "protected copy", "specific proof", "single action", "restrained identity"], ["static.one-idea", "accessibility.contrast"]),
      makeRecipe("static.product-feature", ["static", "commerce"], ["verifiedProduct", "specificBenefit", "currentFact", "action"], ["product", "specific benefit", "current fact", "action"], ["product.truth", "static.recompose"]),
      makeRecipe("static.guide-card", ["static"], ["question", "threeOrFewerSteps", "illustrativeMedia", "nextStep"], ["question", "ordered steps", "example", "next step"], ["voice.specificity", "accessibility.contrast"]),
      makeRecipe("static.business-card", ["static"], ["officialIdentity", "name", "role", "verifiedContact", "productionSpecs"], ["identity field", "name and role", "verified contact", "safe margins"], ["logo.official-artwork-only", "static.production-inputs"], "permitted")
    ],
    evaluation: [
      { id: "static.glance", question: "Is one specific idea understandable in under two seconds at intended size?" },
      { id: "static.ratio", question: "Was the composition intentionally rebuilt for the destination ratio?" },
      { id: "static.output", question: "Are physical or digital production specifications verified?" }
    ]
  };
}

function imageryModule(profile) {
  return {
    tokens: { environment: profile.environment, camera: profile.camera, lighting: profile.light, palette: profile.palette, people: profile.people },
    rules: [
      makeRule("imagery.environment", "preferred", "inferred", ["imagery"], "Use " + profile.environment + ".", ["source.site.home"]),
      makeRule("imagery.camera", "preferred", "inferred", ["imagery"], "Favor " + profile.camera + ".", ["source.site.home"]),
      makeRule("imagery.light", "preferred", "inferred", ["imagery"], "Use " + profile.light + ".", ["source.audit.home.desktop"]),
      makeRule("imagery.people", "preferred", "inferred", ["imagery"], "When people appear, show " + profile.people + ".", ["source.site.home"]),
      makeRule("imagery.product-lock", "required", "inferred", ["imagery"], "Lock geometry, material, countable features, condition, fit, scale, and safety context across every image and crop.", ["source.site.home"]),
      makeRule("imagery.avoid", "prohibited", "inferred", ["imagery"], "Avoid " + profile.anti.join(", ") + ".", [])
    ],
    recipes: [
      makeRecipe("imagery.environment-wide", ["imagery"], ["realUseCase", "environment", "heroSubject", "copySafeRegion"], ["real environment", "one anchor", "natural perspective", "copy-safe region"], ["imagery.environment", "imagery.camera", "imagery.light"]),
      makeRecipe("imagery.product-studio", ["imagery", "commerce"], ["authorizedProduct", "requiredAngle", "background", "scaleReference"], ["whole product", "normal perspective", "controlled light", "honest contact"], ["imagery.product-lock", "product.truth"]),
      makeRecipe("imagery.product-context", ["imagery", "commerce"], ["authorizedProduct", "realUseCase", "environment", "scaleCues"], ["unchanged product", "real use", "believable scale", "matched contact and light"], ["imagery.environment", "imagery.product-lock"]),
      makeRecipe("imagery.people-in-use", ["imagery", "marketing"], ["approvedPerson", "realTask", "correctProductOrService", "permission"], ["human context", "real task", "specific proof", "natural behavior"], ["imagery.people", "people.permission"]),
      makeRecipe("imagery.detail-proof", ["imagery", "commerce"], ["verifiedDetail", "material", "functionalContext"], ["oriented detail", "material truth", "functional context", "scale cue"], ["imagery.product-lock", "voice.specificity"])
    ],
    evaluation: [
      { id: "imagery.credible", question: "Are environment, technique, weather, materials, product scale, and human behavior credible?" },
      { id: "imagery.distinct", question: "Does the image reflect this brand rather than category stock photography?" },
      { id: "imagery.truth", question: "Does every represented product or service preserve verified truth?" }
    ]
  };
}

function commerceModule(profile) {
  return {
    tokens: { decisionCriteria: profile.decision, productType: profile.product },
    rules: [
      makeRule("commerce.decision-facts", "required", "inferred", ["commerce"], "Expose the facts needed for " + profile.decision + " before or adjacent to the primary action.", ["source.site.home"]),
      makeRule("commerce.current-data", "required", "inferred", ["commerce"], "Price, discount, inventory, options, compatibility, delivery, location, service availability, reviews, and eligibility come from current authoritative data.", []),
      makeRule("commerce.product-media", "required", "inferred", ["commerce"], "Use authorized product media as the factual anchor. Generated lifestyle interpretation never replaces the primary truth image.", ["source.site.home"]),
      makeRule("commerce.badges", "required", "inferred", ["commerce"], "Badges communicate one sourced state and must not overlap essential product detail or depend on color alone.", []),
      makeRule("commerce.comparison", "preferred", "inferred", ["commerce"], "Compare like with like using the same verified criteria and units. Expose unknown values instead of filling them in.", []),
      makeRule("commerce.action", "required", "inferred", ["commerce"], "The action label describes the real next step, such as selecting, confirming fit, finding a store, booking, consigning, or purchasing.", ["source.site.home"])
    ],
    recipes: [
      makeRecipe("commerce.product-card", ["commerce", "interactive"], ["authorizedImage", "productIdentity", "decisionSummary", "currentFacts", "state"], ["image", "identity", "decision summary", "current facts", "state"], ["commerce.current-data", "commerce.product-media"]),
      makeRecipe("commerce.decision-panel", ["commerce", "interactive"], ["identity", "decisionFacts", "options", "currentFacts", "action"], ["identity", "decision facts", "options", "current facts", "action"], ["commerce.decision-facts", "commerce.action"]),
      makeRecipe("commerce.comparison-table", ["commerce", "interactive", "static"], ["options", "sharedCriteria", "units", "unknownStates"], ["shared question", "options", "criteria", "differences", "actions"], ["commerce.comparison", "accessibility.non-color"]),
      makeRecipe("commerce.assortment", ["commerce", "static"], ["verifiedProducts", "collectionIdea", "currentFacts"], ["collection idea", "two to four verified products", "current facts", "action"], ["product.truth", "claims.runtime-truth"], "permitted"),
      makeRecipe("commerce.service-support", ["commerce", "interactive"], ["service", "scope", "currentAvailability", "action"], ["service", "specific scope", "availability", "action"], ["commerce.current-data", "voice.specificity"])
    ],
    evaluation: [
      { id: "commerce.decide", question: "Can a customer evaluate " + profile.decision + " without hunting?" },
      { id: "commerce.current", question: "Are commerce and operational facts sourced, current, and explicitly unavailable when unknown?" },
      { id: "commerce.truth", question: "Do imagery, labels, options, and actions represent the same verified item or service?" }
    ]
  };
}

function marketingModule(profile) {
  return {
    tokens: {
      objectives: ["awareness", "consideration", "conversion", "retention", "community"],
      formats: { square: "1:1", portrait: "4:5", vertical: "9:16", landscape: "16:9", pin: "2:3", emailHero: "2:1" },
      families: profile.marketing
    },
    rules: [
      makeRule("marketing.brief", "required", "inferred", ["marketing"], "Supply objective, audience, proposition, product or service, destination, format, required facts, rights, action, and expiration before generation.", []),
      makeRule("marketing.one-message", "required", "inferred", ["marketing"], "Use one primary message and one primary action. Supporting proof clarifies rather than competes.", ["source.audit.home.desktop"]),
      makeRule("marketing.layers", "required", "inferred", ["marketing"], "Keep durable identity, campaign concept, verified product or service, current offer, and channel adaptation as separable layers.", []),
      makeRule("marketing.current-facts", "required", "inferred", ["marketing"], "Source and expire offers, prices, dates, inventory, eligibility, locations, results, popularity, and urgency at runtime.", []),
      makeRule("marketing.channel-adaptation", "preferred", "inferred", ["marketing"], "Adapt crop, pacing, caption density, safe areas, and interaction cues to the destination while preserving identity, voice, and truth.", []),
      makeRule("marketing.rights", "required", "inferred", ["marketing"], "Record origin, creator, permission, allowed edits and channels, credit, term, geography, music, talent, property, and revocation state.", []),
      makeRule("marketing.variants", "required", "inferred", ["marketing"], "Name hook, visual, proof, action, and format axes. Change one or two axes per variant while locking rights, product truth, offer truth, and destination.", []),
      makeRule("marketing.no-performance-inference", "required", "inferred", ["marketing"], "Reference creative does not establish spend, targeting, return, conversion, audience response, or channel priority.", [])
    ],
    recipes: [
      makeRecipe("marketing.brand-story", ["marketing", "motion", "static"], ["brief", "approvedMedia", "specificBrandProof", "action"], ["distinctive world", "specific premise", "proof", "single invitation"], ["marketing.brief", "voice.core"]),
      makeRecipe("marketing.product-proof", ["marketing", "commerce"], ["verifiedProduct", "realUse", "specificProof", "currentFact", "action"], ["product or use hook", "specific proof", "current fact", "action"], ["marketing.current-facts", "product.truth"]),
      makeRecipe("marketing.expert-story", ["marketing", "motion", "sequential"], ["approvedExpert", "verifiedQuestion", "evidence", "captions", "action"], ["question", "expert context", "specific evidence", "useful next step"], ["people.permission", "marketing.rights"]),
      makeRecipe("marketing.guide", ["marketing", "static", "motion"], ["audienceQuestion", "verifiedGuidance", "productOrService", "action"], ["question", "three or fewer points", "example", "action"], ["voice.specificity", "marketing.one-message"]),
      makeRecipe("marketing.vertical-short", ["marketing", "motion"], ["verticalMedia", "hook", "proof", "captions", "action"], ["immediate visual", "one concise idea", "proof detail", "clean resolve"], ["marketing.channel-adaptation", "accessibility.contrast"]),
      makeRecipe("marketing.current-promotion", ["marketing", "static", "motion"], ["currentOffer", "source", "expiration", "scope", "action"], ["verified offer", "scope", "context", "terms", "action"], ["marketing.current-facts", "marketing.layers"], "permitted"),
      makeRecipe("marketing.email-site-hero", ["marketing", "interactive", "static"], ["campaignMedia", "headline", "proofOrOffer", "action", "mobileCrop"], ["editorial media", "protected title", "proof or current offer", "one action"], ["marketing.layers", "action.one-primary"]),
      makeRecipe("marketing.variant-matrix", ["marketing"], ["baseBrief", "approvedHooks", "approvedVisuals", "approvedProof", "approvedActions", "formats"], ["parent brief", "named variable axes", "variant lineage", "approval and expiration"], ["marketing.variants", "marketing.brief"])
    ],
    evaluation: [
      { id: "marketing.objective", question: "Is the asset tied to one supplied objective and audience?" },
      { id: "marketing.message", question: "Is one specific message clear immediately at intended size?" },
      { id: "marketing.brand", question: "Does it express " + profile.traits.join(", ") + " without relying on the logo alone?" },
      { id: "marketing.truth", question: "Are product, service, offer, date, destination, attribution, and claim facts sourced and current?" },
      { id: "marketing.rights", question: "Are media, people, music, creator, and location rights documented?" },
      { id: "marketing.lineage", question: "Can the output be traced to its brief, sources, variants, approvals, and expiration?" }
    ]
  };
}

function motionModule(profile, hasLogo) {
  return {
    tokens: { pacing: profile.motion, durationsMs: { micro: 160, short: 240, standard: 360, feature: 600 } },
    rules: [
      makeRule("motion.character", "preferred", "inferred", ["motion"], "Use " + profile.motion + ".", ["source.site.home"]),
      makeRule("motion.one-idea-per-beat", "required", "inferred", ["motion"], "Each beat has one readable movement idea and enough hold time for its message and proof.", []),
      makeRule("motion.identity-controlled", "required", "inferred", ["motion"], "Composite identity and essential typography as controlled crisp layers. Never generate, morph, stretch, or simulate the logo.", hasLogo ? ["asset.logo.primary"] : ["source.site.home"]),
      makeRule("motion.product-continuity", "required", "inferred", ["motion"], "Lock product geometry, material, count, scale, fit, condition, and left-right orientation across every beat.", []),
      makeRule("motion.noise-restraint", "prohibited", "inferred", ["motion"], "Avoid gratuitous bounce, glitch, strobe, liquid type, rubbery products, spinning logos, and transitions that obscure decisions.", [])
    ],
    recipes: [
      makeRecipe("motion.product-reveal", ["motion"], ["verifiedProduct", "environmentOrStudio", "oneProof", "action"], ["establish", "reveal", "proof", "resolve"], ["motion.character", "motion.product-continuity"]),
      makeRecipe("motion.expert-explainer", ["motion", "marketing"], ["approvedExpert", "question", "threeOrFewerPoints", "captions", "action"], ["question", "context", "proof points", "next step"], ["people.permission", "motion.one-idea-per-beat"]),
      makeRecipe("motion.title-system", ["motion"], ["title", "kicker", "approvedMedia"], ["media settles", "kicker", "title", "hold"], ["typography.role-separation", "motion.identity-controlled"]),
      makeRecipe("motion.end-frame", ["motion", "marketing"], ["officialIdentity", "action", "destination"], ["visual settles", "identity appears", "action holds"], ["logo.official-artwork-only", "motion.identity-controlled"])
    ],
    evaluation: [
      { id: "motion.readable", question: "Can every message, proof point, and action be read at intended speed and size?" },
      { id: "motion.character", question: "Does movement express this brand rather than a generic preset?" },
      { id: "motion.reduce", question: "Does reduced motion preserve meaning and hierarchy?" }
    ]
  };
}

function generativeImageModule(profile) {
  return {
    tokens: {
      promptOrder: ["intent", "subject", "environment", "composition", "camera", "lighting", "materials", "copy-safe region", "locks", "exclusions"],
      environment: profile.environment,
      camera: profile.camera,
      lighting: profile.light
    },
    rules: [
      makeRule("generative-image.intent-first", "required", "inferred", ["generative-image"], "State the job intent and real use case before style, camera, or aesthetic descriptors.", []),
      makeRule("generative-image.product-reference", "required", "inferred", ["generative-image"], "Use an authorized reference and explicit lock list whenever a real product, service result, location, person, or branded object must remain identifiable.", []),
      makeRule("generative-image.no-identity", "required", "inferred", ["generative-image"], "Generate clean visual plates without logos, trademarks, prices, labels, interface, or legible text. Composite approved identity and copy afterward.", []),
      makeRule("generative-image.physical-truth", "required", "inferred", ["generative-image"], "Require coherent perspective, contact, gravity, shadows, reflections, scale, anatomy, materials, and environment behavior.", []),
      makeRule("generative-image.exclusions", "required", "inferred", ["generative-image"], "Exclude " + profile.anti.join(", ") + ", fake text, invented logos, duplicated objects, warped geometry, and plastic materials.", [])
    ],
    recipes: [
      makeRecipe("generative-image.environment-wide", ["generative-image"], ["realUseCase", "heroSubject", "copySafeRegion", "aspectRatio"], [profile.environment, profile.camera, profile.light, profile.palette, "one clear anchor", "no words or logos"], ["generative-image.intent-first", "imagery.environment"]),
      makeRecipe("generative-image.product-studio", ["generative-image", "commerce"], ["authorizedProductReference", "requiredAngle", "lockList", "background"], ["exact product", "geometry and material locks", "normal perspective", "large soft source", "honest contact"], ["generative-image.product-reference", "product.truth"]),
      makeRecipe("generative-image.product-context", ["generative-image", "commerce"], ["authorizedProductReference", "realUseCase", "environment", "scaleCues", "copySafeRegion"], ["unchanged product", profile.environment, "believable scale", "matched contact and light"], ["generative-image.product-reference", "generative-image.physical-truth"]),
      makeRecipe("generative-image.people-in-use", ["generative-image", "marketing"], ["castingBrief", "realTask", "approvedProduct", "environment", "permissions"], [profile.people, "correct technique", "natural expression", "product and safety locks"], ["people.permission", "imagery.people"])
    ],
    evaluation: [
      { id: "gen-image.truth", question: "Does the plate preserve product, person, environment, and physical locks?" },
      { id: "gen-image.brand", question: "Does it express the brand-specific environment, camera, lighting, and people behavior?" },
      { id: "gen-image.clean", question: "Is it free of generated identity, fake text, and avoid-list failures?" }
    ]
  };
}

function generativeVideoModule(profile) {
  return {
    tokens: {
      promptOrder: ["story function", "stable subject", "environment", "single action", "single-axis camera", "lighting", "duration", "aspect ratio", "continuity locks", "exclusions"],
      pacing: profile.motion
    },
    rules: [
      makeRule("generative-video.one-action", "required", "inferred", ["generative-video"], "Use one stable subject, one subtle environmental or human action, and one camera move on one axis per shot.", []),
      makeRule("generative-video.continuity", "required", "inferred", ["generative-video"], "Lock subject identity, product geometry, materials, environment, weather, light direction, wardrobe, props, screen direction, and time across connected shots.", []),
      makeRule("generative-video.clean-plates", "required", "inferred", ["generative-video"], "Generate clean visual plates. Composite verified copy, captions, prices, interface, and official identity afterward.", []),
      makeRule("generative-video.camera-restraint", "preferred", "inferred", ["generative-video"], "Camera movement follows " + profile.camera + ". Reject frantic multi-axis moves.", []),
      makeRule("generative-video.exclusions", "required", "inferred", ["generative-video"], "Reject morphing products, warping architecture, sliding objects, drifting features, rubbery materials, anatomy errors, fake text, invented identity, flicker, and continuity breaks.", [])
    ],
    recipes: [
      makeRecipe("generative-video.environment-reveal", ["generative-video"], ["stableEnvironment", "heroSubject", "singleAction", "cameraAxis", "duration"], ["stable world", "single action", "one-axis reveal", "clean hold"], ["generative-video.one-action", "generative-video.continuity"]),
      makeRecipe("generative-video.product-in-use", ["generative-video", "commerce"], ["authorizedProduct", "correctUse", "approvedPersonOrHands", "environment", "locks"], ["product context", "correct use", "proof detail", "stable result"], ["generative-video.continuity", "product.truth"]),
      makeRecipe("generative-video.material-study", ["generative-video"], ["verifiedMaterial", "functionalDetail", "subtleAction", "cameraAxis"], ["oriented detail", "material action", "functional proof", "clean settle"], ["generative-video.one-action", "generative-video.exclusions"]),
      makeRecipe("generative-video.resolve-plate", ["generative-video", "marketing"], ["cleanBrandEnvironment", "copySafeRegion", "duration"], ["stable environment", "protected negative space", "controlled settle", "clean hold"], ["generative-video.clean-plates", "accessibility.contrast"])
    ],
    evaluation: [
      { id: "gen-video.continuity", question: "Are subject, product, environment, light, and screen direction stable?" },
      { id: "gen-video.camera", question: "Is camera movement singular, intentional, and readable?" },
      { id: "gen-video.clean", question: "Is the plate free of identity, text, morphing, drift, and avoid-list failures?" }
    ]
  };
}

function spatialModule(profile) {
  return {
    tokens: { materialWorld: profile.spatial, environment: profile.environment, lighting: profile.light },
    rules: [
      makeRule("spatial.material", "required", "inferred", ["spatial"], "Build dimensional work around " + profile.spatial + ". Materials respond to light, scale, wear, and contact credibly.", ["source.site.home"]),
      makeRule("spatial.scale", "required", "inferred", ["spatial"], "Use verified dimensions or declared scale references. Never alter product or environment scale merely to improve composition.", []),
      makeRule("spatial.camera", "preferred", "inferred", ["spatial"], "Use " + profile.camera + ". Preserve readable silhouettes and avoid extreme distortion.", []),
      makeRule("spatial.effects", "preferred", "inferred", ["spatial"], "Use atmospheric, particle, reflection, deformation, or lighting effects only when they clarify real material, environment, function, or story.", [])
    ],
    recipes: [
      makeRecipe("spatial.product-pedestal", ["spatial", "motion"], ["verifiedProductModel", "materialLocks", "camera", "light"], ["verified model", "material world", "controlled camera", "brand resolve"], ["spatial.material", "spatial.scale"]),
      makeRecipe("spatial.environment-layer", ["spatial", "motion"], ["environment", "depthLayers", "cameraPath", "copyPlane"], ["foreground", "subject plane", "environment", "copy plane"], ["spatial.camera", "spatial.effects"]),
      makeRecipe("spatial.material-transition", ["spatial", "motion"], ["sourceMaterial", "functionalStory", "destinationState"], ["source material", "functional change", "preserved object identity", "resolved state"], ["spatial.material", "motion.product-continuity"])
    ],
    evaluation: [
      { id: "spatial.truth", question: "Are scale, geometry, material response, contact, reflection, and light credible?" },
      { id: "spatial.purpose", question: "Does dimensional treatment clarify a real brand, product, material, or environment idea?" },
      { id: "spatial.identity", question: "Does the scene remain recognizable without relying on effects or a logo?" }
    ]
  };
}

function sequentialModule(profile) {
  return {
    tokens: {
      narrativeArc: profile.arc,
      shotFields: ["storyFunction", "duration", "visualIntent", "composition", "camera", "action", "lighting", "copy", "audioIntent", "continuityLocks", "assetSelectors", "rights", "evaluationRefs"]
    },
    rules: [
      makeRule("sequential.function", "required", "inferred", ["sequential"], "Every shot advances one named story function. Remove duplicate beauty shots that add no premise, proof, decision, emotion, or resolution.", []),
      makeRule("sequential.arc", "preferred", "inferred", ["sequential"], "Preferred arc: " + profile.arc.join("; ") + ".", ["source.site.home"]),
      makeRule("sequential.continuity-ledger", "required", "inferred", ["sequential"], "Before generating shots, lock product or service facts, environment, people, wardrobe, props, light, time, screen direction, offer, copy, audio, and rights.", []),
      makeRule("sequential.copy-exact", "required", "inferred", ["sequential"], "Storyboard copy is exact approved language with source and expiration when factual. Visual prompts do not generate the copy itself.", []),
      makeRule("sequential.handoff", "required", "inferred", ["sequential"], "Every shot exposes required assets, rights, continuity locks, duration, ratio, copy, audio intent, and evaluation references.", [])
    ],
    recipes: [
      makeRecipe("sequential.brand-story", ["sequential", "marketing"], ["brief", "verifiedFacts", "approvedAssets", "rights", "duration", "ratio"], profile.arc, ["sequential.function", "sequential.arc", "sequential.continuity-ledger"]),
      makeRecipe("sequential.product-proof", ["sequential", "commerce"], ["verifiedProduct", "realUse", "oneProof", "currentFact", "action"], ["need or use", "product", "proof detail", "result", "action"], ["product.truth", "sequential.copy-exact"]),
      makeRecipe("sequential.expert-guide", ["sequential", "marketing"], ["approvedExpert", "question", "verifiedGuidance", "example", "action"], ["question", "expert context", "guidance", "example", "next step"], ["people.permission", "sequential.function"]),
      makeRecipe("sequential.variant-board", ["sequential", "marketing"], ["parentBrief", "baseShotList", "namedVariantAxes", "lockedFacts"], ["parent reference", "variant shots", "shared proof", "variant resolve"], ["marketing.variants", "sequential.handoff"])
    ],
    evaluation: [
      { id: "sequential.arc", question: "Does every shot advance a clear brand-specific story function?" },
      { id: "sequential.continuity", question: "Are facts, people, product, environment, light, copy, and rights locked?" },
      { id: "sequential.production", question: "Can a downstream system execute every shot without guessing?" }
    ]
  };
}

function moduleFor(brand, profile, capability, hasLogo, referenceIds = []) {
  const definitions = {
    interactive: interactiveModule(profile),
    static: staticModule(hasLogo),
    imagery: imageryModule(profile),
    commerce: commerceModule(profile),
    marketing: marketingModule(profile),
    motion: motionModule(profile, hasLogo),
    "generative-image": generativeImageModule(profile),
    "generative-video": generativeVideoModule(profile),
    spatial: spatialModule(profile),
    sequential: sequentialModule(profile)
  };
  const mediaSelectors = ["source.audit.home.desktop", "source.site.home"];
  if (hasLogo) mediaSelectors.unshift("asset.logo.primary");
  if (["imagery", "marketing", "motion", "generative-image", "generative-video", "sequential"].includes(capability)) {
    mediaSelectors.push(...referenceIds);
  }
  return {
    $schema: "../../../brand-system-spec/v1/schemas/module.schema.json",
    schemaVersion: "1.0.0",
    id: brand.slug + "." + capability,
    capability,
    version: "1.0.0",
    evidenceStatus: "mixed",
    extends: { ...definitions[capability], mediaSelectors }
  };
}

function evaluationFor(brand, profile, hasLogo) {
  const gates = [
    { id: "identity", appliesTo: ["all"], ruleRefs: ["logo.official-artwork-only"], failure: "reject", question: "Is official identity used without synthesis or distortion?" },
    { id: "product-truth", appliesTo: ["all"], ruleRefs: ["product.truth"], failure: "reject", question: "Are product, service, compatibility, condition, material, scale, and safety facts verified?" },
    { id: "claims", appliesTo: ["all"], ruleRefs: ["claims.runtime-truth"], failure: "reject", question: "Are every offer, price, date, availability, result, and urgency claim current and sourced?" },
    { id: "rights", appliesTo: ["all"], ruleRefs: ["rights.record", "people.permission"], failure: "reject", question: "Are assets, people, music, locations, partners, and model-upload permissions cleared?" },
    { id: "readability", appliesTo: ["all"], ruleRefs: ["accessibility.contrast", "typography.readability"], failure: "reject", question: "Is essential content readable in the destination and viewing conditions?" }
  ];
  if (profile.historical) {
    gates.push({ id: "historical-scope", appliesTo: ["all"], ruleRefs: ["history.scope"], failure: "reject", question: "Does the output avoid implying the historical standalone operation is currently active?" });
  }
  return {
    $schema: "../../brand-system-spec/v1/schemas/evaluation.schema.json",
    schemaVersion: "1.0.0",
    gates,
    dimensions: [
      { id: "visual-identity", weight: 0.2, question: "Does the work clearly belong to " + brand.name + " without relying on the logo alone?", evidenceRefs: hasLogo ? ["asset.logo.primary", "source.audit.home.desktop"] : ["source.audit.home.desktop"] },
      { id: "imagery", weight: 0.18, question: "Does imagery reflect " + profile.environment + ", " + profile.camera + ", and " + profile.light + "?", evidenceRefs: ["source.audit.home.desktop"] },
      { id: "decision-clarity", weight: 0.16, question: "Does the output make " + profile.decision + " easy to understand?", evidenceRefs: ["source.site.home"] },
      { id: "typography", weight: 0.13, question: "Are display, body, label, price, and specification roles clear and brand-specific?", evidenceRefs: ["source.audit.home.desktop"] },
      { id: "composition", weight: 0.12, question: "Is hierarchy intentional, destination-aware, and centered on one primary idea and action?", evidenceRefs: ["source.audit.home.desktop"] },
      { id: "voice", weight: 0.11, question: "Does the language sound " + profile.traits.join(", ") + " and remain specific?", evidenceRefs: ["source.site.home", "source.site.evidence"] },
      { id: "accessibility", weight: 0.1, question: "Are contrast, type, captions, controls, non-color cues, and reduced motion appropriate?", evidenceRefs: [] }
    ],
    thresholds: { approve: 0.85, humanReview: 0.7, rejectBelow: 0.7, gateFailure: "reject" }
  };
}

function designGuide(brand, profile, hasLogo, logoPath, liveRecord) {
  const lines = [];
  lines.push("# " + brand.name + " Design System", "");
  lines.push("Package version: **1.0.0**  ");
  lines.push("Research snapshot: **July 21, 2026**  ");
  lines.push("Evidence status: **Mixed: verified first-party surface evidence plus labeled inferred production guidance" + (profile.historical ? "; historical standalone identity" : "") + "**", "");
  lines.push("This package is the portable source of brand truth for " + brand.name + ". Systems load brand.json, resolve the core files, and add only the capability modules needed for the output. Provider configuration, account credentials, renderer instructions, workflow state, performance data, and live commercial facts stay outside this directory.", "");
  lines.push("## Brand in one sentence", "", brand.overview, "");
  lines.push("## Durable character", "");
  profile.traits.forEach((trait) => lines.push("- " + words(trait) + "."));
  lines.push("", "Signature principle: **" + profile.signature + "**.", "");
  lines.push("## Package loading", "", "1. Read brand.json for identity, paths, modules, and provenance.", "2. Load tokens.json, rules.json, recipes.json, media.json, and evaluation.json.", "3. Load only the output capabilities required for the job.", "4. Resolve rules, recipes, and media by ID; required rules and reject gates override preferred patterns.", "5. Supply current product, service, offer, audience, channel, rights, accessibility, and delivery facts separately.", "6. Translate semantic values through an external destination adapter.", "7. Evaluate and stop on any reject gate.", "");
  lines.push("## Identity and logo", "");
  if (hasLogo && liveRecord.logoVariant === "compact-icon") lines.push("Bundled historical compact icon reference: " + logoPath + ". Obtain an authorized full wordmark or lockup before any production application that requires the complete identity.");
  else lines.push(hasLogo ? "Bundled public reference: " + logoPath + "." : "No production-ready logo was obtainable from the audited public surface. Use an authorized identity file supplied by the brand. The homepage screenshot is evidence only and must not be cropped into a logo.");
  lines.push("", "- Preserve official artwork proportions and spacing.", "- Use one deliberate identity instance rather than logo repetition.", "- Never redraw, synthesize, distort, bevel, shadow, animate by deformation, or build a substitute mark.", "- Public references require authorization before production use.", "");
  lines.push("## Palette", "");
  Object.entries(brand.colors).forEach(([name, value]) => lines.push("- **" + name + ":** " + value));
  lines.push("");
  brand.colorNotes.forEach((note) => lines.push("- " + note));
  lines.push("", "## Typography", "", brand.typeNotes, "");
  Object.entries(brand.typography).forEach(([name, value]) => lines.push("- **" + name + ":** " + value[0] + ", " + value[1] + ", weight " + value[2] + ", line height " + value[3] + ", tracking " + value[4]));
  lines.push("", "Licensed font files are consumer inputs. Use documented fallbacks when licensed families are unavailable.", "");
  lines.push("## Layout, spacing, shape, and depth", "", brand.layout, "", brand.shapes, "", brand.elevation, "", "Spacing values: " + Object.values(brand.spacing).join(", ") + ". Preserve a 44px minimum interactive target and explicit focus treatment.", "");
  lines.push("## Actions and graphic hierarchy", "", brand.componentNotes, "", "Use one primary message and one primary action per decision area or fixed asset. Recompose every aspect ratio. Current promotion, price, inventory, fitment, availability, dates, and service scope are removable runtime layers.", "");
  lines.push("## Web and interactive guidance", "", "Navigation and decision hierarchy must support **" + profile.decision + "**. Collection, product, guide, and service patterns live in modules/interactive.json; product hierarchy and current-data behavior live in modules/commerce.json.", "", "Compact layouts preserve the same decision order. Overlays must not cover identity, current facts, fitment or options, form errors, or the primary action.", "");
  lines.push("## Photography and image direction", "", "- **Environment:** " + profile.environment + ".", "- **Camera:** " + profile.camera + ".", "- **Lighting:** " + profile.light + ".", "- **Palette and materials:** " + profile.palette + ".", "- **People:** " + profile.people + ".", "- **Avoid:** " + profile.anti.join(", ") + ".", "", "Product and service truth remains locked across studio, context, detail, and human-use images. Real product media remains the factual anchor.", "");
  lines.push("## Image prompt structure", "", "1. Job intent and real use case.", "2. Stable subject and authorized references.", "3. " + profile.environment + ".", "4. Composition and copy-safe region.", "5. " + profile.camera + ".", "6. " + profile.light + ".", "7. Material, geometry, scale, people, and safety locks.", "8. Explicit exclusions and no generated words or logos.", "", "Use modules/generative-image.json for environment-wide, product-studio, product-context, and people-in-use structures.", "");
  lines.push("## Motion design", "", profile.motion + ".", "", "Motion design uses controlled typography, layout, verified product media, and dimensional layers. One movement idea belongs to each beat. Identity and essential copy are composited as crisp controlled layers. Provide reduced motion.", "");
  lines.push("## Generative video", "", "Generative video produces clean visual plates. Each shot uses one stable subject, one subtle action, one camera move on one axis, explicit duration and ratio, light and material direction, continuity locks, and exclusions. Composite identity, verified copy, captions, interface, prices, and offers afterward.", "", "Reject morphing products, drifting features, warping environments, anatomy failures, fake text, invented identity, and incoherent materials.", "");
  lines.push("## Spatial and dimensional expression", "", profile.spatial + ". Dimensional scenes preserve verified scale, product geometry, contact, material response, and readable silhouettes. Effects must explain function, environment, or material.", "");
  lines.push("## Marketing asset system", "", "Supported brand-specific families:", "");
  profile.marketing.forEach((family) => lines.push("- " + words(family) + "."));
  lines.push("", "Current public-surface observations:", "");
  liveRecord.observations.forEach((note) => lines.push("- " + note));
  lines.push("", "Verified public channel references:", "");
  if (liveRecord.social.length) liveRecord.social.forEach((item) => lines.push("- " + item.label + ": " + item.url));
  else lines.push("- No centralized standalone social profile was verified from the audited first-party surface.");
  if (liveRecord.metaAdLibraryQuery) lines.push("- Meta Ad Library lookup: " + liveRecord.metaAdLibraryQuery);
  lines.push("", "Every marketing brief supplies objective, audience, one proposition, one action, destination, ratio, verified product or service facts, rights, accessibility and legal inputs, current offer source and expiration, variant axes, and approval owner.", "", "Keep brand, campaign, product or service, offer, and channel layers separable. Public reference creative cannot establish performance, targeting, spend, channel priority, audience response, or reuse rights.", "");
  lines.push("## Storyboards and sequential production", "", "Preferred narrative rhythm:", "");
  profile.arc.forEach((beat, index) => lines.push((index + 1) + ". " + beat.slice(0, 1).toUpperCase() + beat.slice(1) + "."));
  lines.push("", "Every shot record states story function, duration, ratio, visual intent, composition, camera, action, lighting, exact approved copy, audio intent, continuity locks, asset selectors, rights, and evaluation references.", "");
  lines.push("## Voice", "", profile.voice, "", "Prefer specific language about " + profile.decision + ". Avoid generic prestige, invented expertise, false urgency, unsupported results, and engagement claims without current evidence.", "");
  lines.push("## Rights, facts, and media", "", "media.json is the only asset catalog. Local folders are storage conveniences; consumers resolve catalog IDs and rights metadata.", "", "- Publicly captured site and identity media is analysis/reference evidence.", "- Production reuse requires authorization.", "- Model upload and redistribution are disabled by default.", "- Prices, offers, inventory, availability, service scope, compatibility, reviews, dates, and results are runtime facts.");
  if (profile.historical) lines.push("- This is a historical standalone identity. Never imply current standalone operations without a current authoritative source.");
  lines.push("", "## Evaluation", "", "Outputs must pass identity, product or service truth, claims, rights, readability" + (profile.historical ? ", and historical-scope" : "") + " gates. A score of 0.85 or higher is approved only when every gate passes; 0.70 to 0.849 requires human review.", "");
  lines.push("## Capability files", "");
  capabilities.forEach((capability) => lines.push("- modules/" + capability + ".json"));
  lines.push("", "## Evidence limits", "", "- This is an independent synthesis of public surfaces, not an official internal brand manual.", "- Core colors, typography, layout, and visible components come from cited first-party or archived evidence; image, motion, generative, spatial, storyboard, and some accessibility guidance is inferred and labeled.", "- Screenshots do not prove keyboard support, semantic quality, assistive-technology behavior, or complete accessibility compliance.", "- Refresh current surfaces, authorized identity files, product or service truth, campaigns, rights, and operational facts before production.", "");
  return lines.join("\n");
}

async function downloadLogo(record, brand, targetDir, liveRecord) {
  const fallback = (record.logoCandidates || []).find((item) => /logo|home/i.test((item.alt || "") + " " + (item.src || "")));
  const sourceUrl = liveRecord?.logoUrl || fallback?.src;
  if (!sourceUrl) return null;
  try {
    const response = await fetch(sourceUrl, { headers: { "user-agent": "Mozilla/5.0" } });
    if (!response.ok) return null;
    const buffer = Buffer.from(await response.arrayBuffer());
    const contentType = response.headers.get("content-type") || "";
    const extension = extensionFor(sourceUrl, contentType);
    const fileName = "logo-primary" + extension;
    await fs.writeFile(path.join(targetDir, fileName), buffer);
    return { fileName, buffer, sourceUrl, contentType, variant: liveRecord?.logoVariant || "primary-lockup" };
  } catch {
    return null;
  }
}

async function downloadMarketingReferences(liveRecord, targetDir) {
  const results = [];
  for (const [index, item] of (liveRecord?.marketingImages || []).entries()) {
    try {
      const response = await fetch(item.url, { headers: { "user-agent": "Mozilla/5.0" } });
      if (!response.ok) continue;
      const buffer = Buffer.from(await response.arrayBuffer());
      const contentType = response.headers.get("content-type") || "";
      if (!contentType.startsWith("image/") && !/\.(jpe?g|png|webp|avif|svg|gif)(\?|$)/i.test(item.url)) continue;
      const extension = extensionFor(item.url, contentType);
      const era = item.id.includes(".historical.") ? "historical" : "current";
      const fileName = `${era}-${String(index + 1).padStart(2, "0")}-${slugify(item.alt)}${extension}`;
      await fs.writeFile(path.join(targetDir, fileName), buffer);
      results.push({ ...item, fileName, buffer, contentType });
    } catch {}
  }
  return results;
}

function auditMarkdown(brand, profile, liveRecord) {
  const lines = [
    `# ${brand.name} public-surface audit`,
    "",
    `Reviewed: ${liveRecord.capturedAt}`,
    `Requested URL: ${liveRecord.requestedUrl}`,
    `Final URL: ${liveRecord.finalUrl}`,
    `Surface status: ${liveRecord.surfaceStatus}`,
    "",
    "## Accepted evidence",
    "",
    `- [Desktop capture](./01-home-desktop.png) at ${liveRecord.viewport.width}x${liveRecord.viewport.height}.`,
    ...(liveRecord.historicalScreenshot ? ["- [Historical standalone capture](./02-historical-home-desktop.png) is retained as archived first-party visual evidence."] : []),
    `- First-party title: ${liveRecord.title}.`,
    `- Durable design rules are cross-checked against ${brand.evidenceUrl}.`,
    "",
    "## Observations",
    "",
    ...(liveRecord.observations || []).map((item) => `- ${item}`),
    "",
    "## Linked public channels",
    "",
    ...((liveRecord.social || []).length ? liveRecord.social.map((item) => `- ${item.label}: ${item.url}`) : ["- No centralized first-party social profile was verified from the audited surface."]),
    "",
    "## Marketing and ad references",
    "",
    `- ${liveRecord.marketingImages.length} current first-party marketing images were cataloged as reference-only media.`,
    ...(liveRecord.metaAdLibraryQuery ? [`- Meta Ad Library lookup: ${liveRecord.metaAdLibraryQuery}`] : ["- No current standalone ad-library lookup is attached because this is a redirect or historical identity."]),
    "- Public creative cannot establish spend, targeting, performance, audience response, or production rights.",
    "",
    "## Production limits",
    "",
    "- This is an independent synthesis of public evidence, not an official internal brand manual.",
    "- Screenshots do not establish semantic quality, keyboard behavior, assistive-technology support, or accessibility compliance.",
    "- Public assets remain analysis and storyboard references until brand authorization and rights review.",
    ...(profile.historical ? ["- This package is historical. Do not imply a current standalone storefront, inventory, offer, location, or service."] : []),
    ""
  ];
  return lines.join("\n");
}

async function buildBrand(brand) {
  if (brand.slug === "one-kings-lane") return null;
  const profile = profiles[brand.slug];
  const record = auditBySlug.get(brand.slug);
  const liveRecord = liveBySlug.get(brand.slug);
  if (!profile || !record || !record.screenshot || !liveRecord) throw new Error("Missing profile or audit evidence for " + brand.slug);
  const dir = path.join(packageRoot, brand.slug);
  const officialDir = path.join(dir, "media", "official");
  const referenceDir = path.join(dir, "media", "marketing-reference");
  const modulesDir = path.join(dir, "modules");
  await fs.mkdir(officialDir, { recursive: true });
  await fs.mkdir(referenceDir, { recursive: true });
  await fs.mkdir(modulesDir, { recursive: true });

  const screenshotBuffer = await fs.readFile(path.join(root, liveRecord.screenshot));
  await fs.writeFile(path.join(officialDir, "homepage-audit.png"), screenshotBuffer);
  const historicalScreenshotBuffer = liveRecord.historicalScreenshot ? await fs.readFile(path.join(root, liveRecord.historicalScreenshot)) : null;
  if (historicalScreenshotBuffer) await fs.writeFile(path.join(officialDir, "historical-homepage-audit.png"), historicalScreenshotBuffer);
  const logo = await downloadLogo(record, brand, officialDir, liveRecord);
  const marketingReferences = await downloadMarketingReferences(liveRecord, referenceDir);
  const hasLogo = Boolean(logo);

  const brandDocument = {
    $schema: "../../brand-system-spec/v1/schemas/brand.schema.json",
    schemaVersion: "1.0.0",
    packageVersion: "1.0.0",
    brand: {
      id: brand.slug,
      name: brand.name,
      description: brand.description,
      proposition: profile.proposition,
      audiences: profile.audiences,
      traits: profile.traits,
      signature: profile.signature,
      voiceSummary: profile.voice
    },
    files: {
      tokens: "tokens.json",
      rules: "rules.json",
      recipes: "recipes.json",
      media: "media.json",
      evaluation: "evaluation.json",
      humanGuide: "DESIGN.md"
    },
    modules: capabilities.map((capability) => ({ capability, path: "modules/" + capability + ".json" })),
    provenance: {
      researchedAt: buildDate,
      method: "First-party live or archived surface review, computed-style sampling, visible component inspection, and official or public asset capture.",
      evidenceStatus: "mixed",
      verifiedSurfaces: [liveRecord.surfaceStatus === "current" ? "current-homepage" : "current-redirect", ...(liveRecord.social.length ? ["first-party-linked-social-profiles"] : [])],
      sourceAudit: "../../research/portfolio-live-evidence.json",
      historicalStandaloneIdentity: Boolean(profile.historical),
      notes: [
        brand.evidenceNote,
        "Current offers, inventory, prices, availability, service scope, and campaign copy are runtime data.",
        "The package is output-neutral; provider and renderer adapters belong outside it."
      ]
    }
  };
  const rulesDocument = {
    $schema: "../../brand-system-spec/v1/schemas/rules.schema.json",
    schemaVersion: "1.0.0",
    rules: coreRules(brand, profile, hasLogo)
  };
  const recipesDocument = {
    $schema: "../../brand-system-spec/v1/schemas/recipes.schema.json",
    schemaVersion: "1.0.0",
    recipes: coreRecipes(profile)
  };
  const mediaItems = [
    {
      id: "source.site.home",
      uri: brand.liveUrl,
      kind: "document",
      roles: ["source-evidence", "current-or-canonical-brand-surface"],
      lifecycle: "active",
      source: { type: "official-page", url: brand.liveUrl, reviewedAt: buildDate, finalUrl: liveRecord.finalUrl, surfaceStatus: liveRecord.surfaceStatus },
      rights: { status: "public-reference", allowedUses: ["analysis", "citation"], modelUploadAllowed: false, redistributionAllowed: false }
    },
    {
      id: "source.site.evidence",
      uri: brand.evidenceUrl,
      kind: "document",
      roles: ["source-evidence", profile.historical ? "historical-brand-surface" : "brand-surface"],
      lifecycle: "active",
      source: { type: brand.evidenceUrl.includes("web.archive.org") ? "archived-first-party-page" : "official-page", url: brand.evidenceUrl, reviewedAt: buildDate, note: brand.evidenceNote },
      rights: { status: "public-reference", allowedUses: ["analysis", "citation"], modelUploadAllowed: false, redistributionAllowed: false }
    },
    {
      id: "source.audit.home.desktop",
      uri: "media/official/homepage-audit.png",
      kind: "image",
      roles: ["source-evidence", "desktop-audit", "layout-reference", "typography-reference", "color-reference"],
      lifecycle: "active",
      dimensions: pngDimensions(screenshotBuffer) || liveRecord.viewport,
      checksumSha256: sha256(screenshotBuffer),
      source: {
        type: "live-capture",
        page: liveRecord.finalUrl,
        requestedPage: liveRecord.requestedUrl,
        capturedAt: liveRecord.capturedAt,
        surfaceStatus: liveRecord.surfaceStatus,
        note: liveRecord.surfaceStatus === "redirect-successor" ? "Rendered redirect or successor surface. This is operational evidence and not standalone identity evidence." : "Rendered public homepage capture."
      },
      rights: { status: "analysis-only", allowedUses: ["analysis", "internal-review"], modelUploadAllowed: false, redistributionAllowed: false }
    }
  ];
  if (logo) {
    mediaItems.unshift({
      id: "asset.logo.primary",
      uri: "media/official/" + logo.fileName,
      kind: "image",
      roles: logo.variant === "compact-icon" ? ["logo", "compact-identity", "historical-reference"] : ["logo", "primary-identity", "brand-end-frame"],
      lifecycle: "active",
      checksumSha256: sha256(logo.buffer),
      source: { type: "official-site-asset", url: logo.sourceUrl, capturedAt: buildDate, contentType: logo.contentType },
      rights: { status: "unverified-public-reference", allowedUses: ["analysis", "internal-storyboard-reference", "authorized-brand-work"], modelUploadAllowed: false, redistributionAllowed: false, reviewRequired: true }
    });
  }
  if (historicalScreenshotBuffer) {
    mediaItems.push({
      id: "source.audit.historical-home.desktop",
      uri: "media/official/historical-homepage-audit.png",
      kind: "image",
      roles: ["source-evidence", "historical-brand-surface", "layout-reference", "typography-reference", "color-reference"],
      lifecycle: "deprecated",
      dimensions: pngDimensions(historicalScreenshotBuffer) || liveRecord.viewport,
      checksumSha256: sha256(historicalScreenshotBuffer),
      source: { type: "archived-first-party-capture", page: brand.evidenceUrl, capturedAt: liveRecord.capturedAt, note: "Archive chrome may be visible; use the captured standalone storefront area as historical evidence only." },
      rights: { status: "analysis-only", allowedUses: ["analysis", "internal-review", "internal-storyboard-reference"], modelUploadAllowed: false, redistributionAllowed: false }
    });
  }
  for (const item of marketingReferences) {
    mediaItems.push({
      id: item.id,
      uri: "media/marketing-reference/" + item.fileName,
      kind: "image",
      roles: item.roles,
      lifecycle: liveRecord.surfaceStatus === "redirect-successor" ? "deprecated" : "active",
      checksumSha256: sha256(item.buffer),
      source: { type: liveRecord.surfaceStatus === "redirect-successor" ? "archived-first-party-asset" : "official-site-asset", url: item.url, page: liveRecord.surfaceStatus === "redirect-successor" ? brand.evidenceUrl : liveRecord.finalUrl, capturedAt: liveRecord.capturedAt, alt: item.alt, contentType: item.contentType },
      rights: { status: "unverified-public-reference", allowedUses: ["analysis", "internal-storyboard-reference"], modelUploadAllowed: false, redistributionAllowed: false, reviewRequired: true }
    });
  }
  for (const [index, item] of liveRecord.social.entries()) {
    let platform = "social";
    try { platform = new URL(item.url).hostname.replace(/^www\./, "").split(".")[0]; } catch {}
    mediaItems.push({
      id: `source.social.${platform}.${String(index + 1).padStart(2, "0")}`,
      uri: item.url,
      kind: "document",
      roles: ["marketing-source", "social-profile", "public-reference"],
      lifecycle: liveRecord.surfaceStatus === "redirect-successor" ? "deprecated" : "active",
      source: { type: liveRecord.surfaceStatus === "redirect-successor" ? "historical-first-party-linked-social-profile" : "first-party-linked-social-profile", url: item.url, reviewedAt: liveRecord.capturedAt, label: item.label },
      rights: { status: "public-reference", allowedUses: ["analysis", "citation"], modelUploadAllowed: false, redistributionAllowed: false }
    });
  }
  if (liveRecord.metaAdLibraryQuery) {
    mediaItems.push({
      id: "source.ad-library.meta-query",
      uri: liveRecord.metaAdLibraryQuery,
      kind: "document",
      roles: ["marketing-source", "public-ad-library-query"],
      lifecycle: "active",
      source: { type: "public-ad-library-query", url: liveRecord.metaAdLibraryQuery, reviewedAt: liveRecord.capturedAt, note: "Live query reference only; results are volatile and do not establish spend, targeting, performance, or account ownership." },
      rights: { status: "public-reference", allowedUses: ["analysis", "citation"], modelUploadAllowed: false, redistributionAllowed: false }
    });
  }
  const mediaDocument = {
    $schema: "../../brand-system-spec/v1/schemas/media.schema.json",
    schemaVersion: "1.0.0",
    rightsPolicy: {
      default: "unverified-public-reference",
      productionUse: "Requires independent rights confirmation and brand authorization.",
      modelUpload: "Prohibited unless an authorized reviewer upgrades the asset record."
    },
    items: mediaItems
  };

  const referenceIds = marketingReferences.map((item) => item.id);
  const auditDir = path.join(root, "research", brand.slug, `audit-${buildDate}`);
  await fs.mkdir(auditDir, { recursive: true });
  await Promise.all([
    fs.writeFile(path.join(dir, "brand.json"), formatJson(brandDocument)),
    fs.writeFile(path.join(dir, "tokens.json"), formatJson(tokensFor(brand))),
    fs.writeFile(path.join(dir, "rules.json"), formatJson(rulesDocument)),
    fs.writeFile(path.join(dir, "recipes.json"), formatJson(recipesDocument)),
    fs.writeFile(path.join(dir, "media.json"), formatJson(mediaDocument)),
    fs.writeFile(path.join(dir, "evaluation.json"), formatJson(evaluationFor(brand, profile, hasLogo))),
    fs.writeFile(path.join(dir, "DESIGN.md"), designGuide(brand, profile, hasLogo, logo ? "media/official/" + logo.fileName : null, liveRecord)),
    fs.writeFile(path.join(auditDir, "AUDIT.md"), auditMarkdown(brand, profile, liveRecord)),
    ...capabilities.map((capability) => fs.writeFile(path.join(modulesDir, capability + ".json"), formatJson(moduleFor(brand, profile, capability, hasLogo, referenceIds))))
  ]);
  return { slug: brand.slug, hasLogo, marketingReferences: marketingReferences.length, socialSources: liveRecord.social.length, historical: Boolean(profile.historical) };
}

const results = [];
for (const brand of brands) {
  const result = await buildBrand(brand);
  if (result) results.push(result);
}
console.log(JSON.stringify(results, null, 2));
