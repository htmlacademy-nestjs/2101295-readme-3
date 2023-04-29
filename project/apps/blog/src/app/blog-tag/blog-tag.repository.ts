import { BlogTagEntity } from './blog-tag.entity';
import { Tag } from '@project/shared/app-types';
import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/util/util-types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BlogTagRepository implements CRUDRepository<BlogTagEntity, number, Tag>
{
  constructor(private readonly prisma: PrismaService) {}

  public create(item: BlogTagEntity) {
    return this.prisma.tag.create({
      data: { ...item.toObject() }
    });
  }

  public findById(id: number) {
    return this.prisma.tag.findFirst({
      where: {
        id,
      },
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.tag.delete({
      where: {
        id,
      }
    });
  }

  public find(ids: number[] = []) {
    return this.prisma.tag.findMany({
      where: {
        id: {
          in: ids.length > 0 ? ids : undefined,
        },
      },
    });
  }

  public update(id: number, item: BlogTagEntity): Promise<Tag> {
    return this.prisma.tag.update({
      where: {
        id
      },
      data: { ...item.toObject(), id}
    });
  }
}
