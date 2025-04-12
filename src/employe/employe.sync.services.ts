


import { Injectable } from '@nestjs/common';
import { EmployeRepository } from 'src/shared/repositories/employe.repository';
import { Employe } from 'src/shared/schema/employe';
import { Cron } from '@nestjs/schedule';
import { ApiCallService } from 'src/shared/utility/api-call.service';

@Injectable()
export class EmployeSyncService {
  constructor(
    private readonly employeRepository: EmployeRepository,
    private readonly apiCallService: ApiCallService,
  ) {}

  @Cron('*/1 * * * *') // Exécute toutes les minutes
  async syncEmployes(): Promise<void> {
    console.log("🔄 Début de la synchronisation des employés...");

    try {
      // Utilisation de apiConfig depuis apiCallService
      const apiConfig = this.apiCallService['apiConfig'];

      // Utilisation du service ApiCallService pour obtenir la réponse API
      const employesData = await this.apiCallService.apiCallEmploye(
        apiConfig.employesEndpoint,
        'GET',
        {
          'Content-Type': 'application/json',
        }
      );

      if (!employesData || !employesData.data) {
        throw new Error("Les données employés sont vides.");
      }

      console.log('✅ Réponse API Employés récupérée avec succès.');

      for (const employeData of employesData.data) {
        const employe = new Employe();
        employe.reference = employeData.reference;
        employe.firstName = employeData.firstName;
        employe.lastName = employeData.lastName;
        employe.enabled = employeData.enabled;
        employe.organization = employeData.organization;
        employe.dateCreated = employeData.dateCreated;
        employe.lastUpdated = employeData.lastUpdated;

        console.log("➕ Ajout de l'employé :", employe);
        await this.employeRepository.createEmploye(employe);
      }

      console.log("✅ Synchronisation des employés terminée avec succès !");
    } catch (error) {
      console.error("❌ Erreur lors de la synchronisation des employés :", error.message);
    }
  }
}
















/*import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { EmployeRepository } from 'src/shared/repositories/employe.repository'; // Assurez-vous que ce repository existe
import { Employe } from 'src/shared/schema/employe'; // Assurez-vous que ce modèle est bien dans le bon chemin
import { lastValueFrom } from 'rxjs';
import { Cron } from '@nestjs/schedule'; 
import axios from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';

@Injectable()
export class EmployeSyncService {
  private jar = new CookieJar(); // Stockage des cookies
  private client = wrapper(axios.create({ jar: this.jar, withCredentials: true })); 
  constructor(
    private readonly httpService: HttpService,
    private readonly employeRepository: EmployeRepository,  
  ) {}

  private async authenticate(): Promise<{ sessionId: string }> {
    try { 
      console.log("🔑 Tentative d'authentification...");

      const authResponse = await this.client.post(
        'https://agro.valomnia.com/j_spring_security_check',
        new URLSearchParams({
          j_username: 'connector@valomnia.com',
          j_password: 'password',
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

      const cookies = await this.jar.getCookies('https://agro.valomnia.com');
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

 // @Cron('*/1 * * * *') // Exécuter toutes les minutes
  /*async syncEmployes(): Promise<void> {
    console.log("🔄 Début de la synchronisation des employés...");

    try {
      const { sessionId } = await this.authenticate();

      const response = await lastValueFrom(
        this.httpService.get('https://agro.valomnia.com/api/v2.1/employees', { // Remplacez l'URL par celle correspondant aux employés
          headers: {
            'Cookie': `JSESSIONID=${sessionId}`,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
            'Content-Type': 'application/json',
          },
        })
      );

      if (!response.data) {
        throw new Error("Les données employés sont vides.");
      }

      console.log('✅ Réponse API Employés récupérée avec succès.');
      const employesData = response.data.data; // Récupère seulement le tableau "data"

      // Sauvegarder les employés dans la base de données
      for (const employeData of employesData) {
        const employe = new Employe();
        employe.reference = employeData.reference;
        employe.firstName = employeData.firstName;
        employe.lastName = employeData.lastName;
        employe.enabled = employeData.enabled;
        employe.organization = employeData.organization;
        employe.dateCreated = employeData.dateCreated;
        employe.lastUpdated = employeData.lastUpdated;

        console.log("➕ Ajout de l'employé :", employe);
        await this.employeRepository.createEmploye(employe);  // Assurez-vous que `createEmploye` existe
      }

      console.log("✅ Synchronisation des employés terminée avec succès !");
    } catch (error) {
      console.error("❌ Erreur lors de la synchronisation :", error.message);
    }
  }
}*/
