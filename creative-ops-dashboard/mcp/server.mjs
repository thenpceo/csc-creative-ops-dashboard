import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import * as z from "zod/v4";
import packageData from "./brand-packages.generated.json" with { type: "json" };
import productHighlightTemplate from "../orchestration/templates/product-highlight-video.v1.json" with { type: "json" };

const SERVER_NAME = "csc-creative-ops";
const SERVER_VERSION = "1.2.0";
const TEMPLATE_BY_ID = new Map([[productHighlightTemplate.id, productHighlightTemplate]]);
const DECISION_VALUES = ["pending", "pass", "fail"];
export const recommendedIntegrations = [
  {
    id: "fal-ai",
    name: "fal.ai API + MCP",
    optional: true,
    appliesTo: ["generative-video", "announcement-video", "product-highlight-video", "storyboard"],
    purpose: "Generate image-to-video and text-to-video moving plates while the CSC brand system controls product fidelity, prompting, and review gates.",
    recommendation: "If fal.ai is not available in the connected agent environment, recommend that the user create their own fal API key and connect fal's hosted MCP before generated-video work.",
    docsUrl: "https://fal.ai/docs/documentation/setting-up/mcp",
    apiKeyUrl: "https://fal.ai/dashboard/keys",
    mcp: {
      url: "https://mcp.fal.ai/mcp",
      transport: "streamable-http",
      authentication: "Authorization: Bearer YOUR_FAL_KEY",
    },
    install: {
      claudeCode: 'claude mcp add --transport http fal-ai https://mcp.fal.ai/mcp --header "Authorization: Bearer YOUR_FAL_KEY"',
      otherClients: "Connect https://mcp.fal.ai/mcp as a Streamable HTTP MCP and send Authorization: Bearer YOUR_FAL_KEY.",
    },
    credentialPolicy: "Use the user's own fal account and API key. Never request, expose, store, or reuse a shared CSC or demo credential.",
  },
  {
    id: "hyperframes",
    name: "HeyGen HyperFrames skills",
    optional: true,
    appliesTo: ["motion-video", "announcement-video", "product-highlight-video", "storyboard"],
    purpose: "Compose deterministic brand typography, logos, buttons, transitions, timing, and full-bleed media into motion-design videos.",
    recommendation: "If HyperFrames is not available in the connected agent environment, recommend installing HeyGen's official HyperFrames skill set before motion-composition work.",
    docsUrl: "https://hyperframes.heygen.com/quickstart",
    install: {
      recommended: "npx skills add heygen-com/hyperframes",
      allSkills: "npx skills add heygen-com/hyperframes --all",
    },
  },
];
const CAPABILITIES = [
  "interactive",
  "static",
  "imagery",
  "commerce",
  "marketing",
  "motion",
  "generative-image",
  "generative-video",
  "spatial",
  "sequential",
];

const OUTPUT_RECIPES = {
  graphic: ["static", "imagery", "commerce", "marketing", "generative-image"],
  website: ["interactive", "imagery", "commerce", "marketing"],
  image: ["imagery", "commerce", "generative-image"],
  "motion-video": ["motion", "sequential", "imagery", "commerce", "marketing"],
  "generative-video": ["generative-video", "imagery", "commerce"],
  "announcement-video": ["generative-image", "generative-video", "motion", "sequential", "commerce", "marketing"],
  "product-highlight-video": ["generative-image", "generative-video", "motion", "sequential", "imagery", "commerce", "marketing"],
  storyboard: ["imagery", "generative-image", "generative-video", "motion", "sequential", "marketing"],
  "business-card": ["static", "marketing"],
};

const EXECUTION_STAGES = {
  graphic: [
    "Resolve the product URL and collect authorized product references plus current product facts.",
    "Generate or select the clean image plate with the product identity locked to the supplied references.",
    "Compose logo, headline, support copy, price or offer, and action as crisp editable layers using the brand typography and layout rules.",
    "Run every reject gate and score the result before delivery.",
  ],
  website: [
    "Resolve current content and commerce facts from the supplied URLs.",
    "Build the page from interactive tokens, layout rules, component recipes, imagery guidance, and accessibility requirements.",
    "Use official identity assets only and keep all text semantic and editable.",
    "Test responsive layouts and run every reject gate before delivery.",
  ],
  image: [
    "Resolve the product URL and collect authorized reference images.",
    "Use the connected agent's image generator with the returned identity locks, editable scene variables, prompt recipe, and negative intent.",
    "Reject any product mutation, invented text, logo, price, claim, or unsupported detail.",
  ],
  "motion-video": [
    "Resolve the product and approved full-bleed image or video background.",
    "Use HyperFrames or an equivalent deterministic motion-composition system for type, logo, buttons, masks, transitions, and timing.",
    "Keep identity and typography as crisp editable layers. Use the brand motion curves, stagger, holds, and reduced-motion rules.",
    "Run the motion, readability, product-truth, rights, and offer-truth gates.",
  ],
  "generative-video": [
    "Resolve an authorized start image and lock the product, room geometry, lighting, and countable identity details.",
    "Use Fal or another available image-to-video generator only for the photoreal moving plate.",
    "Do not ask the generated footage to draw type, logo, UI, prices, or offers.",
    "Reject the complete clip on any product drift, texture crawl, warped geometry, or unsupported motion.",
  ],
  "announcement-video": [
    "Resolve all product URLs, current launch facts, and authorized reference images.",
    "Create approved key art or a reference-true product scene with the connected agent's image generator.",
    "Animate the approved plate with Fal image-to-video using the generative-video locks and negative motion guidance.",
    "Compose the announcement in HyperFrames with full-bleed footage, separate brand type and logo layers, measured transitions, current claims, and a readable end frame.",
    "Run reject gates on every shot and on the final timeline before delivery.",
  ],
  "product-highlight-video": [
    "Resolve current product facts, one or more authorized product references, model-upload permission, and product-specific fidelity invariants.",
    "Compile the template into one distinct shot record per beat with one verified claim, one authorized reference selector, locked invariants, editable scene variables, and deterministic overlay copy.",
    "Generate one unified product-and-environment keyframe per shot. Review every keyframe against its authorized product reference before animation.",
    "Animate only approved keyframes as moving photographs with one restrained camera move, low-amplitude environmental motion, and no generated copy or identity.",
    "Review the start, midpoint, and end of every generated clip; reject the whole shot on product, material, lighting, contact, or geometry drift.",
    "Compose approved plates, deterministic typography, verified copy, synchronized transitions, and official identity in an idempotent motion project.",
    "Review fixed-time snapshots, a contact sheet, continuity evidence, live preview, fonts, media presence, contrast, and runtime behavior. Do not render the final deliverable before explicit approval.",
  ],
  storyboard: [
    "Resolve product sources, current facts, output ratio, duration, and channel.",
    "Build one visual idea per beat using the sequential, imagery, and motion recipes.",
    "Attach the exact generation prompt, identity locks, transition, duration, copy, and evaluation gates to every frame.",
    "Keep generated footage separate from deterministic motion-design overlays.",
  ],
  "business-card": [
    "Use only official logo artwork and the brand typography, spacing, color, print, and identity rules.",
    "Keep contact data editable and validate print contrast, trim, safe area, and minimum logo size.",
  ],
};

const packageBySlug = new Map(packageData.packages.map((item) => [item.slug, item]));
const brandNames = packageData.packages.map((item) => `${item.brand.brand.name} (${item.slug})`).join(", ");

function textResult(value) {
  return { content: [{ type: "text", text: typeof value === "string" ? value : JSON.stringify(value, null, 2) }] };
}

function getPackage(slug) {
  const item = packageBySlug.get(slug);
  if (!item) throw new Error(`Unknown brand '${slug}'. Available brands: ${brandNames}`);
  return item;
}

function selectMedia(item, roles = []) {
  const records = item.media.items ?? item.media.media ?? item.media.sources ?? [];
  if (!roles.length) return records;
  return records.filter((record) => (record.roles ?? []).some((role) => roles.includes(role)));
}

function coreSystem(item) {
  return {
    brand: item.brand.brand,
    packageVersion: item.brand.packageVersion,
    provenance: item.brand.provenance,
    tokens: item.tokens,
    rules: item.rules,
    recipes: item.recipes,
    evaluation: item.evaluation,
  };
}

function supportedTemplateIds(item) {
  return [...TEMPLATE_BY_ID.values()]
    .filter((template) => template.requiredCapabilities.every((capability) => item.modules[capability]))
    .map((template) => template.id);
}

function recommendedSetupFor(outputType) {
  return recommendedIntegrations
    .filter((integration) => integration.appliesTo.includes(outputType))
    .map((integration) => ({
      ...integration,
      agentAction: `Check whether ${integration.name} is available. If it is unavailable and this capability is required, explicitly recommend the official setup to the user before execution. Do not claim it is installed until verified.`,
    }));
}

function normalizeClaim(claim, index) {
  if (typeof claim === "string") {
    return { id: `claim-${index + 1}`, text: claim, verificationStatus: "unverified", sourceUrl: null };
  }
  return {
    id: claim.id || `claim-${index + 1}`,
    text: claim.text,
    verificationStatus: claim.verificationStatus || "unverified",
    sourceUrl: claim.sourceUrl || null,
  };
}

function scaleBeatTime(time, requestedDuration) {
  const [start, end] = time.split("-").map(Number);
  const scale = requestedDuration / productHighlightTemplate.defaultDurationSeconds;
  const scaledStart = Number((start * scale).toFixed(2));
  const scaledEnd = Number((end * scale).toFixed(2));
  return { start: scaledStart, end: scaledEnd, duration: Number((scaledEnd - scaledStart).toFixed(2)) };
}

function recipeById(modules, capability, id) {
  return modules[capability]?.extends?.recipes?.find((recipe) => recipe.id === id) ?? null;
}

function decisionFor(record, shotId, field) {
  return record?.[shotId]?.[field] ?? "pending";
}

function resolveEvaluationRef(item, id) {
  const brandGateExists = (item.evaluation?.gates ?? []).some((gate) => gate.id === id);
  const templateGateExists = (productHighlightTemplate.gateContracts ?? []).some((gate) => gate.id === id);
  return {
    id,
    source: brandGateExists ? "brand-evaluation" : templateGateExists ? "template-contract" : "unresolved",
  };
}

function productHighlightPlan(item, modules, options) {
  const {
    templateId,
    durationSeconds,
    featureClaims,
    rightsDecision,
    referencePolicy,
    reviewDecisions,
    productUrls,
    approvalMode,
    objective,
    audience,
    channel,
    aspectRatio,
  } = options;
  const template = TEMPLATE_BY_ID.get(templateId);
  if (!template) {
    throw new Error(`Unknown template '${templateId}'. Available templates: ${[...TEMPLATE_BY_ID.keys()].join(", ")}`);
  }
  if (!supportedTemplateIds(item).includes(templateId)) {
    throw new Error(`Brand '${item.slug}' does not provide every capability required by '${templateId}'.`);
  }

  const claims = featureClaims.map(normalizeClaim);
  const stillRecipe = recipeById(modules, "generative-image", "gen-image.product-highlight-keyframe")
    ?? recipeById(modules, "generative-image", "gen-image.product-in-room");
  const videoRecipe = recipeById(modules, "generative-video", "gen-video.product-highlight-shot")
    ?? recipeById(modules, "generative-video", "gen-video.product-in-context");
  const overlayRecipe = recipeById(modules, "motion", "motion.product-highlight-overlay")
    ?? recipeById(modules, "motion", "motion.full-bleed-feature");
  const sequenceRecipe = recipeById(modules, "sequential", "sequential.product-highlight-18");
  const lockedInvariants = modules["generative-image"]?.extends?.tokens?.referenceTransformationContract?.lockedInvariants
    ?? ["product silhouette", "proportions", "materials", "finish", "hardware", "seams", "countable details"];
  const editableSceneVariables = modules["generative-image"]?.extends?.tokens?.referenceTransformationContract?.editableVariables
    ?? ["environment", "time of day", "camera angle", "framing", "copy-safe region", "aspect ratio"];
  const typography = item.tokens.typography?.motionResolution ?? {
    licensedFamilies: {
      display: { observedFamily: item.tokens.typography?.families?.editorial?.value ?? null, assetStatus: "runtime-check-required" },
      support: { observedFamily: item.tokens.typography?.families?.interface?.value ?? null, assetStatus: "runtime-check-required" },
    },
    renderSafeFamilies: {
      display: item.tokens.typography?.families?.editorial?.fallback ?? "serif",
      support: item.tokens.typography?.families?.interface?.fallback ?? "sans-serif",
    },
    resolutionPolicy: "Use licensed brand files when supplied; otherwise resolve deterministic render-safe families before preview and keep them unchanged through render.",
  };

  const shotPlan = template.defaultBeats.map((beat, index) => {
    const timing = scaleBeatTime(beat.time, durationSeconds);
    const claim = claims[index] ?? {
      id: `claim-${index + 1}`,
      text: null,
      verificationStatus: "required-unresolved",
      sourceUrl: productUrls[0] ?? null,
    };
    const stillDecision = decisionFor(reviewDecisions?.shots, beat.id, "stillFidelity");
    const temporalDecision = decisionFor(reviewDecisions?.shots, beat.id, "temporalFidelity");
    return {
      id: beat.id,
      storyFunction: beat.storyFunction,
      duration: timing,
      visualScale: beat.visualScale,
      visualIntent: beat.visualIntent,
      lightingIntent: beat.lightingIntent,
      verifiedClaim: claim,
      authorizedReferenceSelectors: productUrls.map((url, sourceIndex) => ({
        id: `runtime.product-reference.${beat.id}.${sourceIndex + 1}`,
        productUrl: url,
        role: index === template.defaultBeats.length - 1 ? "whole-product-context-reference" : `${beat.visualScale}-feature-reference`,
        resolutionStatus: "agent-must-resolve-authorized-image",
      })),
      referenceChoiceReason: `Choose the authorized product image that most clearly resolves the ${beat.visualScale} ${beat.storyFunction} feature without inventing an unseen angle.`,
      lockedProductInvariants: lockedInvariants,
      editableSceneVariables,
      stillPrompt: {
        recipeId: stillRecipe?.id ?? null,
        structure: stillRecipe?.composition?.promptStructure ?? [],
        shotIntent: `${beat.visualIntent} ${beat.lightingIntent}`,
        unifiedPlateRequired: true,
        distinctKeyframeRequired: true,
      },
      stillNegativeIntent: [
        ...(modules["generative-image"]?.extends?.tokens?.negativeIntent ?? []),
        "cutout product pasted over a separately generated cinematic environment",
        "invented or removed product component",
        "generated words or brand identity",
      ],
      stillFidelityDecision: {
        status: stillDecision,
        requiredEvidence: ["authorized reference and generated keyframe side by side", "proportion or countable-detail check"],
        onFail: ["reject generated keyframe", "block image-to-video for this shot", "regenerate from the authorized reference"],
      },
      videoPrompt: {
        recipeId: videoRecipe?.id ?? null,
        structure: videoRecipe?.composition?.promptStructure ?? [],
        motionDoctrine: "Animate the approved keyframe as a moving photograph. The product itself is not the motion source.",
      },
      cameraMove: "Select one restrained move on no more than one primary axis.",
      environmentalMotion: "Select one low-amplitude cue such as daylight, sheer fabric, foliage, reflection, flame, or water.",
      finalHold: index === template.defaultBeats.length - 1 ? template.compositionPolicy.finalResolveHoldMinimumSeconds : 0.6,
      sampleTimes: template.shotContract.defaultSampleTimes,
      temporalFidelityDecision: {
        status: temporalDecision,
        requiredEvidence: ["start frame", "midpoint frame", "end frame"],
        onFail: ["reject the whole generated clip", "block deterministic composition for this shot", "regenerate from the approved keyframe"],
      },
      overlaySpec: {
        deterministic: true,
        copyRole: beat.copyRole,
        exactCopy: claim.verificationStatus === "verified" ? claim.text : null,
        copyStatus: claim.verificationStatus,
        recipeId: overlayRecipe?.id ?? null,
        logo: index === template.defaultBeats.length - 1 ? "official supplied artwork only" : null,
        typographyRefs: [item.tokens.typography?.motionResolution ? "typography.motionResolution" : "resolved-plan.typographyResolution"],
      },
      transition: {
        family: "resolve from brand motion transition families",
        synchronizeSceneWrapperAndMediaPlate: true,
      },
      rightsStatus: {
        referencePolicy,
        decision: rightsDecision,
        modelUploadAllowed: rightsDecision === "approved-for-model-upload",
      },
      evaluationRefs: [
        "gate.generated-keyframe-product-fidelity",
        "gate.temporal-product-continuity",
        "gate.cross-shot-product-continuity",
        "gate.deterministic-typography",
        "gate.media-presence",
      ].map((id) => resolveEvaluationRef(item, id)),
    };
  });

  const stillFailure = shotPlan.some((shot) => shot.stillFidelityDecision.status === "fail");
  const temporalFailure = shotPlan.some((shot) => shot.temporalFidelityDecision.status === "fail");
  const allStillsPassed = shotPlan.every((shot) => shot.stillFidelityDecision.status === "pass");
  const allTemporalSamplesPassed = shotPlan.every((shot) => shot.temporalFidelityDecision.status === "pass");
  const crossShotDecision = reviewDecisions?.crossShotContinuity ?? "pending";
  const modelUploadAllowed = rightsDecision === "approved-for-model-upload";
  const hasProductSource = productUrls.length > 0;
  const finalRenderApproved = reviewDecisions?.finalRenderApproved === true;
  const finalQa = reviewDecisions?.finalQa ?? {};
  const allFinalQaPassed = ["mediaPresence", "fontResolution", "contrast", "runtime"].every((field) => finalQa[field] === "pass");
  const unverifiedClaimIds = shotPlan
    .filter((shot) => shot.verifiedClaim.verificationStatus !== "verified")
    .map((shot) => shot.verifiedClaim.id);
  const blockedStages = [];
  if (!hasProductSource) blockedStages.push("resolve-product", "generate-keyframes", "animate-keyframes", "compose-motion", "final-render");
  if (!modelUploadAllowed) blockedStages.push("generate-keyframes", "animate-keyframes", "compose-motion", "final-render");
  if (stillFailure) blockedStages.push("animate-keyframes", "compose-motion", "final-render");
  if (temporalFailure) blockedStages.push("compose-motion", "final-render");
  if (unverifiedClaimIds.length) blockedStages.push("compose-motion", "final-render");
  if (crossShotDecision !== "pass") blockedStages.push("final-render");
  if (!allStillsPassed || !allTemporalSamplesPassed) blockedStages.push("final-render");
  if (!allFinalQaPassed) blockedStages.push("final-render");
  if (!finalRenderApproved || approvalMode === "planning-only") blockedStages.push("final-render");

  let status = "ready-for-keyframe-generation";
  if (!hasProductSource) status = "blocked-missing-product-source";
  else if (!modelUploadAllowed) status = "blocked-pending-model-upload-rights";
  else if (stillFailure || temporalFailure || crossShotDecision === "fail") status = "blocked-fidelity-failure";

  return {
    status,
    inputResolution: {
      objective,
      audience,
      channel,
      aspectRatio,
      durationSeconds,
      featureClaims: claims,
      rightsDecision,
      approvalMode,
      unresolvedRequiredInputs: [
        ...(!productUrls.length ? ["productUrls"] : []),
        ...(!objective ? ["objective"] : []),
        ...(!audience ? ["audience"] : []),
        ...(!channel ? ["channel"] : []),
        ...(!aspectRatio ? ["aspectRatio"] : []),
        ...(unverifiedClaimIds.length ? ["verified featureClaims"] : []),
        ...(rightsDecision !== "approved-for-model-upload" ? ["approved model-upload rightsDecision"] : []),
      ],
    },
    templateContract: template,
    templateRecipeResolution: {
      stillRecipeId: stillRecipe?.id ?? null,
      videoRecipeId: videoRecipe?.id ?? null,
      overlayRecipeId: overlayRecipe?.id ?? null,
      sequenceRecipeId: sequenceRecipe?.id ?? null,
    },
    shotPlan,
    continuityLedger: {
      status: crossShotDecision,
      sourceProductUrls: productUrls,
      requiredFields: Object.fromEntries(template.continuityLedger.fields.map((field) => [field, "pending-production-record"])),
      failureAction: "A failed cross-shot product check blocks final rendering.",
    },
    generationPolicy: template.generationPolicy,
    typographyResolution: typography,
    reviewPlan: template.reviewPlan,
    gateState: {
      productSource: hasProductSource ? "present-pending-resolution" : "fail",
      modelUploadRights: modelUploadAllowed ? "pass" : rightsDecision,
      keyframeFidelity: stillFailure ? "fail" : allStillsPassed ? "pass" : "pending",
      temporalContinuity: temporalFailure ? "fail" : allTemporalSamplesPassed ? "pass" : "pending",
      crossShotContinuity: crossShotDecision,
      verifiedClaims: unverifiedClaimIds.length ? "pending" : "pass",
      unverifiedClaimIds,
      finalQa: {
        mediaPresence: finalQa.mediaPresence ?? "pending",
        fontResolution: finalQa.fontResolution ?? "pending",
        contrast: finalQa.contrast ?? "pending",
        runtime: finalQa.runtime ?? "pending",
      },
      blockedStages: [...new Set(blockedStages)],
    },
    renderPolicy: {
      approvalMode,
      finalRenderApproved,
      status: blockedStages.includes("final-render") ? "blocked" : "approved-to-render",
      requiredBeforeRender: ["approved keyframes", "approved start/midpoint/end samples", "passed cross-shot continuity", "passed media/font/contrast/runtime QA", "explicit preview approval"],
      assembly: "Idempotent. Reassembly must preserve the number, order, sources, and transition timing of approved media plates.",
    },
    revisionLedgerSchema: template.revisionLedgerSchema,
  };
}

function creativePlan(item, outputType, request, productUrls = [], channel, aspectRatio, options = {}) {
  const capabilities = OUTPUT_RECIPES[outputType];
  const modules = Object.fromEntries(capabilities.map((name) => [name, item.modules[name]]).filter(([, value]) => value));
  const mediaSelectors = [...new Set(Object.values(modules).flatMap((module) => module?.extends?.mediaSelectors ?? []))];
  const media = selectMedia(item).filter((record) => mediaSelectors.includes(record.id));
  const templatePlan = outputType === "product-highlight-video"
    ? productHighlightPlan(item, modules, {
      templateId: options.templateId || productHighlightTemplate.id,
      durationSeconds: options.durationSeconds || productHighlightTemplate.defaultDurationSeconds,
      featureClaims: options.featureClaims || [],
      rightsDecision: options.rightsDecision || "unknown",
      referencePolicy: options.referencePolicy || "authorized-only",
      reviewDecisions: options.reviewDecisions,
      productUrls,
      approvalMode: options.approvalMode || "explicit-preview-approval",
      objective: options.objective || request,
      audience: options.audience || item.brand.brand.audiences?.[0] || null,
      channel: channel || null,
      aspectRatio: aspectRatio || null,
    })
    : null;

  return {
    status: templatePlan?.status ?? "ready-for-agent-execution",
    agentDirective: templatePlan
      ? "Continue through the returned production stages only when their gates are open. Resolve current product facts, authorized references, model-upload permission, and verified claims before generation; never bypass blockedStages. Use available generation and motion capabilities after their prerequisites pass."
      : "Continue from this plan. Use the connected agent's available web, image, video, motion, and design skills to create the requested artifact. Do not stop after returning a brief when those capabilities are available.",
    brand: item.brand.brand,
    request,
    output: { type: outputType, channel: channel || "unspecified", aspectRatio: aspectRatio || "derive from channel" },
    productSources: productUrls.map((url) => ({
      url,
      instruction: "Fetch current product facts and authorized reference imagery from this URL. Treat the reference as the non-negotiable identity source. Never infer price, availability, offer, or specification.",
    })),
    capabilityOrder: capabilities,
    executionStages: EXECUTION_STAGES[outputType],
    core: coreSystem(item),
    modules,
    selectedMedia: media,
    recommendedSetup: recommendedSetupFor(outputType),
    rightsBoundary: item.media.rightsPolicy ?? null,
    completionPolicy: {
      mustUseOfficialLogoArtwork: true,
      keepTypographyAndUIAsEditableLayers: true,
      generatedImageryMustNotContainWordsOrLogos: true,
      rejectOnProductIdentityDrift: true,
      rejectOnUnsupportedOfferOrClaim: true,
      neverInferModelUploadPermission: true,
      scoreAgainstEvaluationPolicy: true,
    },
    ...(templatePlan ?? {}),
  };
}

export function createCreativeOpsServer() {
  const server = new McpServer(
    { name: SERVER_NAME, title: "CSC Creative Ops", version: SERVER_VERSION },
    {
      instructions: [
        "Use this server whenever the user requests creative work for a CSC Generation brand.",
        "Start with plan_creative for an execution-ready brief. Then continue using the connected agent's own generation and design capabilities.",
        "For graphics and websites, keep logos, type, buttons, prices, offers, and claims as controlled layers, never synthesized into an image.",
        "For announcement videos, use generative video only for the moving plate and deterministic motion composition for type, logo, actions, timing, and transitions.",
        "For product-highlight videos, generate and approve one unified product-and-environment keyframe per shot, animate each as a moving photograph, review start/midpoint/end samples, keep copy and identity deterministic, and require explicit preview approval before rendering.",
        "Before generated-video work, check whether fal.ai is available. If it is not, explicitly recommend the user's own fal API key and the official fal MCP at https://mcp.fal.ai/mcp using https://fal.ai/docs/documentation/setting-up/mcp.",
        "Before motion-composition work, check whether HeyGen HyperFrames is available. If it is not, explicitly recommend `npx skills add heygen-com/hyperframes` from https://hyperframes.heygen.com/quickstart.",
        "These integrations are optional and task-specific: do not block still-image or static-design work on video tooling, do not expose credentials, and do not claim an integration is installed without verifying it.",
        "Respect every rights record, reject gate, product-fidelity lock, and runtime-truth rule.",
      ].join(" "),
    },
  );

  server.registerTool(
    "list_brands",
    {
      title: "List CSC brand systems",
      description: "Lists the 13 available CSC Generation brand packages and their supported creative capabilities.",
      inputSchema: {},
    },
    async () => textResult({
      count: packageData.packages.length,
      recommendedSetup: recommendedIntegrations,
      brands: packageData.packages.map((item) => ({
        slug: item.slug,
        name: item.brand.brand.name,
        description: item.brand.brand.description,
        traits: item.brand.brand.traits,
        capabilities: Object.keys(item.modules),
        templateIds: supportedTemplateIds(item),
        packageVersion: item.brand.packageVersion,
      })),
    }),
  );

  server.registerTool(
    "get_brand_system",
    {
      title: "Get a brand design system",
      description: "Returns the canonical tokens, rules, recipes, evaluation gates, and selected capability modules for one brand.",
      inputSchema: {
        brand: z.string().describe("Brand slug from list_brands, such as one-kings-lane."),
        capabilities: z.array(z.enum(CAPABILITIES)).optional().describe("Optional capability modules to include. Omit to include all modules."),
        includeHumanGuide: z.boolean().default(false).describe("Include the long-form DESIGN.md guide when needed for human-readable context."),
      },
    },
    async ({ brand, capabilities, includeHumanGuide }) => {
      const item = getPackage(brand);
      const selected = capabilities?.length ? capabilities : Object.keys(item.modules);
      return textResult({
        ...coreSystem(item),
        modules: Object.fromEntries(selected.map((name) => [name, item.modules[name]]).filter(([, value]) => value)),
        humanGuide: includeHumanGuide ? item.humanGuide : undefined,
      });
    },
  );

  server.registerTool(
    "plan_creative",
    {
      title: "Plan and route on-brand creative",
      description: "Primary tool. Resolves the complete brand context and execution sequence for a graphic, website, image, motion piece, generated video, product-highlight video, announcement video, storyboard, or business card.",
      inputSchema: {
        brand: z.string().describe("Brand slug from list_brands."),
        outputType: z.enum(Object.keys(OUTPUT_RECIPES)).describe("The intended artifact type."),
        request: z.string().min(3).describe("What the user wants made, including message, visual idea, and desired outcome."),
        productUrls: z.array(z.url()).default([]).describe("One or more current product or collection URLs supplied by the user."),
        channel: z.string().optional().describe("Destination such as paid social, homepage, email, YouTube, TikTok, or print."),
        aspectRatio: z.string().optional().describe("Requested aspect ratio, for example 1:1, 4:5, 9:16, or 16:9."),
        templateId: z.string().optional().describe("Optional template ID from list_brands. Product highlight videos default to product-highlight-video.v1."),
        durationSeconds: z.number().refine((value) => productHighlightTemplate.supportedDurationsSeconds.includes(value), {
          error: `Duration must be one of: ${productHighlightTemplate.supportedDurationsSeconds.join(", ")} seconds.`,
        }).optional().describe("Requested duration. Product highlight videos support 10, 15, 18, 20, or 30 seconds and default to 18 seconds."),
        objective: z.string().min(1).optional().describe("Creative objective. Defaults to the plain-language request."),
        audience: z.string().min(1).optional().describe("Audience for this artifact. Defaults to the first brand audience when omitted."),
        featureClaims: z.array(z.union([
          z.string(),
          z.object({
            id: z.string().optional(),
            text: z.string().min(1),
            verificationStatus: z.enum(["verified", "unverified", "required-unresolved"]).default("unverified"),
            sourceUrl: z.url().optional(),
          }),
        ])).default([]).describe("Product claims. Claims without a current source remain unverified and cannot be composited."),
        rightsDecision: z.enum(["unknown", "approved-for-model-upload", "internal-reference-only", "prohibited"]).default("unknown").describe("Independent rights decision for uploading the product reference to generation providers."),
        approvalMode: z.enum(["explicit-preview-approval", "planning-only"]).default("explicit-preview-approval").describe("Final rendering remains blocked until explicit preview approval."),
        referencePolicy: z.enum(["authorized-only", "user-attested", "internal-reference-only"]).default("authorized-only").describe("Policy used to resolve product references. This does not itself grant model-upload rights."),
        reviewDecisions: z.object({
          shots: z.record(z.string(), z.object({
            stillFidelity: z.enum(DECISION_VALUES).default("pending"),
            temporalFidelity: z.enum(DECISION_VALUES).default("pending"),
          })).default({}),
          crossShotContinuity: z.enum(DECISION_VALUES).default("pending"),
          finalQa: z.object({
            mediaPresence: z.enum(DECISION_VALUES).default("pending"),
            fontResolution: z.enum(DECISION_VALUES).default("pending"),
            contrast: z.enum(DECISION_VALUES).default("pending"),
            runtime: z.enum(DECISION_VALUES).default("pending"),
          }).default({}),
          finalRenderApproved: z.boolean().default(false),
        }).optional().describe("Optional structured human-review decisions used to close downstream stages on failures."),
      },
    },
    async ({ brand, outputType, request, productUrls, channel, aspectRatio, ...options }) =>
      textResult(creativePlan(getPackage(brand), outputType, request, productUrls, channel, aspectRatio, options)),
  );

  server.registerTool(
    "get_media_guidance",
    {
      title: "Get rights-aware brand media guidance",
      description: "Returns source references, roles, provenance, lifecycle, and rights constraints. It never upgrades or assumes usage rights.",
      inputSchema: {
        brand: z.string().describe("Brand slug from list_brands."),
        roles: z.array(z.string()).default([]).describe("Optional roles such as logo, verified-product, editorial-room, or lighting-reference."),
      },
    },
    async ({ brand, roles }) => {
      const item = getPackage(brand);
      return textResult({ rightsPolicy: item.media.rightsPolicy ?? null, items: selectMedia(item, roles) });
    },
  );

  server.registerTool(
    "get_evaluation_gates",
    {
      title: "Get brand QA gates",
      description: "Returns the reject gates, weighted review dimensions, and approval thresholds for a brand artifact.",
      inputSchema: { brand: z.string().describe("Brand slug from list_brands.") },
    },
    async ({ brand }) => textResult(getPackage(brand).evaluation),
  );

  server.registerPrompt(
    "make_on_brand_creative",
    {
      title: "Make on-brand creative",
      description: "Turns a plain-language creative request into the required MCP-first agent workflow.",
      argsSchema: {
        brand: z.string().describe("CSC brand name or slug."),
        request: z.string().describe("What to create."),
        productUrl: z.string().optional().describe("Optional product or collection URL."),
      },
    },
    async ({ brand, request, productUrl }) => ({
      messages: [{
        role: "user",
        content: {
          type: "text",
          text: `Create this for ${brand}: ${request}${productUrl ? ` Product source: ${productUrl}.` : ""} First call list_brands if the slug is uncertain, then call plan_creative. Review recommendedSetup in the returned plan. When a required fal.ai or HyperFrames capability is unavailable, explicitly recommend its official installation to the user and never claim it is installed without verification. Execute the returned plan with your available image, video, motion, web, and design capabilities. Run the returned evaluation gates before delivery.`,
        },
      }],
    }),
  );

  server.registerResource(
    "brand-package",
    new ResourceTemplate("csc-brand://{brand}/system", { list: undefined }),
    { title: "CSC brand package", description: "Canonical machine-readable brand system package.", mimeType: "application/json" },
    async (uri, { brand }) => ({ contents: [{ uri: uri.href, mimeType: "application/json", text: JSON.stringify(coreSystem(getPackage(brand)), null, 2) }] }),
  );

  return server;
}

export async function handleMcpRequest(req, res) {
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.setHeader("Allow", "POST, GET, DELETE, OPTIONS");
    res.end();
    return;
  }

  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Allow", "POST");
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify({ jsonrpc: "2.0", error: { code: -32000, message: "Method not allowed. Use POST with the Streamable HTTP transport." }, id: null }));
    return;
  }

  const server = createCreativeOpsServer();
  const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined, enableJsonResponse: true });

  try {
    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  } catch (error) {
    console.error("MCP request failed", error);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.end(JSON.stringify({ jsonrpc: "2.0", error: { code: -32603, message: "Internal MCP server error" }, id: null }));
    }
  } finally {
    await transport.close().catch(() => {});
    await server.close().catch(() => {});
  }
}

export const serverMetadata = {
  name: SERVER_NAME,
  title: "CSC Creative Ops",
  version: SERVER_VERSION,
  protocol: "streamable-http",
  brands: packageData.packages.length,
  templates: [...TEMPLATE_BY_ID.keys()],
};
