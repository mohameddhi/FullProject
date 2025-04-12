

 import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employe } from '../schema/employe';

@Injectable()
export class EmployeRepository {
  constructor(
    @InjectRepository(Employe) private readonly employeModel: Repository<Employe>,
  ) {}

  async createEmploye(createEmployeDto: Partial<Employe>): Promise<Employe> {
    const newEmploye = this.employeModel.create(createEmployeDto);
    return await this.employeModel.save(newEmploye);
  }

  async getAllEmployes(): Promise<Employe[]> {
    return await this.employeModel.find();
  }

  async getEmployeById(id: number): Promise<Employe | null> {
    return await this.employeModel.findOne({ where: { id } });
  }
} 