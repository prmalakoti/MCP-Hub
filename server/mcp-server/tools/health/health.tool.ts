import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { HealthService } from './health.service';

export function registerHealthTool(server: McpServer) {
    const healthService = new HealthService();

    server.registerTool(
        'health',
        {
            title: 'Health Check',
            description: 'Returns MCP server health status',
        },
        async () => {
            const result = healthService.getHealth();

            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify(result),
                    },
                ],
            };
        },
    );
}