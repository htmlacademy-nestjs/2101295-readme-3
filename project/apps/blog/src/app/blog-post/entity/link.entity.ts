import { Like, PostStatusEnum, PostType, Comment, Tag, PostLink} from '@project/shared/app-types';

export class LinkPostEntity implements PostLink {
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
  public discription?: string;
  public link: string;


  constructor(post: PostLink) {
    this.fillEntity(post);
  }



  public fillEntity(entity: PostLink) {
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
    this.discription = entity.discription;
    this.link = entity.link;
  }

  public toObject(): LinkPostEntity {
    return {
      ...this,
      tags: this.tags.map(({ id }) => ({ id })),
      comments: this.comments.map(({ id }) => ({ id })),
    };
  }
}
