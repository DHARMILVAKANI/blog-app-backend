import { Controller, Version, Post, Body, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';
import { SignUpReqDto } from 'src/modules/auth/dtos/signup.dto';
import { UserResponseDto } from 'src/modules/auth/dtos/user.response.dto';
import { LoginReqDto } from 'src/modules/auth/dtos/login.dto';
import { LoginParamsDto } from 'src/modules/auth/dtos/login.params.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @ApiOperation({
    summary: 'Sign Up Api',
    description: 'Register new user',
  })
  @ApiOkResponse({
    type: UserResponseDto,
  })
  @Version('1')
  @Post('/signup')
  async signUp(@Body() data: SignUpReqDto) {
    return this.authService.signUp(data);
  }

  @Public()
  @ApiOperation({
    summary: 'Login Api',
    description: 'Login a existing user',
  })
  @Version('1')
  @Post('/login')
  async login(@Body() data: LoginReqDto, @Query() params: LoginParamsDto) {
    return this.authService.login(data, params);
  }
}
