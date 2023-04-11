import { Module } from '@nestjs/common';
import { BlogPostController } from './blog-post.controller';
import { BlogPostService } from './blog-post.service';
import { BlogPostMemoryRepository } from './blog-post-memory.repository'

@Module({
  controllers: [BlogPostController],
  providers: [BlogPostService, BlogPostMemoryRepository],
  exports: [BlogPostMemoryRepository]
})
export class BlogPostModule {}
