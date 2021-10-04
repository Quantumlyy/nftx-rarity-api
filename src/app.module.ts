import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/Database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
})
export class AppModule {}
