





import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { ArticleRepository } from 'src/shared/repositories/article.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from 'src/shared/schema/article';

@Module({
  imports: [TypeOrmModule.forFeature([Article,ArticleRepository])],
  controllers: [ArticleController],
  providers: [
    ArticleService,
    ArticleRepository,
  ],
   exports: [ArticleService, ArticleRepository],
})
export class ArticleModule {}

