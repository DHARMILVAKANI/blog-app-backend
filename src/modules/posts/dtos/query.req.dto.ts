import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { Categories } from 'src/common/constant';

export class PostQueryReqDto {
  @ApiPropertyOptional({ enum: Categories })
  @IsEnum(Categories)
  @IsOptional()
  category: Categories;
}
