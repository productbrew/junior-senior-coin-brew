import { objectType, nonNull } from '@nexus/schema';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.field('id', {
      type: nonNull('ID'),
      resolve: (root) => root._id.toHexString(),
    });
    t.field('name', {
      type: nonNull('String'),
    });
    t.field('email', {
      type: nonNull('String'),
    });
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
