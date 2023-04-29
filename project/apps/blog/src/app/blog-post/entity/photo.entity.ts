import { Like, PostStatusEnum, PostType, Comment, Tag, PostPhoto} from '@project/shared/app-types';

export class PhotoPostEntity implements PostPhoto {
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
  public photo: string;



  constructor(post: PostPhoto) {
    this.fillEntity(post);
  }



  public fillEntity(entity: PostPhoto) {
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
    this.photo = entity.photo;
  }

  public toObject(): PhotoPostEntity {
    return {
      ...this,
      tags: this.tags.map(({ id }) => ({ id })),
      comments: this.comments.map(({ id }) => ({ id })),
    };
  }
}
