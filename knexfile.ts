import * as dotenv from 'dotenv';
import { Knex } from 'knex';

dotenv.config();

type Config = {
  [key: string]: Knex.Config
}

const config: Config = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      tableName: 'migrations',
      directory: './src/knex/migrations',
    },
    seeds: {
      directory: './src/knex/seeds',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};

export default config;