import { Module } from '@nestjs/common';
import { CollectableService } from './Collectable.service';
import { PrismaService } from './prisma.service';

@Module({
  exports: [PrismaService, CollectableService],
  providers: [PrismaService, CollectableService],
})
export class DatabaseModule {}
