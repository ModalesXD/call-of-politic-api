import { Module } from '@nestjs/common';
import { AppModule } from '../app.module';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { PlayerModule } from './player/player.module';
import { RankModule } from './rank/rank.module';
import { EventsModule } from './events/events.module';
import { AnuncesModule } from './anunces/anunces.module';
import { ConfigModule } from './config/config.module';
import { NpcModule } from './npc/npc.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    AppModule,
    PlayerModule,
    RankModule,
    EventsModule,
    AnuncesModule,
    ConfigModule,
    NpcModule
  ],
  controllers: [GameController],
  providers: [GameService]
})
export class GameModule {}
