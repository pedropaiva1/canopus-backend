import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { TokenController } from './token.controller';
import { TokenEntity } from './token.entity';
import { TokenService } from './token.service';

@Module({
  imports: [TypeOrmModule.forFeature([
    TokenEntity
  ]), forwardRef(() => AuthModule), UsersModule],
  controllers: [TokenController],
  providers: [TokenService],
  exports: [TokenService]
})  
export class TokenModule {}
