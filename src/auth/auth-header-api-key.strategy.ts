import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import Strategy from 'passport-headerapikey';

@Injectable()
export class HeaderApiKeyStrategy extends PassportStrategy(
  Strategy,
  'api-key',
) {
  constructor(private readonly configService: ConfigService) {
    super(
      { header: 'X-API-KEY', prefix: '' },
      true,
      async (
        apiKey: string,
        done: (
          err: Error | null,
          user?: Record<string, string>,
          info?: Record<string, string>,
        ) => void,
      ) => {
        return this.validate(apiKey, done);
      },
    );
  }

  public validate = (
    apiKey: string,
    done: (
      err: Error | null,
      user?: Record<string, string>,
      info?: Record<string, string>,
    ) => void,
  ) => {
    if (this.configService.get<string>('API_KEY') === apiKey) {
      done(null, true as any);
    }
    done(new UnauthorizedException(), null);
  };
}
