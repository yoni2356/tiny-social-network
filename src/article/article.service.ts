import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';
import { Article } from './entities/article.entity';
import { DATABASE_NAMES } from 'src/common/constants';

@Injectable()
export class ArticleService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const [createdArticle] = await this.knex(DATABASE_NAMES.ARTICLES)
      .insert(createArticleDto)
      .returning('*');

    return createdArticle;
  }

  async findOne(id: number): Promise<Article> {
    return await this.knex(DATABASE_NAMES.ARTICLES).where({ id }).first();
  }
}