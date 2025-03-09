import { Module } from '@nestjs/common';
import { RankController } from './controllers/rank.controller';
import { VoteController } from './controllers/vote.controller';
import { PlayerController } from '../entity/controllers/player.controller';
import { IdeologyController } from './controllers/ideology.controller';
import { ElectionsController } from './controllers/elections.controller';

import { AppService } from 'src/app.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [
    RankController,
    VoteController,
    PlayerController,
    IdeologyController,
    ElectionsController,
  ],
  providers: [AppService]
})
export class PoliticsModule {}
