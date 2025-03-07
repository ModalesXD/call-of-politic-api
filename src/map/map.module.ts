import { Module } from '@nestjs/common';
import { AppService } from '../app.service';
import { MapController } from './map.controller';
import { MapService } from './map.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MapController],
  providers: [MapService, AppService],
  exports: [AppService]
})
export class MapModule {}
