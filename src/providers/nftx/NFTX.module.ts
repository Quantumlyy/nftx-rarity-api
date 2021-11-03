import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/Database.module';
import { NFTXController } from './NFTX.controller';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'metadata',
    }),
    DatabaseModule,
  ],
  controllers: [NFTXController],
})
export class NFTXModule {}
