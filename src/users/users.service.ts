import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/graphql/models/User';
import { CreateUserInput } from 'src/graphql/utils/CreateUserInput';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepostory: Repository<User>,
  ) {}

  async getUsers() {
    return await this.usersRepostory.find({ relations: ['settings '] });
  }

  async getUsersById(id: number) {
    return await this.usersRepostory.findOne({
      where: { id },
      relations: ['settings'],
    });
  }

  async createUser({ username, displayName }: CreateUserInput) {
    const newUser = this.usersRepostory.create({
      username,
      displayName,
    });

    return await this.usersRepostory.save(newUser);
  }
}
