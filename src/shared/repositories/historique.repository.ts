

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistoriqueAchatArticle } from '../schema/historique';

@Injectable()
export class HistoriqueRepository {
  constructor(
    @InjectRepository(HistoriqueAchatArticle) 
    public readonly historiqueModel: Repository<HistoriqueAchatArticle>,
  ) {}

  async createHistorique(createHistoriqueDto: Partial<HistoriqueAchatArticle>): Promise<HistoriqueAchatArticle> {
    const newHistorique = this.historiqueModel.create(createHistoriqueDto);
    return await this.historiqueModel.save(newHistorique);
  }

  async getAllHistoriques(): Promise<HistoriqueAchatArticle[]> {
    return await this.historiqueModel.find();
  }

  async getHistoriqueById(id: number): Promise<HistoriqueAchatArticle | null> {
    return await this.historiqueModel.findOne({ where: { id } });
  }  

}






/*import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistoriqueAchatArticle } from '../schema/historique';

@Injectable()
export class HistoriqueRepository {
  constructor(
    @InjectRepository(HistoriqueAchatArticle) private readonly historiqueModel: Repository<HistoriqueAchatArticle>,
  ) {}

  async createHistorique(createHistoriqueDto: Partial<HistoriqueAchatArticle>): Promise<HistoriqueAchatArticle> {
    const newHistorique = this.historiqueModel.create(createHistoriqueDto);
    return await this.historiqueModel.save(newHistorique);
  }

  async getAllHistoriques(): Promise<HistoriqueAchatArticle[]> {
    return await this.historiqueModel.find();
  }

  async getHistoriqueById(id: number): Promise<HistoriqueAchatArticle | null> {
    return await this.historiqueModel.findOne({ where: { id } });
  }  

}*/
