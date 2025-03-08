import { Controller, Get, Post, Put, Delete, Body, Param, Query, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateIdeologyDto, UpdateIdeologyDto } from '../dto/ideology.dto';
import { AppService } from 'src/app.service';
import { Ideology } from '@prisma/client';

@ApiTags('Ideologies')
@Controller('ideologies')
export class IdeologyController {
  constructor(private readonly database: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get all ideologies' })
  @ApiResponse({ status: 200, description: 'Return all ideologies.' })
  async findAll(@Query('isActive') isActive?: boolean): Promise<Ideology[]> {
    try {
      const where = isActive !== undefined ? { isActive } : {};
      return await this.database.findAll<Ideology>('ideology', { where });
    } catch (error) {
      throw new InternalServerErrorException('Failed to get ideologies');
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an ideology by id' })
  @ApiResponse({ status: 200, description: 'Return an ideology.' })
  async findOne(@Param('id') id: string): Promise<Ideology> {
    try {
      const ideology = await this.database.findOne<Ideology>('ideology', id);
      if (!ideology) {
        throw new NotFoundException(`Ideology with ID ${id} not found`);
      }
      return ideology;
    } catch (error) {
      throw new InternalServerErrorException('Failed to get ideology');
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create a new ideology' })
  @ApiResponse({ status: 201, description: 'The ideology has been created.' })
  async create(@Body() createIdeologyDto: CreateIdeologyDto): Promise<Ideology> {
    try {
      return await this.database.create<Ideology>('ideology', createIdeologyDto);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create ideology');
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an ideology' })
  @ApiResponse({ status: 200, description: 'The ideology has been updated.' })
  async update(@Param('id') id: string, @Body() updateIdeologyDto: UpdateIdeologyDto): Promise<Ideology> {
    try {
      const ideology = await this.database.update<Ideology>('ideology', id, updateIdeologyDto);
      if (!ideology) {
        throw new NotFoundException(`Ideology with ID ${id} not found`);
      }
      return ideology;
    } catch (error) {
      throw new InternalServerErrorException('Failed to update ideology');
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an ideology' })
  @ApiResponse({ status: 200, description: 'The ideology has been deleted.' })
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    try {
      await this.database.delete<Ideology>('ideology', id);
      return { message: `Ideology ${id} deleted successfully` };
    } catch (error) {
      throw new NotFoundException(`Failed to delete ideology with ID ${id}`);
    }
  }
}
