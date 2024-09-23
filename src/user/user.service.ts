import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';
import { User } from './entities/user.entity';
import { TABLES } from 'src/common/constants';

@Injectable()
export class UserService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const [createdUser] = await this.knex(TABLES.USERS)
        .insert(createUserDto)
        .returning('*');

      return createdUser;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException('User creation failed')
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      const user = await this.knex(TABLES.USERS).where({ id }).first();
      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch(err) {
      console.error(err);
      throw new InternalServerErrorException('User find failed')
    }
  }
}