import { ApiProperty } from "@nestjs/swagger";
import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateTagDto {
  @ApiProperty({
    description: 'List tags',
    example: 'горы, озеро'
  })
  @MinLength(3, {each: true})
  @MaxLength(10, {each: true})
  @Matches(/^[A-Za-z]*[A-Za-z][A-Za-z0-9-. _]*$/g, {each: true})
  public name: string;
}
