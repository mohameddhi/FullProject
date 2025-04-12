import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity()
  export class HistoriqueAchatArticle  {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    referenceOrder: string;
  
    @Column()
    orderId: number;
  
  
    @CreateDateColumn()
    dateCreated: Date;
  
    @Column()
    customerId: number;
  
    @Column() 
    status: string;
  
    @Column()
    userId: number;
  
    @Column()
    itemUnitId: number;
  
    @Column()
    itemId: number;
  
    @Column()
    unitId: number;
  
    @Column()
    itemCategoryId: number;
  
    @Column()
    quantity: number;
    @Column()
    unitPrice: number;
  
    @Column()
    totalPrice: number;
  
    @Column()
    totalProducts: number;
  
    @Column()
    deliveryStatus: string;
  }

  