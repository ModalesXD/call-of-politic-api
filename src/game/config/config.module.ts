import { Module } from '@nestjs/common';
import { AppModule } from '../../app.module';
import { ConfigController } from './config.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AppService } from 'src/app.service';

@Module({
  imports: [PrismaModule],
  controllers: [ConfigController],
  providers: [AppService],
  exports: []
})
export class ConfigModule {}
