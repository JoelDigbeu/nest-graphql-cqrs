import { Module } from '@nestjs/common'
import { ArticleService } from './service/article.service'
import { ArticleResolver } from './resolver/article.resolver'
import { SharedPrismaModule } from '@nest-graphql-cqrs/shared/prisma'

@Module({
  imports: [SharedPrismaModule],
  providers: [ArticleResolver, ArticleService],
})
export class ArticleModule {}
