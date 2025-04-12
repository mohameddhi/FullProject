
import { CreateStockDto } from './dto/create-stock.dto';

import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stock } from '../shared/schema/stock';
import { StockRepository } from 'src/shared/repositories/stock.repository';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(StockRepository) 
    private readonly StockRepository: StockRepository,
  ) {}

  async createStock(createStockDto: CreateStockDto): Promise<{
    message: string;
    result: Stock;
    success: boolean;
  }> {
    try {
      const newStock = await this.StockRepository.createStock(createStockDto);
      return {
        message: 'Stock created successfully',
        result: newStock,
        success: true,
      };
    } catch (error) {
      throw new BadRequestException('Error creating stock', error.message);
    }
  }}
