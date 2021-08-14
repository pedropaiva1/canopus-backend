import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/token/token.service';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class AuthService {
    constructor(
      private userService: UsersService,
      private jwtService: JwtService,
      private tokenService: TokenService
    ) {}

    async validateUser(email: string, senha: string): Promise<any> {
      const user = await this.userService.findOneOrFail(email);
      if (user && bcrypt.compareSync(senha, user.password)) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    }

    async login(user: any) {
      const payload = { username: user.email, sub: user.id };
      const token = this.jwtService.sign(payload)
      this.tokenService.save(token, user.email)
      return {
        access_token: token
      };
    }
  }