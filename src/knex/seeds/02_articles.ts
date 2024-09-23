import { Knex } from "knex";
import { Article } from "src/article/entities/article.entity";
import { User } from "src/user/entities/user.entity";

export async function seed(knex: Knex): Promise<void> {
    await knex('articles').del();

    const users: User[] = await knex('users');

    const articles: Omit<Article, 'id'>[] = [
        {
            author_id: users[0].id,
            title: 'The gibberish',
            body: 'hello Ipsum hello is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries'
        },
    ]

    // Inserts seed entries
    await knex('articles').insert(articles.map(article => {
        return {
            ...article,
            tsvector_body: knex.raw('to_tsvector(?)', [article.body])
        }
    }));
};