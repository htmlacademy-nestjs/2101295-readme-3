import { Like, PostStatusEnum, PostType, Comment, Tag, PostQuote} from '@project/shared/app-types';

export class QuotePostEntity implements PostQuote {
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
  public author: string;
  public quote: string;



  constructor(post: PostQuote) {
    this.fillEntity(post);
  }



  public fillEntity(entity: PostQuote) {
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
    this.author = entity.author;
    this.quote = entity.quote;
  }

  public toObject(): QuotePostEntity {
    return {
      ...this,
      tags: this.tags.map(({ id }) => ({ id })),
      comments: this.comments.map(({ id }) => ({ id })),
    };
  }
}
