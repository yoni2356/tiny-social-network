import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';

@Injectable()
export class ArticleService {
  create(createArticleDto: CreateArticleDto) {
    return 'This action adds a new article';
  }

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
