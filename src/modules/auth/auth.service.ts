import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { LoginType } from 'src/common/constant';
import { errorMessages } from 'src/common/error.messages';
import { ITokenPayload } from 'src/common/interface/token.payload.interface';
import { connection } from 'src/database/database.module';
import { LoginHistory } from 'src/database/entities/login.history.entity';
import { User } from 'src/database/entities/user.entity';
import { UserPassword } from 'src/database/entities/user.password.entity';
import { LoginReqDto } from 'src/modules/auth/dtos/login.dto';
import { LoginParamsDto } from 'src/modules/auth/dtos/login.params.dto';
import { SignUpReqDto } from 'src/modules/auth/dtos/signup.dto';
import { UserResponseDto } from 'src/modules/auth/dtos/user.response.dto';
import { createHash, compareHash } from 'src/utils/hash';
import { creatToken } from 'src/utils/token.service';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  userRepo: Repository<User>;
  loginHistoryRepo: Repository<LoginHistory>;
  constructor() {
    this.userRepo = connection.getRepository(User);
    this.loginHistoryRepo = connection.getRepository(LoginHistory);
  }
  async signUp(data: SignUpReqDto) {
    const { email, firstName, lastName, password, loginType } = data;
    const userExist = await this.userRepo.findOne({
      where: { email: data.email },
    });
    if (userExist) {
      throw new BadRequestException(errorMessages.EMAIL_ALREADY_REGISTERED);
    }
    const querrRunner = connection.createQueryRunner();
    try {
      querrRunner.connect();
      querrRunner.startTransaction();
      const user = await querrRunner.manager.getRepository(User).save({
        firstName,
        lastName,
        email,
      });
      const hashedPassword = createHash(password);
      await querrRunner.manager.getRepository(UserPassword).save({
        passwordHash: hashedPassword,
        user,
      });
      const payload: ITokenPayload = {
        userId: user.id,
        email: user.email,
      };
      const { accessToken, refreshToken } = creatToken(payload);
      await querrRunner.manager.getRepository(LoginHistory).save({
        token: accessToken,
        user,
        type: loginType || LoginType.WEB,
      });
      await querrRunner.commitTransaction();
      return {
        data: {
          accessToken,
          refreshToken,
          ...new UserResponseDto(user),
        },
      };
    } catch (error) {
      querrRunner.rollbackTransaction();
      throw new InternalServerErrorException(
        errorMessages.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(data: LoginReqDto, params: LoginParamsDto) {
    const { email, password } = data;
    const useExist = await this.userRepo.findOne({
      where: { email },
      relations: ['userPassword'],
      select: {
        userPassword: { passwordHash: true },
      },
    });
    if (
      !useExist ||
      !compareHash(password, useExist.userPassword.passwordHash)
    ) {
      throw new BadRequestException(
        errorMessages.invalidData('email and password'),
      );
    }
    return await this.creatUserSession(useExist, params);
  }

  async creatUserSession(user: User, params: LoginParamsDto) {
    await this.loginHistoryRepo.softDelete({
      user: { id: user.id },
    });
    const querrRunner = connection.createQueryRunner();
    try {
      querrRunner.connect();
      querrRunner.startTransaction();
      const payload: ITokenPayload = {
        userId: user.id,
        email: user.email,
      };
      const { accessToken, refreshToken } = creatToken(payload);
      await querrRunner.manager.getRepository(LoginHistory).save({
        token: accessToken,
        user,
        type: params.loginType || LoginType.WEB,
      });
      await querrRunner.commitTransaction();
      return {
        data: {
          accessToken,
          refreshToken,
          ...new UserResponseDto(user),
        },
      };
    } catch (error) {
      querrRunner.rollbackTransaction();
      throw new InternalServerErrorException(
        errorMessages.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
