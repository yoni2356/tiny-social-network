import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';
import { Article } from './entities/article.entity';
import { DATABASE_NAMES } from 'src/common/constants';

@Injectable()
export class ArticleService {
  constructor(@InjectConnection() private readonly knex: Knex) { }

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const { body, author_id, title } = createArticleDto;

    const [createdArticle] = await this.knex('articles')
      .insert({
        author_id,
        title,
        body,
        tsvector_body: this.knex.raw('to_tsvector(?)', [body])
      })
      .returning('*');

    return createdArticle;
  }

  async findOne(id: number): Promise<Article> {
    const article = await this.knex(DATABASE_NAMES.ARTICLES).where({ id }).first();

    if (!article) {
      throw new NotFoundException();
    }

    return article;
  }

  async findByWords(words: string[]): Promise<{
    [word: string]: { article_id: number, offsets: number[] }
  }[]> {
    const query = words.join(' | ');
    const articles: Article[] = await this.knex('articles')
      .whereRaw('tsvector_body @@ plainto_tsquery(?)', [query]);

    return articles.map((article) => {
      const result = {};
      words.forEach((word) => {
        const offsets: number[] = [];
        let index = article.body.indexOf(word);
        while (index !== -1) {
          offsets.push(index);
          index = article.body.indexOf(word, index + 1);
        }
        if (offsets.length) {
          result[word] = { article_id: article.id, offsets };
        }
      });
      return result;
    });
  }
}