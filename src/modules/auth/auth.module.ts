import { Module } from '@nestjs/common';
import { UserMongoModule } from 'src/shared';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UserMongoModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
