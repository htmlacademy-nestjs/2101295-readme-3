import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { BlogTagModule } from './blog-tag/blog-tag.module';
import { BlogLikesModule } from './blog-like/blog-like.module';
import { BlogPostModule } from './blog-post/blog-post.module';
import { BlogCommentModule } from './blog-comment/blog-comment.module';

@Module({
  imports: [PrismaModule, BlogCommentModule, BlogTagModule, BlogLikesModule, BlogPostModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
