import {
    IsArray,
    IsOptional,
    IsString,
} from 'class-validator';

export class CreateMcpServerDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsString()
    transport: string;

    @IsString()
    command: string;

    @IsArray()
    args: string[];
}