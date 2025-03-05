import { Controller, Get, Post, Patch, Query, Delete, Param, Body } from '@nestjs/common';
import { PlayerDto } from './dto/player.dto';
import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
    constructor(readonly playerService: PlayerService
    ) { }
    @Get()
    async getPlayers(
        @Query('count') count: number,
        @Query('id') id: string,
        @Query('rankId') rankId: PlayerDto['rankId'],
        @Query('countryId') countryId: PlayerDto['countryId'],
        @Query('ideologyId') ideologyId: PlayerDto['ideologyId'],
    ) {
        return this.playerService.getPlayers({ count, id, rankId, countryId, ideologyId });
    }

    @Get(':id')
    async getPlayerById(@Param('id') id: string) {
        return this.playerService.getPlayerById(id);
    }

    @Post()
    async createPlayer(@Body() data: PlayerDto) {
        return this.playerService.createPlayer(data);
    }

    @Patch(':id')
    async updatePlayer(@Param('id') id: string, @Body() data: PlayerDto) {
        return this.playerService.updatePlayer(id, data);
    }
    

}
