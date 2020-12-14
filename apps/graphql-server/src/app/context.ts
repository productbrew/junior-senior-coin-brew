import { UserModel } from '@junior-senior-coin-brew/database';
import { FastifyRequest } from 'fastify';
import { validateAccessToken } from '@junior-senior-coin-brew/auth';
import {
  getCurrenciesTickers,
  getMarkets,
  getMarketCupHistory,
} from '@junior-senior-coin-brew/nomics-client';
import { environment } from '../environments/environment';

export type Context = {
  userId: string | null;
  db: {
    user: typeof UserModel;
  };
  nomics: {
    getCurrenciesTickers: typeof getCurrenciesTickers;
    getMarkets: typeof getMarkets;
    getMarketCupHistory: typeof getMarketCupHistory;
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
    nomics: {
      getCurrenciesTickers,
      getMarkets,
      getMarketCupHistory,
    },
  };
}
