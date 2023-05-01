import { ApiProperty } from "@nestjs/swagger";

export class CreateCommentDto {

  @ApiProperty({
    description: 'Text comment',
    example: 'Test text'
  })
  public text: string;

  @ApiProperty({
    description: 'Post ID',
    example: '123'
  })
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
