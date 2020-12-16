import { objectType } from '@nexus/schema';

export const Market = objectType({
  name: 'Market',
  nonNullDefaults: {
    output: true,
  },
  definition(t) {
    t.id('id', {
      resolve: (root) => {
        return `${root.market}-${root.base}-${root.exchange}-${root.quote}`;
      },
    });
    t.string('market');
    t.string('base');
    t.string('exchange');
    t.string('quote');
  },
});
