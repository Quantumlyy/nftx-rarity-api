import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/Database.module';
import { ProvidersModule } from './providers/Providers.module';

@Module({
  imports: [DatabaseModule, ProvidersModule],
})
export class AppModule {}
