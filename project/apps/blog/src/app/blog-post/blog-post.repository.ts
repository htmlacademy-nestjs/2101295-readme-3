import { Post, PostTypeEnum } from '@project/shared/app-types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { VideoPostEntity } from './entity/video.etity';
import { SharedPostEntity } from './entity/base-post.entity.js';
import { LinkPostEntity } from './entity/link.entity.js';
import { TextPostEntity } from './entity/text.entity.js';
import { PhotoPostEntity } from './entity/photo.entity.js';
import { QuotePostEntity } from './entity/quote.entity.js';
import { PostQuery } from './query/post.query.js';
import { prismaToPost, prismaToPostLink, prismaToPostPhoto, prismaToPostQuote, prismaToPostText, prismaToPostVideo } from './utils/prisma-transform';
import {
  PostVideo as PostVideoDB,
  Post as PostDB,
  PostLink as PostLinkDB,
  PostText as PostTextDB,
  PostPhoto as PostPhotoDB,
  PostQuote as PostQuoteDB
} from '@prisma/client';

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
    };
    delete entityData.title;
    delete entityData.video;

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

    return prismaToPost(result, prismaVideoPost);
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

    return prismaToPost(result, prismaLinkPost);
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
    return prismaToPost(result, prismaTextPost);
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

    return prismaToPost(result, prismaQuotePost);
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

    return prismaToPost(result, prismaPhotoPost);
  }

  public async findByIdText(postId: number){
    const post = await this.prisma.postText.findFirst ({
      where: {
        id: postId
      },
    });
    return post;
  }

  public async findByIdLink(postId: number){
    const post = await this.prisma.postLink.findFirst ({
      where: {
        id: postId
      },
    });
    return post;
  }

  public async findByIdQuote(postId: number){
    const post = await this.prisma.postQuote.findFirst ({
      where: {
        id: postId
      },
    });
    return post;
  }

  public async findByIdVideo(postId: number){
    const post = await this.prisma.postVideo.findFirst ({
      where: {
        id: postId
      },
    });
    return post;
  }

  public async findByIdPhoto(postId: number){
    const post = await this.prisma.postVideo.findFirst ({
      where: {
        id: postId
      },
    });
    return post;
  }

  public async findById(postId: number){
    const post = await this.prisma.post.findFirst ({
      where: {
        postId
      },
      include: {
        comments: true,
      }
    });
    let postContent;
    if (post.type === PostTypeEnum.Video) { postContent = await this.findByIdVideo(postId)}
    if (post.type ===  PostTypeEnum.Text) { postContent = await this.findByIdText(postId)}
    if (post.type ===  PostTypeEnum.Link) { postContent = await this.findByIdLink(postId)}
    if (post.type ===  PostTypeEnum.Quote) { postContent = await this.findByIdQuote(postId)}
    if (post.type ===  PostTypeEnum.Image) { postContent = await this.findByIdPhoto(postId)}
    return prismaToPost(post, postContent);
  }

  public async destroy(postId: number): Promise<void> {
    await this.prisma.post.delete({
      where: {
        postId,
      }
    });
  }

  public find({limit, sortDirection, page}: PostQuery) {
     return this.prisma.post.findMany({
      take: limit,
      orderBy: [
        { createdAt: sortDirection }
      ],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }

  public update(_id: number, _item: SharedPostEntity): Promise<Post> {
    return Promise.resolve(undefined);
  }
}
