import { BadRequestException, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

import { UserService } from '../../user/service/user.service'
import { RegisterInput } from '../dto'

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async register(credentials: RegisterInput) {
    const user = await this.userService.findOneWithEmail(credentials.email)
    if (user) throw new BadRequestException('Email already exists !')

    return await this.saveUser(credentials)
  }

  async saveUser(userData: RegisterInput) {
    const { password } = userData

    const data: RegisterInput = {
      ...userData,
      password: this.hashPassword(password),
    }

    return await this.userService.create(data)
  }

  hashPassword(password: string): string {
    const salt: string = bcrypt.genSaltSync()
    return bcrypt.hashSync(password, salt)
  }
}
