
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { TransformationInterceptor } from './responseInterceptor';
import * as cookieParser from 'cookie-parser';
//import { ETLService } from '../src/etl.service';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  
  app.use(cookieParser());

  
  app.enableCors({
    origin: 'http://localhost:3001', 
    credentials: true, 
  });


  app.setGlobalPrefix(config.get('appPrefix'));

  
  app.useGlobalInterceptors(new TransformationInterceptor());

  
  const port = config.has('port') ? config.get<number>('port') : 3000;

  
  await app.listen(port);
  console.log(`🚀 Server is running on port ${port}`);
  // Exécuter le service ETL après le démarrage du serveur
 // const etlService = app.get(ETLService);
  //await etlService.runETL(); // Exécute le processus ETL
}

bootstrap();

























/*

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config'; 
import { TransformationInterceptor } from './responseInterceptor';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.setGlobalPrefix(config.get('appPrefix'));
  app.useGlobalInterceptors(new TransformationInterceptor());
  const port = config.has('port') ? config.get<number>('port') : 3000;

  await app.listen(port);
  console.log(`🚀 Server is running on port ${port}`);
}
bootstrap();*/
 

 