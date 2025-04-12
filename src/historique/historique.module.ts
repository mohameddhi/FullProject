
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoriqueController } from './historique.controller';
import { HistoriqueService } from './historique.service';
import { HistoriqueRepository } from 'src/shared/repositories/historique.repository';
import { HistoriqueAchatArticle } from 'src/shared/schema/historique';

@Module({
  imports: [TypeOrmModule.forFeature([HistoriqueAchatArticle,HistoriqueRepository])], // Importation du modèle HistoriqueAchatArticle
  controllers: [HistoriqueController], // Ajout du contrôleur
  providers: [HistoriqueService, HistoriqueRepository],
  exports: [HistoriqueService, HistoriqueRepository],
})
export class HistoriqueModule {}

