import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PlayerDto, GetPlayerDto } from './dto/player.dto';

@Injectable()
export class PlayerService {
  constructor(private prisma: PrismaService) {}

 async getPlayers ({ count, id, rankId, countryId, ideologyId }: GetPlayerDto): Promise<PlayerDto[]> {
    return this.prisma.player.findMany({
      where: {
        id: id ? String(id) : undefined,
        rankId: rankId || undefined,
        countryId: countryId || undefined,
        ideologyId: ideologyId || undefined,
      },
      take: count || 100,
    });
  }

  async getPlayerById(id: string): Promise<PlayerDto> {
    const player = await this.prisma.player.findUnique({
      where: {
        id,
      },
    });

    if (!player) {
      throw new NotFoundException('Player not found');
    }

    return player;
  }

  async createPlayer(data: PlayerDto): Promise<PlayerDto> {
    return this.prisma.player.create({ data });
  }

  async updatePlayer(id: string, data: PlayerDto): Promise<PlayerDto> {
    return this.prisma.player.update({
      where: {
        id,
      },
      data,
    });
  }

}
