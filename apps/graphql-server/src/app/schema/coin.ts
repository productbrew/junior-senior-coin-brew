import { extendType, objectType } from '@nexus/schema';
import { getCurrenciesTickers } from '@junior-senior-coin-brew/nomics-client';

export const Coin = objectType({
  name: 'Coin',
  definition(t) {
    t.id('id');
    t.string('currency');
    t.string('logo_url');
    t.string('price');
  },
});

export const CoinQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('coins', {
      type: Coin,
      resolve: async () => {
        const coins = await getCurrenciesTickers();

        return coins.data;
      },
    });
  },
});
