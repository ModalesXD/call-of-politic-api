import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { GameModule } from './game/game.module';
import { PlayerModule } from './game/player/player.module';
import { DiscordModule } from './discord/discord.module';
import { MapModule } from './map/map.module';
import { EventsModule } from './game/events/events.module';
import { AnuncesModule } from './game/anunces/anunces.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './game/config/config.module';

@Module({
  imports: [PrismaModule, GameModule, PlayerModule, DiscordModule, MapModule, EventsModule, AnuncesModule, AuthModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
