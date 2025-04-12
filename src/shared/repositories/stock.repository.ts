
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stock } from '../schema/stock';

@Injectable()
export class StockRepository {
  constructor(
    @InjectRepository(Stock) public readonly stockModel: Repository<Stock>,
  ) {}

  async createStock(createStockDto: Partial<Stock>): Promise<Stock> {
    console.log("Insertion en cours :", createStockDto);
    const newStock = this.stockModel.create(createStockDto);
    return await this.stockModel.save(newStock);
  }
 
}

