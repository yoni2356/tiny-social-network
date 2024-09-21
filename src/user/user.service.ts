import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';
import { User } from './entities/user.entity';
import { DATABASE_NAMES } from 'src/common/constants';

@Injectable()
export class UserService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const [createdUser] = await this.knex(DATABASE_NAMES.USERS)
      .insert(createUserDto)
      .returning('*');

    return createdUser;
  }

  async findOne(id: number) {
    return await this.knex(DATABASE_NAMES.USERS).where({ id }).first();
  }
}