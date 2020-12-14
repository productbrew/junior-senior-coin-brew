import React, { useState, useContext } from 'react';
import { createClient, Provider, dedupExchange, fetchExchange } from 'urql';
import { offlineExchange } from '@urql/exchange-graphcache';
import schema from './graphql/schema.json';
import { devtoolsExchange } from '@urql/devtools';
import { MeDocument, MeQuery, VerifyOtpMutation } from './graphql/client';
import { getToken } from './graphql/token';
import { simplePagination } from '@urql/exchange-graphcache/extras';

export const cache = offlineExchange({
  // TODO: check typescript
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  schema,
  resolvers: {
    Query: {
      coins: simplePagination(),
    },
  },
  updates: {
    Mutation: {
      verifyOtp: (result, _args, cache) => {
        cache.updateQuery<MeQuery>({ query: MeDocument }, (data) => {
          const typedResult = result as VerifyOtpMutation;

          return {
            __typename: 'Query',
            me: typedResult.verifyOtp.user,
          };
        });
      },
    },
  },
});

/**
 * URQL client
 */
export function createUrqlClient() {
  return createClient({
    url: 'http://localhost:3000/graphql',
    fetchOptions: () => {
      const token = getToken();

      return {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      };
    },
    exchanges: [devtoolsExchange, dedupExchange, cache, fetchExchange],
  });
}

const UrqlClientContext = React.createContext<
  { resetClient: () => void } | undefined
>(undefined);

/**
 * Reset cache hook
 */
export function useClientReset() {
  const resetClientState = useContext(UrqlClientContext);

  if (resetClientState === undefined) {
    throw new Error(
      'useClientReset must be used within a UrqlClientContextProvider'
    );
  }

  return resetClientState.resetClient;
}

interface GraphQLProviderProps {
  children: React.ReactNode;
}

export function UrqlProvider(props: GraphQLProviderProps) {
  const [client, setClient] = useState(createUrqlClient());

  function resetClient() {
    setClient(createUrqlClient());
  }

  return (
    <UrqlClientContext.Provider value={{ resetClient }}>
      <Provider value={client}>{props.children}</Provider>
    </UrqlClientContext.Provider>
  );
}
