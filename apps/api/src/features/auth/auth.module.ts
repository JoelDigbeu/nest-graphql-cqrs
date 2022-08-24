import { UserModule } from './../user/user.module'
import { Module } from '@nestjs/common'
import { AuthService } from './service/auth.service'
import { AuthResolver } from './resolver/auth.resolver'

@Module({
  imports: [UserModule],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
