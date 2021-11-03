import { Module } from '@nestjs/common';
import { RTCollectableService } from './RTCollectable.service';
import { PrismaService } from './prisma.service';
import { CollectionService } from './Collection.service';

@Module({
  exports: [PrismaService, CollectionService, RTCollectableService],
  providers: [PrismaService, CollectionService, RTCollectableService],
})
export class DatabaseModule {}
