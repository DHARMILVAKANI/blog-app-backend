import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Posts } from 'src/database/entities/posts.entity';
import { UserResponseDto } from 'src/modules/auth/dtos/user.response.dto';

export class PostsResDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  isPublished: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  author: UserResponseDto;

  constructor(data: Posts) {
    this.id = data.id;
    this.title = data.title;
    this.content = data.content;
    this.isPublished = data.isPublished;
    this.createdAt = data.createdAt;
    this.author = data.user;
  }
}

export class USerPostsResDto extends PostsResDto {
  constructor(data: Posts) {
    super(data);
    delete this.author; // Exclude author property
  }
}
