import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envConfig } from './config/env.config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './dispatchers/exception.filter';
import { ResponseInterceptor } from './dispatchers/response.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  const appPort = envConfig.app.port;

  app.use(helmet.frameguard());
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Blog-app backend Service')
    .setDescription('Blog-app backend Service APIs')
    .addBearerAuth(
      {
        type: 'http',
        description: 'This is Bearer auth',
        scheme: 'bearer',
        bearerFormat: 'Token',
      },
      'Authorization',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(appPort);
  logger.log(`🚀 Application running on port ${appPort}`);
}
bootstrap();
