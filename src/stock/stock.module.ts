import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { Stock } from 'src/shared/schema/stock'; 
import { StockRepository } from 'src/shared/repositories/stock.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([Stock, StockRepository])],
  controllers: [StockController],
  providers: [StockService,StockRepository],
  exports: [StockService, StockRepository],
})
export class StockModule {}



