
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../schema/client';

@Injectable()
export class ClientRepository {
  constructor(
    @InjectRepository(Client) private readonly clientModel: Repository<Client>,
  ) {}
  async createClient(createClientDto: Partial<Client>): Promise<Client> {
    try {
      console.log("🛠️ Tentative d'insertion :", createClientDto);
      const newClient = this.clientModel.create(createClientDto);
      const savedClient = await this.clientModel.save(newClient);
      console.log("✅ Client inséré :", savedClient);
      return savedClient;
    } catch (error) {
      console.error("❌ Erreur SQL :", error);
      throw error;
    }
  }
  
  
/*
  async createClient(createClientDto: Partial<Client>): Promise<Client> {
    console.log("Insertion en cours :", createClientDto);
    const newClient = this.clientModel.create(createClientDto);
    return await this.clientModel.save(newClient);
  } */
  

  async getAllClients(): Promise<Client[]> {
    return await this.clientModel.find();
  }

  async getClientById(id: number): Promise<Client | null> {
    return await this.clientModel.findOne({ where: { id } });
  }
  
} 


















/*
  async getAllClients(): Promise<Client[]> {
    const clients = await this.clientModel.find();
    console.log("Données récupérées du Repository :", clients);
    return clients;
  }
  
  async getClientById(id: number): Promise<Client | null> {
    const client = await this.clientModel.findOne({ where: { id } });
    console.log(`Données récupérées pour l'ID ${id} :`, client);
    return client;
  }
  async findOne(query: any) {
    return await this.clientModel.findOne(query);
  }*/
  


/*     
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../schema/client';

@Injectable()
export class ClientRepository {
  constructor(
    @InjectRepository(Client) private readonly clientModel: Repository<Client>,
  ) {}

  async createClient(createClientDto: Partial<Client>): Promise<Client> {
    console.log("Insertion en cours :", createClientDto);
    const newClient = this.clientModel.create(createClientDto);
    return await this.clientModel.save(newClient);
  }
  

  async getAllClients(): Promise<Client[]> {
    return await this.clientModel.find();
  }

  async getClientById(id: number): Promise<Client | null> {
    return await this.clientModel.findOne({ where: { id } });
  }

  
}       */