import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MCPModule } from './modules/mcp/mcp.module';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), MCPModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
