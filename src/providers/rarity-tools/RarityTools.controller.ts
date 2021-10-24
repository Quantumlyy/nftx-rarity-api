import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RTCollectable } from '@prisma/client';
import { Collectable as CollectableEntity } from '../../database/entitites/Collectable.entity';
import { RTCollectableService } from '../../database/RTCollectable.service';

@ApiTags('rarity.tools')
@Controller('rt')
export class RarityToolsController {
  constructor(private readonly collectableService: RTCollectableService) {}

  @Get('/:collectionId/:collectableId/ranking')
  @ApiResponse({
    status: 200,
    type: CollectableEntity,
  })
  getCollectable(
    @Param('collectionId') collectionId: string,
    @Param('collectableId') collectableId: number,
  ): Promise<RTCollectable> {
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
