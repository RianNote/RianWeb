import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
} from 'graphql-tools';
import chatSchema from './Chat/ChatSchema'
import { resolvers } from '../resolvers/resolvers.js';

const RootQuery = `
  type Query {
     chatContents(projectid: String!): [Message]
  }

  type Mutation {
     sendMessage(projectid: String!, name: String!, content: String!, date: String!): Message
  }

  type Subscription {
     chatSubscription(projectid: String!): Message
  }
`

const SchemaDefinition = `
  schema {
     query: Query
     mutation: Mutation
     subscription: Subscription
  }
`;

const schema = makeExecutableSchema({ 
  typeDefs: [SchemaDefinition, RootQuery, chatSchema], 
  resolvers 
});
export { schema }