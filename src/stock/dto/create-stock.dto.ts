
import { IsNotEmpty, IsOptional, IsString, IsObject, IsInt, IsDate } from 'class-validator';

export class CreateStockDto {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  warehouseReference: string;

  @IsObject()
  @IsNotEmpty()
  warehouse: {
    id: number;
    reference: string;
    name: string;
    href: string;
  };

  @IsString()
  @IsNotEmpty()
  itemReference: string;

  @IsObject()
  @IsNotEmpty()
  item: {
    id: number;
    reference: string;
    name: string;
    href: string;
  };

  @IsString()
  @IsNotEmpty()
  unitReference: string;

  @IsObject()
  @IsNotEmpty()
  unit: {
    id: number;
    reference: string;
    name: string;
    href: string;
  };

  @IsInt()
  @IsNotEmpty()
  quantity: number;

  @IsOptional()
  @IsObject()
  reservedSerialNumbers?: any;

  @IsOptional()
  @IsDate()
  supplyDate?: Date;

  @IsString()
  @IsNotEmpty()
  organization: string;
}
