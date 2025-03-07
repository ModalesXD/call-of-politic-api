import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { Config } from '@prisma/client';
import { ConfigDto } from './dto/config.dto';

@Controller('config')
export class ConfigController {
  constructor(private readonly database: AppService) {}

  @Get()
  getAll(@Query('count') count?: number, @Query('id') id?: string) {
    return this.database.findAll<Config>('config', {
      where: id ? { id } : undefined,
      take: count ?? 100
    });
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.database.findOne<Config>('config', id);
  }

  @Post()
  createConfig(@Body() data: ConfigDto) {
    return this.database.create<Config>('config', data);
  }

  @Put(':id')
  updateConfig(@Param('id') id: string, @Body() data: ConfigDto) {
    return this.database.update<Config>('config', id, data);
  }
  
  @Delete(':id')
  deleteConfig(@Param('id') id: string) {
    return this.database.delete<Config>('config', id);
  }
}
