import express from 'express';
import { createServer } from 'http';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';

import path from 'path';
import cors from 'cors';
import './config/db';
import constants from './config/constants';
import { authenticateUser } from './services/auth';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './graphql/schema')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './graphql/resolvers')));

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();
app.use(cors('*'));
app.use(authenticateUser);

app.use(bodyParser.json());

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: constants.GRAPHQL_PATH,
    subscriptionsEndpoint: `ws://localhost:${constants.PORT}${constants.SUBSCRIPTIONS_PATH}`,
  }),
);

app.use(
  constants.GRAPHQL_PATH,
  graphqlExpress(req => ({
    schema,
    context: {
      user: req.user,
    },
  })),
);

const graphQLServer = createServer(app);

graphQLServer.listen(constants.PORT, (err) => {
  if (err) {
    console.error(err);
  }
  // eslint-disable-next-line
  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema,
      onConnect: async ({ token }, webSocket) => {
        if (token) {
          let user = null;
          try {
            user = jwt.verify(token, constants.JWT_SECRET_ONE);
          } catch (error) {
            user = null;
          }

          if (!user._id) {
            throw new Error('Invalid auth token!');
          }

          return true;
        }
        throw new Error('Missing auth token!');
      },
    },
    {
      server: graphQLServer,
      path: constants.SUBSCRIPTIONS_PATH,
    },
  );

  console.log(`GraphQL server running on port ${constants.PORT}.`);
});
