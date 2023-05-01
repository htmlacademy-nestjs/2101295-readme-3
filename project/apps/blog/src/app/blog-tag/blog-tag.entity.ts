import { Tag } from "@project/shared/app-types";

export class BlogTagEntity implements Tag {
    id: number;
    name: string;

  constructor(tag: Tag) {
    this.fillEntity(tag);
  }

  public fillEntity(entity: Tag) {
    this.name = entity.name;
    this.id = entity.id;
  }

  public toObject() {
    return { ...this };
  }

}
