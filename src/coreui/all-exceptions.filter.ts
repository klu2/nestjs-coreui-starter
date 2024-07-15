import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    ForbiddenException,
    Logger,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { GoogleRecaptchaException } from '@nestlab/google-recaptcha';
import { Request, Response } from 'express';

import { Environment, EnvironmentService } from '../environment/environment.service';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionFilter.name);

    constructor(private readonly environmentService: EnvironmentService) {}

    catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        if (exception instanceof GoogleRecaptchaException) {
            response.redirect('/login');
            return;
        }

        if (exception instanceof UnauthorizedException || exception instanceof ForbiddenException) {
            if (request.isAuthenticated()) {
                response.render('403', {
                    message: 'Darauf hast du keinen Zugriff',
                    error: exception,
                    layout: 'nomenu',
                });
            } else {
                response.redirect('/login');
            }
        } else if (exception instanceof NotFoundException) {
            response.render('404', { layout: 'nomenu' });
        } else {
            this.logger.error(exception.message, exception.stack);
            response.render('error', {
                message: exception.message,
                error: exception,
                layout: 'nomenu',
                stack: this.environmentService.getEnvironment === Environment.Development ? exception.stack : null,
            });
        }
    }
}
