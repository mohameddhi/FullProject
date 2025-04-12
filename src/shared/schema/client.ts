import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  
  @Entity()
  export class Client {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ nullable: false })
    reference: string;
  
    @Column({ nullable: false })
    name: string;
  
    @Column()
    categoryReference: string;
   
    
    @Column({ type: 'json' })
    customerCategory: {
      id: number;
      reference: string;
      name: string;
      href: string;
    };
  
    @Column()
    customerSegmentationReference: string;
    @Column({ nullable: true, type: 'json' })
    customerSegmentation: {
      id: number;
      reference: string;
      name: string;
      href: string;
    };
    
  
    @Column()
    billingCountry: string;
  
    @Column()
    billingCity: string;
  
    @Column({ nullable: true })
    billingPostalCode: string;
  
    @Column({ nullable: true })
    billingAddress: string;
  
    @Column()
    organization: string;
  
  
    @CreateDateColumn()
    dateCreated: Date;
  
    @UpdateDateColumn()
    lastUpdated: Date;
  
    @Column({ nullable: true })
    region: string;
  }
  