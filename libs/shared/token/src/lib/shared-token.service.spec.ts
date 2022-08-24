import { Test } from '@nestjs/testing'
import { SharedTokenService } from './shared-token.service'

describe('SharedTokenService', () => {
  let service: SharedTokenService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [SharedTokenService],
    }).compile()

    service = module.get(SharedTokenService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
