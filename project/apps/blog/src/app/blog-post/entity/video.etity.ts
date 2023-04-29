import { Like, PostStatusEnum, PostType, Comment, Tag, PostVideo} from '@project/shared/app-types';

export class VideoPostEntity implements PostVideo {
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
  public video: string;
  public link: string;


  constructor(post: PostVideo) {
    this.fillEntity(post);
  }



  public fillEntity(entity: PostVideo) {
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
    this.video = entity.video;
    this.link = entity.link;
  }

  public toObject(): VideoPostEntity {
    return {
      ...this,
      tags: this.tags.map(({ id }) => ({ id })),
      comments: this.comments.map(({ id }) => ({ id })),
    };
  }
}
