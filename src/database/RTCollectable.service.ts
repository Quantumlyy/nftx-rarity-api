import { Prisma, RTCollectable } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class RTCollectableService {
  public constructor(private readonly prisma: PrismaService) {}

  public collectable(
    collectableWhereUniqueInput: Prisma.RTCollectableWhereInput,
    collectableSelect?: Prisma.RTCollectableSelect,
  ): Promise<RTCollectable | null> {
    return this.prisma.rTCollectable.findFirst({
      where: collectableWhereUniqueInput,
      ...(collectableSelect ? { select: collectableSelect } : {}),
    });
  }
}
