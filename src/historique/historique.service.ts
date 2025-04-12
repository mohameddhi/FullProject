import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { HistoriqueRepository } from 'src/shared/repositories/historique.repository';
import { HistoriqueAchatArticle} from '../shared/schema/historique';
import { CreateHistoriqueDto } from 'src/historique/dto/create-historique.dto';

@Injectable()
export class HistoriqueService {
  constructor(
    private readonly historiqueRepository: HistoriqueRepository,
  ) {}

  async createHistorique(createHistoriqueDto: CreateHistoriqueDto): Promise<{
    message: string;
    result: HistoriqueAchatArticle;
    success: boolean;
  }> {
    try {
      const newHistorique = await this.historiqueRepository.createHistorique(createHistoriqueDto);
      return {
        message: 'Historique created successfully',
        result: newHistorique,
        success: true,
      };
    } catch (error) {
      throw new BadRequestException('Error creating historique', error.message);
    }
  }
}



