import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/Database.module';
import { RarityToolsController } from './RarityTools.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [RarityToolsController],
})
export class RarityToolsModule {}
