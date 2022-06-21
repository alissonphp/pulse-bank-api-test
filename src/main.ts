import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setContact('@alissongomes', 'https://linkedin.com/in/alissongomesweb', 'alisson.gomes@grupomateus.com')
    .addBearerAuth()
    .setTitle("Pulse Bank API Spec")
    .setDescription("Hello candidate! This is a API created to just practical test interview. Good luck and if you have any question about this API structure, send me message to my email or in linkedin direct message")
    .setVersion("1.0.1")
    .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  await app.listen(process.env.PORT || 8080);
}
bootstrap();
