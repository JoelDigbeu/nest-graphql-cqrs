import { BadRequestException, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { User } from '../../user/entities/user.entity'
import { SharedTokenService } from '@nest-graphql-cqrs/shared/token'

import { UserService } from '../../user/service/user.service'
import { RegisterInput } from '../dto'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private tokenService: SharedTokenService
  ) {}

  async register(credentials: RegisterInput) {
    const user = await this.userService.findOneWithEmail(credentials.email)
    if (user) throw new BadRequestException('Email already exists !')

    const createdUser = await this.saveUser(credentials)
    const token = this.getToken(createdUser)

    return {
      user: { ...createdUser },
      token,
    }
  }

  async saveUser(userData: RegisterInput) {
    const { password } = userData

    const data: RegisterInput = {
      ...userData,
      password: this.hashPassword(password),
    }

    return await this.userService.create(data)
  }

  getToken(user: User) {
    const { id, email } = user
    return this.tokenService.generateLoginToken({ id, email })
  }

  hashPassword(password: string): string {
    const salt: string = bcrypt.genSaltSync()
    return bcrypt.hashSync(password, salt)
  }
}
