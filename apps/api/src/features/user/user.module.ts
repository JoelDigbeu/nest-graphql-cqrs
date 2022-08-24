import { Module } from '@nestjs/common'
import { UserService } from './service/user.service'
import { UserResolver } from './resolver/user.resolver'
import { SharedPrismaModule } from '@nest-graphql-cqrs/shared/prisma'

@Module({
  imports: [SharedPrismaModule],
  providers: [UserResolver, UserService],
})
export class UserModule {}
