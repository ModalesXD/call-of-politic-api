import { AppService } from 'src/app.service';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { BackupManager } from '../utils/backup.utils';
import * as path from 'path';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class GameService {
  private readonly backupManager = new BackupManager('../prisma/backups');

  constructor(private readonly database: AppService) {}

  async getGameSeasonData(seasonId: string) {
    try {
      return await this.database.findOne('season', seasonId);
    } catch (error) {
      throw new InternalServerErrorException(`Error al obtener los datos de la temporada ${seasonId}: ${error.message}`);
    }
  }

  async getGameSeasons(count: number) {
    try {
      return await this.database.findAll('season');
    } catch (error) {
      throw new InternalServerErrorException(`Error al obtener las temporadas: ${error.message}`);
    }
  }

  async resetSeason(seasonId: string) {
    try {
      return await this.database.update('season', seasonId, { isActive: true });
    } catch (error) {
      throw new InternalServerErrorException(`Error al reiniciar la temporada ${seasonId}: ${error.message}`);
    }
  }

  async startNewSeason() {
    try {
      const activeSeasons = await this.database.findAll<{ id: string }>('season', { 
        where: { isActive: true },
        take: 1 // Limitar a 1 resultado para mejorar eficiencia
      });
  
      if (activeSeasons.length > 0) {
        await this.endSeason(activeSeasons[0].id);
        throw new Error('Ya existe una temporada activa. La temporada anterior ha sido finalizada.');
      }
  
      return await this.createSeason();
    } catch (error) {
      throw new InternalServerErrorException(`Error al iniciar una nueva temporada: ${error.message}`);
    }
  }
  
  async endSeason(seasonId: string) {
    try {
      const seasonData = await this.database.findOne('season', seasonId);
      if (!seasonData) {
        throw new NotFoundException(`Temporada con ID ${seasonId} no encontrada`);
      }
  
      const backupId = await this.backupManager.backupAll(seasonData);
      const backupPath = path.join('backups/', `${backupId}.json`);
  
      await this.database.update('season', seasonId, {
        isActive: false,
        endDate: new Date(),
        description: `Temporada finalizada con respaldo en ${backupPath}`,
        backupPath: backupPath,
      });
  
      // Resetear solo los modelos necesarios
      const modelsToReset = ['player', 'gameEvent', 'transaction']; // Ejemplo de modelos específicos
      await Promise.all(
        modelsToReset.map(model => 
          this.database.getModel(model as keyof PrismaClient).deleteMany()
        )
      );
  
      return { 
        success: true,
        backupId,
        seasonId
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(`Error al finalizar la temporada ${seasonId}: ${error.message}`);
    }
  }

  private async createSeason() {
    try {
      const newSeason = { isActive: true };
      return await this.database.create('season', newSeason);
    } catch (error) {
      throw new InternalServerErrorException(`Error al crear una nueva temporada: ${error.message}`);
    }
  }
}
