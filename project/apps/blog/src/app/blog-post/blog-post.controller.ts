import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { CreatePostLinkDto, CreatePostPhotoDto, CreatePostQuoteDto, CreatePostTextDto, CreatePostVideoDto } from './dto/create-publication.dto';
import { BasePostRdo, PostLinkRdo, PostPhotoRdo, PostQuoteRdo, PostTextRdo, PostVideoRdo } from './rdo/post.rdo';
import { BlogPostService } from './blog-post.service';
import { fillObject } from '@project/util/util-core';
import { PostQuery } from './query/post.query';
import { fillRdoForPost } from './utils/blog-post.utils';

@Controller('post')
export class BlogPostController {

  constructor(
    private readonly publicationService: BlogPostService
    ) {}

  @Get('/:id')
  async show(@Param('id') id: number) {
    const post = await this.publicationService.findById(id);
    return fillRdoForPost(post);
  }

  @Post('create/video')
  public async createVideo(@Body() dto: CreatePostVideoDto) {
    const newPublication = await this.publicationService.create(dto);
    return fillObject(PostVideoRdo, newPublication);
  }

  @Post('create/text')
  public async createText(@Body() dto: CreatePostTextDto) {
    const newPublication = await this.publicationService.create(dto);
    return fillObject(PostTextRdo, newPublication);
  }

  @Post('create/link')
  public async createLink(@Body() dto: CreatePostLinkDto) {
    const newPublication = await this.publicationService.create(dto);
    return fillObject(PostLinkRdo, newPublication);
  }

  @Post('create/quote')
  public async createQuote(@Body() dto: CreatePostQuoteDto) {
    const newPublication = await this.publicationService.create(dto);
    return fillObject(PostQuoteRdo, newPublication);
  }

  @Post('create/photo')
  public async createPhoto(@Body() dto: CreatePostPhotoDto) {
    console.log(1)
    const newPublication = await this.publicationService.create(dto);
    return fillObject(PostPhotoRdo, newPublication);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: number) {
    this.publicationService.deletePost(id);
  }

  @Patch('/:id')
  public async update(
    @Param('id')
      id: number,
    @Body()
      dto
  ) {
    const updatedPost = await this.publicationService.update(id, dto);
    return updatedPost;
  }


  @Get('/')
  async index(@Query() query: PostQuery) {
    const posts = await this.publicationService.getPosts(query);
    return fillObject(BasePostRdo, posts);
  }
}
