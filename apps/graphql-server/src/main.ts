import Fastify from 'fastify';
import mercurius from 'mercurius';
import { schema } from './app/schema';
import { environment } from './environments/environment';

const app = Fastify({
  logger: {
    prettyPrint: !environment.production,
  },
});

app.register(mercurius, {
  schema,
  graphiql: 'playground',
});

app.listen(3000);
