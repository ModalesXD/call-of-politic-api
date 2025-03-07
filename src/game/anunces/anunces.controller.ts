import { 
    Controller, Get, Param, Body, Post, Delete, Query, ParseIntPipe, NotFoundException, BadRequestException, InternalServerErrorException, Put 
} from '@nestjs/common';
import { CreateAnunceDto, GetAnunceDto, UpdateAnunceDto } from './dto/anunce.dto';
import { AppService } from 'src/app.service';
import { Anunce } from '@prisma/client';

@Controller('anunces')
export class AnuncesController {
    constructor(private readonly database: AppService) {}

    @Get()
    async getAll(
        @Query('count', ParseIntPipe) count?: number,
        @Query('countryId') countryId?: string,
        @Query('categoryId') categoryId?: string
    ): Promise<{ anunces: GetAnunceDto[], total: number }> {
        const where: any = {};
        if (countryId) where.countryId = countryId;
        if (categoryId) where.categoryId = categoryId;

        const [anunces, total] = await Promise.all([
            this.database.findAll<Anunce>('anunce', {
                where,
                take: count ?? 100,
                orderBy: { createdAt: 'desc' }
            }),
            this.database.count<Anunce>('anunce', where)
        ]);

        return { anunces, total };
    }

    @Get(':id')
    async getOne(@Param('id') id: string): Promise<GetAnunceDto> {
        const anunce = await this.database.findOne<Anunce>('anunce', id);
        if (!anunce) {
            throw new NotFoundException(`Anuncio con ID ${id} no encontrado`);
        }
        return anunce;
    }

    @Post()
    async create(@Body() data: CreateAnunceDto | CreateAnunceDto[]): Promise<GetAnunceDto | GetAnunceDto[]> {
        if (Array.isArray(data)) {
            if (data.length === 0) {
                throw new BadRequestException('El array de anuncios no puede estar vacío');
            }
            return Promise.all(
                data.map(anunce => this.database.create<Anunce>('anunce', anunce))
            );
        }
        return this.database.create<Anunce>('anunce', data);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: UpdateAnunceDto): Promise<GetAnunceDto> {
        try {
            return await this.database.update<Anunce>('anunce', id, data);
        } catch (error) {
            throw new NotFoundException(`No se pudo actualizar el anuncio con ID ${id}`);
        }
    }
    
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<{ message: string }> {
        try {
            await this.database.delete<Anunce>('anunce', id);
            return { message: `Anuncio ${id} eliminado correctamente` };
        } catch (error) {
            throw new NotFoundException(`No se pudo eliminar el anuncio con ID ${id}`);
        }
    }

    @Delete()
    async deleteMany(@Body('ids') ids: string[]): Promise<{ message: string, results: { id: string, success: boolean }[] }> {
        if (!Array.isArray(ids) || ids.length === 0) {
            throw new BadRequestException('Se requiere un array de IDs para eliminar');
        }

        const results = await Promise.all(
            ids.map(async id => {
                try {
                    await this.database.delete<Anunce>('anunce', id);
                    return { id, success: true };
                } catch {
                    return { id, success: false };
                }
            })
        );

        return {
            message: 'Operación de eliminación múltiple completada',
            results
        };
    }
}
