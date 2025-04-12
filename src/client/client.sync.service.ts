import { Injectable } from '@nestjs/common';
import { ClientRepository } from 'src/shared/repositories/client.repository';
import { Client } from 'src/shared/schema/client';
import { Cron } from '@nestjs/schedule';
import { ApiCallService } from 'src/shared/utility/api-call.service';

@Injectable()
export class ClientSyncService {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly apiCallService: ApiCallService,
  ) {}

 @Cron('*/1 * * * *') // Exécute toutes les minutes
  async syncClients(): Promise<void> {
    console.log("🔄 Début de la synchronisation des clients...");

    try {
      // Utilisation de apiConfig depuis apiCallService
      const apiConfig = this.apiCallService['apiConfig'];

      // Utilisation du service ApiCallService pour obtenir la réponse API
      const clientsData = await this.apiCallService.apiCallClient(
        apiConfig.customersEndpoint,
        'GET',
        {
          'Content-Type': 'application/json',
        }
      );

      if (!clientsData || !clientsData.data) {
        throw new Error("Les données clients sont vides.");
      }

      console.log('✅ Réponse API Clients récupérée avec succès.');

      for (const clientData of clientsData.data) {
        const client = new Client();
        client.reference = clientData.reference;
        client.name = clientData.name;
        client.categoryReference = clientData.categoryReference;
        client.customerCategory = clientData.customerCategory;
        client.customerSegmentation = clientData.customerSegmentation || { id: null, reference: '', name: '', href: '' };
        client.billingCountry = clientData.billingCountry;
        client.billingCity = clientData.billingCity;
        client.billingPostalCode = clientData.billingPostalCode;
        client.billingAddress = clientData.billingAddress;
        client.organization = clientData.organization;
        client.dateCreated = clientData.dateCreated;
        client.lastUpdated = clientData.lastUpdated;
        client.region = clientData.region;

        console.log("➕ Ajout du client :", client);
        await this.clientRepository.createClient(client);
      }

      console.log("✅ Synchronisation des clients terminée avec succès !");
    } catch (error) {
      console.error("❌ Erreur lors de la synchronisation des clients :", error.message);
    }
  }
}




























/*

import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ClientRepository } from 'src/shared/repositories/client.repository';
import { Client } from 'src/shared/schema/client';
import { lastValueFrom } from 'rxjs';
import { Cron } from '@nestjs/schedule'; 
import axios from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';
import * as config from 'config';
import { ConfigInterface } from 'config/config.interface' // Assure-toi du bon chemin

@Injectable()
export class ClientSyncService {
  private jar = new CookieJar(); 
  private client = wrapper(axios.create({ jar: this.jar, withCredentials: true })); 

  private apiConfig: ConfigInterface["api"] = config.get("api");
  private credentials: ConfigInterface["credentials"] = config.get("credentials");

  constructor(
    private readonly httpService: HttpService,
    private readonly clientRepository: ClientRepository,  
  ) {}

  private async authenticate(): Promise<{ sessionId: string }> {
    try { 
      console.log("🔑 Tentative d'authentification...");

      const authResponse = await this.client.post(
        `${this.apiConfig.baseUrl}${this.apiConfig.authEndpoint}`,
        new URLSearchParams({
          j_username: this.credentials.username,
          j_password: this.credentials.password,
          ajax: 'true'
        }).toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          },
        }
      );

      console.log("Réponse API Authentification:", authResponse.data);
      console.log("En-têtes reçus :", authResponse.headers);

      const cookies = await this.jar.getCookies(this.apiConfig.baseUrl);
      const sessionCookie = cookies.find(cookie => cookie.key === 'JSESSIONID');

      if (!sessionCookie) {
        console.warn("⚠️ Aucun cookie trouvé dans la réponse. Vérification du corps...");

        if (authResponse.data && authResponse.data.sessionId) {
          console.log(`✅ Authentification réussie via token : ${authResponse.data.sessionId}`);
          return { sessionId: authResponse.data.sessionId };
        }

        throw new Error("⚠️ Aucun cookie ni token trouvé après l'authentification.");
      }

      console.log(`✅ Authentification réussie ! JSESSIONID: ${sessionCookie.value}`);
      return { sessionId: sessionCookie.value };

    } catch (error) {
      console.error("❌ Erreur lors de l'authentification :", error.message);
      throw new Error(`⚠️ Échec de l'authentification : ${error.message}`);
    }
  }*/

  //@Cron('*/1 * * * *')     //@Cron('0 0 * * *') // Exécuter tous les jours à minuit
 /* async syncClients(): Promise<void> {
    console.log("🔄 Début de la synchronisation des clients...");

    try {
      const { sessionId } = await this.authenticate();

      const response = await lastValueFrom(
        this.httpService.get(`${this.apiConfig.baseUrl}${this.apiConfig.customersEndpoint}`, {
          headers: {
            'Cookie': `JSESSIONID=${sessionId}`,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
            'Content-Type': 'application/json',
          },
        })
      );

      if (!response.data) {
        throw new Error("Les données clients sont vides."); 
      }

      console.log('✅ Réponse API Clients récupérée avec succès.');
      const clientsData = response.data.data;

      for (const clientData of clientsData) {
        const client = new Client();
        client.reference = clientData.reference;
        client.name = clientData.name;
        client.categoryReference = clientData.categoryReference;
        client.customerCategory = clientData.customerCategory;
        client.customerSegmentation = clientData.customerSegmentation || { id: null, reference: '', name: '', href: '' };
        client.billingCountry = clientData.billingCountry;
        client.billingCity = clientData.billingCity;
        client.billingPostalCode = clientData.billingPostalCode;
        client.billingAddress = clientData.billingAddress;
        client.organization = clientData.organization;
        client.dateCreated = clientData.dateCreated;
        client.lastUpdated = clientData.lastUpdated; 
        client.region = clientData.region;

        console.log("➕ Ajout du client :", client);
        await this.clientRepository.createClient(client);
      }

      console.log("✅ Synchronisation des clients terminée avec succès !");
    } catch (error) {
      console.error("❌ Erreur lors de la synchronisation :", error.message);
    }
  }
}*/


