import { Module } from '@nestjs/common';
import { AnuncesController } from './anunces.controller';
import { AnuncesService } from './anunces.service';

import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AnuncesController],
  providers: [AnuncesService]
})
export class AnuncesModule {}
