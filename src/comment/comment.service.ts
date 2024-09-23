import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { TABLES } from 'src/common/constants';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';

@Injectable()
export class CommentService {
  constructor(@InjectConnection() private readonly knex: Knex) { }

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    try {
      const { user_id, article_id, content } = createCommentDto;
      const [createdComment] = await this.knex(TABLES.COMMENTS)
        .insert({
          user_id,
          article_id,
          content,
        })
        .returning('*');

      return createdComment;
    }
    catch (err) {
      console.error(err);
      throw new InternalServerErrorException('Comment creation failed');
    }
  }

  async findOne(id: number): Promise<Comment> {
    try {
      const comment = await this.knex(TABLES.COMMENTS)
        .where({ id })
        .first();

      if (!comment) {
        throw new NotFoundException('Comment not found');
      }

      return comment;
    }
    catch (err) {
      console.error(err);
      throw new InternalServerErrorException('Comment find failed')
    }
  }
}
