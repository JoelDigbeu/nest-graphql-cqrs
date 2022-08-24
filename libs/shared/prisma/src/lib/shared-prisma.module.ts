import { Module } from '@nestjs/common'
import { SharedPrismaService } from './shared-prisma.service'

@Module({
  controllers: [],
  providers: [SharedPrismaService],
  exports: [SharedPrismaService],
})
export class SharedPrismaModule {}
