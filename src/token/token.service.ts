import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { TokenEntity } from './token.entity';

@Injectable()
export class TokenService {

  constructor(
    @InjectRepository(TokenEntity)
      private readonly tokenRepository: Repository<TokenEntity>,
      private usersService: UsersService,
      @Inject(forwardRef(() => AuthService ))
      private authService: AuthService
    ){}

  async save(hash: string, username: string){
    let objectToken = await this.tokenRepository.findOne({ username })
    if(objectToken){
      this.tokenRepository.update(objectToken.id, {
        hash
      })
    } else {
      this.tokenRepository.insert({
        hash,
        username
      })
    }
  }

  async refreshToken(oldToken: string){
    let objectToken = await this.tokenRepository.findOne({ hash: oldToken })
    if(objectToken){
      let user = await this.usersService.findOneOrFail(objectToken.username)
      return this.authService.login(user)
    } else {
      return new HttpException({
        errorMessage: 'Token inválido'
      }, HttpStatus.UNAUTHORIZED)
    }
  }
}
