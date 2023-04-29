import { Injectable } from '@nestjs/common';
import { BlogCommentRepository } from './blog-comment.repository';
import { BlogCommentEntity } from './blog-comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class BlogCommentService {

  constructor(
    private readonly commentsRepository: BlogCommentRepository
  ) { }

  public create(commentData: CreateCommentDto) {
    const commentEntity = new BlogCommentEntity(commentData);
    return this.commentsRepository.create(commentEntity);
  }

  public destroy(id: number): void {
    this.commentsRepository.destroy(id);
  }

  public async all(id: number) {
    return await this.commentsRepository.findByPostId(id);
  }

}
