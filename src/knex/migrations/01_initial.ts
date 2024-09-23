import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema
        .createTable('users', (table) => {
            table.increments('id').primary();
            table.string('name').notNullable();
            table.string('email').notNullable();
        })
        .createTable('articles', (table) => {
            table.increments('id').primary();
            table.integer('author_id').references('users.id').onDelete('CASCADE');
            table.text('title').notNullable();
            table.text('body').notNullable();
            table.specificType('tsvector_body', 'tsvector');
            table.index('tsvector_body', null, 'GIN');
        })
        .createTable('comments', (table) => {
            table.increments('id').primary();
            table.integer('user_id').references('users.id').onDelete('CASCADE');
            table.integer('article_id').references('articles.id').onDelete('CASCADE');
            table.text('content').notNullable();
        })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema
        .dropTableIfExists('comments')
        .dropTableIfExists('articles')
        .dropTableIfExists('users');
}
