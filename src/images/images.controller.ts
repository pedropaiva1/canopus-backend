
import {
  Body,
  Delete, 
  Get,
  Param, 
  UseGuards,
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Request,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
  constructor(
    private readonly imageService: ImagesService
  ) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Upload a file' })
  @UseInterceptors(
    FileInterceptor('photo', {
      dest: './uploads',
    }),
  )
  uploadFile(
    @Request() req,
    @UploadedFile() file,
    @Body() body,
    @Param('carouselId') carouselId: number,
  ) {
    return this.imageService.create(file, body, carouselId);
  }

  @Get()
  @ApiOperation({ summary: 'List Files' })
  @UseGuards(JwtAuthGuard)
  findAll(){
    return this.imageService.findAll()
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete Files' })
  remove(@Param('id') id: number){
    return this.imageService.remove(id)
  }
}