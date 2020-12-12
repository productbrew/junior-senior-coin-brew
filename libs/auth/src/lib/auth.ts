import niceware from 'niceware';
import jwt from 'jsonwebtoken';
import { logger } from '@junior-senior-coin-brew/logger';

/**
 * OTP link generator
 */
export function generateOTP(): string {
  return niceware.generatePassphrase(6).join('-');
}

/**
 * Access token generator
 */
export function generateAccessToken(userId: string, secret: string): string {
  const options = {
    expiresIn: '5m',
  };

  const tokenData = {
    userId,
  };

  return jwt.sign(tokenData, secret, options);
}

type DecodedToken = {
  userId: string;
};

/**
 * Access token validator
 */
export function validateAccessToken(
  accessToken: string,
  secret: string
): DecodedToken['userId'] | null {
  try {
    const decodedToken = jwt.verify(accessToken, secret) as DecodedToken;

    return decodedToken.userId;
  } catch (error) {
    logger.error(error.message);
    return null;
  }
}
