import { Module } from '@nestjs/common';
import { AppService } from '../app.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  

})
export class MapModule {}
