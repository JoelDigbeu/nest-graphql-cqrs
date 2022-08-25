import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { AuthResponse, LoginCredentialsInput, RegisterInput } from '../dto'
import { AuthService } from '../service/auth.service'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse)
  register(@Args('credentials') credentials: RegisterInput) {
    return this.authService.register(credentials)
  }

  @Mutation(() => AuthResponse)
  login(@Args('credentials') credentials: LoginCredentialsInput) {
    return this.authService.login(credentials)
  }
}
