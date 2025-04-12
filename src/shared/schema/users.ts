import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum userTypes {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  organisation: string;

  @Column()
  email: string;

  @Column()
  password: string;



  @Column({
    type: 'enum',
    enum: userTypes,
    default: userTypes.CUSTOMER,
  })
  type: userTypes;

  @Column({
    default: false,
  })
  isVerified: boolean;

  @Column({
    nullable: true,
  })
  otp: string;

  @Column({
    nullable: true,
  })
  otpExpiryTime: Date;
}










/*import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum userTypes {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  organisation: string;

  @Column()
  email: string;

  @Column()
  password: string;



  @Column({
    type: 'enum',
    enum: userTypes,
    default: userTypes.CUSTOMER,
  })
  type: userTypes;

  @Column({
    default: false,
  })
  isVerified: boolean;

  @Column({
    nullable: true,
  })
  otp: string;

  @Column({
    nullable: true,
  })
  otpExpiryTime: Date;
}*/ 
