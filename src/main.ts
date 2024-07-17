import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('API ECM')
    .setDescription('Details api')
    .setVersion('1.0')
    .addTag('Users')
    .addTag('Products')
    .addTag('Reviews')
    .addTag('Category')
    .addBearerAuth()
    .build();
  const documentAPI = SwaggerModule.createDocument(app, config)  
  SwaggerModule.setup('api', app, documentAPI)
  await app.listen(3000);
}
bootstrap();
