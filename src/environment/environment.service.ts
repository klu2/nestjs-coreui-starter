/* eslint-disable max-classes-per-file */
import { IsEnum, IsNumber } from '@nestjs/class-validator';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentService {
    constructor(private readonly configService: ConfigService<EnvironmentVariables>) {}

    get getPort(): number {
        return this.configService.get<number>('PORT', 3000);
    }

    get getEnvironment(): Environment {
        return this.configService.getOrThrow<Environment>('NODE_ENV');
    }

    get getRedisUrl(): string {
        return this.configService.getOrThrow<string>('REDIS_URL');
    }

}

export enum Environment {
    Development = 'development',
    Production = 'production',
    Test = 'test',
}


class EnvironmentVariables {
    @IsNumber()
    PORT: number;

    @IsEnum(Environment)
    NODE_ENV: Environment;

    REDIS_URL: string;

}
