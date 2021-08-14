import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, HttpCode, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IndexUserSwagger } from './swagger/index-user.swagger';
import { BadRequestSwagger} from '../helpers/swagger/bad-request.swagger';
import { NotFoundSwagger } from '../helpers/swagger/not-found.swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 201,
    description: 'Usuário cadastrado com sucesso',
    type: IndexUserSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Parametros invalidos',
    type: BadRequestSwagger,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all users' })
  @ApiResponse({
    status: 200,
    description: 'List of all users',
    type: IndexUserSwagger,
    isArray: true,
  })
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find one user' })
  @ApiResponse({
    status: 200,
    description: 'Find for one user',
    type: IndexUserSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    type: NotFoundSwagger,
  })
  @UseGuards(JwtAuthGuard)
  findOne(@Param('email') email: string) {
    return this.usersService.findOneOrFail(email);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update User' })
  @ApiResponse({
    status: 200,
    description: 'User information succesfuly updated',
    type: IndexUserSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid params',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    type: NotFoundSwagger,
  })
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({
    status: 204,
    description: 'User succesfuly deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    type: NotFoundSwagger,
  })
  @UseGuards(JwtAuthGuard)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.remove(id);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ summary: 'Login a User' })
  async login(@Request() req) {
    return this.authService.login(req.user)
  }
}

