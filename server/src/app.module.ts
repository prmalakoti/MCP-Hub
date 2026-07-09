import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MCPModule } from './modules/mcp/mcp.module';

@Module({
  imports: [MCPModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
