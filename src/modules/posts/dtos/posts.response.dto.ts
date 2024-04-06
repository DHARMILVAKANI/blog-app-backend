import { ApiProperty } from '@nestjs/swagger';
import { Categories } from 'src/common/constant';
import { Category } from 'src/database/entities/category.entity';
import { Posts } from 'src/database/entities/posts.entity';
import { UserResponseDto } from 'src/modules/auth/dtos/user.response.dto';

class CategoryDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ enum: Categories })
  name: string;

  constructor(data: Category) {
    this.id = data.id;
    this.name = data.name;
  }
}
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
  category: CategoryDto[];

  @ApiProperty()
  author: UserResponseDto;

  constructor(data: Posts) {
    this.id = data.id;
    this.title = data.title;
    this.content = data.content;
    this.isPublished = data.isPublished;
    this.createdAt = data.createdAt;
    this.category = data?.category?.map((val) => new CategoryDto(val));
    this.author = data.user;
  }
}

export class USerPostsResDto extends PostsResDto {
  constructor(data: Posts) {
    super(data);
    delete this.author; // Exclude author property
  }
}
