import { OnModuleInit, INestApplication } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

export class SharedPrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect()
  }

  async enableShutdownHook(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close()
    })
  }
}
