import { 
    Controller, Get, Post, Body, Put, Param, Delete, Query, ParseIntPipe, NotFoundException, BadRequestException, InternalServerErrorException 
} from '@nestjs/common';
import { CreateAnnouncementDto, GetAnnouncementDto, UpdateAnnouncementDto } from '../dto/Announcement.dto';
import { AppService } from 'src/app.service';
import { Announcement } from '@prisma/client';

@Controller('announcement')
export class AnnouncementController {
    constructor(private readonly database: AppService) {}

    @Get()
    async getAll(
        @Query('count', ParseIntPipe) count?: number,
        @Query('id') id?: string
    ): Promise<GetAnnouncementDto[]> {
        const where: any = id ? { id } : undefined;

        const announcements = await this.database.findAll<Announcement>('announcement', {
            where,
            take: count ?? 100,
            include: {
                country: {
                    select: {
                        name: true,
                        code: true,
                    },
                },
                category: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        return announcements;
    }

    @Get(':id')
    async getOne(@Param('id') id: string): Promise<GetAnnouncementDto> {
        const announcement = await this.database.findOne<Announcement>('announcement', id);
        if (!announcement) {
            throw new NotFoundException(`Anuncio con ID ${id} no encontrado`);
        }
        return announcement;
    }

    @Post()
    async create(@Body() data: CreateAnnouncementDto): Promise<GetAnnouncementDto> {
        return await this.database.create<Announcement>('announcement', data);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: UpdateAnnouncementDto): Promise<GetAnnouncementDto> {
        try {
            return await this.database.update<Announcement>('announcement', id, data);
        } catch (error) {
            throw new NotFoundException(`No se pudo actualizar el anuncio con ID ${id}`);
        }
    }
    
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<{ message: string }> {
        try {
            await this.database.delete<Announcement>('announcement', id);
            return { message: `Anuncio ${id} eliminado correctamente` };
        } catch (error) {
            throw new NotFoundException(`No se pudo eliminar el anuncio con ID ${id}`);
        }
    }
}
