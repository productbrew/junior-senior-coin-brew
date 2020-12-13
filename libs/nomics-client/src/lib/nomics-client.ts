import Axios from 'axios';
const NOMICS_URL = 'https://api.nomics.com/v1';
const NOMICS_KEY = 'a59ba9a2cab3c6235285bf694f9d5284';

const client = Axios.create({
  baseURL: NOMICS_URL,
  params: {
    key: NOMICS_KEY,
  },
});

type CoinChange = {
  volume: string;
  price_change: string;
  price_change_pct: string;
  volume_change: string;
  volume_change_pct: string;
  market_cap_change: string;
  market_cap_change_pct: string;
};

export type Coin = {
  id: string;
  currency: string;
  symbol: string;
  name: string;
  logo_url: string;
  status: string;
  price: string;
  price_date: string;
  price_timestamp: string;
  circulating_supply: string;
  max_supply: string;
  market_cap: string;
  num_exchanges: string;
  num_pairs: string;
  num_pairs_unmapped: string;
  first_candle: string;
  first_trade: string;
  first_order_book: string;
  rank: string;
  rank_delta: string;
  high: string;
  high_timestamp: string;
  '1d': CoinChange;
  '7d': CoinChange;
  '30d': CoinChange;
  '365d': CoinChange;
  ytd: CoinChange;
};

export function getCurrenciesTickers(perPage = 10, page = 1) {
  return client.get<Coin[]>(
    `/currencies/ticker?per-page=${perPage}&page=${page}`
  );
}
