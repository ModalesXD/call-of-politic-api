import { Module } from '@nestjs/common';
import { AppModule } from '../../app.module';
import { PlayerController } from './player.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [AppModule, PrismaModule],
  controllers: [PlayerController]
})
export class PlayerModule {}
