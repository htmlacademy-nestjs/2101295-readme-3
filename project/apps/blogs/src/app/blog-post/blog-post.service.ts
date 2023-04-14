import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogPostMemoryRepository } from './blog-post-memory.repository';
import { CreatePostLinkDto, CreatePostPhotoDto, CreatePostQuoteDto, CreatePostTextDto, CreatePostVideoDto } from './dto/create-publication.dto';
import { PostLinkEntity, PostPhotoEntity, PostQuoteEntity, PostTextEntity, PostVideoEntity } from './blog-post.entity';
import { PUBLICATION_NOT_FOUND } from './blog-post.constant';

@Injectable()
export class BlogPostService {
  constructor(
    private readonly publicationRepository: BlogPostMemoryRepository
  ) {}

  public async postVideo(dto: CreatePostVideoDto) {

    const publicationEntity = await new PostVideoEntity(dto).setCreatedDate();

    return this.publicationRepository
      .create(publicationEntity);
  }

  public async postText(dto: CreatePostTextDto) {

    const publicationEntity = await new PostTextEntity(dto).setCreatedDate();

    return this.publicationRepository
      .create(publicationEntity);
  }

  public async postPhoto(dto: CreatePostPhotoDto) {

    const publicationEntity = await new PostPhotoEntity(dto).setCreatedDate();

    return this.publicationRepository
      .create(publicationEntity);
  }

  public async postQuote(dto: CreatePostQuoteDto) {

    const publicationEntity = await new PostQuoteEntity(dto).setCreatedDate();

    return this.publicationRepository
      .create(publicationEntity);
  }

  public async postLink(dto: CreatePostLinkDto) {

    const publicationEntity = await new PostLinkEntity(dto).setCreatedDate();

    return this.publicationRepository
      .create(publicationEntity);
  }

  async findAll() {
    return await this.publicationRepository.findAll();
  }

  async findById(id: string) {
    const publication = await this.publicationRepository.findById(id);

    if (!publication) {
      throw new NotFoundException(PUBLICATION_NOT_FOUND);
    }

    return publication;
  }

}
