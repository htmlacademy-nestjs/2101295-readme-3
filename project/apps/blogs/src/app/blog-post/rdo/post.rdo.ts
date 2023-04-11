import { ApiProperty } from "@nestjs/swagger";
import { PostType } from "@project/shared/app-types";
import { Expose } from "class-transformer";

class BasePostRdo {
  @ApiProperty({
    description: 'Publication ID',
    example: '3a324a11-de87-4e95-91be-98ecca5f5f86',

  })
  @Expose({ name: '_id' })
  public id: string;

  @ApiProperty({
    description: 'List tags',
    example: 'Горы, Алтай, Озеро',

  })
  @Expose()
  public tags: string[];

  @ApiProperty({
    description: 'Publication type',
    example: 'video',

  })
  @Expose()
  public type: PostType;

  @ApiProperty({
    description: 'User ID',
    example: '3a324a11-de87-4e95-91be-98ecca5f5f86',

  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'Created date',
    example: 12122022,

  })
  @Expose()
  public createdAt: number;

  @ApiProperty({
    description: 'Updated date',
    example: 12122022,
  })
  @Expose()
  public updatedAt: number;
}

export class PostTextRdo extends BasePostRdo {
  @ApiProperty({
    description: 'Text anonce\'s',
    example: 'Текст об Алтае',
  })
  @Expose()
  public anonce: string;
}

export class PostVideoRdo extends BasePostRdo {
  @ApiProperty({
    description: 'Link to video',
    example: '/altay/video/3',
  })
  @Expose()
  public video: string;
}

export class PostPhotoRdo extends BasePostRdo {
  @ApiProperty({
    description: 'Photo',
    example: '/altay/photo/3',
  })
  @Expose()
  public photo: string;
}

export class PostQuoteRdo extends BasePostRdo {
  @ApiProperty({
    description: 'Quote',
    example: 'Нетронутая природа алтая',
  })
  @Expose()
  public quote: string;
}

export class PostLinkRdo extends BasePostRdo {
  @ApiProperty({
    description: 'Link',
    example: '/altay/photo/3',
  })
  @Expose()
  public link: string;
}
