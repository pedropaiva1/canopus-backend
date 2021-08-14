import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [
    UsersModule,
    PassportModule, 
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '86400s' },
    }),
    TokenModule
],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthModule, AuthService],
})
export class AuthModule {}
