import { Module } from '@nestjs/common';
import { RTCollectableService } from './RTCollectable.service';
import { PrismaService } from './prisma.service';

@Module({
  exports: [PrismaService, RTCollectableService],
  providers: [PrismaService, RTCollectableService],
})
export class DatabaseModule {}
