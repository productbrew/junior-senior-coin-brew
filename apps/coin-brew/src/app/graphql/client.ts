import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  coins: Maybe<Array<Maybe<Coin>>>;
};


export type QueryHelloArgs = {
  name: Maybe<Scalars['String']>;
};

export type Coin = {
  __typename: 'Coin';
  id: Maybe<Scalars['ID']>;
  currency: Maybe<Scalars['String']>;
  logo_url: Maybe<Scalars['String']>;
  price: Maybe<Scalars['String']>;
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
  id: Maybe<Scalars['ID']>;
  name: Maybe<Scalars['String']>;
  email: Maybe<Scalars['String']>;
  lastLoginTry: Maybe<Scalars['String']>;
};

export type AuthPayload = {
  __typename: 'AuthPayload';
  accessToken: Scalars['String'];
  user: User;
};

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename: 'Query' }
  & { me: (
    { __typename: 'User' }
    & Pick<User, 'id' | 'name' | 'email'>
  ) }
);


export const MeDocument = gql`
    query me {
  me {
    id
    name
    email
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};