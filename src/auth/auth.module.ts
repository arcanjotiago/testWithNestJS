import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from '../database/database.module';
import { authProviders } from './auth.providers';
import { userProviders } from '../user/user.providers';

@Module({
  imports: [DatabaseModule],
  controllers:[AuthController],
  providers: [...authProviders, AuthService, ...userProviders],
  exports:[AuthService]
})
export class AuthModule {}