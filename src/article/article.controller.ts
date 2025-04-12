import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ArticleService } from '../article/article.service';
import { CreateArticleDto } from 'src/article/dto/create-article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  async create(@Body() createArticleDto: CreateArticleDto) {
    return await this.articleService.createArticle(createArticleDto);
  }

  @Get()
  async getAllArticles() {
    return await this.articleService.getAllArticles();
  }

  @Get(':id')
  async getArticleById(@Param('id') id: number) {
    return await this.articleService.getArticleById(id);
  }
}

