import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { CountryController } from './controllers/country.controller';
import { StateController } from './controllers/state.controller';
import { CityController } from './controllers/city.controller';
import { AppService } from 'src/app.service';

@Module({
  imports: [PrismaModule],
  controllers: [CountryController, StateController, CityController],
  providers: [AppService],
})
export class LocationModule {}
