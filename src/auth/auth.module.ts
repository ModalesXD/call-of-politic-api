import { Module } from '@nestjs/common';
import { AppService } from '../app.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AuthController],
  providers: [AuthService, AppService],
  exports: [AppService]
})
export class AuthModule {}
