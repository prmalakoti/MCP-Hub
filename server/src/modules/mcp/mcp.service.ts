import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { MCPServer } from './mcp.server';

@Injectable()
export class MCPService implements OnModuleInit {
    private readonly logger = new Logger(MCPService.name);

    constructor(private readonly mcpServer: MCPServer) { }

    onModuleInit(): void {
        this.logger.log('Initializing MCP Service...');

        this.mcpServer.initialize();

        this.logger.log('MCP Service Initialized');
    }
}