import { objectType } from '@nexus/schema';

export const Market = objectType({
  name: 'Market',
  nonNullDefaults: {
    output: true,
  },
  definition(t) {
    t.string('base', {
      resolve: (root) => root.base,
    });

    t.string('exchange', {
      resolve: (root) => root.exchange,
    });

    t.string('quote', {
      resolve: (root) => root.quote,
    });
  },
});
