import { Types } from 'mongoose';
import { nonNull, queryType, stringArg, objectType } from '@nexus/schema';
import { logger } from '@junior-senior-coin-brew/logger';
import { User } from './user';

export const HealthCheck = objectType({
  name: 'HealthCheck',
  definition(t) {
    t.id('id');
    t.field('name', {
      type: nonNull('String'),
    });
  },
});

export const Query = queryType({
  definition(t) {
    t.field('me', {
      type: nonNull(User),
      resolve: async (_root, _args, ctx) => {
        if (!ctx.userId) {
          logger.error(`Not authorized - ${ctx.userId}`);
          throw new Error('Not authorized!');
        }

        const user = await ctx.db.user.findOne(Types.ObjectId(ctx.userId));

        if (!user) {
          logger.error(`Not authorized - ${ctx.userId}`);
          throw new Error('Not authorized!');
        }

        return user;
      },
    });

    t.field('hello', {
      type: HealthCheck,
      args: {
        name: nonNull(stringArg()),
      },
      resolve: async (_parent, args) => {
        return {
          id: '1',
          name: `Hello ${args.name || 'World'} !`,
        };
      },
    });
  },
});
