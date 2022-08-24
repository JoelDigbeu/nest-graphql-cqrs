import { SharedPrismaService } from '@nest-graphql-cqrs/shared/prisma'
import { Injectable } from '@nestjs/common'
import { CreateUserInput } from '../dto/create-user.input'
import { UpdateUserInput } from '../dto/update-user.input'

@Injectable()
export class UserService {
  constructor(private prismaService: SharedPrismaService) {}

  async create(createUserInput: CreateUserInput) {
    const user = await this.prismaService.user.create({
      data: {
        ...createUserInput,
      },
    })

    return user
  }

  async findAll() {
    return await this.prismaService.user.findMany({
      include: {
        articles: true,
      },
    })
  }

  async findOne(id: number) {
    return await this.prismaService.user.findMany({
      where: { id },
      include: {
        articles: true,
      },
    })
  }

  update(updateUserInput: UpdateUserInput) {
    const { id, ...rest } = updateUserInput
    return this.prismaService.user.update({
      where: { id },
      data: {
        ...rest,
      },
    })
  }

  remove(id: number) {
    return this.prismaService.user.delete({
      where: { id },
    })
  }
}
