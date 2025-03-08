import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from 'src/app.service';
import { CreateCityDto, UpdateCityDto } from '../dto/city.dto';

@ApiTags('Cities')
@Controller('cities')
export class CityController {
  constructor(private readonly database: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get all cities' })
  @ApiResponse({ status: 200, description: 'Return all cities.' })
  async findAll(@Query('stateId') stateId?: string, @Query('countryId') countryId?: string) {
    return this.database.findAll('city', {
      where: { stateId, countryId },
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a city by id' })
  @ApiResponse({ status: 200, description: 'Return a city.' })
  async findOne(@Param('id') id: string) {
    return this.database.findOne('city', id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new city' })
  @ApiResponse({ status: 201, description: 'The city has been created.' })
  async create(@Body() createCityDto: CreateCityDto) {
    return this.database.create('city', createCityDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a city' })
  @ApiResponse({ status: 200, description: 'The city has been updated.' })
  async update(@Param('id') id: string, @Body() updateCityDto: UpdateCityDto) {
    return this.database.update('city', id, updateCityDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a city' })
  @ApiResponse({ status: 200, description: 'The city has been deleted.' })
  async remove(@Param('id') id: string) {
    return this.database.delete('city', id);
  }
}
