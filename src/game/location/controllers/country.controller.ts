import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from 'src/app.service';
import { CreateCountryDto, UpdateCountryDto } from '../dto/country.dto';

@ApiTags('Countries')
@Controller('countries')
export class CountryController {
  constructor(private readonly database: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get all countries' })
  @ApiResponse({ status: 200, description: 'Return all countries.' })
  async findAll(@Query('isActive') isActive?: boolean) {
    return this.database.findAll('country', {
      where: { isActive },
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a country by id' })
  @ApiResponse({ status: 200, description: 'Return a country.' })
  async findOne(@Param('id') id: string) {
    return this.database.findOne('country', id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new country' })
  @ApiResponse({ status: 201, description: 'The country has been created.' })
  async create(@Body() createCountryDto: CreateCountryDto) {
    return this.database.create('country', createCountryDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a country' })
  @ApiResponse({ status: 200, description: 'The country has been updated.' })
  async update(@Param('id') id: string, @Body() updateCountryDto: UpdateCountryDto) {
    return this.database.update('country', id, updateCountryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a country' })
  @ApiResponse({ status: 200, description: 'The country has been deleted.' })
  async remove(@Param('id') id: string) {
    return this.database.delete('country', id);
  }
}
