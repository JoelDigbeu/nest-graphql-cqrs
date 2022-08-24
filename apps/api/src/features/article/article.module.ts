import { Module } from '@nestjs/common'
import { ArticleService } from './service/article.service'
import { ArticleResolver } from './resolver/article.resolver'

@Module({
  providers: [ArticleResolver, ArticleService],
})
export class ArticleModule {}
