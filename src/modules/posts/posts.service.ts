import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { errorMessages } from 'src/common/error.messages';
import { connection } from 'src/database/database.module';
import { Category } from 'src/database/entities/category.entity';
import { Posts } from 'src/database/entities/posts.entity';
import { Tag } from 'src/database/entities/tag.entity';
import { User } from 'src/database/entities/user.entity';
import { CreatePostReqDto } from 'src/modules/posts/dtos/post.request.dto';
import {
  PostsResDto,
  USerPostsResDto,
} from 'src/modules/posts/dtos/posts.response.dto';
import { UpdatePostReqDto } from 'src/modules/posts/dtos/update.post.req.dto';
import { logger } from 'src/utils/service-logger';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  userRepo: Repository<User>;
  postRepo: Repository<Posts>;
  categoryRepo: Repository<Category>;
  constructor() {
    this.userRepo = connection.getRepository(User);
    this.postRepo = connection.getRepository(Posts);
  }
  public async createPost(data: CreatePostReqDto, userId: string) {
    const { title, content, isPublished, category, tag } = data;
    const user = await this.userRepo.findOne({
      where: { id: userId },
    });
    const querryRunner = connection.createQueryRunner();
    try {
      querryRunner.connect();
      querryRunner.startTransaction();
      const post = await querryRunner.manager.getRepository(Posts).save({
        title,
        content,
        user: user,
        isPublished,
      });
      const isCategoryExists = await querryRunner.manager
        .getRepository(Category)
        .findOne({ where: { name: category } });
      if (!isCategoryExists)
        throw new BadRequestException(
          'Please enter category from provided values',
        );
      await querryRunner.query(
        `insert into public.post_categories("categoryId","postsId") values (${isCategoryExists.id}, ${post.id})`,
      );
      const createdTag = await querryRunner.manager
        .getRepository(Tag)
        .save({ name: tag });
      await querryRunner.query(
        `insert into public.post_tags("tagId","postsId") values (${createdTag.id}, ${post.id})`,
      );
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

  public async deletePost(userId: string, postId: string) {
    const post = await this.postRepo.findOne({
      where: { id: postId, user: { id: userId } },
    });
    if (!post) throw new NotFoundException(errorMessages.notFound('Post'));
    try {
      await this.postRepo.softDelete({ id: postId, user: { id: userId } });
      return {
        message: 'Post Deleted Successfully',
      };
    } catch (error) {
      logger.error('Error in delete post api', error);
      throw new InternalServerErrorException(
        errorMessages.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
