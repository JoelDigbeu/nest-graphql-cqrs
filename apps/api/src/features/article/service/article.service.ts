import { Injectable } from '@nestjs/common'
import { SharedPrismaService } from '@nest-graphql-cqrs/shared/prisma'
import { CreateArticleInput } from '../dto/create-article.input'
import { UpdateArticleInput } from '../dto/update-article.input'

@Injectable()
export class ArticleService {
  constructor(private prismaService: SharedPrismaService) {}

  async create(createArticleInput: CreateArticleInput) {
    const article = await this.prismaService.article.create({
      data: { ...createArticleInput, ownerId: 1 },
    })

    return article
  }

  async findAll() {
    return await this.prismaService.article.findMany({
      include: {
        owner: true,
      },
    })
  }

  async findOne(id: number) {
    return await this.prismaService.article.findUnique({
      where: { id },
      include: { owner: true },
    })
  }

  update(updateArticleInput: UpdateArticleInput) {
    const { id, ...data } = updateArticleInput
    return this.prismaService.article.update({
      where: { id },
      data: {
        ...data,
      },
    })
  }

  remove(id: number) {
    return this.prismaService.article.delete({
      where: { id },
    })
  }
}
