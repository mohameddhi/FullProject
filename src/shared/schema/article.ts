import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity()
  export class Article {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ nullable: false })
    reference: string;
  
    @Column({ nullable: false })
    name: string;
  
    @Column()
    itemCategoryId: number;
  
    
    @Column({ type: 'json' })
    itemCategory: {
      id: number;
      reference: string;
      name: string;
      href: string;
    };
  
    @Column()
    isActive: boolean;
  
    @Column()
    organization: string;
  
  
    @CreateDateColumn()
    dateCreated: Date;
  
    @UpdateDateColumn()
    lastUpdated: Date;
  }