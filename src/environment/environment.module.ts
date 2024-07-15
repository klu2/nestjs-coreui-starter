import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { EnvironmentService } from './environment.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: false,
            // eslint-disable-next-line no-process-env
            envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env.development',
        }),
    ],
    providers: [EnvironmentService],
    exports: [EnvironmentService],
})
export class EnvironmentModule {}
