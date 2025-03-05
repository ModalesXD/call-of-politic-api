import { 
    Controller, Get, Param, Body, Post, Delete, Query, ParseIntPipe, NotFoundException, BadRequestException, InternalServerErrorException 
} from '@nestjs/common';
import { CreateAnunceDto, GetAnunceDto } from './dto/anunce.dto';
import { AnuncesService } from './anunces.service';

@Controller('anunces')
export class AnuncesController {
    constructor(private readonly anuncesService: AnuncesService) {}

    @Get()
    async getAll(
        @Query('count', ParseIntPipe) count?: number,
        @Query('countryId', ParseIntPipe) countryId?: string
    ): Promise<{ anunces: GetAnunceDto[], total: number }> {
        try {
            const anunces = await this.anuncesService.getAll(count, countryId);
            const total = await this.anuncesService.countAll(countryId); 
            return { anunces, total };
        } catch (error) {
            throw new InternalServerErrorException({ message: 'Error al obtener los anuncios', error: error.message });
        }
    }

    @Get(':id')
    async getAnunce(@Param('id', ParseIntPipe) id: string): Promise<GetAnunceDto> {
        try {
            const anunce = await this.anuncesService.getAnunce({ id });
            if (!anunce) throw new NotFoundException({ message: `Anunce con id ${id} no encontrado` });
            return anunce;
        } catch (error) {
            throw new InternalServerErrorException({ message: 'Error al obtener el anuncio', error: error.message });
        }
    }

    @Post('create')
    async createAnunce(@Body() createAnunceDtos: CreateAnunceDto[]): Promise<GetAnunceDto[]> {
        try {
            if (!Array.isArray(createAnunceDtos) || createAnunceDtos.length === 0) {
                throw new BadRequestException({ message: 'El cuerpo de la solicitud debe contener un array de anuncios válidos' });
            }
            return await this.anuncesService.createAnunce(createAnunceDtos);
        } catch (error) {
            throw new InternalServerErrorException({ message: 'Error al crear anuncios', error: error.message });
        }
    }

    @Delete(':id')
    async deleteAnunce(@Param('id', ParseIntPipe) id: string): Promise<{ message: string }> {
        try {
            await this.anuncesService.deleteAnunce(id);
            return { message: `Anunce ${id} eliminado correctamente` };
        } catch (error) {
            throw new InternalServerErrorException({ message: `Error al eliminar el anuncio con id ${id}`, error: error.message });
        }
    }
}
