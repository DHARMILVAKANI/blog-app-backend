import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { errorMessages } from 'src/common/error.messages';
import { connection } from 'src/database/database.module';
import { Posts } from 'src/database/entities/posts.entity';
import { User } from 'src/database/entities/user.entity';
import { CreatePostReqDto } from 'src/modules/posts/dtos/post.request.dto';
import {
  PostsResDto,
  USerPostsResDto,
} from 'src/modules/posts/dtos/posts.response.dto';
import { UpdatePostReqDto } from 'src/modules/posts/dtos/update.post.req.dto';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  userRepo: Repository<User>;
  postRepo: Repository<Posts>;
  constructor() {
    this.userRepo = connection.getRepository(User);
    this.postRepo = connection.getRepository(Posts);
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

  public async getAllPosts() {
    const posts = await this.postRepo.find({
      where: {
        isPublished: true,
      },
      relations: ['user'],
      select: {
        user: {
          id: true,
          firstName: true,
          lastName: true,
          profilePicture: true,
        },
      },
    });
    if (!posts.length)
      throw new NotFoundException(errorMessages.notFound('Posts'));

    return {
      data: posts.map((val) => new PostsResDto(val)),
    };
  }

  public async getPostByUserId(userId: string) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ['posts'],
    });
    if (!user) throw new NotFoundException(errorMessages.notFound('User'));
    const userPosts = user.posts.reduce((accumulator, post) => {
      if (post.isPublished) {
        accumulator.push(post);
      }
      return accumulator;
    }, []);
    if (!userPosts.length)
      throw new NotFoundException(errorMessages.notFound('Posts'));

    return {
      data: userPosts.map((val) => new USerPostsResDto(val)),
    };
  }

  public async updateUserPost(
    userId: string,
    postId: string,
    data: UpdatePostReqDto,
  ) {
    const { title, content, isPublished } = data;
    const user = await this.userRepo.findOne({
      where: { id: userId },
    });
    if (!user) throw new NotFoundException(errorMessages.notFound('User'));

    await this.postRepo.update(
      {
        id: postId,
        user: { id: userId },
      },
      {
        title,
        content,
        isPublished,
      },
    );

    const post = await this.postRepo.findOne({ where: { id: postId } });

    return {
      data: new USerPostsResDto(post),
    };
  }
}
