import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type HealthCheck = {
  __typename: 'HealthCheck';
  id: Maybe<Scalars['ID']>;
  name: Scalars['String'];
};

export type Query = {
  __typename: 'Query';
  me: User;
  hello: Maybe<HealthCheck>;
  coins: Maybe<Array<Coin>>;
  marketCupHistory: Maybe<Array<MarketCupHistory>>;
};

export type QueryHelloArgs = {
  name: Scalars['String'];
};

export type QueryCoinsArgs = {
  limit: Scalars['Int'];
  skip: Scalars['Int'];
};

export type Coin = {
  __typename: 'Coin';
  id: Scalars['ID'];
  currency: Scalars['String'];
  name: Scalars['String'];
  logoUrl: Scalars['String'];
  price: Scalars['String'];
  markets: Array<Market>;
};

export type Mutation = {
  __typename: 'Mutation';
  verifyOtp: AuthPayload;
  login: Scalars['Boolean'];
};

export type MutationVerifyOtpArgs = {
  token: Scalars['String'];
};

export type MutationLoginArgs = {
  email: Scalars['String'];
};

export type User = {
  __typename: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  lastLoginTry: Maybe<Scalars['String']>;
};

export type AuthPayload = {
  __typename: 'AuthPayload';
  accessToken: Scalars['String'];
  user: User;
};

export type Market = {
  __typename: 'Market';
  id: Scalars['ID'];
  market: Scalars['String'];
  base: Scalars['String'];
  exchange: Scalars['String'];
  quote: Scalars['String'];
};

export type MarketCupHistory = {
  __typename: 'MarketCupHistory';
  id: Scalars['ID'];
  timestamp: Scalars['String'];
  value: Scalars['String'];
};

export type CoinsQueryVariables = Exact<{
  limit: Scalars['Int'];
  skip: Scalars['Int'];
}>;

export type CoinsQuery = { __typename: 'Query' } & {
  coins: Maybe<
    Array<
      { __typename: 'Coin' } & Pick<
        Coin,
        'id' | 'name' | 'price' | 'currency' | 'logoUrl'
      > & {
          markets: Array<
            { __typename: 'Market' } & Pick<
              Market,
              'id' | 'market' | 'base' | 'exchange' | 'quote'
            >
          >;
        }
    >
  >;
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
}>;

export type LoginMutation = { __typename: 'Mutation' } & Pick<
  Mutation,
  'login'
>;

export type MarketCupHistoryQueryVariables = Exact<{ [key: string]: never }>;

export type MarketCupHistoryQuery = { __typename: 'Query' } & {
  marketCupHistory: Maybe<
    Array<
      { __typename: 'MarketCupHistory' } & Pick<
        MarketCupHistory,
        'id' | 'timestamp' | 'value'
      >
    >
  >;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename: 'Query' } & {
  me: { __typename: 'User' } & Pick<User, 'id' | 'name' | 'email'>;
};

export type UserFragment = { __typename: 'User' } & Pick<
  User,
  'id' | 'name' | 'email'
>;

export type VerifyOtpMutationVariables = Exact<{
  token: Scalars['String'];
}>;

export type VerifyOtpMutation = { __typename: 'Mutation' } & {
  verifyOtp: { __typename: 'AuthPayload' } & Pick<
    AuthPayload,
    'accessToken'
  > & { user: { __typename: 'User' } & UserFragment };
};

export const UserFragmentDoc = gql`
  fragment User on User {
    id
    name
    email
  }
`;
export const CoinsDocument = gql`
  query coins($limit: Int!, $skip: Int!) {
    coins(limit: $limit, skip: $skip) {
      id
      name
      price
      currency
      logoUrl
      markets {
        id
        market
        base
        exchange
        quote
      }
    }
  }
`;

export function useCoinsQuery(
  options: Omit<Urql.UseQueryArgs<CoinsQueryVariables>, 'query'> = {}
) {
  return Urql.useQuery<CoinsQuery>({ query: CoinsDocument, ...options });
}
export const LoginDocument = gql`
  mutation login($email: String!) {
    login(email: $email)
  }
`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
}
export const MarketCupHistoryDocument = gql`
  query marketCupHistory {
    marketCupHistory {
      id
      timestamp
      value
    }
  }
`;

export function useMarketCupHistoryQuery(
  options: Omit<Urql.UseQueryArgs<MarketCupHistoryQueryVariables>, 'query'> = {}
) {
  return Urql.useQuery<MarketCupHistoryQuery>({
    query: MarketCupHistoryDocument,
    ...options,
  });
}
export const MeDocument = gql`
  query me {
    me {
      id
      name
      email
    }
  }
`;

export function useMeQuery(
  options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}
) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
}
export const VerifyOtpDocument = gql`
  mutation verifyOtp($token: String!) {
    verifyOtp(token: $token) {
      accessToken
      user {
        ...User
      }
    }
  }
  ${UserFragmentDoc}
`;

export function useVerifyOtpMutation() {
  return Urql.useMutation<VerifyOtpMutation, VerifyOtpMutationVariables>(
    VerifyOtpDocument
  );
}
