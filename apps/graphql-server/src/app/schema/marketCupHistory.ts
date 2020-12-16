import { extendType, objectType, nonNull } from '@nexus/schema';

export const MarketCupHistory = objectType({
  name: 'MarketCupHistory',
  nonNullDefaults: {
    output: true,
  },
  definition(t) {
    t.id('id', {
      resolve: (root) => `${root.timestamp}-${root.market_cap}`,
    });
    t.string('timestamp');
    t.string('value', {
      resolve: (root) => root.market_cap,
    });
  },
});

export const MarketCupHistoryQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('marketCupHistory', {
      type: nonNull(MarketCupHistory),
      resolve: async (_root, _args, ctx) => {
        const marketCupHistory = await ctx.nomics.getMarketCupHistory();

        return marketCupHistory.data;
      },
    });
  },
});
