import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from '../../../app.service';

@ApiTags('Country Resources')
@Controller('country-resources')
export class CountryResourceController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get all country resources' })
  @ApiResponse({ status: 200, description: 'Return all country resources.' })
  async findAll(
    @Query('countryId') countryId?: string,
    @Query('resourceId') resourceId?: string,
  ) {
    const where = {
      ...(countryId && { countryId }),
      ...(resourceId && { resourceId }),
    };
    return this.appService.findMany('countryResource', {
      where,
      include: { resource: true },
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a country resource by id' })
  @ApiResponse({ status: 200, description: 'Return a country resource.' })
  async findOne(@Param('id') id: string) {
    return this.appService.findOne('countryResource', { id }, {
      include: { resource: true },
    });
  }

  @Post()
  @ApiOperation({ summary: 'Create a new country resource' })
  @ApiResponse({ status: 201, description: 'The country resource has been created.' })
  async create(@Body() createCountryResourceDto: any) {
    return this.appService.create('countryResource', {
      ...createCountryResourceDto,
      lastUpdate: new Date(),
    });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a country resource' })
  @ApiResponse({ status: 200, description: 'The country resource has been updated.' })
  async update(@Param('id') id: string, @Body() updateCountryResourceDto: any) {
    return this.appService.update('countryResource', { id }, {
      ...updateCountryResourceDto,
      lastUpdate: new Date(),
    });
  }

  @Put(':id/produce')
  @ApiOperation({ summary: 'Produce resource' })
  @ApiResponse({ status: 200, description: 'Resource production has been processed.' })
  async produceResource(@Param('id') id: string, @Body('amount') amount: number) {
    const resource = await this.appService.findOne('countryResource', { id });
    return this.appService.update('countryResource', { id }, {
      amount: resource.amount + amount,
      lastUpdate: new Date(),
    });
  }

  @Put(':id/consume')
  @ApiOperation({ summary: 'Consume resource' })
  @ApiResponse({ status: 200, description: 'Resource consumption has been processed.' })
  async consumeResource(@Param('id') id: string, @Body('amount') amount: number) {
    const resource = await this.appService.findOne('countryResource', { id });
    if (resource.amount < amount) {
      throw new Error('Insufficient resources');
    }
    return this.appService.update('countryResource', { id }, {
      amount: resource.amount - amount,
      lastUpdate: new Date(),
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a country resource' })
  @ApiResponse({ status: 200, description: 'The country resource has been deleted.' })
  async remove(@Param('id') id: string) {
    return this.appService.delete('countryResource', { id });
  }
}
