import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import * as z from "zod/v4";
import packageData from "./brand-packages.generated.json" with { type: "json" };

const SERVER_NAME = "csc-creative-ops";
const SERVER_VERSION = "1.1.0";
export const recommendedIntegrations = [
  {
    id: "fal-ai",
    name: "fal.ai API + MCP",
    optional: true,
    appliesTo: ["generative-video", "announcement-video", "storyboard"],
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
    appliesTo: ["motion-video", "announcement-video", "storyboard"],
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

function recommendedSetupFor(outputType) {
  return recommendedIntegrations
    .filter((integration) => integration.appliesTo.includes(outputType))
    .map((integration) => ({
      ...integration,
      agentAction: `Check whether ${integration.name} is available. If it is unavailable and this capability is required, explicitly recommend the official setup to the user before execution. Do not claim it is installed until verified.`,
    }));
}

function creativePlan(item, outputType, request, productUrls = [], channel, aspectRatio) {
  const capabilities = OUTPUT_RECIPES[outputType];
  const modules = Object.fromEntries(capabilities.map((name) => [name, item.modules[name]]).filter(([, value]) => value));
  const mediaSelectors = [...new Set(Object.values(modules).flatMap((module) => module?.extends?.mediaSelectors ?? []))];
  const media = selectMedia(item).filter((record) => mediaSelectors.includes(record.id));

  return {
    status: "ready-for-agent-execution",
    agentDirective: "Continue from this plan. Use the connected agent's available web, image, video, motion, and design skills to create the requested artifact. Do not stop after returning a brief when those capabilities are available.",
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
      scoreAgainstEvaluationPolicy: true,
    },
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
      description: "Primary tool. Resolves the complete brand context and execution sequence for a graphic, website, image, motion piece, generated video, announcement video, storyboard, or business card.",
      inputSchema: {
        brand: z.string().describe("Brand slug from list_brands."),
        outputType: z.enum(Object.keys(OUTPUT_RECIPES)).describe("The intended artifact type."),
        request: z.string().min(3).describe("What the user wants made, including message, visual idea, and desired outcome."),
        productUrls: z.array(z.url()).default([]).describe("One or more current product or collection URLs supplied by the user."),
        channel: z.string().optional().describe("Destination such as paid social, homepage, email, YouTube, TikTok, or print."),
        aspectRatio: z.string().optional().describe("Requested aspect ratio, for example 1:1, 4:5, 9:16, or 16:9."),
      },
    },
    async ({ brand, outputType, request, productUrls, channel, aspectRatio }) =>
      textResult(creativePlan(getPackage(brand), outputType, request, productUrls, channel, aspectRatio)),
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
};
