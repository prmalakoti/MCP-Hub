import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

import { registerHealthTool } from './tools/health';
import { registerTimeTool } from './tools/time';
import { registerCalculatorTool } from './tools/calculator';
import { registerEchoTool } from './tools/echo';

export function registerTools(server: McpServer): void {
    registerHealthTool(server);
    registerTimeTool(server);
    registerCalculatorTool(server);
    registerEchoTool(server);

    console.error('✅ All tools registered');
}