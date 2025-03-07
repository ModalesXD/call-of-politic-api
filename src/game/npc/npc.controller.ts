import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { Npc } from '@prisma/client';
import { NpcDto } from './dto/npc.dto';

@Controller('npc')
export class NpcController {
  constructor(private readonly database: AppService) {}

  @Get()
  getAll(@Query('count') count?: number, @Query('id') id?: string) {
    return this.database.findAll<Npc>('npc', {
      where: id ? { id } : undefined,
      take: count ?? 100
    });
  }

  @Post()
  createNpc(@Body() data: NpcDto) {
    return this.database.create<Npc>('npc', data);
  }

  @Put(':id')
  updateNpc(@Param('id') id: string, @Body() data: NpcDto) {
    return this.database.update<Npc>('npc', id, data);
  }
  
  @Delete(':id')
  deleteNpc(@Param('id') id: string) {
    return this.database.delete<Npc>('npc', id);
  }
}
