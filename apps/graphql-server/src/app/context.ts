import { UserModel } from '@junior-senior-coin-brew/database';
import { FastifyRequest } from 'fastify';
import { validateAccessToken } from '@junior-senior-coin-brew/auth';
import { environment } from '../environments/environment';

export type Context = {
  userId: string | undefined;
  db: {
    user: typeof UserModel;
  };
};

export async function createContext(request: FastifyRequest): Promise<Context> {
  const authorizationToken = String(request.headers['authorization']);
  const accessToken = authorizationToken.replace('Bearer ', '');

  const decodedToken = validateAccessToken(accessToken, environment.JWT_SECRET);

  return {
    userId: decodedToken,
    db: {
      user: UserModel,
    },
  };
}
