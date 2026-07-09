import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

import { EchoService } from './echo.service';
import { EchoSchema } from './echo.schema';

export function registerEchoTool(server: McpServer) {
    const echoService = new EchoService();

    server.registerTool(
        'echo',
        {
            title: 'Echo',
            description: 'Echo back the provided message',
            inputSchema: EchoSchema,
        },
        async ({ message }) => {
            const result = echoService.echo(message);

            return {
                content: [
                    {
                        type: 'text',
                        text: result,
                    },
                ],
            };
        },
    );
}