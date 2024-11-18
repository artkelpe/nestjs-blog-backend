import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

declare module 'express-session' {
  interface SessionData {
    isAuthenticated: boolean;
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('Blog API')
    .setDescription('The blog API description')
    .setVersion('1.0')
    .addTag('blog')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  const secret = configService.get<string>('SESSION_SECRET');
  if (!secret) {
    throw new Error('SESSION_SECRET is not defined in the environment variables');
  }

  app.use(
    session({
      secret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false, // set to true in production (HTTPS)
        httpOnly: true,
        maxAge: 3600000, // 1 hour in milliseconds
      },
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Enable transformation globally
    }),
  );

  const port = configService.get<number>('APP_PORT') || 3000;
  await app.listen(port);
}

bootstrap();
