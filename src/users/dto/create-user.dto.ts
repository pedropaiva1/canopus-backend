import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsEmail,
  MinLength,
  MaxLength,
  IsString
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: "pedro" })
  @MinLength(5)
  @MaxLength(15)
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: "pedro.paivahmp@gmail.com" })
  @IsEmail()
  email: string;
  
  @ApiProperty({ example: "12341234" })
  @IsNotEmpty()
  @MinLength(8)
  password: string;

}
