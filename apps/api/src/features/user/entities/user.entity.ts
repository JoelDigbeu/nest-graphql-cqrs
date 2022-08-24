import { ObjectType, Field, Int } from '@nestjs/graphql'
import { Article } from '../../article/entities/article.entity'

@ObjectType()
export class User {
  @Field(() => Int)
  id: number

  @Field(() => String)
  name: string

  @Field(() => String)
  email: string

  @Field(() => String)
  password: string

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date)
  updatedAt: Date

  @Field(() => [Article], { nullable: true })
  articles: Article[] | null
}
