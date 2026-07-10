import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { ServerStatus } from '../enums/server-status.enum';

@Entity('mcp_servers')
export class McpServer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column()
    transport: string;

    @Column()
    command: string;

    @Column('simple-array')
    args: string[];

    @Column({
        type: 'enum',
        enum: ServerStatus,
        default: ServerStatus.REGISTERED,
    })
    status: ServerStatus;

    @Column({
        type: 'int',
        nullable: true,
    })
    pid: number | null;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}