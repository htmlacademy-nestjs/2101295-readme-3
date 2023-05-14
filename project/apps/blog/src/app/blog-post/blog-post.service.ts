import { Injectable } from '@nestjs/common';
import { BlogPostRepository } from './blog-post.repository';
import { SharedPostDto } from './dto/create-publication.dto';
import { VideoPostEntity } from './entity/video.etity';
import { QuotePostEntity } from './entity/quote.entity';
import { LinkPostEntity } from './entity/link.entity';
import { PhotoPostEntity } from './entity/photo.entity';
import { TextPostEntity } from './entity/text.entity';
import { PostQuery } from './query/post.query.js';

export const TypeEntityAdapterObject = {
  'text': TextPostEntity,
  'photo': PhotoPostEntity,
  'video': VideoPostEntity,
  'link': LinkPostEntity,
  'quote': QuotePostEntity
}

@Injectable()
export class BlogPostService {
  constructor(
    private readonly publicationRepository: BlogPostRepository
  ) {}

  public async create(dto: SharedPostDto) {
    const publicationEntity = await new TypeEntityAdapterObject[dto.type](dto);
    return this.publicationRepository
      .create(publicationEntity);
  }

  public async update(id: number, item: SharedPostDto ) {
    const blogPost = await this.findById(id);
    const updatedPost = {...blogPost, ...item}
    const publicationEntity = await new TypeEntityAdapterObject[updatedPost.type](updatedPost);
    return this.publicationRepository
      .update(id, publicationEntity);
  }

  async deletePost(id: number): Promise<void> {
    this.publicationRepository.destroy(id);
  }

  async getPosts(query: PostQuery) {
    return this.publicationRepository.find(query);
  }

  async findById(id: number) {
    const publication = await this.publicationRepository.findById(id);
    return publication;
  }
}
