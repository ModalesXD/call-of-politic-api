import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetEventDto, UpdateEventDto, CreateEventDto } from './dto/event.dto';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async getRandomEvent(countryId?: number, categoryId?: number): Promise<GetEventDto> {
    try {
      const event = await this.prisma.event.findFirst({
        where: {
          countryId: countryId || undefined,
          categoryId: categoryId || undefined,
        },
        orderBy: { id: 'desc' }, // Se puede cambiar a "rand()" si se usa PostgreSQL o MySQL
      });

      if (!event) {
        throw new NotFoundException('No hay eventos disponibles con los filtros proporcionados.');
      }

      return event;
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener un evento aleatorio', error.message);
    }
  }

  async getEvents(
    count?: number,
    categoryId?: number,
    countryId?: number
  ): Promise<GetEventDto[]> {
    return this.prisma.event.findMany({
      where: {
        categoryId: categoryId ?? undefined,
        countryId: countryId ?? undefined
      },
      take: count ?? undefined
    });
  }

  async getEventById(id: number): Promise<GetEventDto | null> {
    return this.prisma.event.findUnique({ where: { id } });
  }

  async createEvent(createEventDtos: CreateEventDto[]): Promise<GetEventDto[]> {
    return this.prisma.$transaction(
      createEventDtos.map((event) =>
        this.prisma.event.create({ data: event })
      )
    );
  }

  async deleteEvent(id: number): Promise<GetEventDto> {
    return this.prisma.event.delete({ where: { id } });
  }

  async updateEvent(id: number, data: UpdateEventDto): Promise<GetEventDto> {
    return this.prisma.event.update({ where: { id }, data });
  }
}
