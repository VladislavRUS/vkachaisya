import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../database/entities/User';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/CreateUserDto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async getById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ id });
  }

  async create(createUserDto: CreateUserDto) {
    await this.userRepository.insert(User.fromCreateUserDto(createUserDto));
  }
}
