import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostLinkDto, CreatePostPhotoDto, CreatePostQuoteDto, CreatePostTextDto, CreatePostVideoDto } from './dto/create-publication.dto';
import { PostLinkRdo, PostPhotoRdo, PostQuoteRdo, PostTextRdo, PostVideoRdo } from './rdo/post.rdo';
import { BlogPostService } from './blog-post.service';
import { fillObject } from '@project/util/util-core';

@ApiTags('BlogPost')
@Controller('post')
export class BlogPostController {

  constructor(
    private readonly publicationService: BlogPostService
    ) {}


  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List publications.',
  })
  @Get()
  public async showAll() {
    return await this.publicationService.findAll();
  }

  @ApiResponse({
    description: 'return one publication by id',
    status: HttpStatus.OK,
  })
  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.publicationService.findById(id);

  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new publication has been successfully created.'
  })
  @Post('video')
  public async postVideo(@Body() dto: CreatePostVideoDto) {
    const newPublication = await this.publicationService.postVideo(dto);
    return fillObject(PostVideoRdo, newPublication);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new publication has been successfully created.'
  })
  @Post('photo')
  public async postPhoto(@Body() dto: CreatePostPhotoDto) {
    const newPublication = await this.publicationService.postPhoto(dto);
    return fillObject(PostPhotoRdo, newPublication);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new publication has been successfully created.'
  })
  @Post('text')
  public async postText(@Body() dto: CreatePostTextDto) {
    const newPublication = await this.publicationService.postText(dto);
    return fillObject(PostTextRdo, newPublication);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new publication has been successfully created.'
  })
  @Post('link')
  public async postLink(@Body() dto: CreatePostLinkDto) {
    const newPublication = await this.publicationService.postLink(dto);
    return fillObject(PostLinkRdo, newPublication);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new publication has been successfully created.'
  })
  @Post('quote')
  public async postQuote(@Body() dto: CreatePostQuoteDto) {
    const newPublication = await this.publicationService.postQuote(dto);
    return fillObject(PostQuoteRdo, newPublication);
  }
}
