import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from '../../../app.service';
import { Vote } from '@prisma/client';
import { CreateVoteDto } from '../dto/vote.dto';

@Controller('votes')
export class VoteController {
  constructor(private readonly database: AppService) {}

  @Get()
  async getAll(
    @Query() id: string
) {
    return this.database.findAll<Vote>('vote', {
      where: {
        id: id ?? { id },
      },
    });
  }
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.database.findOne<Vote>('vote', id);
  }

  @Post()
  async create(@Body() data: any) {
    return this.database.create<Vote>('vote', data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    return this.database.update<Vote>('vote', id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.database.delete<Vote>('vote', id);
  }
}
