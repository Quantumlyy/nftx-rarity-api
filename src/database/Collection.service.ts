import { Injectable } from '@nestjs/common';
import { Collection, Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class CollectionService {
  public constructor(private readonly prisma: PrismaService) {}

  public collection(
    collectionWhereInput: Prisma.CollectionWhereInput,
    collectionSelect?: Prisma.CollectionSelect,
  ): Promise<Collection | null> {
    return this.prisma.collection.findFirst({
      where: collectionWhereInput,
      ...(collectionSelect ? { select: collectionSelect } : {}),
    });
  }

  public create(data: Prisma.CollectionCreateInput) {
    return this.prisma.collection.create({ data });
  }

  public setABI(
    collectionWhereUniqueInput: Prisma.CollectionWhereUniqueInput,
    ABI: string,
  ) {
    return this.prisma.collection.update({
      where: collectionWhereUniqueInput,
      data: { abi: ABI },
    });
  }

  public setSize(
    collectionWhereUniqueInput: Prisma.CollectionWhereUniqueInput,
    size: number,
  ) {
    return this.prisma.collection.update({
      where: collectionWhereUniqueInput,
      data: { size },
    });
  }
}
