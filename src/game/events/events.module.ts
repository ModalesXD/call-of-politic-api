import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { AnuncesModule } from '../anunces/anunces.module';
import { EventsService } from './events.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [AnuncesModule, PrismaModule],
  controllers: [EventsController],
  providers: [EventsService]
})
export class EventsModule {}
