import Fastify, { FastifyRequest } from 'fastify';
import mercurius from 'mercurius';
import sgEmail from '@sendgrid/mail';
import { connectToDataBase } from '@junior-senior-coin-brew/database';
import { logger } from '@junior-senior-coin-brew/logger';
import { schema } from './app/schema/schema';
import { environment } from './environments/environment';
import { createContext } from './app/context';

const app = Fastify({
  logger: {
    prettyPrint: !environment.production,
  },
});

app.register(mercurius, {
  schema,
  graphiql: 'playground',
  context: (request: FastifyRequest) => {
    return createContext(request);
  },
});

(async function startGraphQLServer() {
  logger.info('Added Sendgrid API KEY');
  sgEmail.setApiKey(environment.SENDGRID_API_KEY);

  await connectToDataBase(environment.MONGO_DB_CONNECTION_URL);

  await app.listen(3000);
})();
