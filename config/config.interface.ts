

export interface ApiConfig {
    baseUrl: string;
    authEndpoint: string;
    customersEndpoint: string;
    employesEndpoint:string;
    articlesEndpoint:string;
    stocksEndpoint:string;
    historiquesEndpoint:string
  }
  
  export interface Credentials {
    username: string;
    password: string;
  }
  
  export interface ConfigInterface {
    api: ApiConfig;
    credentials: Credentials;
  }













/*export interface ConfigInterface {
    api: {
      baseUrl: string;
      authEndpoint: string;
      customersEndpoint: string;
    };
    credentials: {
      username: string;
      password: string;
    };
  }*/
