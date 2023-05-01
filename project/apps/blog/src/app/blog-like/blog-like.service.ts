import { Injectable } from '@nestjs/common';
import { BlogLikeRepository } from './blog-like.repository';
import { BlogLikeEntity } from './blog-like.entity';
import { CreateLikeDto } from './dto/create-like.dto';
import { Like } from '@project/shared/app-types';

@Injectable()
export class LikesService {

  constructor(
    private readonly likesRepository: BlogLikeRepository
  ) { }

  public create(like: CreateLikeDto): Promise<Like>  {
    const likeEntity = new BlogLikeEntity(like)
    return this.likesRepository.create(likeEntity);
  }

  public destroy(like: CreateLikeDto) {
    this.likesRepository.destroy(like.userId, like.postId);
  }
}
