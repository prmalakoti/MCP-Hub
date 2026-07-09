import { Module } from '@nestjs/common';
import { MCPService } from './mcp.service';
import { MCPServer } from './mcp.server';

@Module({
  providers: [MCPService, MCPServer],
  exports: [MCPService, MCPServer],
})
export class MCPModule { }