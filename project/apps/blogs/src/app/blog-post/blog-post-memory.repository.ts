import { CRUDRepository } from '@project/util/util-types';
import { PostEntity } from './blog-post.entity';
import { PostInterface, PostState } from '@project/shared/app-types';
import { Injectable } from '@nestjs/common';
import crypto from 'node:crypto';


@Injectable()
export class BlogPostMemoryRepository implements CRUDRepository<PostEntity, string, PostInterface> {
  private repository: {[key: string]: PostInterface} = {};

  public async create(item: PostEntity): Promise<PostInterface> {
    const entry = { ...item.toObject(), _id: crypto.randomUUID()};
    this.repository[entry._id] = entry;
    return entry;
  }

  //для поиска всех публикаций
  public async findAll(): Promise<PostInterface[] | null> {
    const publications = Object.values(this.repository).filter((publication) => publication.status === PostState.Public);

    return publications;
  }

  //для поиска конкретной публикации
  public async findById(id: string): Promise<PostInterface> {
    if (this.repository[id]) {
      return {...this.repository[id]};
    }

    return null;
  }

   //для поиска публикаций по типу
  public async findByTypes(type: string): Promise<PostInterface[] | null> {
    const publicationsByType = Object.values(this.repository)
      .filter((publication) => publication.type === type || publication.status === PostState.Public);

    return publicationsByType;
  }

   //для поиска публикаций конкретного опльзователя
  public async findByUser (userId: string): Promise<PostInterface[] | null> {
    const publicationsUser = Object.values(this.repository)
      .filter((publication) => publication.userId === userId || publication.status === PostState.Public);

    return publicationsUser;
  }

   //для удаления конкретной публикации
  public async destroy(id: string): Promise<void> {
    delete this.repository[id];
  }

   //для редактирования конкретной публикации
  public async update(id: string, item: PostEntity): Promise<PostInterface> {
    this.repository[id] = {...item.toObject(), _id: id};
    return this.findById(id);
  }
}
