import { Injectable } from '@nestjs/common';
import { BlogCommentMemoryRepository } from './blog-comment-memory.repository';
import { BlogCommentEntity } from './blog-comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class BlogCommentService {

  constructor(
    private readonly commentsRepository: BlogCommentMemoryRepository
  ) { }

  public create(commentData: CreateCommentDto) {
    const commentEntity = new BlogCommentEntity(commentData).setCreateDate();
    return this.commentsRepository.create(commentEntity);
  }

  public destroy(id: string): void {
    this.commentsRepository.destroy(id);
  }

  public async all(id: string) {
    return await this.commentsRepository.all(id);
  }

}
