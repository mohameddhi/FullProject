import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from '../src/shared/schema/client';
import { Article } from '../src/shared/schema/article';
import { Stock } from '../src/shared/schema/stock';
import { HistoriqueAchatArticle } from '../src/shared/schema/historique';
import { ClientRepository } from '../src/shared/repositories/client.repository';
import { ArticleRepository } from '../src/shared/repositories/article.repository';
import { StockRepository } from '../src/shared/repositories/stock.repository';
import { HistoriqueRepository } from '../src/shared/repositories/historique.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Article, Stock, HistoriqueAchatArticle])],
  providers: [ClientRepository, ArticleRepository, StockRepository, HistoriqueRepository],
  exports: [ClientRepository, ArticleRepository, StockRepository, HistoriqueRepository],
})
export class RepositoryModule {}
