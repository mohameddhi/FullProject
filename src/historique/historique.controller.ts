import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { HistoriqueService } from '../historique/historique.service';
import { CreateHistoriqueDto } from 'src/historique/dto/create-historique.dto';

@Controller('historique')
export class HistoriqueController {
  constructor(private readonly historiqueService: HistoriqueService) {}

  @Post()
  async create(@Body() createHistoriqueDto: CreateHistoriqueDto) {
    return await this.historiqueService.createHistorique(createHistoriqueDto);
  } 

 
}

