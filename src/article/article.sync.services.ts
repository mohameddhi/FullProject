import { Injectable } from '@nestjs/common';
import { ArticleRepository } from 'src/shared/repositories/article.repository';
import { Article } from 'src/shared/schema/article';
import { Cron } from '@nestjs/schedule';
import { ApiCallService } from 'src/shared/utility/api-call.service';

@Injectable()
export class ArticleSyncService {
  constructor(
    private readonly articleRepository: ArticleRepository,
    private readonly apiCallService: ApiCallService,
  ) {}

  @Cron('*/1 * * * *') // Exécute toutes les minutes
  async syncArticles(): Promise<void> {
    console.log("🔄 Début de la synchronisation des articles...");

    try {
      // Utilisation de apiConfig depuis apiCallService
      const apiConfig = this.apiCallService['apiConfig'];

      // Utilisation du service ApiCallService pour obtenir la réponse API
      const articlesData = await this.apiCallService.apiCallArticle(
        apiConfig.articlesEndpoint,
        'GET',
        {
          'Content-Type': 'application/json',
        }
      );

      if (!articlesData || !articlesData.data) {
        throw new Error("Les données articles sont vides.");
      }

      console.log('✅ Réponse API Articles récupérée avec succès.');

      for (const articleData of articlesData.data) {
        const article = new Article();
        article.reference = articleData.reference;
        article.name = articleData.name;
        article.itemCategoryId = articleData.itemCategoryId;
        article.itemCategory = articleData.itemCategory ;
        article.isActive = articleData.isActive;
        article.organization = articleData.organization;
        article.dateCreated = articleData.dateCreated;
        article.lastUpdated = articleData.lastUpdated;

        console.log("➕ Ajout de l'article :", article);
        await this.articleRepository.createArticle(article);
      }

      console.log("✅ Synchronisation des articles terminée avec succès !");
    } catch (error) {
      console.error("❌ Erreur lors de la synchronisation des articles :", error.message);
    }
  }
}

