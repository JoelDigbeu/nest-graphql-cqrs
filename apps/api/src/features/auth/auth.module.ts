import { UserModule } from './../user/user.module'
import { Module } from '@nestjs/common'
import { AuthService } from './service/auth.service'
import { AuthResolver } from './resolver/auth.resolver'
import { SharedTokenModule } from '@nest-graphql-cqrs/shared/token'
import { SharedJwtStrategyModule } from '@nest-graphql-cqrs/shared/jwt-strategy'

@Module({
  imports: [UserModule, SharedTokenModule, SharedJwtStrategyModule],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
