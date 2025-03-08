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
import { CreateTradeDto, UpdateTradeDto, TradeStatus } from '../dto/trade.dto';

@ApiTags('Trades')
@Controller('trades')
export class TradeController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get all trades' })
  @ApiResponse({ status: 200, description: 'Return all trades.' })
  async findAll(
    @Query('fromCountryId') fromCountryId?: string,
    @Query('toCountryId') toCountryId?: string,
    @Query('status') status?: string
  ) {
    const where = {
      ...(fromCountryId && { fromCountryId }),
      ...(toCountryId && { toCountryId }),
      ...(status && { status }),
    };
    return this.appService.findAll('trade', {
      where,
      include: { items: true },
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a trade by id' })
  @ApiResponse({ status: 200, description: 'Return a trade.' })
  async findOne(@Param('id') id: string) {
    return this.appService.findOne('trade', id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new trade' })
  @ApiResponse({ status: 201, description: 'The trade has been created.' })
  async create(@Body() createTradeDto: CreateTradeDto) {
    const { items, ...tradeData } = createTradeDto;
    return this.appService.create('trade', {
      ...tradeData,
      status: TradeStatus.PENDING,
      items: {
        create: items,
      },
    });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a trade' })
  @ApiResponse({ status: 200, description: 'The trade has been updated.' })
  async update(
    @Param('id') id: string,
    @Body() updateTradeDto: UpdateTradeDto
  ) {
    return this.appService.update('trade', id, updateTradeDto);
  }

  @Put(':id/accept')
  @ApiOperation({ summary: 'Accept a trade' })
  @ApiResponse({ status: 200, description: 'The trade has been accepted.' })
  async acceptTrade(@Param('id') id: string) {
    return this.appService.update('trade', id, {
      status: TradeStatus.ACCEPTED,
    });
  }

  @Put(':id/reject')
  @ApiOperation({ summary: 'Reject a trade' })
  @ApiResponse({ status: 200, description: 'The trade has been rejected.' })
  async rejectTrade(@Param('id') id: string) {
    return this.appService.update('trade', id, {
      status: TradeStatus.REJECTED,
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a trade' })
  @ApiResponse({ status: 200, description: 'The trade has been deleted.' })
  async remove(@Param('id') id: string) {
    return this.appService.delete('trade', id);
  }
}
