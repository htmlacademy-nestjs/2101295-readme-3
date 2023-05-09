import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsUUID } from "class-validator";

export class CreateLikeDto {

  @ApiProperty({
    description: 'Post ID',
    example: '12'
  })
  @IsInt()
  public postId: number;

  @ApiProperty({
    description: 'User ID',
    example: '3a324a11-de87-4e95-91be-98ecca5f5f86',
  })
  @IsUUID()
  @IsNotEmpty()
  public userId: string;
}
