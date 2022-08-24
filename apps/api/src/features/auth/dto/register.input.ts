import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsString } from 'class-validator'

@InputType()
export class RegisterInput {
  @Field(() => String)
  @IsString()
  name: string

  @Field(() => String)
  @IsEmail()
  email: string

  @Field(() => String)
  @IsString()
  password: string
}
