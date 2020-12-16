import { nomicsClient } from './client';
import _ from 'lodash';

type CoinMarkets = Record<string, Market[]>;

export async function getMarkets(
  base: readonly string[]
): Promise<CoinMarkets> {
  const marketResponse = await nomicsClient.get<Market[]>(
    `/markets?base=${base.join(',')}`
  );

  return _.groupBy(marketResponse.data, 'base');
}

export type Market = {
  exchange: string;
  market: string;
  base: string;
  quote: string;
};
