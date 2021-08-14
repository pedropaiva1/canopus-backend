import { Body, Param, UseGuards } from '@nestjs/common';
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Request
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
  constructor(
    private readonly imageService: ImagesService
  ) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard)
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
    console.log(body);
    console.log(file);

    return this.imageService.create(file, body, carouselId, req.user.userId);
  }
}
