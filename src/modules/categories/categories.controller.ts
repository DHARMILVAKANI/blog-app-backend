import { Controller, Post, Version, Body } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CategoryReqDto } from 'src/modules/categories/dtos/category.req.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
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
  async addCategory(@Body() data: CategoryReqDto) {
    return this.categoriesService.addCategory(data);
  }
}
