import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { BlogLikeEntity } from './blog-like.entity';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BlogLikeRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: BlogLikeEntity) {
    const {userId, postId} = item;
    const existingLike = await this.prisma.like.findFirst({ where: { userId, postId } });
    if (existingLike) {
      throw new ConflictException('Like already exists');
    }
    return await this.prisma.like.create({
      data: { ...item.toObject() },
    });
  }

  public async destroy(userId : string, postId: number){
    const existingLike = await this.prisma.like.findFirst({ where: { userId, postId } });
    if (!existingLike) {
      throw new NotFoundException('Like does not exist');
    }
    await this.prisma.like.delete({ where: { id: existingLike.id } });
  }
}
