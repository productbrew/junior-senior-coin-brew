import { makeSchema } from '@nexus/schema';
import { join } from 'path';
import { Query } from './query';
import * as Coin from './coin';
import * as Auth from './auth';

const defaultSrcPath = [process.cwd(), 'apps', 'graphql-server', 'src'];

export const schema = makeSchema({
  types: [Query, Coin, Auth],
  outputs: {
    schema: join(...defaultSrcPath, 'generated', 'schema.graphql'),
    typegen: join(...defaultSrcPath, 'generated', 'typings.ts'),
  },
  typegenAutoConfig: {
    headers: [
      '/* eslint-disable @typescript-eslint/no-empty-interface */',
      '/* eslint-disable @typescript-eslint/ban-types */',
      '/* eslint-disable @typescript-eslint/no-unused-vars */',
    ],
    contextType: 'ctx.Context',
    sources: [
      {
        alias: 'ctx',
        source: join(...defaultSrcPath, 'app', 'context.ts'),
      },
    ],
  },
});
