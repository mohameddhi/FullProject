import { Injectable } from '@nestjs/common';
import { StockRepository } from 'src/shared/repositories/stock.repository';
import { Stock } from 'src/shared/schema/stock';
import { Cron } from '@nestjs/schedule';
import { ApiCallService } from 'src/shared/utility/api-call.service';

@Injectable()
export class StockSyncService {
  constructor(
    private readonly stockRepository: StockRepository,
    private readonly apiCallService: ApiCallService,
  ) {}

  @Cron('*/1 * * * *') // Exécute toutes les minutes
  async syncStocks(): Promise<void> {
    console.log("🔄 Début de la synchronisation des stocks...");

    try {
      // Utilisation de apiConfig depuis apiCallService
      const apiConfig = this.apiCallService['apiConfig'];

      // Utilisation du service ApiCallService pour obtenir la réponse API
      const stocksData = await this.apiCallService.apiCallStock(
        apiConfig.stocksEndpoint,
        'GET',
        {
          'Content-Type': 'application/json',
        }
      );

      if (!stocksData || !stocksData.data) {
        throw new Error("Les données stocks sont vides.");
      }

      console.log('✅ Réponse API Stock récupérée avec succès.');

      for (const stockData of stocksData.data) {
        const stock = new Stock();
        stock.warehouseReference = stockData.warehouseReference;
        stock.warehouse = stockData.warehouse;
        stock.itemReference = stockData.itemReference;
        stock.item = stockData.item;
        stock.unitReference = stockData.unitReference;
        stock.unit = stockData.unit;
        stock.quantity = stockData.quantity;
        stock.reservedSerialNumbers = stockData.reservedSerialNumbers;
        stock.supplyDate = stockData.supplyDate;
        stock.organization = stockData.organization;
        stock.dateCreated = stockData.dateCreated;
        stock.lastUpdated = stockData.lastUpdated;

        console.log("➕ Ajout du stock :", stock);
        await this.stockRepository.createStock(stock);
      }

      console.log("✅ Synchronisation des stocks terminée avec succès !");
    } catch (error) {
      console.error("❌ Erreur lors de la synchronisation des stocks :", error.message);
    }
  }
}
