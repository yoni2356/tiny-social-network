import { Module } from '@nestjs/common';
import { KnexModule } from 'nest-knexjs';

@Module({
    imports: [
        KnexModule.forRootAsync({
            useFactory: () => ({
                config: {
                    client: 'pg',
                    connection: process.env.DATABASE_URL,
                    pool: { min: 2, max: 10 },
                    migrations: {
                        tableName: 'migrations',
                        directory: './src/migrations',
                    },
                },
            })
        }),
    ],
    exports: [KnexModule],
})
export class DatabaseModule { }
