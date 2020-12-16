/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as RootTypes from "./../app/schema/rootTypes"
import * as ctx from "./../app/context"





declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  AuthPayload: { // root type
    accessToken: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  Coin: RootTypes.Coin;
  HealthCheck: { // root type
    id?: string | null; // ID
    name: string; // String!
  }
  Market: RootTypes.Market;
  MarketCupHistory: RootTypes.MarketCupHistory;
  Mutation: {};
  Query: {};
  User: RootTypes.User;
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  AuthPayload: { // field return type
    accessToken: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  Coin: { // field return type
    currency: string; // String!
    id: string; // ID!
    logoUrl: string; // String!
    markets: NexusGenRootTypes['Market'][]; // [Market!]!
    name: string; // String!
    price: string; // String!
  }
  HealthCheck: { // field return type
    id: string | null; // ID
    name: string; // String!
  }
  Market: { // field return type
    base: string; // String!
    exchange: string; // String!
    id: string; // ID!
    market: string; // String!
    quote: string; // String!
  }
  MarketCupHistory: { // field return type
    id: string; // ID!
    timestamp: string; // String!
    value: string; // String!
  }
  Mutation: { // field return type
    login: boolean; // Boolean!
    verifyOtp: NexusGenRootTypes['AuthPayload']; // AuthPayload!
  }
  Query: { // field return type
    coins: NexusGenRootTypes['Coin'][] | null; // [Coin!]
    hello: NexusGenRootTypes['HealthCheck'] | null; // HealthCheck
    marketCupHistory: NexusGenRootTypes['MarketCupHistory'][] | null; // [MarketCupHistory!]
    me: NexusGenRootTypes['User']; // User!
  }
  User: { // field return type
    email: string; // String!
    id: string; // ID!
    lastLoginTry: string | null; // String
    name: string; // String!
  }
}

export interface NexusGenFieldTypeNames {
  AuthPayload: { // field return type name
    accessToken: 'String'
    user: 'User'
  }
  Coin: { // field return type name
    currency: 'String'
    id: 'ID'
    logoUrl: 'String'
    markets: 'Market'
    name: 'String'
    price: 'String'
  }
  HealthCheck: { // field return type name
    id: 'ID'
    name: 'String'
  }
  Market: { // field return type name
    base: 'String'
    exchange: 'String'
    id: 'ID'
    market: 'String'
    quote: 'String'
  }
  MarketCupHistory: { // field return type name
    id: 'ID'
    timestamp: 'String'
    value: 'String'
  }
  Mutation: { // field return type name
    login: 'Boolean'
    verifyOtp: 'AuthPayload'
  }
  Query: { // field return type name
    coins: 'Coin'
    hello: 'HealthCheck'
    marketCupHistory: 'MarketCupHistory'
    me: 'User'
  }
  User: { // field return type name
    email: 'String'
    id: 'ID'
    lastLoginTry: 'String'
    name: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    login: { // args
      email: string; // String!
    }
    verifyOtp: { // args
      token: string; // String!
    }
  }
  Query: {
    coins: { // args
      limit: number; // Int!
      skip: number; // Int!
    }
    hello: { // args
      name: string; // String!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: ctx.Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}