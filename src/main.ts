import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middlewares/loggerGlobal';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(loggerGlobal)
  
  app.useGlobalPipes(new ValidationPipe({whitelist:true}))

  const swaggerConfig = new DocumentBuilder()
  .setTitle('Dmo Nest')
  .setDescription('This is an API built in Nest for module 4 of the Henry Backend specialization')
  .setVersion('1.0')
  .addBearerAuth()
  .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document)
  
  await app.listen(3000);
}
bootstrap();
 