import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { CountryController } from './controllers/country.controller';
import { StateController } from './controllers/state.controller';
import { CityController } from './controllers/city.controller';
import { CountryService } from './services/country.service';
import { StateService } from './services/state.service';
import { CityService } from './services/city.service';

@Module({
  imports: [PrismaModule],
  controllers: [CountryController, StateController, CityController],
  providers: [CountryService, StateService, CityService],
  exports: [CountryService, StateService, CityService],
})
export class LocationModule {}
