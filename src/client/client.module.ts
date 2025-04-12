

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { Client } from 'src/shared/schema/client'; 
import { ClientRepository } from 'src/shared/repositories/client.repository';  


@Module({
  imports: [TypeOrmModule.forFeature([Client, ClientRepository])],  
  controllers: [ClientController],
  providers: [ClientService, ClientRepository],
  exports: [ClientService, ClientRepository],
})
export class ClientModule {}









/*import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { Client } from 'src/shared/schema/client';
import { ClientRepository } from 'src/shared/repositories/client.repository';  // Vérifie ici

@Module({
  imports: [TypeOrmModule.forFeature([Client, ClientRepository])],  // Vérifie l'importation de ClientRepository
  controllers: [ClientController],
  providers: [ClientService, ClientRepository],
  exports: [ClientService, ClientRepository],
})
export class ClientModule {}*/












/*
import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'src/shared/schema/client';
import { ClientRepository } from 'src/shared/repositories/client.repository';
@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  controllers: [ClientController],
  providers: [ClientService,
    ClientRepository,
  ],
})
export class ClientModule {}*/


