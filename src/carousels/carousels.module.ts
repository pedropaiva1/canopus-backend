import { Module } from '@nestjs/common';
import { CarouselsService } from './carousels.service';
import { CarouselsController } from './carousels.controller';
import { CarouselEntity } from './entities/carousel.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([
    CarouselEntity,
    UserEntity
  ]), AuthModule],
  controllers: [CarouselsController],
  providers: [CarouselsService]
})
export class CarouselsModule {}
