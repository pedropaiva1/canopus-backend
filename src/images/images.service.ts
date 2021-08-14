import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateImageDto } from './dto/create-image.dto';
import { ImageEntity } from './entities/image.entity';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(ImageEntity)
    private readonly imageRepository: Repository<ImageEntity>,
  ){}

  async create(file:Express.Multer.File, createImageDto: CreateImageDto, carouselId:number, userId:string){
    
    const image = new ImageEntity()

    image.name = file.filename
    image.description = createImageDto.description
    image.carousel = carouselId

    await this.imageRepository.save(image)

    return image
  }
}
