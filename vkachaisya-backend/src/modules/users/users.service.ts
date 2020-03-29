import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../database/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async getById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ id }, { relations: ['subscriptions'] });
  }

  async create(userId: number) {
    const user = new User();
    user.id = userId;
    await this.userRepository.insert(user);
  }
}
