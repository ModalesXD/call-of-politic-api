import { Module } from '@nestjs/common';
import { AppModule } from '../../app.module';
import { RankController } from './rank.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [AppModule, PrismaModule],
  controllers: [RankController]
})
export class RankModule {}
