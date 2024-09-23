import { Knex } from 'knex';
import { TABLES, SEED_DATA } from 'src/common/constants';

const USERS_TABLE = TABLES.USERS;

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(USERS_TABLE).del();

  // Inserts seed entries
  await knex(USERS_TABLE).insert(SEED_DATA.users);
}
