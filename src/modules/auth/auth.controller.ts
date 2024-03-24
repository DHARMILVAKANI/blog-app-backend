import { Controller, Version, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';
import { SignUpReqDto } from 'src/modules/auth/dtos/signup.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @ApiOperation({
    summary: 'Sign Up Api',
    description: 'Register new user',
  })
  @Version('1')
  @Post('/signup')
  async signUp(@Body() data: SignUpReqDto) {
    return this.authService.signUp(data);
  }
}
