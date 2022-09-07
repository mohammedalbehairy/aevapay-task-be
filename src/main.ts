import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './config/http-exception.filter';
import { openapiConfig } from './config/openapi';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());
  const configService = app.get(ConfigService);
  const document = SwaggerModule.createDocument(app, openapiConfig);
  SwaggerModule.setup('docs', app, document);
  const port = configService.get<string>('PORT');
  await app.listen(port, () =>
    console.log(`app is listening to port ${port} ......`),
  );
}
bootstrap();
