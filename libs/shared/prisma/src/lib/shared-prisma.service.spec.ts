import { Test } from '@nestjs/testing'
import { SharedPrismaService } from './shared-prisma.service'

describe('SharedPrismaService', () => {
  let service: SharedPrismaService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [SharedPrismaService],
    }).compile()

    service = module.get(SharedPrismaService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
