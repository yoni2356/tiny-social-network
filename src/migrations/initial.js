export function up(knex) {
  return knex.schema
    .createTable('users', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
    })
    .createTable('articles', (table) => {
      table.increments('id').primary();
      table.integer('author_id').references('users.id').onDelete('CASCADE');
      table.text('body').notNullable();
      table.specificType('tsvector_body', 'tsvector');
      table.timestamps(true, true);
    })
    .createTable('comments', (table) => {
      table.increments('id').primary();
      table.integer('article_id').references('articles.id').onDelete('CASCADE');
      table.text('content').notNullable();
    });
}

export function down(knex) {
  return knex.schema
    .dropTableIfExists('comments')
    .dropTableIfExists('articles')
    .dropTableIfExists('users');
}
