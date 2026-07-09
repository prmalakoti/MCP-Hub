import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

import { CalculatorService } from './calculator.service';
import { CalculatorSchema } from './calculator.schema';

export function registerCalculatorTool(server: McpServer) {
    const calculatorService = new CalculatorService();

    server.registerTool(
        'calculator',
        {
            title: 'Calculator',
            description: 'Performs addition of two numbers',
            inputSchema: CalculatorSchema,
        },
        async ({ a, b }) => {
            const result = calculatorService.add(a, b);

            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify({
                            operation: 'addition',
                            a,
                            b,
                            result,
                        }),
                    },
                ],
            };
        },
    );
}