import emailToName from 'email-to-name';
import { mutationType, stringArg, nonNull } from '@nexus/schema';
import { logger } from '@junior-senior-coin-brew/logger';
import { sendOTPEmail } from '@junior-senior-coin-brew/email';
import {
  generateAccessToken,
  generateOTP,
} from '@junior-senior-coin-brew/auth';
import { environment } from '../../environments/environment';
import { AuthPayload } from './user';

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
          await user.save();

          const accessToken = generateAccessToken(
            user._id.toHexString(),
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
            logger.error(error.message);
            return false;
          }
        }

        try {
          const nameFromEmail = String(emailToName.process(args.email));

          const user = new ctx.db.user({
            email: args.email,
            token: token,
            name: nameFromEmail,
          });

          await user.save();

          sendOTPEmail(args.email, token);

          return true;
        } catch (error) {
          logger.error(error.message);
          return false;
        }
      },
    });
  },
});
