import { ApiProperty } from "@nestjs/swagger";
import {IsInt, MaxLength, MinLength} from 'class-validator';

export class CreateCommentDto {

  @ApiProperty({
    description: 'Text comment',
    example: 'Test text'
  })
  @MinLength(10)
  @MaxLength(300)
  public text: string;

  @ApiProperty({
    description: 'Post ID',
    example: '123'
  })
  @IsInt()
  public postId: number;

  @ApiProperty({
    description: 'UserID send comment',
    example: '123'
  })
  public userId: string;

  @ApiProperty({
    description: 'UserID send comment',
    example: '123'
  })
  public createdAt: Date;
}
