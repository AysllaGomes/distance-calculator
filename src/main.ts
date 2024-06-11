import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

import { environment } from './config/environment';

import { AppModule } from './app/modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Cálculo de Viagens API')
    .setDescription(
      'API para calcular detalhes de uma viagem, incluindo tempo de viagem, custo de combustível, emissões de carbono e condições meteorológicas.',
    )
    .setVersion('1.0')
    .build();
  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(environment.app.port);
}
bootstrap();
