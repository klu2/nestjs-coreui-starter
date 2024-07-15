import { Test, TestingModule } from '@nestjs/testing';

import { EnvironmentModule } from './environment.module';
import { Environment, EnvironmentService } from './environment.service';

describe('EnvironmentService', () => {
    let service: EnvironmentService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [EnvironmentModule],
        }).compile();

        service = module.get<EnvironmentService>(EnvironmentService);
    });

    it('should return default values', () => {
        expect(service.getPort).toBe(3000);
    });

    it('should should load test environment', () => {
        expect(service.getEnvironment).toBe(Environment.Test);
    });
});
