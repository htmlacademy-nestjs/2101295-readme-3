import {
  Like,
  PostType,
  Tag,
} from '@project/shared/app-types';
import { PostStatusEnum } from './post-status.enum.js'


export interface BasePost {
  id?: number;
  userId: string;
  status: PostStatusEnum;
  tags?: Tag[];
  type: PostType;
  createdAt: Date;
  publishedAt: Date;
  updatedAt: Date;
  likes?: Like[];
}

export interface PostVideo extends BasePost{
  title: string;
  video: string;
  link: string;
}

export interface PostText extends BasePost{
  title: string;
  anonce: string;
  text: string;
}

export interface PostQuote extends BasePost{
  author: string;
  quote: string;
}

export interface PostPhoto extends BasePost{
  photo: string;
}

export interface PostLink extends BasePost{
  link: string;
  discription?: string;
}


export type Post =
  | PostText
  | PostVideo
  | PostPhoto
  | PostQuote
  | PostLink;
