import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { engine } from 'express-handlebars';
import { DateTime } from 'luxon';
import { join } from 'path';
import flash = require('express-flash');

import { APP_FILTER } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { Response } from 'express';

import { LocaleUtils } from '../common/locale.utils';
import { StringUtils } from '../common/string.utils';
import { EnvironmentModule } from '../environment/environment.module';
import { Environment, EnvironmentService } from '../environment/environment.service';
import { SessionModule } from '../session/session.module';
import { AllExceptionFilter } from './all-exceptions.filter';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', '..', 'dist', 'css'),
            serveRoot: '/static/css',
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', '..', 'dist', 'js'),
            serveRoot: '/static/js',
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', '..', 'node_modules', '@coreui', 'coreui', 'dist', 'js'),
            serveRoot: '/static/coreui/js',
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', '..', 'node_modules', '@coreui', 'icons'),
            serveRoot: '/static/coreui/icons',
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', '..', 'node_modules', '@coreui', 'utils', 'dist', 'umd'),
            serveRoot: '/static/coreui/utils',
        }),
        ServeStaticModule.forRoot({
            serveRoot: '/static/htmx',
            rootPath: join(__dirname, '..', '..', 'node_modules', 'htmx.org', 'dist'),
        }),
        ServeStaticModule.forRoot({
            serveRoot: '/static/simplebar',
            rootPath: join(__dirname, '..', '..', 'node_modules', 'simplebar', 'dist'),
        }),
        EnvironmentModule,
        SessionModule,
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: AllExceptionFilter,
        },
    ],
})
export class CoreUiModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply((_req: any, res: Response, next: any) => {
                // Prevent indexing
                res.header('X-Robots-Tag', 'noindex, nofollow');
                next();
            })
            .forRoutes('*');

        consumer.apply(cookieParser()).forRoutes('*');
        consumer.apply(flash()).forRoutes('*');
    }

    configureHandlebars(app: NestExpressApplication) {
        const environmentService = app.get(EnvironmentService);
        app.setBaseViewsDir(join(__dirname, '..', '..', 'views'));
        app.useStaticAssets(join(__dirname, '..', '..', 'public'));
        app.engine(
            'handlebars',
            engine({
                helpers: {
                    formatDate(date: Date | null) {
                        if (date === null || date === undefined) {
                            return '---';
                        }
                        return DateTime.fromJSDate(date).setZone('Europe/Vienna').toFormat('dd.LL.yyyy');
                    },
                    formatDateTime(date: Date) {
                        return DateTime.fromJSDate(date).setZone('Europe/Vienna').toFormat('dd.LL.yyyy HH:mm');
                    },
                    formatPercent(amount: number): string {
                        if (amount === undefined || amount === null) {
                            return '---';
                        }
                        return `${amount.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 1 })} %`;
                    },
                    formatEuro(amount: any) {
                        return LocaleUtils.formatEuro(amount);
                    },
                    flag(country: string) {
                        return `cif-${country.toLowerCase()}`;
                    },
                    countryName(country: string) {
                        return LocaleUtils.getGermanNameForCountryCode(country);
                    },
                    summarizeProducts(products: string[]) {
                        return StringUtils.summarizeProducts(products);
                    },
                },
            }),
        );
        app.set('view engine', 'handlebars');

        if (environmentService.getEnvironment === Environment.Production) {
            app.enable('view cache');
        }
    }
}
