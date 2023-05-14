import { ApiProperty } from "@nestjs/swagger";
import { PostStatusEnum, PostType, Tag } from "@project/shared/app-types";
import { ArrayMaxSize, IsNotEmpty, IsString, IsUrl, MaxLength, MinLength } from "class-validator";
import { POST_BAD_TAGS } from "../blog-post.constant";

class BasePostDto {

  @ApiProperty({
    description: 'Publication type',
    example: 'video'
  })
  @IsString()
  public type: PostType;

  @ApiProperty({
    description: 'List tags',
    example: 'горы, озеро'
  })
  @MinLength(3, {each: true})
  @MaxLength(10, {each: true, message: POST_BAD_TAGS})
  @ArrayMaxSize(8, {message: POST_BAD_TAGS})
  public tags: Tag[];

  @ApiProperty({
    description: 'User ID',
    example: '3a324a11-de87-4e95-91be-98ecca5f5f86',
  })
  @IsString()
  @IsNotEmpty()
  public userId: string;

  @ApiProperty({
    description: 'Status of publication',
    example: 'public'
  })
  @IsString()
  public status: PostStatusEnum;

  @ApiProperty({
    description: 'Status of publication',
    example: 'public'
  })
  public createdAt: Date;

  @ApiProperty({
    description: 'Status of publication',
    example: 'public'
  })
  public updatedAt: Date;

  @ApiProperty({
    description: 'Status of publication',
    example: 'public'
  })
  public publishedAt: Date;


}


export class CreatePostTextDto extends BasePostDto {
  @ApiProperty({
    description: 'Text anonce\'s',
    example: 'user@user.ru'
  })
  @IsString()
  @MinLength(50)
  @MaxLength(255)
  public anonce: string;

  @ApiProperty({
    description: 'Title of publication',
    example: 'Красивые горы, самое сердце алтая'
  })
  @IsString()
  @MinLength(20)
  @MaxLength(50)
  public title: string;

  @ApiProperty({
    description: 'Text to publication',
    example: 'Край семи тысяч озёр, бурных рек и безмолвных пейзажей. Здесь возвышается крупнейшая гора Сибири, и проходит одна из самых живописных дорог мира, археологи находят в курганах древние артефакты, а шаманы проводят в местах силы свои таинственные обряды.'
  })
  @IsString()
  @MinLength(100)
  @MaxLength(1024)
  public text: string;
}

export class CreatePostVideoDto extends BasePostDto {
  @ApiProperty({
    description: 'Title to video',
    example: 'Видео об Алтае'
  })
  @MinLength(20)
  @MaxLength(50)
  @IsString()
  public title: string;

  @ApiProperty({
    description: 'Link to video',
    example: '/video/altay'
  })
  @IsString()
  public video: string;
}

export class CreatePostPhotoDto extends BasePostDto {
  @ApiProperty({
    description: 'Photo',
    example: '/photo/altay'

  })
  @IsString()
  public photo: string;

  @ApiProperty({
    description: 'Post title',
    example: 'Awesome post'
  })
  @IsString()
  @MinLength(20)
  @MaxLength(50)
  public title: string;
}

export class CreatePostQuoteDto extends BasePostDto {
  @ApiProperty({
    description: 'Quote',
    example: 'Кто видел Алтай, у того неизгладимо запечатлеется этот прекрасный горный мир и во всю жизнь доставит самое приятное впечатление».'
  })
  @MinLength(20)
  @MaxLength(300)
  public quote: string;

  @ApiProperty({
    description: 'Author',
    example: 'Григорий Петрович Гельмерсен'
  })
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  public author: string;
}

export class CreatePostLinkDto extends BasePostDto {
  @ApiProperty({
    description: 'Link',
    example: 'http//:altay'
  })
  @IsUrl()
  public link: string;

  @ApiProperty({
    description: 'Optional link description',
    example: 'Linky-link'
  })
  @MaxLength(300)
  public description?: string;
}


export type SharedPostDto =
CreatePostLinkDto |
CreatePostQuoteDto |
CreatePostPhotoDto |
CreatePostTextDto |
CreatePostVideoDto



