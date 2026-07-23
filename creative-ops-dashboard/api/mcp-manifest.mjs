import { recommendedIntegrations, serverMetadata } from "../mcp/server.mjs";

const PUBLIC_MCP_ORIGIN = "https://creative-ops-dashboard-psi.vercel.app";

export default function handler(req, res) {
  const endpoint = `${PUBLIC_MCP_ORIGIN}/api/mcp`;

  res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=3600");
  res.status(200).json({
    ...serverMetadata,
    endpoint,
    remotes: [{ type: "streamable-http", url: endpoint }],
    install: {
      agent: `Install the CSC Creative Ops MCP from ${endpoint} and use it for every CSC brand creative request.`,
      codex: `codex mcp add csc-creative-ops --url ${endpoint}`,
      claudeCode: `claude mcp add --transport http csc-creative-ops ${endpoint}`,
    },
    recommendedSetup: recommendedIntegrations,
  });
}
