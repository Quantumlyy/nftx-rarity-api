import { Module } from '@nestjs/common';
import { RarityToolsModule } from './rarity-tools/RarityTools.module';

@Module({
  imports: [RarityToolsModule],
  exports: [RarityToolsModule],
})
export class ProvidersModule {}
