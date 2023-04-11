export interface Comment {
  _id?: string;
  text: string;
  postId: string;
  userId: string;
  createdAt?: number;
}
