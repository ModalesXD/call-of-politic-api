import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from 'src/app.service';
import { CreateStateDto, UpdateStateDto } from '../dto/state.dto';

@ApiTags('States')
@Controller('states')
export class StateController {
  constructor(private readonly database: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get all states' })
  @ApiResponse({ status: 200, description: 'Return all states.' })
  async findAll(@Query('countryId') countryId?: string) {
    return this.database.findAll('state', {
      where: { countryId },
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a state by id' })
  @ApiResponse({ status: 200, description: 'Return a state.' })
  async findOne(@Param('id') id: string) {
    return this.database.findOne('state', id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new state' })
  @ApiResponse({ status: 201, description: 'The state has been created.' })
  async create(@Body() createStateDto: CreateStateDto) {
    return this.database.create('state', createStateDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a state' })
  @ApiResponse({ status: 200, description: 'The state has been updated.' })
  async update(@Param('id') id: string, @Body() updateStateDto: UpdateStateDto) {
    return this.database.update('state', id, updateStateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a state' })
  @ApiResponse({ status: 200, description: 'The state has been deleted.' })
  async remove(@Param('id') id: string) {
    return this.database.delete('state', id);
  }
}
