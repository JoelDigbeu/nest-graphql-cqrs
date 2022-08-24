import { ObjectType, Field, Int } from '@nestjs/graphql'
import { User } from '../../user/entities/user.entity'

@ObjectType()
export class Article {
  @Field(() => Int)
  id: number

  @Field(() => String)
  name: string

  @Field(() => String, { nullable: true })
  description: string

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date)
  updatedAt: Date

  @Field(() => User, { nullable: true })
  owner: User | null
}
