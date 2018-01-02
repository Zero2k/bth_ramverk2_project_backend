import express from 'express';
import bodyParser from 'body-parser';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

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

app.use(bodyParser.json());
app.use(authenticateUser);
app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: constants.GRAPHQL_PATH,
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

app.listen(constants.PORT, (err) => {
  if (err) {
    console.error(err);
  }

  console.log(`GraphQL server running on port ${constants.PORT}.`);
});
