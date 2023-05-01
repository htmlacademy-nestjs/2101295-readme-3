import { Post, PostLink, PostPhoto, PostQuote, PostStatusEnum, PostText, PostVideo} from '@project/shared/app-types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { VideoPostEntity } from './entity/video.etity';
import {
  PostVideo as PostVideoDB,
  Post as PostDB,
  PostLink as PostLinkDB,
  PostText as PostTextDB,
  PostPhoto as PostPhotoDB,
  PostQuote as PostQuoteDB
} from '@prisma/client';
import { SharedPostEntity } from './entity/base-post.entity.js';
import { LinkPostEntity } from './entity/link.entity.js';
import { TextPostEntity } from './entity/text.entity.js';
import { PhotoPostEntity } from './entity/photo.entity.js';
import { QuotePostEntity } from './entity/quote.entity.js';

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

export function prismaToPostText(prismaPost: PostDB | null, prismaVideo: PostTextDB): PostText {
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
      anonce: prismaVideo.anonce,
      text: prismaVideo.text
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
      link: prismaVideo.link,
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

@Injectable()
export class BlogPostRepository
//implements CRUDRepository<SharedPostEntity, number, Post>
{
  constructor(private readonly prisma: PrismaService) {}


  public async create(item: SharedPostEntity): Promise<Post> {
    if (item.type === 'video') {return this.createVideo(item as VideoPostEntity)}
    if (item.type === 'link') {return this.createLink(item as LinkPostEntity)}
    if (item.type === 'quote') {return this.createQuote(item as QuotePostEntity)}
    if (item.type === 'image') {return this.createPhoto(item as PhotoPostEntity)}
    if (item.type === 'text') {return this.createText(item as TextPostEntity)}
  }


  public async createVideo(item: VideoPostEntity): Promise<Post>{
    const entityData = item.toObject();
    const content = {
      title: entityData.title,
      video: entityData.video,
      link: entityData.link
    };
    delete entityData.title;
    delete entityData.video;
    delete entityData.link

    const result = await this.prisma.post.create({
      data: {
        ...entityData,
        postVideo: {
          create: content

        },
        tags: {
          connect: []
        },
        comments: {
          connect: []
        },
        likes: {
          connect: []
        },
      },
      include: {
        comments: true,
        tags: true,
        likes: true
      }

    })
    const prismaVideoPost = await this.prisma.postVideo.findFirst({
      where: {
        id: (await result).postId
      }})

    return prismaToPostVideo(result, prismaVideoPost);
  }

  public async createLink(item: LinkPostEntity): Promise<Post>{
    const entityData = item.toObject();
    const content = {
      discription: entityData.discription,
      link: entityData.link
    };
    delete entityData.discription;
    delete entityData.link

    const result = await this.prisma.post.create({
      data: {
        ...entityData,
        postLink: {
          create: content

        },
        tags: {
          connect: []
        },
        comments: {
          connect: []
        },
        likes: {
          connect: []
        },
      },
      include: {
        comments: true,
        tags: true,
        likes: true
      }

    })
    const prismaLinkPost = await this.prisma.postLink.findFirst({
      where: {
        id: result.postId
      }})

    return prismaToPostLink(result, prismaLinkPost);
  }

  public async createText(item: TextPostEntity): Promise<Post>{
    const entityData = item.toObject();
    const content = {
      title: entityData.title,
      anonce: entityData.anonce,
      text: entityData.text
    };
    delete entityData.title;
    delete entityData.anonce;
    delete entityData.text

    const result = await this.prisma.post.create({
      data: {
        ...entityData,
        postText: {
          create: content

        },
        tags: {
          connect: []
        },
        comments: {
          connect: []
        },
        likes: {
          connect: []
        },
      },
      include: {
        comments: true,
        tags: true,
        likes: true
      }

    })
    const prismaTextPost = await this.prisma.postText.findFirst({
      where: {
        id: result.postId
      }})

    return prismaToPostText(result, prismaTextPost);
  }
  public async createQuote(item: QuotePostEntity): Promise<Post>{
    const entityData = item.toObject();
    const content = {
      author: entityData.author,
      quote: entityData.quote,

    };
    delete entityData.author;
    delete entityData.quote;

    const result = await this.prisma.post.create({
      data: {
        ...entityData,
        postQuote: {
          create: content

        },
        tags: {
          connect: []
        },
        comments: {
          connect: []
        },
        likes: {
          connect: []
        },
      },
      include: {
        comments: true,
        tags: true,
        likes: true
      }

    })
    const prismaQuotePost = await this.prisma.postQuote.findFirst({
      where: {
        id: result.postId
      }})

    return prismaToPostQuote(result, prismaQuotePost);
  }

  public async createPhoto(item: PhotoPostEntity): Promise<Post>{
    const entityData = item.toObject();
    const content = {
      photo: entityData.photo,

    };
    delete entityData.photo;

    const result = await this.prisma.post.create({
      data: {
        ...entityData,
        postPhoto: {
          create: content

        },
        tags: {
          connect: []
        },
        comments: {
          connect: []
        },
        likes: {
          connect: []
        },
      },
      include: {
        comments: true,
        tags: true,
        likes: true
      }

    })
    const prismaPhotoPost = await this.prisma.postPhoto.findFirst({
      where: {
        id: result.postId
      }})

    return prismaToPostPhoto(result, prismaPhotoPost);
  }

  public async findById(postId: number){
    const post = await this.prisma.post.findFirst ({
      where: {
        postId
      },
      include: {
        comments: true,
        postLink: true,
        postPhoto: true,
        postText: true,
        postQuote: true,
        postVideo: true
      }
    });
    return post;
  }

  public async destroy(postId: number): Promise<void> {
    await this.prisma.post.delete({
      where: {
        postId,
      }
    });
  }

  public update(_id: number, _item: SharedPostEntity): Promise<Post> {
    return Promise.resolve(undefined);
  }
}
