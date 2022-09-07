import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const openapiConfig = new DocumentBuilder()
  .setTitle('AevaPay backend task')
  .setDescription('Backend task TODO CRUD operations')
  .setVersion('1.0')
  .build();
