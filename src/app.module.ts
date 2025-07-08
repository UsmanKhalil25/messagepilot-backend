import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, databaseConfig],
    }),
  ],
})
export class AppModule { }
