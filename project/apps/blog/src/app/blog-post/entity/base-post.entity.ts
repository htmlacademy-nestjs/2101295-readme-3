
import { BasePost, Like, Post, PostStatusEnum, PostType, Tag, Comment } from "@project/shared/app-types";
import { QuotePostEntity } from "./quote.entity.js";
import { LinkPostEntity } from "./link.entity.js";
import { TextPostEntity } from "./text.entity.js";
import { PhotoPostEntity } from "./photo.entity.js";
import { VideoPostEntity } from "./video.etity.js";

export class BasePostEntity implements BasePost {
  public id: number;
  public status: PostStatusEnum;
  public type: PostType;
  public userId: string;
  public tags: Tag[];
  public likes: Like[];
  public comments: Comment[];
  public createdAt: Date;
  public updatedAt: Date;
  public publishedAt: Date;


  constructor(post: Post) {
    this.fillEntity(post);
  }



  public fillEntity(entity: Post) {
    this.id = entity.id;
    this.tags = [...entity.tags];
    this.type = entity.type;
    this.userId = entity.userId;
    this.createdAt = new Date;
    this.updatedAt = new Date;
    this.publishedAt = new Date;
    this.status = entity.status;
    this.likes = entity.likes;
    this.comments = [];
  }

  public toObject(): BasePostEntity {
    return {
      ...this,
      tags: this.tags.map(({ id }) => ({ id })),
      comments: this.comments.map(({ id }) => ({ id })),
      likes: this.likes.map(({ id }) => ({ id }))

    };
  }
}

export type SharedPostEntity =
| TextPostEntity
| PhotoPostEntity
| VideoPostEntity
| QuotePostEntity
| LinkPostEntity;
