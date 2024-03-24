import { LoginType, Regexes } from './../../../common/constant';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  Max,
} from 'class-validator';
import { Transform } from 'class-transformer';
export class SignUpReqDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  //   @Transform(({ value }) => {
  //     return value
  //       .toLowerCase()
  //       .split(' ')
  //       .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  //       .join(' ');
  //   })
  @Matches(Regexes.alphabats, {
    message: 'Please enter a name containing only alphabats',
  })
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  //   @Transform(({ value }) => {
  //     return value
  //       .toLowerCase()
  //       .split(' ')
  //       .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  //       .join(' ');
  //   })
  @Matches(Regexes.alphabats, {
    message: 'Please enter a name containing only alphabats',
  })
  lastName: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ enum: LoginType, default: LoginType.WEB })
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(LoginType, {
    message: `Please provide a correct login type`,
  })
  loginType: LoginType;
}
