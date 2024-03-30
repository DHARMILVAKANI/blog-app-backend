import { Repository } from 'typeorm';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Category } from 'src/database/entities/category.entity';
import { connection } from 'src/database/database.module';
import { CategoryReqDto } from 'src/modules/categories/dtos/category.req.dto';
import { errorMessages } from 'src/common/error.messages';
import { logger } from 'src/utils/service-logger';

@Injectable()
export class CategoriesService {
  categoryRepo: Repository<Category>;
  constructor() {
    this.categoryRepo = connection.getRepository(Category);
  }
  async addCategory(data: CategoryReqDto) {
    const { title } = data;
    try {
      await this.categoryRepo.save({ name: title });
    } catch (error) {
      logger.error('Error in add category api', error);
      throw new InternalServerErrorException(
        errorMessages.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
