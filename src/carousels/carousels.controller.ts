import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { CarouselsService } from './carousels.service';
import { CreateCarouselDto } from './dto/create-carousel.dto';
import { UpdateCarouselDto } from './dto/update-carousel.dto';

@Controller('carousels')
export class CarouselsController {
  constructor(
    private readonly carouselsService: CarouselsService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create Carousel' })
  create(@Request() req, @Body() createCarouselDto: CreateCarouselDto) {
    return this.carouselsService.create(req.user.userId, createCarouselDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'List all Carousels' })
  findAll() {
    return this.carouselsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Find one Carousel' })
  findOne(@Param('id') id: string) {
    return this.carouselsService.findOneOrFail(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update Carousel' })
  update(
    @Param('id') id: number,
    @Body() updateCarouselDto: UpdateCarouselDto,
  ) {
    return this.carouselsService.update(id, updateCarouselDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete Carousel' })
  remove(@Param('id') id: number) {
    return this.carouselsService.remove(id);
  }
}
