import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const logger = new Logger();

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;

  const config = new DocumentBuilder()
    .setTitle('Produtos e Serviços Bancarios - Open Data')
    .setDescription(`API REST que prover informações sobre produtos e serviços bancários, através das API's de dados abertos do open banking.`)
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  
  SwaggerModule.setup('/', app, document);
  
  await app.listen(port, () =>
  {
    logger.debug(`[START] - APP STARTED - PORT ${port} `);
  });
}
bootstrap();
