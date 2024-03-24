import { envConfig } from 'src/config/env.config';
import { logger } from 'src/utils/service-logger';
import { sign } from 'jsonwebtoken';
import { ITokenPayload } from 'src/common/interface/token.payload.interface';

export function creatToken(payload: ITokenPayload, onlyAccess?: boolean) {
  try {
    const accessExpTime = envConfig.app.accessExpTime;
    const secretKey = envConfig.app.secretKey;
    const accessToken = sign(payload, secretKey, { expiresIn: accessExpTime });
    if (onlyAccess) return { accessToken };
    const refreshExpTime = envConfig.app.refreshExpTime;
    const refreshToken = sign(payload, secretKey, {
      expiresIn: refreshExpTime,
    });
    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    logger.error('Error in CreateToken', error);
  }
}
