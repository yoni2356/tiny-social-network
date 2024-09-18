import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';
import { CommentModule } from './comment/comment.module';
import { DatabaseModule } from './database.module';

@Module({
  imports: [DatabaseModule, UserModule, ArticleModule, CommentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
