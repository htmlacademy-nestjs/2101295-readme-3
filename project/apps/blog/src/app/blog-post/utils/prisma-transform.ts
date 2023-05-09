import {
  PostVideo as PostVideoDB,
  Post as PostDB,
  PostLink as PostLinkDB,
  PostText as PostTextDB,
  PostPhoto as PostPhotoDB,
  PostQuote as PostQuoteDB
} from '@prisma/client';
import { PostLink, PostPhoto, PostQuote, PostStatusEnum, PostText, PostTypeEnum, PostVideo} from '@project/shared/app-types';


export function prismaToPost(prismaPost: PostDB | null, prismaContent) {
  switch (prismaPost.type) {
    case PostTypeEnum.Text:
      return prismaToPostText(prismaPost, prismaContent)
    case PostTypeEnum.Image:
      return prismaToPostPhoto(prismaPost, prismaContent)
    case PostTypeEnum.Video:
      return prismaToPostVideo(prismaPost, prismaContent)
    case PostTypeEnum.Link:
      return prismaToPostLink(prismaPost, prismaContent)
    case PostTypeEnum.Quote:
      return prismaToPostQuote(prismaPost, prismaContent)  }
}

export function prismaToPostQuote(prismaPost: PostDB | null, prismaVideo: PostQuoteDB): PostQuote {
  if (prismaPost) {
    const post = {
      id: prismaPost.postId,
      userId: prismaPost.userId,
      status: prismaPost.status as PostStatusEnum,
      type: prismaPost.type,
      createdAt: prismaPost.createdAt,
      publishedAt: prismaPost.publishedAt,
      updatedAt: prismaPost.updatedAt,
      author: prismaVideo.author,
      quote: prismaVideo.quote,
    }
    return post;
  }
  return null;
}

export function prismaToPostPhoto(prismaPost: PostDB | null, prismaVideo: PostPhotoDB): PostPhoto {
  if (prismaPost) {
    const post = {
      id: prismaPost.postId,
      userId: prismaPost.userId,
      status: prismaPost.status as PostStatusEnum,
      type: prismaPost.type,
      createdAt: prismaPost.createdAt,
      publishedAt: prismaPost.publishedAt,
      updatedAt: prismaPost.updatedAt,
      photo: prismaVideo.photo,
    }
    return post;
  }
  return null;
}

export function prismaToPostText(prismaPost: PostDB | null, prismaText: PostTextDB): PostText {
  if (prismaPost) {
    const post = {
      id: prismaPost.postId,
      userId: prismaPost.userId,
      status: prismaPost.status as PostStatusEnum,
      type: prismaPost.type,
      createdAt: prismaPost.createdAt,
      publishedAt: prismaPost.publishedAt,
      updatedAt: prismaPost.updatedAt,
      title: prismaText.title,
      anonce: prismaText.anonce,
      text: prismaText.text
    }
    return post;
  }
  return null;
}

export function prismaToPostVideo(prismaPost: PostDB | null, prismaVideo: PostVideoDB): PostVideo {
  if (prismaPost) {
    const post = {
      id: prismaPost.postId,
      userId: prismaPost.userId,
      status: prismaPost.status as PostStatusEnum,
      type: prismaPost.type,
      createdAt: prismaPost.createdAt,
      publishedAt: prismaPost.publishedAt,
      updatedAt: prismaPost.updatedAt,
      title: prismaVideo.title,
      video: prismaVideo.video
    }
    return post;
  }
  return null;
}

export function prismaToPostLink(prismaPost: PostDB | null, prismaLink: PostLinkDB): PostLink {
  if (prismaPost) {
    const post = {
      id: prismaPost.postId,
      userId: prismaPost.userId,
      status: prismaPost.status as PostStatusEnum,
      type: prismaPost.type,
      createdAt: prismaPost.createdAt,
      publishedAt: prismaPost.publishedAt,
      updatedAt: prismaPost.updatedAt,
      discription: prismaLink.discription,
      link: prismaLink.link,
    }
    return post;
  }
  return null;
}
