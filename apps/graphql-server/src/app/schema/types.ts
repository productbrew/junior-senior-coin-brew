import { Query } from './query';
import * as Coin from './coin';
import * as Auth from './auth';
import * as User from './user';

export const types = {
  Query,
  ...Coin,
  ...Auth,
  ...User,
};
