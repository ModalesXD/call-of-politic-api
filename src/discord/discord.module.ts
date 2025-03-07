import { Module } from '@nestjs/common';
import { AppService } from '../app.service';
import { DiscordController } from './discord.controller';
import { DiscordService } from './discord.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DiscordController],
  providers: [DiscordService, AppService],
  exports: [AppService]
})
export class DiscordModule {}
