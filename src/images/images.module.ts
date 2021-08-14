import { ImagesService } from './images.service';
import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImageEntity } from './entities/image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([
    ImageEntity
  ])],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
