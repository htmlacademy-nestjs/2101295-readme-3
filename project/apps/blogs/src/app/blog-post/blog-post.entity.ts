import { BasePost, PostLink, PostPhoto, PostQuote, PostState, PostText, PostType, PostVideo, Tag} from '@project/shared/app-types';
import dayjs from 'dayjs';

export class BasePostEntity implements BasePost {
  public _id: string;
  public status: PostState;
  public type: PostType;
  public userId: string;
  public tags: Tag[];
  public createdAt: number;
  public updatedAt: number;

  constructor(publication: BasePost) {
    this.fillEntity(publication);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(publication: BasePost) {
    this._id = publication._id;
    this.tags = publication.tags;
    this.type = publication.type;
    this.userId = publication.userId;
    // this.createdAt = publication.createdAt;
    // this.updatedAt = publication.updatedAt;
    this.status = publication.status;
  }

  public setCreatedDate() {
    this.createdAt = dayjs().unix();
    return this;
  }

  public setUpdatedDate() {
    this.updatedAt = dayjs().unix();
    return this;
  }
}

export class PostVideoEntity extends BasePostEntity {
  public title: string;
  public video: string;
  public link: string;

  constructor(post: PostVideo) {
    super(post);

    this.title = post.title;
    this.video = post.video;
    this.link = post.link;
  }
}

export class PostTextEntity extends BasePostEntity {
  public title: string;
  public anonce: string;
  public text: string;

  constructor(publication: PostText) {
    super(publication);
    this.title = publication.title;
    this.anonce = publication.anonce;
    this.text = publication.text;
  }
}

export class PostQuoteEntity extends BasePostEntity {
  public author: string;
  public quote: string;

  constructor(publication: PostQuote) {
    super(publication);
    this.author = publication.author;
    this.quote = publication.quote;
  }
}

export class PostPhotoEntity extends BasePostEntity {
  public photo: string;

  constructor(publication: PostPhoto) {
    super(publication);
    this.photo = publication.photo;
  }
}


export class PostLinkEntity extends BasePostEntity {
  public link: string;
  public discription?: string;

  constructor(publication: PostLink) {
    super(publication);
    this.discription = publication.discription;
    this.link = publication.link;
  }
}

export type PostEntity =
  | PostTextEntity
  | PostPhotoEntity
  | PostVideoEntity
  | PostQuoteEntity
  | PostLinkEntity;
