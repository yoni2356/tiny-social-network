import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries
  await knex('users').insert([
    { name: 'John Smith', email: 'john@gmail.com' },
    { name: 'Jane Aurora', email: 'jane@yahoo.com' },
    { name: 'Bob Bera', email: 'bob.bera@hotmail.com' },
  ]);
}
