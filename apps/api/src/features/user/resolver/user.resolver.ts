import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { UserService } from '../service/user.service'
import { User } from '../entities/user.entity'
import { CreateUserInput } from '../dto/create-user.input'
import { UpdateUserInput } from '../dto/update-user.input'
import { Req, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '@nest-graphql-cqrs/shared/guard'
import { CurrentUser } from '@nest-graphql-cqrs/shared/decorators'

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput)
  }

  @Query(() => [User], { name: 'users' })
  @UseGuards(JwtAuthGuard)
  findAll(@CurrentUser() user: any) {
    return this.userService.findAll()
  }

  @Query(() => User, { name: 'user' })
  @UseGuards(JwtAuthGuard)
  findOne(@Args('id', { type: () => Int }) id: number, @Req() req: any) {
    return this.userService.findOne(id)
  }

  @Query(() => User, { name: 'currentUser' })
  @UseGuards(JwtAuthGuard)
  getAuthenticatedUser(@CurrentUser() user: any) {
    return this.userService.findOne(user.id)
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput)
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id)
  }
}
