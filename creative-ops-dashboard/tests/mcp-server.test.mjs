import assert from "node:assert/strict";
import { createServer } from "node:http";
import { after, before, test } from "node:test";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { handleMcpRequest } from "../mcp/server.mjs";

let httpServer;
let endpoint;

before(async () => {
  httpServer = createServer((req, res) => handleMcpRequest(req, res));
  await new Promise((resolve) => httpServer.listen(0, "127.0.0.1", resolve));
  const address = httpServer.address();
  endpoint = new URL(`http://127.0.0.1:${address.port}/api/mcp`);
});

after(async () => {
  await new Promise((resolve, reject) => httpServer.close((error) => error ? reject(error) : resolve()));
});

async function withClient(run) {
  const client = new Client({ name: "csc-mcp-test", version: "1.0.0" });
  await client.connect(new StreamableHTTPClientTransport(endpoint));
  try {
    return await run(client);
  } finally {
    await client.close();
  }
}

test("publishes the five production tools", async () => {
  await withClient(async (client) => {
    const { tools } = await client.listTools();
    assert.deepEqual(
      tools.map((tool) => tool.name).sort(),
      ["get_brand_system", "get_evaluation_gates", "get_media_guidance", "list_brands", "plan_creative"],
    );
  });
});

test("lists all 13 brands", async () => {
  await withClient(async (client) => {
    const result = await client.callTool({ name: "list_brands", arguments: {} });
    const payload = JSON.parse(result.content[0].text);
    assert.equal(payload.count, 13);
    const oneKingsLane = payload.brands.find((brand) => brand.slug === "one-kings-lane");
    assert(oneKingsLane);
    assert(oneKingsLane.templateIds.includes("product-highlight-video.v1"));
    assert(payload.recommendedSetup.some((integration) =>
      integration.id === "fal-ai"
      && integration.mcp.url === "https://mcp.fal.ai/mcp"
      && integration.optional === true
    ));
    assert(payload.recommendedSetup.some((integration) =>
      integration.id === "hyperframes"
      && integration.install.recommended === "npx skills add heygen-com/hyperframes --full-depth"
      && integration.install.refresh === "npx hyperframes skills update"
      && integration.optional === true
    ));
  });
});

test("product-highlight plans return a complete four-shot execution contract", async () => {
  await withClient(async (client) => {
    const result = await client.callTool({
      name: "plan_creative",
      arguments: {
        brand: "one-kings-lane",
        outputType: "product-highlight-video",
        templateId: "product-highlight-video.v1",
        request: "Create an 18-second cinematic product highlight.",
        productUrls: ["https://www.onekingslane.com/example-product"],
        channel: "YouTube",
        aspectRatio: "16:9",
        durationSeconds: 18,
        rightsDecision: "approved-for-model-upload",
        featureClaims: [
          { text: "Distinctive sculptural profile", verificationStatus: "verified", sourceUrl: "https://www.onekingslane.com/example-product" },
          { text: "A graceful decorative presence", verificationStatus: "verified", sourceUrl: "https://www.onekingslane.com/example-product" },
          { text: "Refined craftsmanship", verificationStatus: "verified", sourceUrl: "https://www.onekingslane.com/example-product" },
          { text: "Designed for collected interiors", verificationStatus: "verified", sourceUrl: "https://www.onekingslane.com/example-product" },
        ],
      },
    });
    const payload = JSON.parse(result.content[0].text);

    assert.equal(payload.status, "ready-for-keyframe-generation");
    assert.equal(payload.templateContract.id, "product-highlight-video.v1");
    assert.deepEqual(payload.capabilityOrder, [
      "generative-image",
      "generative-video",
      "motion",
      "sequential",
      "imagery",
      "commerce",
      "marketing",
    ]);
    assert.equal(payload.shotPlan.length, 4);
    assert.deepEqual(payload.shotPlan.map((shot) => shot.id), ["distinction", "benefit", "proof", "context-resolve"]);
    assert.equal(payload.shotPlan.at(-1).duration.end, 18);
    assert(payload.shotPlan.every((shot) => shot.authorizedReferenceSelectors.length > 0));
    assert(payload.shotPlan.every((shot) => shot.lockedProductInvariants.length > 0));
    assert(payload.shotPlan.every((shot) => shot.editableSceneVariables.length > 0));
    assert(payload.shotPlan.every((shot) => shot.overlaySpec.deterministic === true));
    assert(payload.shotPlan.every((shot) => shot.sampleTimes.join(",") === "start,midpoint,end"));
    assert.equal(payload.generationPolicy.oneGeneratedKeyframePerShot, true);
    assert.equal(payload.generationPolicy.cutoutCompositeDefault, false);
    assert.equal(payload.typographyResolution.renderSafeFamilies.display.family, "EB Garamond");
    assert.equal(payload.typographyResolution.renderSafeFamilies.support.family, "Inter");
    assert.equal(payload.renderPolicy.status, "blocked");
    assert(payload.gateState.blockedStages.includes("final-render"));
    assert.deepEqual(payload.recommendedSetup.map((integration) => integration.id), ["fal-ai", "hyperframes"]);

    const permanentBrandContext = JSON.stringify({ core: payload.core, modules: payload.modules }).toLowerCase();
    assert(!permanentBrandContext.includes("fal.ai"));
    assert(!permanentBrandContext.includes("hyperframes"));
    assert(!permanentBrandContext.includes("gpt image"));
  });
});

test("product-highlight generation closes when a product source or model-upload decision is missing", async () => {
  await withClient(async (client) => {
    const missingSourceResult = await client.callTool({
      name: "plan_creative",
      arguments: {
        brand: "one-kings-lane",
        outputType: "product-highlight-video",
        request: "Create a product highlight video.",
        rightsDecision: "approved-for-model-upload",
      },
    });
    const missingSource = JSON.parse(missingSourceResult.content[0].text);
    assert.equal(missingSource.status, "blocked-missing-product-source");
    assert(missingSource.gateState.blockedStages.includes("generate-keyframes"));

    const unknownRightsResult = await client.callTool({
      name: "plan_creative",
      arguments: {
        brand: "one-kings-lane",
        outputType: "product-highlight-video",
        request: "Create a product highlight video.",
        productUrls: ["https://www.onekingslane.com/example-product"],
      },
    });
    const unknownRights = JSON.parse(unknownRightsResult.content[0].text);
    assert.equal(unknownRights.status, "blocked-pending-model-upload-rights");
    assert.equal(unknownRights.gateState.modelUploadRights, "unknown");
    assert(unknownRights.gateState.blockedStages.includes("animate-keyframes"));
  });
});

test("failed still or temporal decisions block downstream product-highlight stages", async () => {
  await withClient(async (client) => {
    const result = await client.callTool({
      name: "plan_creative",
      arguments: {
        brand: "one-kings-lane",
        outputType: "product-highlight-video",
        request: "Create a product highlight video.",
        productUrls: ["https://www.onekingslane.com/example-product"],
        rightsDecision: "approved-for-model-upload",
        featureClaims: [
          { text: "Verified distinction", verificationStatus: "verified", sourceUrl: "https://www.onekingslane.com/example-product" },
          { text: "Verified benefit", verificationStatus: "verified", sourceUrl: "https://www.onekingslane.com/example-product" },
          { text: "Verified proof", verificationStatus: "verified", sourceUrl: "https://www.onekingslane.com/example-product" },
          { text: "Verified context", verificationStatus: "verified", sourceUrl: "https://www.onekingslane.com/example-product" },
        ],
        reviewDecisions: {
          shots: {
            distinction: { stillFidelity: "fail", temporalFidelity: "pending" },
            benefit: { stillFidelity: "pass", temporalFidelity: "fail" },
          },
          crossShotContinuity: "fail",
          finalRenderApproved: true,
        },
      },
    });
    const payload = JSON.parse(result.content[0].text);
    assert.equal(payload.status, "blocked-fidelity-failure");
    assert.equal(payload.gateState.keyframeFidelity, "fail");
    assert.equal(payload.gateState.temporalContinuity, "fail");
    assert.equal(payload.gateState.crossShotContinuity, "fail");
    assert(payload.gateState.blockedStages.includes("animate-keyframes"));
    assert(payload.gateState.blockedStages.includes("compose-motion"));
    assert(payload.gateState.blockedStages.includes("final-render"));
  });
});

test("final rendering opens only after every review decision and explicit approval pass", async () => {
  await withClient(async (client) => {
    const passedShot = { stillFidelity: "pass", temporalFidelity: "pass" };
    const result = await client.callTool({
      name: "plan_creative",
      arguments: {
        brand: "one-kings-lane",
        outputType: "product-highlight-video",
        request: "Create a product highlight video.",
        productUrls: ["https://www.onekingslane.com/example-product"],
        rightsDecision: "approved-for-model-upload",
        featureClaims: [
          { text: "Verified distinction", verificationStatus: "verified", sourceUrl: "https://www.onekingslane.com/example-product" },
          { text: "Verified benefit", verificationStatus: "verified", sourceUrl: "https://www.onekingslane.com/example-product" },
          { text: "Verified proof", verificationStatus: "verified", sourceUrl: "https://www.onekingslane.com/example-product" },
          { text: "Verified context", verificationStatus: "verified", sourceUrl: "https://www.onekingslane.com/example-product" },
        ],
        reviewDecisions: {
          shots: {
            distinction: passedShot,
            benefit: passedShot,
            proof: passedShot,
            "context-resolve": passedShot,
          },
          crossShotContinuity: "pass",
          finalQa: {
            mediaPresence: "pass",
            fontResolution: "pass",
            contrast: "pass",
            runtime: "pass",
          },
          finalRenderApproved: true,
        },
      },
    });
    const payload = JSON.parse(result.content[0].text);
    assert.equal(payload.gateState.keyframeFidelity, "pass");
    assert.equal(payload.gateState.temporalContinuity, "pass");
    assert.equal(payload.gateState.crossShotContinuity, "pass");
    assert(!payload.gateState.blockedStages.includes("final-render"));
    assert.equal(payload.renderPolicy.status, "approved-to-render");
  });
});

test("the provider-neutral product-highlight template resolves for another CSC brand", async () => {
  await withClient(async (client) => {
    const result = await client.callTool({
      name: "plan_creative",
      arguments: {
        brand: "backcountry",
        outputType: "product-highlight-video",
        request: "Create a product highlight video.",
        productUrls: ["https://www.backcountry.com/example-product"],
      },
    });
    const payload = JSON.parse(result.content[0].text);
    assert.equal(payload.templateContract.id, "product-highlight-video.v1");
    assert.equal(payload.shotPlan.length, 4);
    assert.equal(payload.brand.name, "Backcountry");
    assert.equal(payload.status, "blocked-pending-model-upload-rights");
  });
});

test("announcement plans route through image, Fal-compatible video, and deterministic motion guidance", async () => {
  await withClient(async (client) => {
    const result = await client.callTool({
      name: "plan_creative",
      arguments: {
        brand: "one-kings-lane",
        outputType: "announcement-video",
        request: "Announce a new outdoor collection with a quiet cinematic reveal.",
        productUrls: ["https://www.onekingslane.com/example-product"],
        channel: "Instagram",
        aspectRatio: "9:16",
      },
    });
    const payload = JSON.parse(result.content[0].text);
    assert.equal(payload.brand.name, "One Kings Lane");
    assert(payload.capabilityOrder.includes("generative-video"));
    assert(payload.capabilityOrder.includes("motion"));
    assert(payload.executionStages.some((stage) => stage.includes("Fal")));
    assert(payload.executionStages.some((stage) => stage.includes("HyperFrames")));
    assert.deepEqual(payload.recommendedSetup.map((integration) => integration.id), ["fal-ai", "hyperframes"]);
    assert(payload.recommendedSetup.every((integration) => integration.agentAction.includes("explicitly recommend")));
    assert.equal(payload.completionPolicy.rejectOnProductIdentityDrift, true);
  });
});

test("static graphics do not require video integrations", async () => {
  await withClient(async (client) => {
    const result = await client.callTool({
      name: "plan_creative",
      arguments: {
        brand: "one-kings-lane",
        outputType: "graphic",
        request: "Create a static product launch graphic.",
      },
    });
    const payload = JSON.parse(result.content[0].text);
    assert.deepEqual(payload.recommendedSetup, []);
  });
});

test("public install metadata never derives the MCP URL from a local or protected request host", async () => {
  const manifestModule = await import("../api/mcp-manifest.mjs");
  const response = {
    payload: null,
    setHeader() {},
    status() { return this; },
    json(payload) { this.payload = payload; },
  };

  manifestModule.default({ headers: { host: "localhost:4173" } }, response);
  assert.equal(response.payload.endpoint, "https://creative-ops-dashboard-psi.vercel.app/api/mcp");
  assert.equal(response.payload.version, "1.2.1");
  assert(response.payload.templates.includes("product-highlight-video.v1"));
  assert(response.payload.install.codex.includes(response.payload.endpoint));
  assert.deepEqual(response.payload.recommendedSetup.map((integration) => integration.id), ["fal-ai", "hyperframes"]);
  assert.equal(response.payload.recommendedSetup[0].apiKeyUrl, "https://fal.ai/dashboard/keys");
  assert.equal(response.payload.recommendedSetup[1].docsUrl, "https://hyperframes.heygen.com/quickstart");
  assert(!JSON.stringify(response.payload).includes("Personal API Keys"));
  assert(!JSON.stringify(response.payload).includes("/Users/"));
  assert(!JSON.stringify(response.payload).includes("localhost"));
  assert(!JSON.stringify(response.payload).includes("csc-creative-ops.vercel.app"));
});
