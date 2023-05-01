export interface Comment {
  id?: number;
  text: string;
  postId?: number;
  userId: string;
  createdAt: Date;
  updatedAt?: Date;
}
