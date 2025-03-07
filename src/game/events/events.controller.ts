import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { Event } from '@prisma/client';
import { CreateEventDto, UpdateEventDto } from './dto/event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly database: AppService) {}

  @Get()
  getAll(@Query('count') count?: number, @Query('id') id?: string) {
    return this.database.findAll<Event>('event', {
      where: id ? { id } : undefined,
      take: count ?? 100
    });
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.database.findOne<Event>('event', id);
  }

  @Post()
  createEvent(@Body() data: CreateEventDto) {
    return this.database.create<Event>('event', data);
  }

  @Put(':id')
  updateEvent(@Param('id') id: string, @Body() data: UpdateEventDto) {
    return this.database.update<Event>('event', id, data);
  }
  
  @Delete(':id')
  deleteEvent(@Param('id') id: string) {
    return this.database.delete<Event>('event', id);
  }
}
