import { Like } from "@project/shared/app-types";

export class BlogLikeEntity implements Like {
    id: number;
    postId: number;
    userId: string;
    createdAt: Date;
    updatedAt: Date;

  constructor(like: Like) {
    this.fillEntity(like);
  }

  public fillEntity(entity: Like) {
    this.id = entity.id;
    this.postId = entity.postId;
    this.userId = entity.userId;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  public toObject() {
    return { ...this };
  }
}
