import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BackupManager } from '../utils/backup.utils';
import * as path from 'path';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class SeasonService {
  private readonly backupManager = new BackupManager('../prisma/backups');

  constructor(private readonly prisma: PrismaService) {}

  async getSeasonData(seasonId: string) {
    try {
      return await this.prisma.season.findUnique({ where: { id: seasonId } });
    } catch (error) {
      throw new InternalServerErrorException(`Error al obtener los datos de la temporada ${seasonId}: ${error.message}`);
    }
  }

  async getAllSeasons() {
    try {
      return await this.prisma.season.findMany();
    } catch (error) {
      throw new InternalServerErrorException(`Error al obtener las temporadas: ${error.message}`);
    }
  }

  async resetSeason(seasonId: string) {
    try {
      return await this.prisma.season.update({
        where: { id: seasonId },
        data: { isActive: true },
      });
    } catch (error) {
      throw new InternalServerErrorException(`Error al reiniciar la temporada ${seasonId}: ${error.message}`);
    }
  }

  async startNewSeason() {
    try {
      const activeSeasons = await this.prisma.season.findMany({
        where: { isActive: true },
        take: 1, // Limitar a 1 resultado para mejorar eficiencia
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
      const seasonData = await this.prisma.season.findUnique({ where: { id: seasonId } });
      if (!seasonData) {
        throw new NotFoundException(`Temporada con ID ${seasonId} no encontrada`);
      }

      const backupId = await this.backupManager.backupAll(seasonData);
      const backupPath = path.join('backups/', `${backupId}.json`);

      await this.prisma.season.update({
        where: { id: seasonId },
        data: {
          isActive: false,
          description: `Temporada finalizada con respaldo en ${backupPath}`,
          data: backupPath,
        },
      });

      // Resetear solo los modelos necesarios
      const modelsToReset = ['player', 'gameEvent', 'transaction']; // Ejemplo de modelos específicos
      await Promise.all(
        modelsToReset.map(model =>
          (this.prisma[model as keyof PrismaClient] as any).deleteMany()
        )
      );

      return {
        success: true,
        backupId,
        seasonId,
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
      const newSeason = {
        isActive: true,
        data: '',
        season: 1,
        description: null,
        createdAt: new Date(),
        updated: new Date(),
        endDate: null,
      };
      return await this.prisma.season.create({ data: newSeason });
    } catch (error) {
      throw new InternalServerErrorException(`Error al crear una nueva temporada: ${error.message}`);
    }
  }
}