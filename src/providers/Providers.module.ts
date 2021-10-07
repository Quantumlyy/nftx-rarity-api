import { Module } from '@nestjs/common';
import { NFTXModule } from './nftx/NFTX.module';
import { RarityToolsModule } from './rarity-tools/RarityTools.module';

@Module({
  imports: [RarityToolsModule, NFTXModule],
  exports: [RarityToolsModule, NFTXModule],
})
export class ProvidersModule {}
