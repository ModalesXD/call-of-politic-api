import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAnunceDto, GetAnunceDto } from './dto/anunce.dto';
import { Anunce } from '@prisma/client';

@Injectable()
export class AnuncesService {
  constructor(private prisma: PrismaService) {}

  async getAnunce({ id }: GetAnunceDto): Promise<Anunce | null> {
    return this.prisma.anunce.findUnique({ where: { id } });
  }

  async getAll(count?: number, countryId?: number): Promise<Anunce[]> {
    return this.prisma.anunce.findMany({
      take: count ?? undefined,
      where: countryId ? { countryId } : undefined,
    });
  }

  async createAnunce(createAnunceDtos: CreateAnunceDto[]): Promise<Anunce[]> {
    return this.prisma.$transaction(
      createAnunceDtos.map((dto) => this.prisma.anunce.create({ data: dto }))
    );
  }

  async deleteAnunce(id: number): Promise<Anunce> {
    return this.prisma.anunce.delete({ where: { id } });
  }

  async countAll(countryId?: number): Promise<number> {
    return this.prisma.anunce.count({
      where: countryId ? { countryId } : undefined,
    });
  }
}
