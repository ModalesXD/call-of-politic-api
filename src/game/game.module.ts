import { Module } from '@nestjs/common';

import { PoliticsModule } from './politics/politics.module';
import { CommerceModule } from './commerce/commerce.module';
import { ConfigModule } from './config/config.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AppService } from 'src/app.service';
import { EntityModule } from './entity/entity.module';
import { EventsModule } from './events/events.module';
import { LocationModule } from './location/location.module';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { SeasonService } from './season.service';


@Module({
  imports: [
    PrismaModule,
    EventsModule,
    ConfigModule,
    EntityModule,
    CommerceModule,
    PoliticsModule,
    LocationModule
  ],
  controllers: [GameController],
  providers: [AppService, GameService, SeasonService]
})
export class GameModule {}
