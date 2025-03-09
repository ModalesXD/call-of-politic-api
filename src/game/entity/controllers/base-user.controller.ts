import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AppService } from '../../../app.service';
import { BaseUser } from '@prisma/client';
import { CreateBaseUserDto, GetBaseUserDto, UpdateBaseUserDto } from '../dto/base-user.dto';

@Controller('baseUser')
export class BaseUserController {
  constructor(private readonly database: AppService) {}

  @Get()
  getAll(@Query('count') count?: number, @Query('id') id?: string) {
    return this.database.findAll<BaseUser>('baseUser', {
      where: id ? { id } : undefined,
      take: count ?? 100,
      include: {
        country: {
          select: {
            name: true,
            code: true,
          },
        },
        ideology: {
          select: {
            name: true,
          },
        },
        rank: {
          select: {
            name: true,
            level: true,
          },
        },
        player: {
          select: {
            id: true,
            experience: true,
            level: true,
          },
        },
        npc: {
          select: {
            id: true,
            behavior: true,
            difficulty: true,
          },
        },
      },
    });
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.database.findOne<BaseUser>('baseUser', id);
  }

  @Post()
  create(@Body() data: CreateBaseUserDto) {
    return this.database.create<BaseUser>('baseUser', data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateBaseUserDto) {
    return this.database.update<BaseUser>('baseUser', id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.database.delete<BaseUser>('baseUser', id);
  }
}
