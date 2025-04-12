import * as path from 'path';
import * as XLSX from 'xlsx';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ExcelService { 
  // ✅ Correction du chemin pour pointer vers le bon dossier
  private readonly filePath = path.join(process.cwd(), 'Data', 'merged_df.xlsx');
  private readonly logger = new Logger(ExcelService.name);

  async readExcelFile(): Promise<any[]> {
    try {
      this.logger.log(`Lecture du fichier Excel: ${this.filePath}`);

      // Charger le fichier Excel
      const workbook = XLSX.readFile(this.filePath);
      const sheetName = workbook.SheetNames[0]; // Prendre la première feuille
      const sheet = workbook.Sheets[sheetName];  

      // Convertir la feuille en JSON
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      
      this.logger.log(`Lecture terminée, ${jsonData.length} lignes chargées.`);
      return jsonData;
    } catch (error) {
      this.logger.error(`Erreur lors de la lecture du fichier Excel: ${error.message}`);
      throw error;
    }
  }
}





/*import * as fs from 'fs';
import * as path from 'path';
import { Injectable } from '@nestjs/common';
import * as csv from 'csv-parser';

@Injectable()
export class CsvService {
  private readonly filePath = path.join(process.cwd(), 'data', 'merged_historiqu.csv'); // ✅ Corrigé

  async readCsvFile(): Promise<{ [key: string]: any }[]> {
    return new Promise((resolve, reject) => {
      const results: { [key: string]: any }[] = [];

      fs.createReadStream(this.filePath)
        .pipe(csv())
        .on('data', (data: { [key: string]: any }) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (err) => reject(err));
    });
  }
}*/



