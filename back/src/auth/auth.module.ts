import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';

import { LocalStrategy } from './local.strategy';
import { LocalSerializer } from './local.serializer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    TypeOrmModule.forFeature([Users]),
  ],
  providers: [AuthService, LocalStrategy, LocalSerializer],
  exports: [AuthModule]
})
export class AuthModule {}
