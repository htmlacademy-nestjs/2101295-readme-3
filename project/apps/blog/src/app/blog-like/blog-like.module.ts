import { Module } from '@nestjs/common';
import { BlogLikeRepository } from './blog-like.repository';
import { LikesController } from './blog-like.controller';
import { LikesService } from './blog-like.service';

@Module({
  imports: [],
  controllers: [ LikesController ],
  providers: [ LikesService, BlogLikeRepository ],
  exports: [BlogLikeRepository]
})
export class BlogLikesModule {}
