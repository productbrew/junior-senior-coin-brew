import Fastify from 'fastify';
import mercurius from 'mercurius';

import { schema } from './app/schema';

const app = Fastify();

app.register(mercurius, {
  schema,
  graphiql: 'playground',
});

app.listen(3000);
