import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fetch, FetchResultTypes } from '@sapphire/fetch';
import { collections } from './core/collections';
import { Asset } from './core/opensea';
import { traitScore } from './core/score';

@ApiTags('NFTX')
@Controller()
export class NFTXController {
  @Get('/:collectionId/:collectableId/score')
  @ApiResponse({
    status: 200,
  })
  public async getCollectable(
    @Param('collectionId') collectionId: string,
    @Param('collectableId') collectableId: number,
  ): Promise<unknown> {
    const { contract, size } = collections.get(collectionId);
    const data = await fetch<{ assets: Asset[] }>(
      `https://api.opensea.io/api/v1/assets?asset_contract_address=${contract}&format=json&limit=20&offset=0&order_direction=desc&token_ids=${Number(
        collectableId,
      )}`,
      FetchResultTypes.JSON,
    );

    const traitScores: TraitScore[] = [];
    for (const trait of data.assets[0].traits) {
      traitScores.push({
        type: trait.trait_type,
        value: trait.value,
        count: trait.trait_count,
        score: traitScore(trait.trait_count, size),
      });
    }

    return traitScores;
  }
}

export interface TraitScore {
  type: string;
  value: string;
  count: number;
  score: number;
}
