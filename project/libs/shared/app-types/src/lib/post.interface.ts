import {
  PostType,
  Tag,
} from '@project/shared/app-types';
import { PostState } from './post-status.enum.js'


export interface BasePost {
  _id?: string;
  userId: string;
  status: PostState;
  tags?: Tag[];
  type: PostType;
}

export interface PostVideo extends BasePost {
  title: string;
  video: string;
  link: string;
}

export interface PostText extends BasePost {
  title: string;
  anonce: string;
  text: string;
}

export interface PostQuote extends BasePost {
  author: string;
  quote: string;
}

export interface PostPhoto extends BasePost {
  photo: string;
}

export interface PostLink extends BasePost {
  link: string;
  discription?: string;
}


export type PostInterface =
  | PostText
  | PostVideo
  | PostPhoto
  | PostQuote
  | PostLink;
