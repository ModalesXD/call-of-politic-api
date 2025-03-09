import { Controller, Get, Param, Post } from '@nestjs/common';
import { GameService } from './game.service';


@Controller('game')
export class GameController {
    constructor(private gameService: GameService) {}

    @Post('restartSeason/:id')
    async restartSeason(@Param('id') id: string) {
        return this.gameService.resetSeason(id);
    }

    @Post('endSeason/:id')
    async endSeason(@Param('id') id: string) {
        return this.gameService.endSeason(id);
    }

    @Post('startSeason')
    async startSeason() {
        return this.gameService.startNewSeason();
    }

    @Get('getSeasons/:count')
    async getGameSeasons(@Param('count') count: number) {
        const a = await this.gameService.getGameSeasons(count);
        console.log(a);
        return a;
    }

    @Get('getSeasonData/:id')
    async getGameSeasonData(@Param('id') id: string) {
        return this.gameService.getGameSeasonData(id);
    }
}
