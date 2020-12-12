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
  Coin: { // root type
    currency?: string | null; // String
    id?: string | null; // ID
    logo_url?: string | null; // String
    price?: string | null; // String
  }
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
    currency: string | null; // String
    id: string | null; // ID
    logo_url: string | null; // String
    price: string | null; // String
  }
  Mutation: { // field return type
    login: boolean; // Boolean!
    verifyOtp: NexusGenRootTypes['AuthPayload']; // AuthPayload!
  }
  Query: { // field return type
    coins: Array<NexusGenRootTypes['Coin'] | null> | null; // [Coin]
  }
  User: { // field return type
    email: string | null; // String
    id: string | null; // ID
    lastLoginTry: string | null; // String
    name: string | null; // String
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
    logo_url: 'String'
    price: 'String'
  }
  Mutation: { // field return type name
    login: 'Boolean'
    verifyOtp: 'AuthPayload'
  }
  Query: { // field return type name
    coins: 'Coin'
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