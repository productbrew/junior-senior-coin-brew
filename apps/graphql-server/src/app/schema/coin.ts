import { extendType, objectType, nonNull } from '@nexus/schema';
import { Market } from './market';

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
    t.list.field('market', {
      type: Market,
      resolve: async (root, arg, ctx) => {
        const market = await ctx.nomics.getMarkets(root.currency);

        return market.data;
      },
    });
  },
});

export const CoinQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('coins', {
      type: nonNull(Coin),
      args: {
        limit: nonNull('Int'),
        skip: nonNull('Int'),
      },
      resolve: async (_root, args, ctx) => {
        const coins = await ctx.nomics.getCurrenciesTickers(
          args.limit,
          args.skip
        );

        return coins.data;
      },
    });
  },
});
