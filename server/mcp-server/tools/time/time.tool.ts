import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { TimeService } from './time.service';

export function registerTimeTool(server: McpServer) {
    const timeService = new TimeService();

    server.registerTool(
        'current_time',
        {
            title: 'Current Time',
            description: 'Returns the current server time',
        },
        async () => ({
            content: [
                {
                    type: 'text',
                    text: timeService.now(),
                },
            ],
        }),
    );
}