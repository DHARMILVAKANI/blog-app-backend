import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Categories } from 'src/common/constant';

export class CreatePostReqDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  isPublished: boolean;

  @ApiProperty({ enum: Categories })
  @IsNotEmpty()
  @IsEnum(Categories)
  @IsArray()
  category: Categories;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  tag: string;
}
