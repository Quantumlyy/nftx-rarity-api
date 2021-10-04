import { Collectable } from '@prisma/client';
import { Controller, Get, Param } from '@nestjs/common';
import { CollectableService } from './database/Collectable.service';

@Controller()
export class AppController {
  constructor(private readonly collectableService: CollectableService) {}

  @Get('/:collectionId/:collectableId/ranking')
  getCollectable(
    @Param('collectionId') collectionId: string,
    @Param('collectableId') collectableId: number,
  ): Promise<Collectable> {
    return this.collectableService.collectable({
      collection_id: collectionId,
      collectable_id: collectableId,
    });
  }
}
