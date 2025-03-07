import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { Rank } from '@prisma/client';
import { RankDto } from './dto/rank.dto';

@Controller('rank')
export class RankController {
  constructor(private readonly database: AppService) {}

  @Get()
  getAll(@Query('count') count?: number, @Query('id') id?: string) {
    return this.database.findAll<Rank>('rank', {
      where: id ? { id } : undefined,
      take: count ?? 100
    });
  }

  @Post()
  createRank(@Body() data: RankDto) {
    return this.database.create<Rank>('rank', data);
  }

  @Put(':id')
  updateRank(@Param('id') id: string, @Body() data: RankDto) {
    return this.database.update<Rank>('rank', id, data);
  }
  
  @Delete(':id')
  deleteRank(@Param('id') id: string) {
    return this.database.delete<Rank>('rank', id);
  }
}
