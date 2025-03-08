import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { War } from '@prisma/client';
import { AppService } from 'src/app.service';

@Controller()
export class WarsController {
  constructor(private readonly database: AppService) {}

  @Get()
  async getAll(@Query() status?: string, @Query() type?: string, @Query() scope?: string) {
    return this.database.findAll<War>('war', {
      where: {
        status: status ?? { status },
        type: type ?? { type },
        scope: scope ?? { scope },
      },
    });
  }
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.database.findOne<War>('war', id);
  }

  @Post()
  async create(@Body() data: any) {
    return this.database.create<War>('war', data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    return this.database.update<War>('war', id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.database.delete<War>('war', id);
  }
}
