import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EthersModule, MAINNET_NETWORK } from 'nestjs-ethers';
import { AuthModule } from './auth/Auth.module';
import { DatabaseModule } from './database/Database.module';
import { ProvidersModule } from './providers/Providers.module';

@Module({
  imports: [
    DatabaseModule,
    ProvidersModule,
    ConfigModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    EthersModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          network: MAINNET_NETWORK,
          infura: {
            projectId: config.get<string>('INFURA_PROJECT_ID'),
            projectSecret: config.get<string>('INFURA_PROJECT_SECRET'),
          },
          useDefaultProvider: false,
        };
      },
    }),
    AuthModule,
  ],
})
export class AppModule {}
