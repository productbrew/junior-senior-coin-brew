import { nomicsClient } from './client';

export function getMarkets(base: string) {
  return nomicsClient.get<Market[]>(`/markets?base=${base}`);
}

export type Market = {
  exchange: string;
  market: string;
  base: string;
  quote: string;
};
