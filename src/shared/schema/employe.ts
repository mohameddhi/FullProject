import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity()
  export class Employe {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ nullable: false })
    reference: string;
  
    @Column({ nullable: false })
    firstName: string;
  
    @Column()
    lastName: string;
  
    
    @Column()
    enabled: boolean;
  
    @Column()
    organization: string;
  
  
    @CreateDateColumn()
    dateCreated: Date;
  
    @UpdateDateColumn()
    lastUpdated: Date;
  }



















  /* import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity()
  export class Employe {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ nullable: false })
    reference: string;
  
    @Column({ nullable: false })
    firstName: string;
  
    @Column()
    lastName: string;
  
    
    @Column()
    enabled: boolean;
  
    @Column()
    organization: string;
  
  
    @CreateDateColumn()
    dateCreated: Date;
  
    @UpdateDateColumn()
    lastUpdated: Date;
  }*/
  
 
  