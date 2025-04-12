import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { Employe } from '../shared/schema/employe';
import { EmployeService } from './employe.service';
import { EmployeController } from './employe.controller';
import { EmployeRepository } from 'src/shared/repositories/employe.repository';


@Module({
  imports: [TypeOrmModule.forFeature([Employe,EmployeRepository])],
  controllers: [EmployeController],
  providers: [EmployeService, EmployeRepository],
  exports: [EmployeService,EmployeRepository],
})
export class EmployeModule {} 

