import dayjs from 'dayjs';
import { Comment } from "@project/shared/app-types";

export class BlogCommentEntity implements Comment {
    _id: string;
    text: string;
    postId: string;
    userId: string;
    createdAt: number;

  constructor(comment: Comment) {
    this._id = comment._id;
    this.text = comment.text;
    this.postId = comment.postId;
    this.userId = comment.userId;
    this.createdAt = comment.createdAt;
  }

  public toObject() {
    return { ...this };
  }

  public setCreateDate() {
    this.createdAt = dayjs().unix();
    return this;
  }

}
