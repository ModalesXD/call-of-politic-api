import { Module } from '@nestjs/common';
import { AppModule } from '../../app.module';
import { NpcController } from './npc.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule, AppModule],
  controllers: [NpcController]
})
export class NpcModule {}
