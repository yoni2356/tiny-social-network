import * as dotenv from 'dotenv';
import { Knex } from 'knex';

dotenv.config();

type Config = {
    [key: string]: Knex.Config
}

export const config: Config = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      tableName: 'migrations',
      directory: './src/migrations',
    },
    seeds: {
      directory: './src/seeds',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};
