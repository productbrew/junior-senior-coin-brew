import { Types } from 'mongoose';
import { nonNull, queryType, stringArg } from '@nexus/schema';
import { logger } from '@junior-senior-coin-brew/logger';
import { User } from './user';

export const Query = queryType({
  definition(t) {
    t.field('me', {
      type: nonNull(User),
      resolve: async (_root, _args, ctx) => {
        const user = await ctx.db.user.findOne(Types.ObjectId(ctx.userId));

        if (!user) {
          logger.error(`Not authorized - ${ctx.userId}`);
          throw new Error('Not authorized!');
        }

        return user;
      },
    });

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
