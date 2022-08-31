import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthJwtPayload } from './dto/jwt-payload.dto'

@Injectable()
export class SharedTokenService {
  constructor(private jwtService: JwtService) {}

  private TOKEN_VALIDITY_TIME = '1d'
  private RESET_PASSWORD_EXPIRES_IN = '360s'

  generateLoginToken(payload: AuthJwtPayload) {
    return this.jwtService.sign(payload, {
      expiresIn: this.TOKEN_VALIDITY_TIME,
    })
  }

  generateResetPasswordToken(email: string) {
    return this.jwtService.sign(
      { email },
      { expiresIn: this.RESET_PASSWORD_EXPIRES_IN }
    )
  }

  verify(token: string) {
    try {
      this.jwtService.verify(token)
    } catch (e) {
      throw new BadRequestException({ message: 'JWT invalide' })
    }
  }

  decode(token: string) {
    return this.jwtService.decode(token)
  }
}
