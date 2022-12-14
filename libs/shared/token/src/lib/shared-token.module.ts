import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { SharedTokenService } from './shared-token.service'

@Module({
  controllers: [],
  imports: [
    JwtModule.register({
      secret: 'JowellDev',
    }),
  ],
  providers: [SharedTokenService],
  exports: [SharedTokenService],
})
export class SharedTokenModule {}
