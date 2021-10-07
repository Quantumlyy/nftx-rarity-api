import { Module } from '@nestjs/common';
import { NFTXController } from './NFTX.controller';

@Module({
  controllers: [NFTXController],
})
export class NFTXModule {}
