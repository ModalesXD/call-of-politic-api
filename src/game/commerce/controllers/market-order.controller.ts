import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from '../../../app.service';
import { CreateMarketOrderDto, UpdateMarketOrderDto, MarketOrderStatus } from '../dto/market-order.dto';

@ApiTags('Market Orders')
@Controller('market-orders')
export class MarketOrderController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get all market orders' })
  @ApiResponse({ status: 200, description: 'Return all market orders.' })
  async findAll(
    @Query('resourceId') resourceId?: string,
    @Query('countryId') countryId?: string,
    @Query('type') type?: string,
    @Query('status') status?: string,
  ) {
    const where = {
      ...(resourceId && { resourceId }),
      ...(countryId && { countryId }),
      ...(type && { type }),
      ...(status && { status }),
    };
    return this.appService.findAll('marketOrder', { where });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a market order by id' })
  @ApiResponse({ status: 200, description: 'Return a market order.' })
  async findOne(@Param('id') id: string) {
    return this.appService.findOne('marketOrder', id );
  }

  @Post()
  @ApiOperation({ summary: 'Create a new market order' })
  @ApiResponse({ status: 201, description: 'The market order has been created.' })
  async create(@Body() createMarketOrderDto: CreateMarketOrderDto) {
    return this.appService.create('marketOrder', {
      ...createMarketOrderDto,
      status: MarketOrderStatus.PENDING,
    });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a market order' })
  @ApiResponse({ status: 200, description: 'The market order has been updated.' })
  async update(
    @Param('id') id: string,
    @Body() updateMarketOrderDto: UpdateMarketOrderDto,
  ) {
    return this.appService.update('marketOrder', id , updateMarketOrderDto);
  }

  @Put(':id/cancel')
  @ApiOperation({ summary: 'Cancel a market order' })
  @ApiResponse({ status: 200, description: 'The market order has been cancelled.' })
  async cancelOrder(@Param('id') id: string) {
    return this.appService.update('marketOrder', id, {
      status: MarketOrderStatus.CANCELLED,
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a market order' })
  @ApiResponse({ status: 200, description: 'The market order has been deleted.' })
  async remove(@Param('id') id: string) {
    return this.appService.delete('marketOrder', id );
  }
}
