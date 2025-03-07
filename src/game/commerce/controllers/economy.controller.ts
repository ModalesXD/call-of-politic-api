import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { AppService } from '../../../app.service';
import { Economy } from '@prisma/client';
import { CreateEconomyDto, UpdateEconomyDto } from '../dto/economy.dto';

@Controller('economy')
export class EconomyController {
  constructor(private readonly database: AppService) {}

  @Get()
  getAll(@Query('count') count?: number, @Query('countryId') countryId?: string) {
    return this.database.findAll<Economy>('economy', {
      where: countryId ? { countryId } : undefined,
      take: count ?? 100,
      include: {
        country: {
          select: {
            name: true,
            code: true,
          },
        },
      },
    });
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.database.findOne<Economy>('economy', id);
  }

  @Post()
  create(@Body() data: CreateEconomyDto) {
    return this.database.create<Economy>('economy', data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateEconomyDto) {
    return this.database.update<Economy>('economy', id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.database.delete<Economy>('economy', id);
  }
}
