import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
} from '@nestjs/common';

import { MCPService } from './mcp.service';
import { CreateMcpServerDto } from './dto/create-mcp-server.dto';
import { UpdateMcpServerDto } from './dto/update-mcp-server.dto';

@Controller('mcp')
export class McpController {
    constructor(
        private readonly mcpService: MCPService,
    ) { }

    @Post()
    create(@Body() dto: CreateMcpServerDto) {
        return this.mcpService.create(dto);
    }

    @Get()
    findAll() {
        return this.mcpService.findAll();
    }

    @Get(':id')
    findOne(
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.mcpService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateMcpServerDto,
    ) {
        return this.mcpService.update(id, dto);
    }

    @Delete(':id')
    remove(
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.mcpService.remove(id);
    }

    @Post(':id/start')
    startServer(
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.mcpService.startServer(id);
    }

    @Post(':id/stop')
    stopServer(
        @Param('id', ParseIntPipe)
        id: number,
    ) {
        return this.mcpService.stopServer(id);
    }

    @Post(':id/restart')
    restartServer(
        @Param('id', ParseIntPipe)
        id: number,
    ) {
        return this.mcpService.restartServer(id);
    }

}