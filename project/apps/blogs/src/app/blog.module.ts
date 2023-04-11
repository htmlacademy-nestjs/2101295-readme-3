import { Module } from '@nestjs/common';
import { BlogCommentModule } from './blog-comment/blog-comment.module';
import { BlogLikesModule } from './blog-like/blog-like.module';
import { BlogPostModule } from './blog-post/blog-post.module';

@Module({
  imports: [BlogCommentModule, BlogLikesModule, BlogPostModule],
  controllers: [],
  providers: [],
})
export class BlogModule {}
