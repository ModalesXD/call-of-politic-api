import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  private getModel(model: keyof PrismaClient) {
    if (!(model in this.prisma)) {
      throw new Error(`El modelo "${String(model)}" no existe en Prisma`);
    }
    return (this.prisma as any)[model];
  }

  findAll<T>(model: keyof PrismaClient, args?: any): Promise<T[]> {
    return this.getModel(model).findMany(args);
  }

  findOne<T>(model: keyof PrismaClient, id: string): Promise<T | null> {
    return this.getModel(model).findUnique({ where: { id } });
  }

  create<T>(model: keyof PrismaClient, data: any): Promise<T> {
    return this.getModel(model).create({ data });
  }

  update<T>(model: keyof PrismaClient, id: string, data: any): Promise<T> {
    return this.getModel(model).update({ where: { id }, data });
  }

  delete<T>(model: keyof PrismaClient, id: string): Promise<T> {
    return this.getModel(model).delete({ where: { id } });
  }

  count<T>(model: keyof PrismaClient, where: any): Promise<number> {
    return this.getModel(model).count({ where });
  }
}
