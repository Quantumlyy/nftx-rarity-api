import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/Database.module';
import { ProvidersModule } from './providers/Providers.module';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    DatabaseModule,
    ProvidersModule,
  ],
})
export class AppModule {}
