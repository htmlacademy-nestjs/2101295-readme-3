import { Comment } from "@project/shared/app-types";

export class BlogCommentEntity implements Comment {
    id: number;
    text: string;
    postId: number;
    userId: string;
    createdAt: Date;
    updatedAt?: Date;

  constructor(comment: Comment) {
    this.id = comment.id;
    this.text = comment.text;
    this.postId = comment.postId;
    this.userId = comment.userId;
    this.createdAt = new Date;
    this.updatedAt = new Date;
  }

  public toObject() {
    return { ...this };
  }

}
