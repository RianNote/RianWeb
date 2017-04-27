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
     sendMessages(chatRoom:Int!, id: Int!, content: String): Message
  }

  type Subscription{
     commentAdded(chatRoom: String!, id: Int!): Message
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