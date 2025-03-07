import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { AppService } from '../../../app.service';
import { Tax } from '@prisma/client';
import { CreateTaxDto, UpdateTaxDto } from '../dto/tax.dto';

@Controller('tax')
export class TaxController {
  constructor(private readonly database: AppService) {}

  @Get()
  getAll(@Query('count') count?: number, @Query('countryId') countryId?: string) {
    return this.database.findAll<Tax>('tax', {
      where: countryId ? { countryId } : undefined,
      take: count ?? 100,
      include: {
        country: {
          select: {
            name: true,
            code: true,
            economy: {
              select: {
                treasury: true,
                gdpGrowth: true,
              },
            },
          },
        },
      },
    });
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.database.findOne<Tax>('tax', id);
  }

  @Post()
  create(@Body() data: CreateTaxDto) {
    return this.database.create<Tax>('tax', data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateTaxDto) {
    return this.database.update<Tax>('tax', id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.database.delete<Tax>('tax', id);
  }
}
