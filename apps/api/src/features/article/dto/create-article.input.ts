import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateArticleInput {
  @Field(() => String)
  name: string

  @Field(() => String, { nullable: true })
  description: string
}
