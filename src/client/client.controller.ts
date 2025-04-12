
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ClientService } from '../client/client.service';
import { CreateClientDto } from 'src/client/dto/create-client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  async create(@Body() createClientDto: CreateClientDto) {
    return await this.clientService.createClient(createClientDto);
  }

  @Get()
  async getAllClients() {
    return await this.clientService.getAllClients();
  }
  
  @Get(':id')
  async getClientById(@Param('id') id: number) {
    return await this.clientService.getClientById(id);
  }
}

/*
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginUser: { organisation: string; email: string; password: string },
    @Res({ passthrough: true }) response: Response,
  ) {
    const loginRes = await this.usersService.login(
      loginUser.organisation,
      loginUser.email,
      loginUser.password,
    );
    if (loginRes.success) {
      response.cookie('_digi_auth_token', loginRes.result?.token, {
        httpOnly: true,
      });
    }
    if (loginRes.result && typeof loginRes.result === 'object') {
      delete (loginRes.result as Record<string, any>).token;
    }
    
    return loginRes;
  } */

  /*
  @Get()
  async getAllClients() {
    const clients = await this.clientService.getAllClients();
    console.log('Clients:', clients); // Ajouter des logs pour vérifier les données
    return {
      message: 'Clients fetched successfully',
      success: true,
      data: clients,
    };
  }
  
  
  
  @Get(':id')
  async getClientById(@Param('id') id: number) {
    const client = await this.clientService.getClientById(id);
    if (client) {
      return {
        message: 'Client fetched successfully',
        success: true,
        data: client,  // Envoie des données sous le champ `data`.
      };
    } else {
      return {
        message: 'Client not found',
        success: false,
      };
    }
  }*/
  



