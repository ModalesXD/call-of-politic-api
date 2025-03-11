import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SeasonService } from './season.service';

@Injectable()
export class GameService {
  constructor(private readonly seasonService: SeasonService) {}

  async getGameSeasonData(seasonId: string) {
    return this.seasonService.getSeasonData(seasonId);
  }

  async getGameSeasons(count: number) {
    return this.seasonService.getAllSeasons();
  }

  async resetSeason(seasonId: string) {
    return this.seasonService.resetSeason(seasonId);
  }

  async startNewSeason() {
    return this.seasonService.startNewSeason();
  }

  async endSeason(seasonId: string) {
    return this.seasonService.endSeason(seasonId);
  }
}
