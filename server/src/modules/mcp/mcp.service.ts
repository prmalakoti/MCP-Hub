import {
    Injectable,
    Logger,
    OnModuleInit,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MCPServer } from './mcp.server';
import { ProcessManagerService } from './process/process-manager.service';

import { McpServer } from './entities/mcp-server.entity';

import { CreateMcpServerDto } from './dto/create-mcp-server.dto';
import { UpdateMcpServerDto } from './dto/update-mcp-server.dto';

import { ServerStatus } from './enums/server-status.enum';

@Injectable()
export class MCPService implements OnModuleInit {
    private readonly logger = new Logger(MCPService.name);

    constructor(
        private readonly mcpServer: MCPServer,

        private readonly processManager: ProcessManagerService,

        @InjectRepository(McpServer)
        private readonly repository: Repository<McpServer>,
    ) { }

    onModuleInit(): void {
        this.logger.log('Initializing MCP Service...');

        this.mcpServer.initialize();

        this.processManager.setExitCallback(
            async (serverId: number) => {
                const server = await this.repository.findOneBy({
                    id: serverId,
                });

                if (!server) {
                    return;
                }

                server.status = ServerStatus.STOPPED;
                server.pid = null;

                await this.repository.save(server);

                this.logger.log(
                    `Server ${serverId} status updated to STOPPED`,
                );
            },
        );

        this.logger.log('MCP Service Initialized');
    }

    async create(dto: CreateMcpServerDto): Promise<McpServer> {
        const server = this.repository.create(dto);

        return this.repository.save(server);
    }

    async findAll(): Promise<McpServer[]> {
        return this.repository.find();
    }

    async findOne(id: number): Promise<McpServer> {
        const server = await this.repository.findOneBy({ id });

        if (!server) {
            throw new NotFoundException(
                `MCP Server with ID ${id} not found`,
            );
        }

        return server;
    }

    async update(
        id: number,
        dto: UpdateMcpServerDto,
    ): Promise<McpServer> {
        await this.findOne(id);

        await this.repository.update(id, dto);

        return this.findOne(id);
    }

    async remove(id: number) {
        await this.findOne(id);

        await this.repository.delete(id);

        return {
            message: 'MCP Server deleted successfully',
        };
    }

    async startServer(id: number) {
        const server = await this.findOne(id);

        if (this.processManager.isRunning(id)) {
            throw new BadRequestException(
                'MCP Server is already running',
            );
        }

        const child = this.processManager.start(
            server.id,
            server.command,
            server.args,
        );

        server.status = ServerStatus.RUNNING;
        server.pid = child.pid ?? null;

        await this.repository.save(server);

        this.logger.log(
            `Started MCP Server '${server.name}' (PID: ${child.pid})`,
        );

        return {
            message: 'MCP Server started successfully',
            serverId: server.id,
            serverName: server.name,
            pid: child.pid,
            status: server.status,
        };
    }

    async stopServer(id: number) {
        const server = await this.findOne(id);

        if (!server) {
            throw new NotFoundException(
                'MCP Server not found',
            );
        }

        const stopped = this.processManager.stop(id);

        if (!stopped) {
            throw new BadRequestException(
                'MCP Server is not running',
            );
        }

        server.status = ServerStatus.STOPPED;
        server.pid = null;

        await this.repository.save(server);

        return {
            message: 'MCP Server stopped successfully',
            serverId: server.id,
        };
    }

    async restartServer(id: number) {
        const server = await this.findOne(id);

        if (!server) {
            throw new NotFoundException(
                'MCP Server not found',
            );
        }

        if (this.processManager.isRunning(id)) {
            this.processManager.stop(id);
        }

        const child = this.processManager.start(
            server.id,
            server.command,
            server.args,
        );

        server.status = ServerStatus.RUNNING;
        server.pid = child.pid ?? null;

        await this.repository.save(server);

        return {
            message: 'MCP Server restarted successfully',
            serverId: server.id,
            pid: child.pid,
            status: server.status,
        };
    }
}