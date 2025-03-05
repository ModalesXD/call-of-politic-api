import { Module } from '@nestjs/common';
import { RankModule } from './rank/rank.module';
import { NpcModule } from './npc/npc.module';

@Module({
  imports: [RankModule, NpcModule]
})
export class GameModule {}
