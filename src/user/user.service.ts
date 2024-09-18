import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  create(createUserDto: CreateUserDto) {
    return this.knex('users').insert(createUserDto).returning('*');
  }

  findOne(id: number) {
    return this.knex('users').where({ id }).first();
  }
}