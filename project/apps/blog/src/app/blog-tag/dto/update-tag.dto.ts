import { IsString } from "class-validator";

export class UpdateTagDto {
  @IsString()
  public name: string;
}
