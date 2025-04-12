
import { Controller, Get } from '@nestjs/common'; 
import { AppService } from './app.service';
import { ExcelService } from './shared/excel.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly excelService: ExcelService,  // Injection du service CSV
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/test')
  getTest(): string {
    return this.appService.getTest();
  }
  @Get('/read-excel')
  async readExcel(): Promise<any> {
    try {
      const data = await this.excelService.readExcelFile(); // 📂 Lire le fichier Excel

      return {
        message: 'Excel Data Loaded',
        success: true,
        result: data, // ✅ Retourner les données dans Postman
        error: null,
      };
    } catch (error) {
      return {
        message: 'Error loading Excel file',
        success: false,
        result: null,
        error: error.message,
      };
    }
  }}










 /* @Get('/read-csv')
async readCsv(): Promise<any> {
  try {
    const data = await this.csvService.readCsvFile();
    return {
      message: 'CSV Data Loaded',
      timestamps: new Date().toISOString(),
      statusCode: 200,
      path: '/api/v1/read-csv',
      error: null,
      data: data, // 🔥 Renvoie les données lues
    };
  } catch (error) {
    return {
      message: 'Error loading CSV',
      timestamps: new Date().toISOString(),
      statusCode: 500,
      path: '/api/v1/read-csv',
      error: error.message,
    };
  }
}}*/
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
  /* @Get('/read-csv')
  async readCsv(): Promise<any> {
    try {
      const data = await this.csvService.readCsvFile();
      return { message: 'CSV Data Loaded', data };
    } catch (error) {
      return { message: 'Error loading CSV', error: error.message };
    }
  }
}*/















/*
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/test')
  getTest(): string {
    return this.appService.getTest();
  }
}*/
