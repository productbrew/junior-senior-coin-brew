import emailToName from 'email-to-name';
import { mutationType, objectType, stringArg, nonNull } from '@nexus/schema';
import { logger } from '@junior-senior-coin-brew/logger';
import { sendOTPEmail } from '@junior-senior-coin-brew/email';
import {
  generateAccessToken,
  generateOTP,
} from '@junior-senior-coin-brew/auth';
import { environment } from '../environments/environment';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.id('id');
    t.string('name');
    t.string('email');
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

export const authQuery = mutationType({
  definition(t) {
    t.field('verifyOtp', {
      type: nonNull(AuthPayload),
      args: {
        token: nonNull(stringArg()),
      },
      resolve: async (_root, args, ctx) => {
        const user = await ctx.db.user.findOne({ token: args.token });

        if (user) {
          user.token = null;
          user.save();

          const accessToken = generateAccessToken(
            user._id,
            environment.JWT_SECRET
          );

          return {
            user,
            accessToken,
          };
        }

        throw new Error('Invalid or used OTP token');
      },
    });

    t.field('login', {
      type: nonNull('Boolean'),
      args: {
        email: nonNull(stringArg()),
      },
      resolve: async (_root, args, ctx) => {
        const token = generateOTP();
        const user = await ctx.db.user.findOne({ email: args.email });

        if (user) {
          try {
            user.token = token;
            await user.save();

            sendOTPEmail(args.email, token);

            return true;
          } catch (error) {
            logger.error(error);
            return false;
          }
        }

        try {
          const nameFromEmail = emailToName.process(args.email);

          await ctx.db.user.create({
            email: args.email,
            token: token,
            name: nameFromEmail,
          });

          sendOTPEmail(args.email, token);

          return true;
        } catch (error) {
          logger.error(error);
          return false;
        }
      },
    });
  },
});
