import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';
import { Article } from './entities/article.entity';
import { TABLES } from 'src/common/constants';

@Injectable()
export class ArticleService {
  constructor(@InjectConnection() private readonly knex: Knex) { }

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    try {
      const { body, author_id, title } = createArticleDto;
      const [createdArticle] = await this.knex(TABLES.ARTICLES)
        .insert({
          author_id,
          title,
          body,
          tsvector_body: this.knex.raw('to_tsvector(?)', [body])
        })
        .returning('*');

      return createdArticle;
    }
    catch (err) {
      console.error(err);
      throw new InternalServerErrorException('Article creation failed');
    }
  }

  async findOne(id: number): Promise<Article> {
    try {
      const article = await this.knex(TABLES.ARTICLES).where({ id }).first();
      if (!article) {
        throw new NotFoundException('Article not found');
      }

      return article;
    }
    catch (err) {
      console.error(err);
      throw new InternalServerErrorException('Article find failed')
    }
  }

  async findByWords(words: string[]): Promise<{
    [word: string]: { article_id: number, offsets: number[] }
  }[]> {
    try {
      const query = words.join(' | ');
      const articles: Article[] = await this.knex(TABLES.ARTICLES)
        .whereRaw('tsvector_body @@ plainto_tsquery(?)', [query]);

      return articles.map((article) => {
        const result = {};
        words.forEach((word) => {
          // Case-insensitive exact word match
          const regex = new RegExp(`\\b${word}\\b`, 'gi');
          const matches = Array.from(article.body.matchAll(regex));

          const offsets = matches.map(match => match.index);

          if (offsets.length) {
            result[word] = { article_id: article.id, offsets };
          }
        });
        return result;
      });
    }
    catch (err) {
      console.error(err);
      throw new InternalServerErrorException('Article find by words failed')
    }
  }

  async findByMostCommonWord(word: string): Promise<{ article_id: number }> {
    try {
      const article: Article = await this.knex(TABLES.ARTICLES)
        .whereRaw('tsvector_body @@ plainto_tsquery(?)', [word])
        .orderByRaw('ts_rank_cd(tsvector_body, plainto_tsquery(?)) DESC', [word])
        .limit(1)
        .first();

      if (!article) {
        throw new NotFoundException('No article contains this word');
      }

      return { article_id: article.id };
    }
    catch (err) {
      console.error(err);
      throw new InternalServerErrorException('Article find failed')
    }
  }
}