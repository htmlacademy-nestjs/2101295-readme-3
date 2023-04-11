import { Module } from '@nestjs/common';
import { BlogLikeMemoryRepository } from './blog-like-memory.repository';
import { LikesController } from './blog-like.controller';
import { LikesService } from './blog-like.service';

@Module({
  controllers: [ LikesController ],
  providers: [ LikesService, BlogLikeMemoryRepository ],
})
export class BlogLikesModule {}
