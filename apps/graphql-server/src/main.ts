import Fastify, { FastifyRequest } from 'fastify';
import mercurius from 'mercurius';
import cors from 'fastify-cors';
import sgEmail from '@sendgrid/mail';
import { connectToDataBase } from '@junior-senior-coin-brew/database';
import { logger } from '@junior-senior-coin-brew/logger';
import { schema } from './app/schema/schema';
import { environment } from './environments/environment';
import { createContext } from './app/context';

/**
 * Validate config before start!
 */
Object.entries(environment).map(([key, value]) => {
  if (value === undefined) {
    const message = `Missing '${key}' variable`;

    logger.error(message);
    process.exit(1);
  }
});

/**
 * Server instance
 */
const app = Fastify({
  logger: false,
});

app.register(cors);
app.register(mercurius, {
  schema,
  graphiql: 'playground',
  context: (request: FastifyRequest) => {
    return createContext(request);
  },
});

/**
 * Start entrypoint
 */
(async function startGraphQLServer() {
  logger.info('Added Sendgrid API KEY');
  sgEmail.setApiKey(environment.SENDGRID_API_KEY);

  await connectToDataBase(environment.MONGO_DB_CONNECTION_URL);

  await app.listen(3000);
})();
