import {
  Injectable, 
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { Prisma, PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import { BackupManager } from './utils/backup.utils';

@Injectable()
export class AppService {
  private readonly backupManager = new BackupManager('../prisma/backups');

  constructor(private readonly prisma: PrismaService) {}

  public getModel(model: keyof PrismaClient) {
    if (!(model in this.prisma) || typeof this.prisma[model] !== 'object') {
      throw new NotFoundException(
        `El modelo "${String(model)}" no existe en Prisma.`
      );
    }
    return (this.prisma as any)[model];
  }

  private async jsonifyModel(model: keyof PrismaClient): Promise<string> {
    const data = await this.getModel(model).findMany();
    return JSON.stringify(data, null, 2);
  }

  async findAll<T>(
    model: keyof PrismaClient,
    args?: Prisma.Args<any, 'findMany'>
  ): Promise<T[]> {
    try {
      return await this.getModel(model).findMany(args);
    } catch (error) {
      throw new InternalServerErrorException(
        `Error al obtener todos los registros de ${String(model)}`
      );
    }
  }

  async findOne<T>(model: keyof PrismaClient, id: string): Promise<T | null> {
    try {
      return await this.getModel(model).findUnique({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(
        `Error al obtener el registro con ID ${id} en ${String(model)}`
      );
    }
  }

  async create<T>(model: keyof PrismaClient, data: any): Promise<T> {
    try {
      return await this.getModel(model).create({ data });
    } catch (error) {
      throw new InternalServerErrorException(
        `Error al crear un registro en ${String(model)}`
      );
    }
  }

  async update<T>(
    model: keyof PrismaClient,
    id: string,
    data: any
  ): Promise<T> {
    try {
      return await this.getModel(model).update({ where: { id }, data });
    } catch (error) {
      throw new InternalServerErrorException(
        `Error al actualizar el registro con ID ${id} en ${String(model)}`
      );
    }
  }

  async delete<T>(model: keyof PrismaClient, id: string): Promise<T> {
    try {
      return await this.getModel(model).delete({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(
        `Error al eliminar el registro con ID ${id} en ${String(model)}`
      );
    }
  }

  async count<T>(
    model: keyof PrismaClient,
    where: Prisma.Args<any, 'count'>['where']
  ): Promise<number> {
    try {
      return await this.getModel(model).count({ where });
    } catch (error) {
      throw new InternalServerErrorException(
        `Error al contar registros en ${String(model)}`
      );
    }
  }

  async backup<T>(model: keyof PrismaClient, id: string): Promise<T[]> {
    try {
      const data = await this.getModel(model).findMany();
      await this.backupManager.backupAll(data);
      return data;
    } catch (error) {
      console.error(`Error al realizar el backup de ${String(model)}:`, error);
      throw new InternalServerErrorException(
        `No se pudo realizar el backup del modelo ${String(model)}`
      );
    }
  }

  async restore<T>(model: keyof PrismaClient, file: string): Promise<T[]> {
    try {
      const data = await this.backupManager.restoreBackup(file);
      await this.getModel(model).deleteMany();
      await this.getModel(model).createMany({ data });
      return this.getModel(model).findMany();
    } catch (error) {
      console.error(`Error al restaurar el backup de ${String(model)}:`, error);
      throw new InternalServerErrorException(
        `No se pudo restaurar el backup del modelo ${String(model)}`
      );
    }
  }

  async backupAll() {
    try {
      const models = Object.keys(this.prisma);
      const data = {};
      for (const model of models) {
        data[model] = await this.jsonifyModel(model as keyof PrismaClient);
      }
      return await this.backupManager.backupAll(data);
    } catch (error) {
      throw new InternalServerErrorException(
        `Error al realizar el respaldo: ${error.message}`
      );
    }
  }

  async restoreBackup(backupId: string) {
    try {
      const data = await this.backupManager.restoreBackup(backupId);
      for (const model in data) {
        await this.getModel(model as keyof PrismaClient).deleteMany();
        await this.getModel(model as keyof PrismaClient).createMany({
          data: JSON.parse(data[model]),
        });
      }
      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error al restaurar el respaldo ${backupId}: ${error.message}`
      );
    }
  }
}
