import * as Query from './query';
import * as Coin from './coin';
import * as Auth from './auth';
import * as User from './user';
import * as Market from './market';
import * as MarketCupHistory from './marketCupHistory';

export const types = {
  ...Query,
  ...Coin,
  ...Auth,
  ...User,
  ...Market,
  ...MarketCupHistory,
};
