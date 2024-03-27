import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Public()
  @ApiOperation({ summary: 'Health api' })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
