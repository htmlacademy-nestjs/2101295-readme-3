import { Like } from "@project/shared/app-types";

export class LikeEntity implements Like {
    _id: string;
    postId: string;
    userId: string;

  constructor(like: Like) {
    this._id = like._id;
    this.postId = like.postId;
    this.userId = like.userId;
  }

  public toObject() {
    return { ...this };
  }

}
