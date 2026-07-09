import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { registerTools } from './register-tools';

async function bootstrap() {
    const server = new McpServer({
        name: 'mcp-hub',
        version: '1.0.0',
    });

    registerTools(server);

    const transport = new StdioServerTransport();

    await server.connect(transport);

    console.error('🚀 MCP Server is running on STDIO');
}

bootstrap().catch((err) => {
    console.error(err);
    process.exit(1);
});