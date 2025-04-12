import { Injectable } from '@nestjs/common';
import { HistoriqueRepository } from 'src/shared/repositories/historique.repository';
import { HistoriqueAchatArticle} from 'src/shared/schema/historique';
import { Cron } from '@nestjs/schedule';
import { ApiCallService } from 'src/shared/utility/api-call.service';

@Injectable()
export class HistoriqueSyncService {
  constructor(
    private readonly historiqueRepository: HistoriqueRepository,
    private readonly apiCallService: ApiCallService,
  ) {}

  @Cron('*/1 * * * *') // Exécute toutes les minutes
async syncHistoriques(): Promise<void> {
  console.log("🔄 Début de la synchronisation des historiques d'achat...");

  try {
    const apiConfig = this.apiCallService['apiConfig'];
    const historiquesData = await this.apiCallService.apiCallHistorique(
      apiConfig.historiquesEndpoint,
      'GET',
      {
        'Content-Type': 'application/json',
      }
    );

    console.log('Réponse API Historique:', historiquesData);

    if (!historiquesData || !historiquesData.detailsOrdersCreated) {
      throw new Error("Les données historiques sont vides.");
    }

    console.log('✅ Réponse API Historique récupérée avec succès.');

    for (const historiqueData of historiquesData.detailsOrdersCreated) {
      const historique = new HistoriqueAchatArticle();
      historique.referenceOrder = historiqueData.referenceOrder;
      historique.orderId = historiqueData.orderId;
      historique.dateCreated = historiqueData.dateCreated;
      historique.customerId = historiqueData.customerId;
      historique.status = historiqueData.status;
      historique.userId = historiqueData.userId;
      historique.itemUnitId = historiqueData.itemUnitId;
      historique.itemId = historiqueData.itemId;
      historique.unitId = historiqueData.unitId;
      historique.itemCategoryId = historiqueData.itemCategoryId;
      historique.quantity = historiqueData.quantity;
      historique.unitPrice = historiqueData.unitPrice;
      historique.totalPrice = historiqueData.totalPrice;
      historique.totalProducts = historiqueData.totalProducts;
      historique.deliveryStatus = historiqueData.deliveryStatus;

      console.log("➕ Ajout de l'historique d'achat :", historique);
      await this.historiqueRepository.createHistorique(historique);
    }

    console.log("✅ Synchronisation des historiques terminée avec succès !");
  } catch (error) {
    console.error("❌ Erreur lors de la synchronisation des historiques :", error);
    if (error.response) {
      console.error("Réponse d'erreur:", error.response.data);
    } else if (error.request) {
      console.error("Aucune réponse reçue:", error.request);
    } else {
      console.error("Erreur de configuration:", error.message);
    }
  }
}}