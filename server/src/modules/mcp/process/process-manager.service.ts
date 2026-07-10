import {
    Injectable,
    Logger,
} from '@nestjs/common';

import {
    ChildProcess,
    spawn,
} from 'child_process';

@Injectable()
export class ProcessManagerService {
    private readonly logger = new Logger(ProcessManagerService.name);

    private readonly processes = new Map<number, ChildProcess>();

    private onExitCallback?: (serverId: number) => Promise<void>;

    setExitCallback(
        callback: (serverId: number) => Promise<void>,
    ) {
        this.onExitCallback = callback;
    }

    start(
        serverId: number,
        command: string,
        args: string[],
    ): ChildProcess {
        this.logger.log(`Starting MCP Server ${serverId}`);

        const child = spawn(command, args, {
            shell: true,
            cwd: process.cwd(),
        });

        this.processes.set(serverId, child);

        child.stdout?.on('data', (data) => {
            this.logger.log(
                `[${serverId}] ${data.toString().trim()}`,
            );
        });

        child.stderr?.on('data', (data) => {
            this.logger.error(
                `[${serverId}] ${data.toString().trim()}`,
            );
        });

        child.on('exit', async (code) => {
            this.logger.warn(
                `MCP Server ${serverId} exited with code ${code}`,
            );

            this.processes.delete(serverId);

            if (this.onExitCallback) {
                await this.onExitCallback(serverId);
            }
        });

        return child;
    }

    stop(serverId: number): boolean {
        const child = this.processes.get(serverId);

        if (!child) {
            return false;
        }

        child.kill();

        this.processes.delete(serverId);

        this.logger.log(`Stopped MCP Server ${serverId}`);

        return true;
    }

    restart(
        serverId: number,
        command: string,
        args: string[],
    ): ChildProcess {
        this.stop(serverId);

        return this.start(serverId, command, args);
    }

    isRunning(serverId: number): boolean {
        return this.processes.has(serverId);
    }

    get(serverId: number): ChildProcess | undefined {
        return this.processes.get(serverId);
    }
}