import { SharedPrismaService } from '@nest-graphql-cqrs/shared/prisma'
import { NotFoundException } from '@nestjs/common'
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
    return await this.prismaService.user.findUnique({
      where: { id },
      include: {
        articles: true,
      },
    })
  }

  async findOneWithEmail(email: string) {
    return await this.prismaService.user.findUnique({
      where: { email },
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

  async remove(id: number) {
    const user = await this.findOne(id)
    if (!user) throw new NotFoundException('User not found')

    return this.prismaService.user.delete({
      where: { id },
    })
  }

  getUserArticles(userId: number) {
    return this.prismaService.user
      .findUnique({
        where: { id: userId },
      })
      .articles()
  }
}
