import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { NFTXController } from './NFTX.controller';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'metadata',
    }),
  ],
  controllers: [NFTXController],
})
export class NFTXModule {}
