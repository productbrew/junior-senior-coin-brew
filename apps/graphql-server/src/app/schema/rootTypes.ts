import { User as UserDocument } from '@junior-senior-coin-brew/database';
import { Coin as CoinType } from '@junior-senior-coin-brew/nomics-client';
import { Market as MarketType } from '@junior-senior-coin-brew/nomics-client';
import { MarketCupHistory as MarketCupHistoryType } from '@junior-senior-coin-brew/nomics-client';

export type User = UserDocument;
export type Coin = CoinType;
export type Market = MarketType;
export type MarketCupHistory = MarketCupHistoryType;
