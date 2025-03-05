import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AnunceDto, CreateAnunceDto, GetAnunceDto } from './dto/anunce.dto';
import { Anunce } from '@prisma/client';

@Injectable()
export class AnuncesService {
  constructor(private prisma: PrismaService) {}

  // Método para obtener un anuncio por su ID
  async getAnunce({ id }: GetAnunceDto): Promise<Anunce | null> {
    return this.prisma.anunce.findUnique({ where: { id } });
  }

  // Método para obtener todos los anuncios, con paginación y filtrado por countryId
  async getAll(count?: number, countryId?: string): Promise<Anunce[]> {
    return this.prisma.anunce.findMany({
      take: count ?? undefined, // Si count no se pasa, no se aplica límite
      where: countryId ? { countryId } : undefined,
       // Filtra por countryId si se pasa
    });
  }

  // Método para crear varios anuncios
  async createAnunce(createAnunceDtos: CreateAnunceDto[]): Promise<AnunceDto[]> {
    return this.prisma.$transaction(
      createAnunceDtos.map((dto) =>
        this.prisma.anunce.create({
          data: dto,
        })
      )
    );
  }

  // Método para eliminar un anuncio por su ID
  async deleteAnunce(id: string): Promise<Anunce> { // El parámetro 'id' es de tipo string
    return this.prisma.anunce.delete({ where: { id } });
  }

  // Método para contar todos los anuncios, con filtrado por countryId
  async countAll(countryId?: string): Promise<number> { // countryId también es de tipo string
    return this.prisma.anunce.count({
      where: countryId ? { countryId } : undefined, // Filtra por countryId si se pasa
    });
  }
}
