import {Body, Controller, HttpStatus, Post, Delete, Param, Get} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BlogCommentService } from './blog-comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentRdo } from './rdo/comment.rdo';
import { fillObject } from '@project/util/util-core';

@ApiTags('Comments')
@Controller('comments')
export class BlogCommentController {

  constructor(
    private readonly commentService: BlogCommentService
  ) {}

  @ApiResponse({
    type: CreateCommentDto,
    status: HttpStatus.CREATED,
    description: 'Comment successfully add.',
  })
  @Post()
  public create(@Body() commentData: CreateCommentDto) {
    const comment = this.commentService.create(commentData);
    return fillObject(CommentRdo, comment);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Comment remove.',
  })
  @Delete(':id')
  public destroy(@Param('id') id: string) {
    this.commentService.destroy(id);
    return true;
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.OK,
    description: 'List comments.',
  })
  @Get()
  public async all(@Param('id') id: string) {
    const comments = await this.commentService.all(id);
    return comments.map(item => fillObject(CommentRdo, item));
  }

}
