import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const client = new Client({
    name: "mcp-hub-client",
    version: "1.0.0",
});

async function main() {
    const transport = new StdioClientTransport({
        command: "npx",
        args: ["ts-node", "mcp-server/main.ts"],
    });

    await client.connect(transport);

    console.log("✅ Connected to MCP Server");

    // Discover all tools
    const tools = await client.listTools();

    console.log("\n📦 Available Tools:");

    const result = await client.callTool({
        name: "health",
        arguments: {},
    });

    console.log("\n📨 Tool Response:");
    console.dir(result, { depth: null });


    tools.tools.forEach((tool) => {
        console.log(`- ${tool.name}`);
        console.log(`  Description: ${tool.description}`);
    });
}

main().catch(console.error);