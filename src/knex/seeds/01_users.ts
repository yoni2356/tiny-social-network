import { Knex } from 'knex';
import { SEED_DATA } from '../seed_data';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries
  await knex('users').insert(SEED_DATA.users);
}
