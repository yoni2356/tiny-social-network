import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const [createdUser] = await this.knex('users')
      .insert(createUserDto)
      .returning('*');

    return createdUser;
  }

  async findOne(id: number) {
    return await this.knex('users').where({ id }).first();
  }
}