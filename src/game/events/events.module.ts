import { Module } from '@nestjs/common';
import { EventsController } from './controllers/events.controller';
import { AnnouncementController } from './controllers/announcement.controller';
import { AppService } from 'src/app.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [EventsController, AnnouncementController],
    providers: [AppService]
})
export class EventsModule {}
