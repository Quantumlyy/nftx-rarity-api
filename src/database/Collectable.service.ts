import { Prisma, Collectable } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class CollectableService {
  public constructor(private readonly prisma: PrismaService) {}

  public collectable(
    collectableWhereUniqueInput: Prisma.CollectableWhereInput,
    collectableSelect?: Prisma.CollectableSelect,
  ): Promise<Collectable | null> {
    return this.prisma.collectable.findFirst({
      where: collectableWhereUniqueInput,
      ...(collectableSelect ? { select: collectableSelect } : {}),
    });
  }
}
