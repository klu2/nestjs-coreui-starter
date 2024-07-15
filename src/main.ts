import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';
import { CoreUiModule } from './coreui/coreui.module';
import { Environment, EnvironmentService } from './environment/environment.service';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.get(CoreUiModule).configureHandlebars(app);

    const environmentService = app.get(EnvironmentService);

    if (environmentService.getEnvironment === Environment.Development) {
        app.useLogger(['log', 'debug', 'error', 'warn']);
    } else {
        app.useLogger(['error', 'warn', 'log']);
    }

    const logger = new Logger(AppModule.name);

    const port = environmentService.getPort;
    await app.listen(port, () => {
        logger.log(`Server is running at http://localhost:${port} in ${environmentService.getEnvironment} mode`);
    });
}
void bootstrap();
