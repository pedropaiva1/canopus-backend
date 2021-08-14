import { PartialType } from '@nestjs/swagger';
import { IsEmail, IsInt, IsNotEmpty, Max, MaxLength, Min, MinLength } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {

  @MinLength(5)
  @MaxLength(15)
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

}
