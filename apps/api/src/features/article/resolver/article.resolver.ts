import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Root,
} from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { ArticleService } from '../service/article.service'
import { Article } from '../entities/article.entity'
import { CreateArticleInput } from '../dto/create-article.input'
import { UpdateArticleInput } from '../dto/update-article.input'
import { JwtAuthGuard } from '@nest-graphql-cqrs/shared/guard'
import { CurrentUser } from '@nest-graphql-cqrs/shared/decorators'

@Resolver(() => Article)
@UseGuards(JwtAuthGuard)
export class ArticleResolver {
  constructor(private readonly articleService: ArticleService) {}

  @Mutation(() => Article)
  createArticle(
    @Args('createArticleInput') createArticleInput: CreateArticleInput,
    @CurrentUser() user
  ) {
    return this.articleService.create(createArticleInput, user.id)
  }

  @Query(() => [Article], { name: 'articles' })
  findAll() {
    return this.articleService.findAll()
  }

  @Query(() => Article, { name: 'article' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.articleService.findOne(id)
  }

  @Mutation(() => Article)
  updateArticle(
    @Args('updateArticleInput') updateArticleInput: UpdateArticleInput
  ) {
    return this.articleService.update(updateArticleInput)
  }

  @Mutation(() => Article)
  removeArticle(@Args('id', { type: () => Int }) id: number) {
    return this.articleService.remove(id)
  }

  @ResolveField()
  async owner(@Root() article: Article) {
    return this.articleService.getArticleOwner(article.id)
  }
}
