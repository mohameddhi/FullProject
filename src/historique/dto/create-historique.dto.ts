import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';

export class CreateHistoriqueDto {
  @IsString()
  @IsNotEmpty()
  referenceOrder: string;

  @IsInt()
  @IsNotEmpty()
  orderId: number;

  @IsInt()
  @IsNotEmpty()
  customerId: number;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  itemUnitId: number;

  @IsInt()
  @IsNotEmpty()
  itemId: number;

  @IsInt()
  @IsNotEmpty()
  unitId: number;

  @IsInt()
  @IsNotEmpty()
  itemCategoryId: number;

  @IsInt()
  @IsNotEmpty()
  quantity: number;

  @IsInt()
  @IsNotEmpty()
  unitPrice: number;

  @IsInt()
  @IsNotEmpty()
  totalPrice: number;

  @IsInt()
  @IsNotEmpty()
  totalProducts: number;

  @IsString()
  @IsNotEmpty()
  deliveryStatus: string;
}

  
