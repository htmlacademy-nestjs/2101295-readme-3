import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
//import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostVideoDto } from './dto/create-publication.dto';
import { PostVideoRdo } from './rdo/post.rdo';
import { BlogPostService } from './blog-post.service';
import { fillObject } from '@project/util/util-core';

@Controller('post')
export class BlogPostController {

  constructor(
    private readonly publicationService: BlogPostService
    ) {}


  // @Get()
  // public async showAll() {
  //   return await this.publicationService.findAll();
  // }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const postId = parseInt(id, 10);
    return await this.publicationService.findById(postId);
  }

  @Post('create')
  public async postVideo(@Body() dto: CreatePostVideoDto) {
    const newPublication = await this.publicationService.create(dto);
    return fillObject(PostVideoRdo, newPublication);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: string) {
    const postId = parseInt(id, 10);
    this.publicationService.deletePost(postId);
  }
}
