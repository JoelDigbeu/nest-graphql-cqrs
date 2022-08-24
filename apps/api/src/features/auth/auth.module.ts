import { UserModule } from './../user/user.module'
import { Module } from '@nestjs/common'
import { AuthService } from './service/auth.service'
import { AuthResolver } from './resolver/auth.resolver'
import { SharedTokenModule } from '@nest-graphql-cqrs/shared/token'

@Module({
  imports: [UserModule, SharedTokenModule],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
