import { Controller, Get, Post, Body, Param, HttpCode } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(+id);
  }

  @Post('find-words')
  @HttpCode(200)
  findArticlesWithWords(@Body('words') words: string[]) {
    return this.articleService.findByWords(words);
  }

  @Post('find-most-common-word')
  @HttpCode(200)
  findArticlesWithMostCommonWord(@Body('word') word: string) {
    return this.articleService.findByMostCommonWord(word);
  }
}
