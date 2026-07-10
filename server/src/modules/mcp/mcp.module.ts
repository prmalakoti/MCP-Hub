import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MCPService } from './mcp.service';
import { MCPServer } from './mcp.server';
import { McpController } from './mcp.controller';
import { McpServer } from './entities/mcp-server.entity';
import { ProcessManagerService } from './process/process-manager.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([McpServer]),
    ],
    controllers: [McpController],
    providers: [
        MCPService,
        MCPServer,
        ProcessManagerService,
    ],
    exports: [
        MCPService,
        MCPServer,
        ProcessManagerService,
    ],
})
export class MCPModule { }