import { queryType, stringArg } from '@nexus/schema';

export const Query = queryType({
  definition(t) {
    t.string('hello', {
      args: {
        name: stringArg(),
      },
      resolve: async (_parent, args) => {
        return `Hello ${args.name || 'World'} !`;
      },
    });
  },
});
