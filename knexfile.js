export const development = {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
        tableName: 'migrations',
        directory: './src/migrations',
    },
    seeds: {
        directory: './src/seeds',
    },
};
