import { Module } from '@nestjs/common';
import { AppModule } from '../../app.module';
import { AnuncesController } from './anunces.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [AppModule, PrismaModule],
  controllers: [AnuncesController]
})
export class AnuncesModule {}
