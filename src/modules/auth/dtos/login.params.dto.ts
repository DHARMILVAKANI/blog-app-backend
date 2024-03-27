import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { LoginType } from 'src/common/constant';
import { ParseOptionalBoolean } from 'src/decorators/boolean-transform.decorator';

export class LoginParamsDto {
  @ApiProperty({ enum: LoginType, default: LoginType.WEB })
  @IsNotEmpty()
  @IsEnum(LoginType, {
    message: `Please provide a correct login type`,
  })
  loginType: LoginType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  @ParseOptionalBoolean()
  remember?: boolean;
}
