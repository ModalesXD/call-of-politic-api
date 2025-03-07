import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { GameModule } from './game/game.module';
import { DiscordModule } from './discord/discord.module';
import { MapModule } from './map/map.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './game/config/config.module';
import { EntityModule } from './entity/entity.module';

@Module({
  imports: [
    PrismaModule,
    GameModule,
    DiscordModule,
    MapModule,
    AuthModule,
    ConfigModule,
    EntityModule
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
