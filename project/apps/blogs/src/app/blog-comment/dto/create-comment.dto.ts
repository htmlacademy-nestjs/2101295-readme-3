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
  public postId: string;

  @ApiProperty({
    description: 'UserID send comment',
    example: '123'
  })
  public userId: string;
}
