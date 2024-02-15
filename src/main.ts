import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
  .setTitle('API Loja Virtual')
  .setDescription('API Documentation using NestJS')
  .setVersion('1.0')
  .addTag('Loja')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'Input your JWT token',
      name: 'Authorization',
      in: 'header',
    },
    'bearer',
  )
  .build();

const document = SwaggerModule.createDocument(app, options);
SwaggerModule.setup('api', app, document, {
  swaggerOptions: {
    security: [{ 'bearer': [] }],
  },
});


  await app.listen(3000);
}
bootstrap();
