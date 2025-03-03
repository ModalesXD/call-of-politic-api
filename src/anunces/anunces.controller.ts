import { Controller, Get, Param, Body, Post, Delete, NotFoundException, ParseIntPipe, Query } from '@nestjs/common';
import { GetAnunceDto } from './dto/getAnunce.dto';
import { CreateAnunceDto } from './dto/createAnunce.dto';
import { AnuncesService } from './anunces.service';

@Controller('anunces')
export class AnuncesController {
    constructor(private readonly anuncesService: AnuncesService) {}

    @Get()
    async getAll(
        @Query('count', ParseIntPipe) count: number = 100,  // Parámetro count, con valor por defecto 100
        @Query('countrieId', ParseIntPipe) countrieId: number = 0  // Parámetro countrieId, con valor por defecto 0
    ): Promise<{ anunces: GetAnunceDto[], total: number }> {
        const anunces = await this.anuncesService.getAll(count, countrieId);
        const total = await this.anuncesService.countAll(countrieId); 
        
        return { anunces, total };
    }

    @Get(':id')
    async getAnunce(@Param('id', ParseIntPipe) id: number): Promise<GetAnunceDto> {
        const anunce = await this.anuncesService.getAnunce({ id });
        if (!anunce) throw new NotFoundException(`Anunce with id ${id} not found`);
        return anunce;
    }

    @Post('create')
    async createAnunce(@Body() createAnunceDtos: CreateAnunceDto[]): Promise<GetAnunceDto[]> {
    const createdAnunces = await this.anuncesService.createAnunce(createAnunceDtos);
    return createdAnunces;
}


    @Delete(':id')
    async deleteAnunce(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
        if (!await this.anuncesService.deleteAnunce(id)) {
            throw new NotFoundException(`Anunce with id ${id} not found`);
        }
        return { message: `Anunce ${id} deleted successfully` };
    }
}
