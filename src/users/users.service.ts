import { BadRequestException, Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    ){}

  async create(createUserDto: CreateUserDto) {

    const { name, email, password } = createUserDto

    const userExists = await this.userRepository.findOne({ email })

    if(userExists){
      throw new BadRequestException(`User with email ${email} already exists`)
    }

    let user = new UserEntity()

    user.name = name
    user.email = email
    user.password = bcrypt.hashSync(password, 8)
    
    await this.userRepository.save(user)

    const { createdAt, updatedAt, deletedAt, ...result } = user

    return result;

  }

  async findAll() {
    const users = this.userRepository.find();

    if(!users){
      throw new InternalServerErrorException('Internal server error')
    }

    return users
  }

  async findOneOrFail(email: string) {

    try {
      return await this.userRepository.findOneOrFail({ email })
    } catch (error) {
      throw new NotFoundException(error.message)
    }
    
  }

  async findById(id: string) {
    return await this.userRepository.findOne(id)
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findById(id)

    if(!user){
      throw new NotFoundException(`User with ${id} not found`)
    }

    this.userRepository.merge(user, updateUserDto)
    return await this.userRepository.save(user)
  }

  async remove(id: string) {
    const userExists = await this.findById(id)

    if(!userExists){
      throw new NotFoundException(`User with ${id} not found`)
    } 

    await this.userRepository.softDelete(id)
     
  }
}
