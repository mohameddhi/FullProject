import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { ArticleRepository } from 'src/shared/repositories/article.repository';
import { CreateArticleDto } from 'src/article/dto/create-article.dto';
import { Article } from 'src/shared/schema/article';

@Injectable()
export class ArticleService {
  constructor(
    private readonly articleRepository: ArticleRepository,
  ) {}

  async createArticle(createArticleDto: CreateArticleDto): Promise<{
    message: string;
    result: Article;
    success: boolean;
  }> {
    try {
      const newArticle = await this.articleRepository.createArticle(createArticleDto);
      return {
        message: 'Article created successfully',
        result: newArticle,
        success: true,
      };
    } catch (error) {
      throw new BadRequestException('Error creating article', error.message);
    }
  }

  async getAllArticles(): Promise<{ message: string; success: boolean; result: Article[] }> {
    const articles = await this.articleRepository.getAllArticles();
    return {
      message: 'Articles retrieved successfully',
      success: true,
      result: articles,
    };
  }

  async getArticleById(id: number): Promise<{ message: string; success: boolean; result: Article | null }> {
    const article = await this.articleRepository.getArticleById(id);
    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
    return {
      message: 'Article retrieved successfully',
      success: true,
      result: article,
    };
  }
}
