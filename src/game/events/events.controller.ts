import { Controller, Get, Post, Delete, Patch, Query, Param, Body, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto, GetEventDto } from './dto/event.dto';

@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) {}

    @Get()
    async getEvents(
        @Query('count', ParseIntPipe) count?: number,
        @Query('categoryId', ParseIntPipe) categoryId?: string,
        @Query('countryId', ParseIntPipe) countryId?: string
    ): Promise<{ events: GetEventDto[], count: number }> {
        const events = await this.eventsService.getEvents(count, categoryId, countryId);
        return { events, count: events.length };
    }

    @Get('random')
    async getRandomEvent(
        @Query('countryId', ParseIntPipe) countryId?: string,
        @Query('categoryId', ParseIntPipe) categoryId?: string
    ): Promise<GetEventDto> {
        const event = await this.eventsService.getRandomEvent(countryId, categoryId);
        if (!event) throw new NotFoundException('No events found.');
        return event;
    }

    @Get(':id')
    async getEventById(@Param('id', ParseIntPipe) id: string): Promise<GetEventDto> {
        const event = await this.eventsService.getEventById(id);
        if (!event) throw new NotFoundException(`Event with id ${id} not found.`);
        return event;
    }

    @Post()
    async createEvent(@Body() events: CreateEventDto[]): Promise<GetEventDto[]> {
        return this.eventsService.createEvent(events);
    }

    @Delete(':id')
    async deleteEvent(@Param('id', ParseIntPipe) id: string): Promise<{ message: string }> {
        const deleted = await this.eventsService.deleteEvent(id);
        if (!deleted) throw new NotFoundException(`Event with id ${id} not found.`);
        return { message: `Event ${id} deleted successfully` };
    }

    @Patch(':id')
    async updateEvent(@Param('id', ParseIntPipe) id: string, @Body() data: CreateEventDto): Promise<GetEventDto> {
        const updatedEvent = await this.eventsService.updateEvent(id, data);
        if (!updatedEvent) throw new NotFoundException(`Event with id ${id} not found.`);
        return updatedEvent;
    }
}
