import { nomicsClient } from './client';

export function getMarketCupHistory(
  start: Date = new Date('2017-10-01'),
  end: Date = new Date()
) {
  return nomicsClient.get<MarketCupHistory[]>(
    `/market-cap/history?start=${start.toISOString()}&end=${end.toISOString()}`
  );
}

export type MarketCupHistory = {
  timestamp: string;
  market_cap: string;
};
