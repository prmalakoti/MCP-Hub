import { Injectable, Logger } from '@nestjs/common';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { HealthTool } from './tools/health.tool';

@Injectable()
export class MCPServer {
    private readonly logger = new Logger(MCPServer.name);

    private readonly server: McpServer;

    private readonly healthTool = new HealthTool();

    constructor() {
        this.server = new McpServer({
            name: 'mcp-hub',
            version: '1.0.0',
        });

        this.logger.log('MCP Server created');
    }

    getServer(): McpServer {
        return this.server;
    }

    initialize(): void {
        this.logger.log('Initializing MCP Server...');

        this.registerTools();

        this.logger.log('MCP Server Ready');
    }

    private registerTools(): void {
        this.server.registerTool(
            'health',
            {
                title: 'Health Check',
                description: 'Returns MCP server health status',
            },
            async () => {
                const result = this.healthTool.execute();

                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify(result, null, 2),
                        },
                    ],
                };
            },
        );

        this.logger.log('Registered tool: health');
    }
}