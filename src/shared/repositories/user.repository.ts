import { Injectable } from '@nestjs/common'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../schema/users';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  // Recherche d'un utilisateur par condition spécifique (par exemple, email)
  async findOne(query: any) {
    return await this.userRepository.findOne(query);
  }

  // Création d'un utilisateur
  async create(data: Record<string, any>) {
    const user = this.userRepository.create(data);  // Crée une instance utilisateur
    return await this.userRepository.save(user);   // Sauvegarde dans la base de données
  }
  async find(query: any) {
    return await this.userRepository.find(query);
  }


    async updateOne(query: any, data: Record<string, any>) {
      return await this.userRepository.update(query, data);
    }
    async findById(id: number) {
      return await this.userRepository.findOne({ where: { id } });
    }
    

 
} 

