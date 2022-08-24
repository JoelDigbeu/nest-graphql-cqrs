import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { User } from '../../user/entities/user.entity'
import { RegisterInput } from '../dto'
import { AuthService } from '../service/auth.service'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  register(@Args('credentials') credentials: RegisterInput) {
    return this.authService.register(credentials)
  }
}
