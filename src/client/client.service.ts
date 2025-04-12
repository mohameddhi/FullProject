
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../shared/schema/client';
import { CreateClientDto } from 'src/client/dto/create-client.dto';
import { ClientRepository } from 'src/shared/repositories/client.repository';

@Injectable()
export class ClientService {
  constructor(
     
    private readonly clientRepository: ClientRepository,
  ) {}
  async createClient(createClientDto: CreateClientDto): Promise<{
    message: string;
    result: Client;
    success: boolean;
  }> {
    try {
      const newClient = await this.clientRepository.createClient(createClientDto);
      return {
        message: 'Client created successfully',
        result: newClient,
        success: true,
      };
    } catch (error) {
      throw new BadRequestException('Error creating client', error.message);
    }
  }

  async getAllClients(): Promise<{ message: string; success: boolean; result: Client[] }> {
    const clients = await this.clientRepository.getAllClients();
    return {
      message: 'Clients retrieved successfully',
      success: true,
      result: clients,
    };
  }

  async getClientById(id: number): Promise<{ message: string; success: boolean; result: Client | null }> {
    const client = await this.clientRepository.getClientById(id);
    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
    return {
      message: 'Client retrieved successfully',
      success: true,
      result: client,
    };
  }
} 









/*
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../shared/schema/client';
import { CreateClientDto } from 'src/client/dto/create-client.dto';
import { ClientRepository } from 'src/shared/repositories/client.repository';

@Injectable()
export class ClientService {
  constructor(
    private readonly clientRepository: ClientRepository,
  ) {}

  async createClient(createClientDto: CreateClientDto): Promise<{
    message: string;
    result: Client;
    success: boolean;
  }> {
    try {
      const newClient = await this.clientRepository.createClient(createClientDto);
      return {
        message: 'Client created successfully',
        result: newClient,
        success: true,
      };
    } catch (error) {
      throw new BadRequestException('Error creating client', error.message);
    }
  }

  async getAllClients(): Promise<{ message: string; success: boolean; result: Client[] }> {
    const clients = await this.clientRepository.getAllClients();
    return {
      message: 'Clients retrieved successfully',
      success: true,
      result: clients,
    };
  }

  async getClientById(id: number): Promise<{ message: string; success: boolean; result: Client | null }> {
    const client = await this.clientRepository.getClientById(id);
    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
    return {
      message: 'Client retrieved successfully',
      success: true,
      result: client,
    };
  }
}
*/


  
  
  
  
  





 


