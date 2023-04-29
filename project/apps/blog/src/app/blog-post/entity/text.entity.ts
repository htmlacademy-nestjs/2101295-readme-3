import { Like, PostStatusEnum, PostType, Comment, Tag, BasePost, PostText} from '@project/shared/app-types';

export class TextPostEntity implements BasePost {
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
  public title: string;
  public anonce: string;
  public text: string;


  constructor(post: PostText) {
    this.fillEntity(post);
  }



  public fillEntity(entity: PostText) {
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
    this.title = entity.title;
    this.anonce = entity.anonce;
    this.text = entity.text;
  }

  public toObject(): TextPostEntity {
    return {
      ...this,
      tags: this.tags.map(({ id }) => ({ id })),
      comments: this.comments.map(({ id }) => ({ id })),
    };
  }
}
