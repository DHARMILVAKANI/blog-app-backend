import { envConfig } from 'src/config/env.config';
import { logger } from 'src/utils/service-logger';
import { sign, verify } from 'jsonwebtoken';
import { ITokenPayload } from 'src/common/interface/token.payload.interface';
import { errorMessages } from 'src/common/error.messages';

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

export function verifyToken(token: string): Promise<any> {
  const secretKey = envConfig.app.secretKey;
  return new Promise((resolve) => {
    verify(token, secretKey, (error, verifiedJwt) => {
      if (error) {
        return resolve({ error: errorMessages.SESSION_EXPIRED, data: null });
      }
      return resolve({ error: null, data: verifiedJwt });
    });
  });
}
