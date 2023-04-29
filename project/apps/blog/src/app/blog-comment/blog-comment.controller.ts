import {Body, Controller, Post, Delete, Param, Get} from '@nestjs/common';
import { BlogCommentService } from './blog-comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentRdo } from './rdo/comment.rdo';
import { fillObject } from '@project/util/util-core';

@Controller('comments')
export class BlogCommentController {

  constructor(
    private readonly commentService: BlogCommentService
  ) {}


  @Post()
  public create(@Body() commentData: CreateCommentDto) {
    const comment = this.commentService.create(commentData);
    return fillObject(CommentRdo, comment);
  }

  @Delete(':id')
  public destroy(@Param('id') id: number) {
    this.commentService.destroy(id);
    return true;
  }

  @Get()
  public async all(@Param('id') id: number) {
    const comments = await this.commentService.all(id);
    return comments.map(item => fillObject(CommentRdo, item));
  }

}
