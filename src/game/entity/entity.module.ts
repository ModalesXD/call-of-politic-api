import { Module } from '@nestjs/common';
import { BaseUserController } from './controllers/base-user.controller';
import { PlayerController } from './controllers/player.controller';
import { NpcController } from './controllers/npc.controller';
import { AppService } from 'src/app.service';

@Module({
    controllers: [BaseUserController, PlayerController, NpcController],
    providers: [AppService]
})
export class EntityModule {}
