import { Body, Controller, Post, Version } from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePostReqDto } from 'src/modules/posts/dtos/post.request.dto';
import { CurrentUser } from 'src/decorators/current.user.decorator';
import { ICurrentUser } from 'src/common/interface/current.user.interface';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({
    summary: 'Create post',
    description: 'This api can be used to create posts',
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
}
