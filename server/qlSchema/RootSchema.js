import {
  makeExecutableSchema,
} from 'graphql-tools';
import ChatSchema from './Chat/ChatSchema'
import { RootResolver } from '../resolvers/RootResolver';
const logger = { log: (e) => console.log(e) }

const typeDefs = `

  type Message {
    name: String!
    content: String!
    date: String!
  }


  type Query {
     chatContents(projectid: String!): [Message]
  }

  type Subscription{
     chatSubscription: Message
  }


  schema {
     query: Query
     subscription: Subscription
  }
`;

const schema = makeExecutableSchema({ 
	typeDefs, 
	RootResolver,
  logger
});

export { schema }