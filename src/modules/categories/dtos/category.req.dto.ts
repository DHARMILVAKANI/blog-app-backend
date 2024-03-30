import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { Categories } from 'src/common/constant';

export class CategoryReqDto {
  @ApiProperty({ enum: Categories })
  @IsEnum(Categories)
  title: Categories;
}
