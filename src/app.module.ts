import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule'; // Importer ScheduleModule
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ClientModule } from './client/client.module';
import { EmployeModule } from './employe/employe.module';
import { HistoriqueModule } from './historique/historique.module';
import { ArticleModule } from './article/article.module';
import { StockModule } from './stock/stock.module';
import { ClientSyncService } from './client/client.sync.service';
import { HttpModule } from '@nestjs/axios';
import { EmployeSyncService } from './employe/employe.sync.services';
import { ArticleSyncService } from './article/article.sync.services';
import { ApiCallService } from './shared/utility/api-call.service';
import{HistoriqueSyncService} from './historique/historique.sync.service';
import {StockSyncService} from './stock/stock.sync.services';  
//import { ETLService } from './etl.service';
import { RepositoryModule } from './repository.module';
import { ExcelService } from './shared/excel.service';
@Module({
  imports: [
    HttpModule,
    ScheduleModule.forRoot(), 
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '',
      database: 'valomnia',
      autoLoadEntities: true,
      synchronize: true,
    }),  
    RepositoryModule,
    UsersModule,
    EmployeModule, 
    HistoriqueModule,
    ArticleModule,  
    ClientModule, 
    StockModule,
  ],
  controllers: [AppController],
  providers: [
    ExcelService,
    //CsvService,
    AppService,  
    //ETLService,
   //ArticleSyncService ,  
   // ClientSyncService,
   //EmployeSyncService, 
    //HistoriqueSyncService, 
  //StockSyncService,
    //ApiCallService 
  ],
}) 
export class AppModule {}
























/*
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ClientModule } from './client/client.module';
import { EmployeModule } from './employe/employe.module';
import { HistoriqueModule } from './historique/historique.module';
import { ArticleModule } from './article/article.module';
import { ClientSyncService } from './client/client.sync.service'; // Assurez-vous que le chemin est correct
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ 
    HttpModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '',
      database: 'valomnia',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    ClientModule,  // Assurez-vous que ce module est bien importé ici
    EmployeModule,
    HistoriqueModule,
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ClientSyncService, // Ajoutez le service ici
  ],
})
export class AppModule {}*/















/*import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from 'config';
import { AllExceptionFilter } from './httpExceptionFilter';
import { UsersModule } from './users/users.module';
import { ClientModule } from './client/client.module';
import { EmployeModule } from './employe/employe.module';
import { HistoriqueModule } from './historique/historique.module';
import { ArticleModule } from './article/article.module';
import { ClientSyncService } from 'src/client/client.sync.service'; // Ajout de l'import
import { HttpModule } from '@nestjs/axios'; // Importer HttpModule

@Module({
  imports: [
    HttpModule, // Ajoute cette ligne ici
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '',
      database: 'valomnia',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    ClientModule,
    EmployeModule,
    HistoriqueModule,
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ClientSyncService,  // Ajout du service ici
    {
      provide: 'APP_FILTER',
      useClass: AllExceptionFilter,
    },
  ],
})
export class AppModule {}*/









/*

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from 'config';
import { AllExceptionFilter }from './httpExceptionFilter';
import { UsersModule } from './users/users.module';
import { UserRepository } from 'src/shared/repositories/user.repository';
import { ClientModule } from './client/client.module';
import { EmployeModule } from './employe/employe.module';
import { HistoriqueModule } from './historique/historique.module';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1', 
      port: 3306,        
      username: 'root',  
      password: '',     
      database: 'valomnia',
      autoLoadEntities: true,
      synchronize: true, 
    }),
    UsersModule,
    ClientModule,
    EmployeModule,
    HistoriqueModule,
    ArticleModule,  
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide:'APP_FILTER',
      useClass:AllExceptionFilter,
    },
  ],
})
export class AppModule {}*/

