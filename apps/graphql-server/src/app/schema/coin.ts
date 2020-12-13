import { extendType, objectType, nonNull } from '@nexus/schema';
import { getCurrenciesTickers } from '@junior-senior-coin-brew/nomics-client';

export const Coin = objectType({
  name: 'Coin',
  nonNullDefaults: {
    output: true,
  },
  definition(t) {
    t.id('id');
    t.string('currency');
    t.string('name');
    t.string('logoUrl', {
      resolve: (root) => root.logo_url,
    });
    t.string('price');
  },
});

export const CoinQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('coins', {
      type: nonNull(Coin),
      resolve: async () => {
        const coins = await getCurrenciesTickers(50);

        return coins.data;
      },
    });
  },
});
