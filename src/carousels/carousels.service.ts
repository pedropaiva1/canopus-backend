import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCarouselDto } from './dto/create-carousel.dto';
import { UpdateCarouselDto } from './dto/update-carousel.dto';
import { CarouselEntity } from './entities/carousel.entity';

@Injectable()
export class CarouselsService {
  constructor(
    @InjectRepository(CarouselEntity)
    private readonly carouselRepository: Repository<CarouselEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async create(userId: string, createCarouselDto: CreateCarouselDto) {
    const { title } = createCarouselDto;

    const carouselExists = await this.carouselRepository.findOne({ title: title });

    if (carouselExists) {
      throw new BadRequestException(
        `Carousel with title ${title} already exists`,
      );
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const carousel = await this.carouselRepository.create({
      title,
      author: user,
    });

    await this.carouselRepository.save(carousel);

    return carousel
  }

  async findAll() {
    const carousels = this.carouselRepository.find();

    if (!carousels) {
      return { error: 'Users not found' };
    }

    return carousels;
  }

  async findOneOrFail(id: number) {
    try {
      return await this.carouselRepository.findOneOrFail(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: number, updateCarouselDto: UpdateCarouselDto, userId: string) {
    const carousel = await this.findOneOrFail(id);

    if (!carousel) {
      throw new NotFoundException(`Carousel with ${id} not found`);
    }

    if(carousel.author.id !== userId){
      throw new BadRequestException(`Operation not allowed for User with id ${userId}`)
    }

    this.carouselRepository.merge(carousel, updateCarouselDto);
    return await this.carouselRepository.save(carousel);
  }

  async remove(id: number, userId: string) {
    console.log(id);
    const carouselExists = await this.carouselRepository.findOne(id);

    if (!carouselExists) {
      throw new NotFoundException(`carousel with ${id} not found`);
    }

    if(carouselExists.author.id !== userId){
      throw new BadRequestException(`Operation not allowed for User with id ${userId}`)
    }

    await this.carouselRepository.softDelete(id);

  }
}
