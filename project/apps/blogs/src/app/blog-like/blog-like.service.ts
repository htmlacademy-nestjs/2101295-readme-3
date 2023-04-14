import { Injectable } from '@nestjs/common';
import { BlogLikeMemoryRepository } from './blog-like-memory.repository';
import { LikeEntity } from './blog-like.entity';
import { CreateLikeDto } from './dto/create-like.dto';
import { Like } from '@project/shared/app-types';

@Injectable()
export class LikesService {

  constructor(
    private readonly likesRepository: BlogLikeMemoryRepository
  ) { }

  public create(like: CreateLikeDto): Promise<Like>  {
    const likeEntity = new LikeEntity(like)
    return this.likesRepository.create(likeEntity);
  }

  public destroy(id: string) {
    this.likesRepository.destroy(id);
  }

  public async count(postID: string): Promise<number> {
    return await this.likesRepository.count(postID);
  }
}
