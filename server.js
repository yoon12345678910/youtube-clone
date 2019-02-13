const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schemas');
const resolvers = require('./resolvers');
const models = require('./models');
const passport = require('passport');
const { googleOauth, googleCallback, googleRedirect, googleScope } = require('./passport');
const keys = require('./config/keys');

require('./models/connect');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    models
  }
});

const app = express();

passport.use(googleOauth);
app.use(passport.initialize());
app.get('/auth/google', googleScope);
app.get('/auth/google/callback', googleCallback, googleRedirect);

server.applyMiddleware({ app });

app.listen({ port: keys.port }, () =>
  console.log(`🚀 Server ready at http://localhost:${keys.port}${server.graphqlPath}`),
);
