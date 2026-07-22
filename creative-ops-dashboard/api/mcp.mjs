import { handleMcpRequest } from "../mcp/server.mjs";

export const config = { maxDuration: 60 };

export default async function handler(req, res) {
  await handleMcpRequest(req, res);
}
