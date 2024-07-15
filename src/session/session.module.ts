import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import RedisStore from 'connect-redis';
import * as session from 'express-session';
import { createClient } from 'redis';

import { EnvironmentModule } from '../environment/environment.module';
import { EnvironmentService } from '../environment/environment.service';
import { SessionSerializer } from './session.serializer';

@Module({
    providers: [SessionSerializer],
    imports: [EnvironmentModule],
})
export class SessionModule implements NestModule {
    private readonly logger = new Logger(SessionModule.name);

    constructor(private readonly environmentService: EnvironmentService) {}

    configure(consumer: MiddlewareConsumer) {
        const redisClient = createClient({ url: this.environmentService.getRedisUrl });
        redisClient.connect().catch((err) => {
            this.logger.error(err);
        });
        const redisStore = new RedisStore({
            client: redisClient,
            prefix: 'gss2:',
        });

        const sessionMiddleware = session({
            secret: '435lkjWEfswdwerSDa',
            resave: false,
            saveUninitialized: false,
            store: redisStore,
        });

        consumer.apply(sessionMiddleware).forRoutes('*');
    }
}
