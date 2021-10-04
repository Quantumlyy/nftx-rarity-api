import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Collectable } from '@prisma/client';
import { CollectableService } from './database/Collectable.service';
import { Collectable as CollectableEntity } from './database/entitites/Collectable.entity';

@Controller()
export class AppController {
  constructor(private readonly collectableService: CollectableService) {}

  @Get('/:collectionId/:collectableId/ranking')
  @ApiResponse({
    status: 200,
    type: CollectableEntity,
  })
  getCollectable(
    @Param('collectionId') collectionId: string,
    @Param('collectableId') collectableId: number,
  ): Promise<Collectable> {
    return this.collectableService.collectable(
      {
        collection_id: collectionId,
        collectable_id: Number(collectableId),
      },
      {
        rank: true,
        score: true,
      },
    );
  }
}
