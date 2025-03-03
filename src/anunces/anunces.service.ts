import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAnunceDto } from './dto/createAnunce.dto';
import { GetAnunceDto } from './dto/getAnunce.dto';
import { Anunce } from '@prisma/client';

@Injectable()
export class AnuncesService {
  constructor(private prisma: PrismaService) {}

  // Método para obtener un anuncio por su id
  async getAnunce({ id }: GetAnunceDto): Promise<Anunce | null> {
    const result = await this.prisma.anunce.findUnique({
      where: {
        id: id,
      },
    });
    return result;
  }

  // Método para obtener todos los anuncios (con limitación de número de anuncios)
  async getAll(count: number = 100, countrieId: number = 0): Promise<Anunce[]> {
    const result = await this.prisma.anunce.findMany({
        take: count !== 0 ? count : 100,  // Solo se aplica el filtro si count no es 0
        where: countrieId !== 0 ? { countrieId } : undefined,  // Solo se aplica el filtro si countrieId no es 0
    });
    return result;
}


  // Método para crear un nuevo anuncio
  async createAnunce(createAnunceDtos: CreateAnunceDto[]): Promise<Anunce[]> {
    const result: Anunce[] = [];
    for (const dto of createAnunceDtos) {
      const anunc = await this.prisma.anunce.create({
        data: {
          title: dto.title,
          description: dto.description,
          content: dto.content,
          countrieId: dto.countrieId,
          category: dto.category,
          image: dto.image,
        },
      });
      result.push(anunc);
    }
    return result;
}


  // Método para eliminar un anuncio por su id
  async deleteAnunce(id: number): Promise<Anunce> {
    const result = await this.prisma.anunce.delete({
      where: {
        id: id,
      },
    });
    return result;
  }

  // Método para contar todos los anuncios
  async countAll(countrieId?: number): Promise<number> {
    const result = await this.prisma.anunce.count(
      countrieId !== 0 ? { where: { countrieId } } : undefined  // Solo se aplica el filtro si countrieId no es 0
    );
    return result;
  }
}
