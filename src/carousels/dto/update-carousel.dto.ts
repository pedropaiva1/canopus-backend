import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength, IsString } from 'class-validator';
import { CreateCarouselDto } from './create-carousel.dto';

export class UpdateCarouselDto extends PartialType(CreateCarouselDto) {
  @MinLength(5)
  @MaxLength(15)
  @IsNotEmpty()
  @IsString()
  title: string;

}
