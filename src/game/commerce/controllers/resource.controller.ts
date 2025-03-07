import { Controller, Get, Post, Body, Param, Query, Put, Delete } from '@nestjs/common';
import { AppService } from '../../../app.service';
import { CreateResourceDto, UpdateResourceDto, CreateCountryResourceDto, UpdateCountryResourceDto } from '../dto/resource.dto';

@Controller('resource')
export class ResourceController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async findAll(@Query() query: any) {
    return this.appService.findAll('resource', query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.appService.findOne('resource', id);
  }

  @Post()
  async create(@Body() createResourceDto: CreateResourceDto) {
    return this.appService.create('resource', createResourceDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateResourceDto: UpdateResourceDto) {
    return this.appService.update('resource', id, updateResourceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.appService.delete('resource', id);
  }

  // Country Resource endpoints
  @Get('country/:countryId')
  async findCountryResources(@Param('countryId') countryId: string) {
    return this.appService.findAll('countryResource', {
      where: { countryId },
      include: { resource: true },
    });
  }

  @Post('country/:countryId')
  async createCountryResource(
    @Param('countryId') countryId: string,
    @Body() createCountryResourceDto: CreateCountryResourceDto,
  ) {
    return this.appService.create('countryResource', {
      ...createCountryResourceDto,
      countryId,
    });
  }

  @Put('country/:countryId/resource/:resourceId')
  async updateCountryResource(
    @Param('id') id: string,
    @Body() updateCountryResourceDto: UpdateCountryResourceDto,
  ) {
    return this.appService.update('countryResource', id, updateCountryResourceDto);
  }

  // Resource Market endpoints
  @Get(':id/market')
  async getResourceMarket(@Param('id') id: string) {
    const marketOrders: { type: string; price: number; amount: number }[] = await this.appService.findAll('marketOrder', {
      where: {
        resourceId: id,
        status: 'ACTIVE',
      },
      include: {
        resource: true,
        player: {
          include: {
            baseUser: {
              include: {
                country: true,
              },
            },
          },
        },
      },
    });

    return {
      buyOrders: marketOrders.filter(order => order.type === 'BUY'),
      sellOrders: marketOrders.filter(order => order.type === 'SELL'),
      marketStats: {
        lowestSellPrice: Math.min(...marketOrders.filter(order => order.type === 'SELL').map(order => order.price)),
        highestBuyPrice: Math.max(...marketOrders.filter(order => order.type === 'BUY').map(order => order.price)),
        totalVolume: marketOrders.reduce((acc, order) => acc + order.amount, 0),
      },
    };
  }
}
