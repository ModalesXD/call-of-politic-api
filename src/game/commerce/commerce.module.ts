import { Module } from '@nestjs/common';
import { EconomyController } from './controllers/economy.controller';
import { TaxController } from './controllers/tax.controller';
import { MarketOrderController } from './controllers/market-order.controller';
import { TradeController } from './controllers/trade.controller';
import { CountryResourceController } from './controllers/country-resource.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { AppService } from '../../app.service';
import { ResourceController } from './controllers/resource.controller';

@Module({
  imports: [PrismaModule],
  controllers: [
    EconomyController,
    TaxController,
    MarketOrderController,
    TradeController,
    CountryResourceController,
    ResourceController
  ],
  providers: [AppService]
})
export class CommerceModule {}
