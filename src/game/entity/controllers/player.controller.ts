import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { Player } from '@prisma/client';
import { CreatePlayerDto, GetPlayerDto, UpdatePlayerDto } from '../dto/player.dto';

@Controller('player')
export class PlayerController {
  constructor(private readonly database: AppService) {}

  @Get()
  getAll(@Query('count') count?: number, @Query('id') id?: string) {
    return this.database.findAll<Player>('player', {
      where: id ? { id } : undefined,
      take: count ?? 100
    });
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.database.findOne<Player>('player', id);
  }

  @Post()
  createPlayer(@Body() data: CreatePlayerDto) {
    return this.database.create<Player>('player', data);
  }

  @Put(':id')
  updatePlayer(@Param('id') id: string, @Body() data: UpdatePlayerDto) {
    return this.database.update<Player>('player', id, data);
  }
  
  @Delete(':id')
  deletePlayer(@Param('id') id: string) {
    return this.database.delete<Player>('player', id);
  }
}
