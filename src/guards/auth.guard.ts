import { Repository } from 'typeorm';
import {
  ForbiddenException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { errorMessages } from 'src/common/error.messages';
import { User } from 'src/database/entities/user.entity';
import { IS_PUBLIC } from 'src/decorators/public.decorator';
import { verifyToken } from 'src/utils/token.service';
import { connection } from 'src/database/database.module';

@Injectable()
export class AuthGuard implements CanActivate {
  userRepo: Repository<User>;
  constructor(private readonly reflactor: Reflector) {
    this.userRepo = connection.getRepository(User);
  }
  async canActivate(context: ExecutionContext) {
    const request = context.getArgByIndex(0);
    const isPublic = this.reflactor.getAllAndOverride<boolean>(IS_PUBLIC, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const Authorization = request.headers['authorization'];
    if (!Authorization) {
      throw new UnauthorizedException(errorMessages.INVALID_TOKEN);
    }
    const token = Authorization.replace('Bearer ', '');
    if (!token && !token.trim()) {
      throw new UnauthorizedException(errorMessages.INVALID_TOKEN);
    }
    const tokenData = await verifyToken(token);
    console.log(tokenData);
    if (tokenData.error) {
      throw new UnauthorizedException(tokenData.error);
    }
    if (!tokenData.data && !tokenData.data.id && !tokenData.data.email) {
      throw new UnauthorizedException(errorMessages.INVALID_TOKEN);
    }
    const user = await this.userRepo.findOne({
      where: { id: tokenData.data.id, loginHistory: { token } },
      relations: ['loginHistory'],
    });
    if (!user) {
      throw new ForbiddenException();
    }
    request.userId = tokenData.data.userId;
    request.email = tokenData.data.email;
    return true;
  }
}
