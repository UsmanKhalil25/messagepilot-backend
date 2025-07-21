import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { TransformResponseInterceptor } from './commom/interceptors/transform-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: process.env.CORS_ORIGIN,
  });
  app.useGlobalInterceptors(new TransformResponseInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((err) => {
  console.log('Bootstrap failed: ', err);
  process.exit(1);
});
