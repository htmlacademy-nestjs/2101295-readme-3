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
import { prismaToPost } from './utils/prisma-transform';
import { CRUDRepository } from '@project/util/util-types';


@Injectable()
export class BlogPostRepository implements CRUDRepository<SharedPostEntity, number, Post>
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

    console.log(entityData)

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
    console.log(result)
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
    console.log(1)
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

  public async update(id: number, item: SharedPostEntity): Promise<Post> {

    if (item.type === 'video') {return this.updateVideo(item as VideoPostEntity, id)}
    if (item.type === 'link') {return this.updateLink(item as LinkPostEntity, id)}
    if (item.type === 'quote') {return this.updateQuote(item as QuotePostEntity, id)}
    if (item.type === 'image') {return this.updatePhoto(item as PhotoPostEntity, id)}
    if (item.type === 'text') {return this.updateText(item as TextPostEntity, id)}
  }

  public async updateVideo(item: VideoPostEntity, id: number): Promise<Post>{
    const content = {
      title: item.title,
      video: item.video,
    };
    delete item.title;
    delete item.video;
    delete item.id;




    const result = await this.prisma.post.update({
      where: {
        postId: id
      },
      data: { ...item,
        postVideo: {
          update: content
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
    });

    const prismaVideoPost = await this.prisma.postVideo.findFirst({
      where: {
        id: (await result).postId
      }})
    return prismaToPost(result, prismaVideoPost);
  }

  public async updateLink(item: LinkPostEntity, id: number): Promise<Post>{
    const content = {
      discription: item.discription,
      link: item.link

    };
    delete item.link;
    delete item.discription;
    delete item.id;




    const result = await this.prisma.post.update({
      where: {
        postId: id
      },
      data: { ...item,
        postLink: {
          update: content
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
    });
    const prismaLinkPost = await this.prisma.postLink.findFirst({
      where: {
        id: (await result).postId
      }})

    return prismaToPost(result, prismaLinkPost);
  }

  public async updateText(item: TextPostEntity, id: number): Promise<Post>{
    const content = {
      title: item.title,
      anonce: item.anonce,
      text: item.text
    };
    delete item.title;
    delete item.anonce;
    delete item.text;
    delete item.id



    const result = await this.prisma.post.update({
      where: {
        postId: id
      },
      data: { ...item,
        postText: {
          update: content
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
    });
    console.log(result)
    const prismaTextPost = await this.prisma.postText.findFirst({
      where: {
        id: (await result).postId
      }})

    return prismaToPost(result, prismaTextPost);
  }

  public async updatePhoto(item: PhotoPostEntity, id: number): Promise<Post>{
    const content = {
      photo: item.photo,

    };
    delete item.photo;
    delete item.id;




    const result = await this.prisma.post.update({
      where: {
        postId: id
      },
      data: { ...item,
        postPhoto: {
          update: content
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
    });

    const prismaPhotoPost = await this.prisma.postPhoto.findFirst({
      where: {
        id: (await result).postId
      }})

    return prismaToPost(result, prismaPhotoPost);
  }

  public async updateQuote(item: QuotePostEntity, id: number): Promise<Post>{
    const content = {
      author: item.author,
      quote: item.quote,

    };
    delete item.author;
    delete item.quote;
    delete item.id;




    const result = await this.prisma.post.update({
      where: {
        postId: id
      },
      data: { ...item,
        postQuote: {
          update: content
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
    });

    const prismaQuotePost = await this.prisma.postQuote.findFirst({
      where: {
        id: (await result).postId
      }})

    return prismaToPost(result, prismaQuotePost);
  }

}
