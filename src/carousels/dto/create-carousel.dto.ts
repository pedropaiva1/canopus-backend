import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsString
} from 'class-validator';

export class CreateCarouselDto {
  @ApiProperty({ example: "paisagens" })
  @MinLength(5)
  @MaxLength(15)
  @IsNotEmpty()
  @IsString()
  title: string;

}
