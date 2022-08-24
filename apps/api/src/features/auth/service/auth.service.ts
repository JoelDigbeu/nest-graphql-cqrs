import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { User } from '../../user/entities/user.entity'
import { SharedTokenService } from '@nest-graphql-cqrs/shared/token'

import { UserService } from '../../user/service/user.service'
import { RegisterInput, LoginCredentialsInput } from '../dto'

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

  async login(credentials: LoginCredentialsInput) {
    const user = await this.userService.findOneWithEmail(credentials.email)

    this.validateUser(credentials.password, user)

    return { user, token: this.getToken(user) }
  }

  private async saveUser(userData: RegisterInput) {
    const { password } = userData

    const data: RegisterInput = {
      ...userData,
      password: this.hashPassword(password),
    }

    return await this.userService.create(data)
  }

  private getToken(user: User) {
    const { id, email } = user
    return this.tokenService.generateLoginToken({ id, email })
  }

  private hashPassword(password: string): string {
    const salt: string = bcrypt.genSaltSync()
    return bcrypt.hashSync(password, salt)
  }

  private validateUser(password: string, user?: User) {
    const error = new BadRequestException('Invalid password or email !')
    const isValidPassword = this.validatePassword(password, user.password)

    if (!user) throw error

    if (!isValidPassword) throw new UnauthorizedException('Invalid password')
  }

  private validatePassword(password: string, hashPassword: string): boolean {
    return bcrypt.compareSync(password, hashPassword)
  }
}
