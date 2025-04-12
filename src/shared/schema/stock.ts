import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity()
  export class Stock {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ nullable: false })
    warehouseReference: string;
  
    @Column({ type: 'json' })
    warehouse: {
      id: number;
      reference: string;
      name: string;
      href: string;
    };
  
    @Column({ nullable: false })
    itemReference: string;
  
    @Column({ type: 'json' })
    item: {
      id: number;
      reference: string;
      name: string;
      href: string;
    };
  
    @Column({ nullable: false })
    unitReference: string;
  
    @Column({ type: 'json' })
    unit: {
      id: number;
      reference: string;
      name: string;
      href: string;
    };
  
    @Column({ type: 'int', nullable: false })
    quantity: number;
  
    @Column({ type: 'json', nullable: true })
    reservedSerialNumbers: any;
  
    @Column({ type: 'timestamp', nullable: true })
    supplyDate: Date;
  
    @Column({ nullable: false })
    organization: string;
  
    @CreateDateColumn()
    dateCreated: Date;
  
    @UpdateDateColumn()
    lastUpdated: Date;
  }
  