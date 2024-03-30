import {
  Body,
  Controller,
  Get,
  Post,
  Version,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreatePostReqDto } from 'src/modules/posts/dtos/post.request.dto';
import { CurrentUser } from 'src/decorators/current.user.decorator';
import { ICurrentUser } from 'src/common/interface/current.user.interface';
import {
  PostsResDto,
  USerPostsResDto,
} from 'src/modules/posts/dtos/posts.response.dto';
import { UpdatePostReqDto } from 'src/modules/posts/dtos/update.post.req.dto';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({
    summary: 'Create post',
    description: 'This api can be used to create posts',
  })
  @ApiOkResponse({
    schema: {
      example: {
        message: 'Post created successfully',
      },
    },
  })
  @ApiBearerAuth('Authorization')
  @Version('1')
  @Post('/')
  async createPost(
    @Body() data: CreatePostReqDto,
    @CurrentUser() user: ICurrentUser,
  ) {
    return this.postsService.createPost(data, user.userId);
  }

  @ApiOperation({
    summary: 'Get all posts',
    description: 'This api can be used to get all posts',
  })
  @ApiOkResponse({
    type: PostsResDto,
  })
  @ApiBearerAuth('Authorization')
  @Version('1')
  @Get()
  async getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @ApiOperation({
    summary: 'Get post by userId',
    description: 'This api can be used to get posts for specific user',
  })
  @ApiBearerAuth('Authorization')
  @Version('1')
  @Get('/user/post')
  async getPostByUserId(@CurrentUser() currentUser: ICurrentUser) {
    return this.postsService.getPostByUserId(currentUser.userId);
  }

  @ApiOperation({
    summary: 'Update post',
    description: 'This api can be used to update post for a user',
  })
  @ApiOkResponse({
    type: USerPostsResDto,
  })
  @ApiBearerAuth('Authorization')
  @Version('1')
  @Patch('/user/:postId')
  async updateUserPost(
    @Param('postId') postId: string,
    @CurrentUser() currentUser: ICurrentUser,
    @Body() data: UpdatePostReqDto,
  ) {
    return this.postsService.updateUserPost(currentUser.userId, postId, data);
  }

  @ApiOperation({
    summary: 'Delete post',
    description: 'This api can be used to delete a post',
  })
  @ApiOkResponse({
    schema: {
      example: {
        message: 'Post Deleted Successfully',
      },
    },
  })
  @ApiBearerAuth('Authorization')
  @Version('1')
  @Delete('/user/:postId')
  async deletePost(
    @Param('postId') postId: string,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return this.postsService.deletePost(currentUser.userId, postId);
  }
}
