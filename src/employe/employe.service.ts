import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { EmployeRepository } from 'src/shared/repositories/employe.repository';
import { CreateEmployeDto } from 'src/employe/dto/create-employe.dto';
import { Employe } from '../shared/schema/employe';

@Injectable()
export class EmployeService {
  constructor(
    private readonly employeRepository: EmployeRepository,
  ) {}

  async createEmploye(createEmployeDto: CreateEmployeDto): Promise<{ message: string; result: Employe; success: boolean; }> {
    try {
      const newEmploye = await this.employeRepository.createEmploye(createEmployeDto);
      return {
        message: 'Employe created successfully',
        result: newEmploye,
        success: true,
      };
    } catch (error) {
      throw new BadRequestException('Error creating employe', error.message);
    }
  }

  async getAllEmployes(): Promise<{ message: string; success: boolean; result: Employe[] }> {
    const employes = await this.employeRepository.getAllEmployes();
    return {
      message: 'Employes retrieved successfully',
      success: true,
      result: employes,
    };
  }

  async getEmployeById(id: number): Promise<{ message: string; success: boolean; result: Employe | null }> {
    const employe = await this.employeRepository.getEmployeById(id);
    if (!employe) {
      throw new NotFoundException(`Employe with ID ${id} not found`);
    }
    return {
      message: 'Employe retrieved successfully',
      success: true,
      result: employe,
    };
  }
}