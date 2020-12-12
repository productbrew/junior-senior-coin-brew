import { objectType, nonNull } from '@nexus/schema';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.id('id', {
      resolve: (root) => root._id.toHexString(),
    });
    t.string('name');
    t.string('email');
    t.string('lastLoginTry', {
      resolve: (root) => root.updatedAt?.toISOString() ?? null,
    });
  },
});

export const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.field('accessToken', {
      type: nonNull('String'),
    });
    t.field('user', {
      type: nonNull(User),
    });
  },
});
