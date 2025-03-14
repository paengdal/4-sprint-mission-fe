import { ArticleEntity } from '../entities/article.entity';

export type ArticleDetailDto = Omit<ArticleEntity, 'updatedAt' | 'commments'>;
