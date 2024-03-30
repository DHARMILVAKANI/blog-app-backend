import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { errorMessages } from 'src/common/error.messages';
import { connection } from 'src/database/database.module';
import { Posts } from 'src/database/entities/posts.entity';
import { User } from 'src/database/entities/user.entity';
import { CreatePostReqDto } from 'src/modules/posts/dtos/post.request.dto';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  userRepo: Repository<User>;
  constructor() {
    this.userRepo = connection.getRepository(User);
  }
  public async createPost(data: CreatePostReqDto, userId: string) {
    const { title, content, isPublished } = data;
    const user = await this.userRepo.findOne({
      where: { id: userId },
    });
    const querryRunner = connection.createQueryRunner();
    try {
      querryRunner.connect();
      querryRunner.startTransaction();
      await querryRunner.manager.getRepository(Posts).save({
        title,
        content,
        user: user,
        isPublished,
      });
      querryRunner.commitTransaction();
      return {
        message: 'Post Created Successfully',
      };
    } catch (error) {
      querryRunner.rollbackTransaction();
      throw new InternalServerErrorException(
        errorMessages.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
