import { Module } from '@nestjs/common';
import { AppModule } from '../../app.module';
import { ConfigController } from './config.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule, AppModule],
  controllers: [ConfigController],
  providers: [],
  exports: []
})
export class ConfigModule {}
