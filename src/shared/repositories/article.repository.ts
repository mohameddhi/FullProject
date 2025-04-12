import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../schema/article';

@Injectable()
export class ArticleRepository {
  constructor(
    @InjectRepository(Article) public readonly articleModel: Repository<Article>,
  ) {}

  async createArticle(createArticleDto: Partial<Article>): Promise<Article> {
    const newArticle = this.articleModel.create(createArticleDto);
    return await this.articleModel.save(newArticle);
  }

  async getAllArticles(): Promise<Article[]> {
    return await this.articleModel.find();
  }

  async getArticleById(id: number): Promise<Article | null> {
    return await this.articleModel.findOne({ where: { id } });
  }

}
