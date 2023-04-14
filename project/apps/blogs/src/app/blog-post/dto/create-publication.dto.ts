import { ApiProperty } from "@nestjs/swagger";
import { PostState, PostType, Tag } from "@project/shared/app-types";

class BasePostDto {

  @ApiProperty({
    description: 'Publication type',
    example: 'video'
  })
  public type: PostType;

  @ApiProperty({
    description: 'List tags',
    example: 'горы, озеро'
  })
  public tags: Tag[];

  @ApiProperty({
    description: 'User ID',
    example: '3a324a11-de87-4e95-91be-98ecca5f5f86',
  })
  public userId: string;

  @ApiProperty({
    description: 'Status of publication',
    example: 'public'
  })
  public status: PostState;

}


export class CreatePostTextDto extends BasePostDto {
  @ApiProperty({
    description: 'Text anonce\'s',
    example: 'user@user.ru'

  })
  public anonce: string;

  @ApiProperty({
    description: 'Title of publication',
    example: 'Красивые горы, самое сердце алтая'

  })
  public title: string;

  @ApiProperty({
    description: 'Text to publication',
    example: 'Край семи тысяч озёр, бурных рек и безмолвных пейзажей. Здесь возвышается крупнейшая гора Сибири, и проходит одна из самых живописных дорог мира, археологи находят в курганах древние артефакты, а шаманы проводят в местах силы свои таинственные обряды.'

  })
  public text: string;
}

export class CreatePostVideoDto extends BasePostDto {
  @ApiProperty({
    description: 'Title to video',
    example: 'Видео об Алтае'
  })
  public title: string;

  @ApiProperty({
    description: 'Link to video',
    example: '/video/altay'
  })
  public video: string;

  @ApiProperty({
    description: 'Link to video',
    example: '/video/altay'
  })
  public link: string;
}

export class CreatePostPhotoDto extends BasePostDto {
  @ApiProperty({
    description: 'Photo',
    example: '/photo/altay'

  })
  public photo: string;
}

export class CreatePostQuoteDto extends BasePostDto {
  @ApiProperty({
    description: 'Quote',
    example: 'Кто видел Алтай, у того неизгладимо запечатлеется этот прекрасный горный мир и во всю жизнь доставит самое приятное впечатление».'
  })
  public quote: string;

  @ApiProperty({
    description: 'Author',
    example: 'Григорий Петрович Гельмерсен'
  })
  public author: string;
}

export class CreatePostLinkDto extends BasePostDto {
  @ApiProperty({
    description: 'Link',
    example: 'http//:altay'
  })
  public link: string;
}
