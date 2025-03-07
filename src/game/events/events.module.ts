import { Module } from '@nestjs/common';
import { AppModule } from '../../app.module';
import { EventsController } from './events.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [AppModule, PrismaModule],
  controllers: [EventsController]
})
export class EventsModule {}
