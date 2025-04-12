

import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { EmployeService } from '../employe/employe.service';
import { CreateEmployeDto } from 'src/employe/dto/create-employe.dto';

@Controller('employe')
export class EmployeController {
  constructor(private readonly employeService: EmployeService) {}

  @Post()
  async create(@Body() createEmployeDto: CreateEmployeDto) {
    return await this.employeService.createEmploye(createEmployeDto);
  }

  @Get()
  async getAllEmployes() {
    return await this.employeService.getAllEmployes();
  }

  @Get(':id')
  async getEmployeById(@Param('id') id: number) {
    return await this.employeService.getEmployeById(id);
  }
}