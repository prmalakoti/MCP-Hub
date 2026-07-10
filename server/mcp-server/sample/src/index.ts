import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const server = new McpServer({
    name: 'sample-mcp-server',
    version: '1.0.0',
});

server.registerTool(
    'echo',
    {
        title: 'Echo Tool',
        description: 'Returns the same message back',
        inputSchema: {
            message: z.string(),
        },
    },
    async ({ message }) => {
        return {
            content: [
                {
                    type: 'text',
                    text: `Echo: ${message}`,
                },
            ],
        };
    },
);

server.registerTool(
    'time',
    {
        title: 'Current Time',
        description: 'Returns current server time',
        inputSchema: {},
    },
    async () => {
        return {
            content: [
                {
                    type: 'text',
                    text: new Date().toISOString(),
                },
            ],
        };
    },
);

async function main() {
    const transport = new StdioServerTransport();

    await server.connect(transport);

    console.error('Sample MCP Server Started');
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});