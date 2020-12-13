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

export type Query = {
  __typename: 'Query';
  me: User;
  hello: Maybe<Scalars['String']>;
  coins: Maybe<Array<Coin>>;
};

export type QueryHelloArgs = {
  name: Maybe<Scalars['String']>;
};

export type Coin = {
  __typename: 'Coin';
  id: Scalars['ID'];
  currency: Scalars['String'];
  name: Scalars['String'];
  logoUrl: Scalars['String'];
  price: Scalars['String'];
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

export type CoinsQueryVariables = Exact<{ [key: string]: never }>;

export type CoinsQuery = { __typename: 'Query' } & {
  coins: Maybe<
    Array<
      { __typename: 'Coin' } & Pick<
        Coin,
        'id' | 'name' | 'price' | 'currency' | 'logoUrl'
      >
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
  query coins {
    coins {
      id
      name
      price
      currency
      logoUrl
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
