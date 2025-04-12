import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import * as config from 'config';
import { ConfigInterface } from 'config/config.interface'; 
import { CookieJar } from 'tough-cookie';
import { wrapper } from 'axios-cookiejar-support';

@Injectable()
export class ApiCallService {
  private apiConfig: ConfigInterface["api"] = config.get("api");
  private credentials: ConfigInterface["credentials"] = config.get("credentials");
  private jar = new CookieJar(); // CookieJar pour gérer les cookies de session
  private client: AxiosInstance;
  private employe: AxiosInstance;
  private article: AxiosInstance;
  private historique: AxiosInstance;
  private stock: AxiosInstance;
  constructor() {
    this.client = wrapper(axios.create({
      jar: this.jar,
      withCredentials: true,
    }));

    this.employe = wrapper(axios.create({
      jar: this.jar,
      withCredentials: true,
    }));
    this.article = wrapper(axios.create({
        jar: this.jar,
        withCredentials: true,
      })); 
      this.historique = wrapper(axios.create({
        jar: this.jar,
        withCredentials: true,
      })); 
      this.stock = wrapper(axios.create({
        jar: this.jar,
        withCredentials: true,
      })); 
  }

  private async authenticateClient(): Promise<{ sessionId: string }> {
    try {
      console.log("🔑 Tentative d'authentification client...");

      const authResponse = await this.client.post(
        `${this.apiConfig.baseUrl}${this.apiConfig.authEndpoint}`,
        new URLSearchParams({
          j_username: this.credentials.username,
          j_password: this.credentials.password,
          ajax: 'true',
        }).toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          },
        }
      );

      console.log("Réponse API Authentification client:", authResponse.data);
      const cookies = await this.jar.getCookies(this.apiConfig.baseUrl);
      const sessionCookie = cookies.find(cookie => cookie.key === 'JSESSIONID');

      if (sessionCookie) {
        console.log(`✅ Authentification réussie client ! JSESSIONID: ${sessionCookie.value}`);
        return { sessionId: sessionCookie.value };
      }

      throw new Error("⚠️ Aucun cookie de session trouvé pour le client.");
    } catch (error) {
      console.error("❌ Erreur lors de l'authentification client :", error.message);
      throw new Error(`⚠️ Échec de l'authentification client : ${error.message}`);
    }
  }

  private async authenticateEmploye(): Promise<{ sessionId: string }> {
    try {
      console.log("🔑 Tentative d'authentification employé...");

      const authResponse = await this.employe.post(
        `${this.apiConfig.baseUrl}${this.apiConfig.authEndpoint}`,
        new URLSearchParams({
          j_username: this.credentials.username,
          j_password: this.credentials.password,
          ajax: 'true',
        }).toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          },
        }
      );

      console.log("Réponse API Authentification employé:", authResponse.data);
      const cookies = await this.jar.getCookies(this.apiConfig.baseUrl);
      const sessionCookie = cookies.find(cookie => cookie.key === 'JSESSIONID');

      if (sessionCookie) {
        console.log(`✅ Authentification réussie employé ! JSESSIONID: ${sessionCookie.value}`);
        return { sessionId: sessionCookie.value };
      }

      throw new Error("⚠️ Aucun cookie de session trouvé pour l'employé.");
    } catch (error) {
      console.error("❌ Erreur lors de l'authentification employé :", error.message);
      throw new Error(`⚠️ Échec de l'authentification employé : ${error.message}`);
    }
  }
  // Nouvelle méthode d'authentification pour les articles
  private async authenticateArticle(): Promise<{ sessionId: string }> {
    try {
      console.log("🔑 Tentative d'authentification article...");

      const authResponse = await this.article.post(
        `${this.apiConfig.baseUrl}${this.apiConfig.authEndpoint}`,
        new URLSearchParams({
          j_username: this.credentials.username,
          j_password: this.credentials.password,
          ajax: 'true',
        }).toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          },
        }
      );

      console.log("Réponse API Authentification article:", authResponse.data);
      const cookies = await this.jar.getCookies(this.apiConfig.baseUrl);
      const sessionCookie = cookies.find(cookie => cookie.key === 'JSESSIONID');

      if (sessionCookie) {
        console.log(`✅ Authentification réussie article ! JSESSIONID: ${sessionCookie.value}`);
        return { sessionId: sessionCookie.value };
      }

      throw new Error("⚠️ Aucun cookie de session trouvé pour l'article.");
    } catch (error) {
      console.error("❌ Erreur lors de l'authentification article :", error.message);
      throw new Error(`⚠️ Échec de l'authentification article : ${error.message}`);
    }
  }

//historique 
private async authenticateHistorique(): Promise<{ sessionId: string }> {
  try {
    console.log("🔑 Tentative d'authentification historique...");

    const authResponse = await this.historique.post(
      `${this.apiConfig.baseUrl}${this.apiConfig.authEndpoint}`,
      new URLSearchParams({
        j_username: this.credentials.username,
        j_password: this.credentials.password,
        ajax: 'true',
      }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        },
      }
    );

    console.log("Réponse API Authentification historique:", authResponse.data);
    const cookies = await this.jar.getCookies(this.apiConfig.baseUrl);
    const sessionCookie = cookies.find(cookie => cookie.key === 'JSESSIONID');

    if (sessionCookie) {
      console.log(`✅ Authentification réussie historique ! JSESSIONID: ${sessionCookie.value}`);
      return { sessionId: sessionCookie.value };
    }

    throw new Error("⚠️ Aucun cookie de session trouvé pour  historique.");
  } catch (error) {
    console.error("❌ Erreur lors de l'authentification  historique :", error.message);
    throw new Error(`⚠️ Échec de l'authentification  historique: ${error.message}`);
  }
}
//stock
private async authenticateStock(): Promise<{ sessionId: string }> {
  try {
    console.log("🔑 Tentative d'authentification Stock...");

    const authResponse = await this.stock.post(
      `${this.apiConfig.baseUrl}${this.apiConfig.authEndpoint}`,
      new URLSearchParams({
        j_username: this.credentials.username,
        j_password: this.credentials.password,
        ajax: 'true',
      }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        },
      }
    );

    console.log("Réponse API Authentification Stock:", authResponse.data);
    const cookies = await this.jar.getCookies(this.apiConfig.baseUrl);
    const sessionCookie = cookies.find(cookie => cookie.key === 'JSESSIONID');

    if (sessionCookie) {
      console.log(`✅ Authentification réussie Stock ! JSESSIONID: ${sessionCookie.value}`);
      return { sessionId: sessionCookie.value };
    }

    throw new Error("⚠️ Aucun cookie de session trouvé pour Stock.");
  } catch (error) {
    console.error("❌ Erreur lors de l'authentification Stock :", error.message);
    throw new Error(`⚠️ Échec de l'authentification Stock : ${error.message}`);
  }
}

  
  async apiCallClient(url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', headers: Record<string, string>, params: any = {}): Promise<any> {
    try {
      const { sessionId } = await this.authenticateClient();  // Authentification du client
      headers['Cookie'] = `JSESSIONID=${sessionId}`;

      const config: AxiosRequestConfig = {
        headers: {
          ...headers,
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          'Content-Type': 'application/json',
        },
      };
      

      const response = await this.client.request({
        url: `${this.apiConfig.baseUrl}${url}`,
        method: method,
        data: params,
        ...config,
      });

      return response.data;
    } catch (error) {
      console.error("❌ Erreur lors de l'appel API client :", error.message);
      throw new Error(`Échec de l'appel API client : ${error.message}`);
    }
  }


  async apiCallEmploye(url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', headers: Record<string, string>, params: any = {}): Promise<any> {
    try {
      const { sessionId } = await this.authenticateEmploye();  // Authentification de l'employé
      headers['Cookie'] = `JSESSIONID=${sessionId}`;

      const config: AxiosRequestConfig = {
        headers: {
          ...headers,
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          'Content-Type': 'application/json',
        },
      };

      const response = await this.employe.request({
        url: `${this.apiConfig.baseUrl}${url}`,
        method: method,
        data: params,
        ...config,
      });

      return response.data;
    } catch (error) {
      console.error("❌ Erreur lors de l'appel API employé :", error.message);
      throw new Error(`Échec de l'appel API employé : ${error.message}`);
    }
  }
  
  async apiCallArticle(url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', headers: Record<string, string>, params: any = {}): Promise<any> {
    try {
      const { sessionId } = await this.authenticateArticle();  // Authentification pour les articles
      headers['Cookie'] = `JSESSIONID=${sessionId}`;

      const config: AxiosRequestConfig = {
        headers: {
          ...headers,
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          'Content-Type': 'application/json',
        },
      };

      const response = await this.article.request({
        url: `${this.apiConfig.baseUrl}${url}`,
        method: method,
        data: params,
        ...config,
      });

      return response.data;
    } catch (error) {
      console.error("❌ Erreur lors de l'appel API article :", error.message);
      throw new Error(`Échec de l'appel API article : ${error.message}`);
    }
  }
  //historique
  async apiCallHistorique(url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', headers: Record<string, string>, params: any = {}): Promise<any> {
    try {
      const { sessionId } = await this.authenticateHistorique();  // Authentification du client
      headers['Cookie'] = `JSESSIONID=${sessionId}`;

      const config: AxiosRequestConfig = {
        headers: {
          ...headers,
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          'Content-Type': 'application/json',
        },
      };
      
      const response = await this.historique.request({
        url: `${this.apiConfig.baseUrl}${url}`,
        method: method,
        data: params,
        ...config,
      });

      return response.data;
    } catch (error) {
      console.error("❌ Erreur lors de l'appel API historique :", error.message);
      throw new Error(`Échec de l'appel API historique : ${error.message}`);
    }
  }
  //stock
  async apiCallStock(url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', headers: Record<string, string>, params: any = {}): Promise<any> {
    try {
      const { sessionId } = await this.authenticateStock();  // Authentification du client
      headers['Cookie'] = `JSESSIONID=${sessionId}`;

      const config: AxiosRequestConfig = {
        headers: {
          ...headers,
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          'Content-Type': 'application/json',
        },
      };
      

      const response = await this.stock.request({
        url: `${this.apiConfig.baseUrl}${url}`,
        method: method,
        data: params,
        ...config,
      });

      return response.data;
    } catch (error) {
      console.error("❌ Erreur lors de l'appel API stock :", error.message);
      throw new Error(`Échec de l'appel API stock : ${error.message}`);
    }
  }
}