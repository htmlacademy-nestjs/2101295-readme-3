import { CRUDRepository } from '@project/util/util-types';
import { Comment } from '@project/shared/app-types';
import { Injectable } from '@nestjs/common';
import { BlogCommentEntity } from './blog-comment.entity';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BlogCommentRepository implements CRUDRepository<BlogCommentEntity, number, Comment> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: BlogCommentEntity) {
    return this.prisma.comment.create({
      data: { ...item.toObject()}
    });
  }

  public async findById(id: number): Promise<Comment> {
    return this.prisma.comment.findFirst({
      where: {
        commentId: id
      },
    });
  }

  public async findByPostId(postId: number) {
    const comments = await this.prisma.comment.findMany({
      where: {
        postId
      }
    });
    return comments;
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.comment.delete({
      where: {
        commentId: id
      }
    });  }

  public async update(commentId: number, commentData: BlogCommentEntity): Promise<Comment> {
    return this.prisma.comment.update({
      where: {
        commentId
      },
      data: { ...commentData.toObject(), commentId}
    });
  }
}
