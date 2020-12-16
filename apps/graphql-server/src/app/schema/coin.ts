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

    t.list.field('markets', {
      type: Market,
      resolve: async (root, _arg, ctx) => {
        const markets = await ctx.loaders.market.load(root.currency);

        if (Array.isArray(markets)) {
          return markets;
        }

        throw new Error('No markets found');
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
