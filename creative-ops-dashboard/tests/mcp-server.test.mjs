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
    assert(payload.brands.some((brand) => brand.slug === "one-kings-lane"));
    assert(payload.recommendedSetup.some((integration) =>
      integration.id === "fal-ai"
      && integration.mcp.url === "https://mcp.fal.ai/mcp"
      && integration.optional === true
    ));
    assert(payload.recommendedSetup.some((integration) =>
      integration.id === "hyperframes"
      && integration.install.recommended === "npx skills add heygen-com/hyperframes"
      && integration.optional === true
    ));
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
  assert(response.payload.install.codex.includes(response.payload.endpoint));
  assert.deepEqual(response.payload.recommendedSetup.map((integration) => integration.id), ["fal-ai", "hyperframes"]);
  assert.equal(response.payload.recommendedSetup[0].apiKeyUrl, "https://fal.ai/dashboard/keys");
  assert.equal(response.payload.recommendedSetup[1].docsUrl, "https://hyperframes.heygen.com/quickstart");
  assert(!JSON.stringify(response.payload).includes("Personal API Keys"));
  assert(!JSON.stringify(response.payload).includes("localhost"));
  assert(!JSON.stringify(response.payload).includes("csc-creative-ops.vercel.app"));
});
