import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'

import { AppController } from './app.controller'
import { AppService } from './app.service'

import { UserModule } from '../features/user/user.module'
import { ArticleModule } from '../features/article/article.module'
import { AuthModule } from '../features/auth/auth.module'

const modules = [UserModule, ArticleModule, AuthModule]

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'graphql/schema.gql'),
      sortSchema: true,
    }),
    ...modules,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
