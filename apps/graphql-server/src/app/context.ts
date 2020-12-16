import { UserModel } from '@junior-senior-coin-brew/database';
import { FastifyRequest } from 'fastify';
import { validateAccessToken } from '@junior-senior-coin-brew/auth';
import {
  getCurrenciesTickers,
  getMarkets,
  getMarketCupHistory,
  Market,
} from '@junior-senior-coin-brew/nomics-client';
import { environment } from '../environments/environment';
import DataLoader from 'dataloader';

const marketLoader = new DataLoader(async (keys: readonly string[]) => {
  const coinMarkets = await getMarkets(keys);

  return keys.map((key) => coinMarkets[key] || Error('Loader not found'));
});

export type Context = {
  userId: string | null;
  loaders: {
    market: DataLoader<string, Market[] | Error, string>;
  };
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
    loaders: {
      market: marketLoader,
    },
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
