import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CoreUiModule } from './coreui/coreui.module';

@Module({
    imports: [CoreUiModule],
    controllers: [AppController]
})
export class AppModule {}
