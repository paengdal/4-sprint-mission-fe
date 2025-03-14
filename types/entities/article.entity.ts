import { CommentItemDto } from '../dtos/comment.dto';

export interface ArticleEntity {
  id: string;
  writer: string;
  title: string;
  content: string;
  count: number;
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
  commments: CommentItemDto[];
}
