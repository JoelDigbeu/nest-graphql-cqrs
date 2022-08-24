import { Module } from '@nestjs/common'
import { SharedTokenService } from './shared-token.service'

@Module({
  controllers: [],
  providers: [SharedTokenService],
  exports: [SharedTokenService],
})
export class SharedTokenModule {}
