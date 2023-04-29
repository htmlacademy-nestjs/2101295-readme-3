import { Body, Controller, Delete, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LikesService } from './blog-like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { LikeRdo } from './rdo/like.rdo';
import { fillObject } from '@project/util/util-core';

@Controller('likes')
export class LikesController {

  constructor(
    private readonly likesService: LikesService
  ) { }

  @Post('/')
  async create(@Body() likeData: CreateLikeDto) {
    const newLike = await this.likesService.create(likeData);
    return fillObject(LikeRdo, newLike);
  }

  @Delete('/')
  @HttpCode(HttpStatus.NO_CONTENT)
  public destroy(@Body() likeData: CreateLikeDto) {
    this.likesService.destroy(likeData);
    return true;
  }
}
