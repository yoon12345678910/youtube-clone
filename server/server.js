const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schemas');
const resolvers = require('./resolvers');
const models = require('./models');
const passport = require('passport');
const { googleOauth, googleCallback, googleRedirect, googleScope } = require('./passport');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const keys = require('./config/keys');
 
require('./models/connect');

const context = ({ req }) => {
  const token = req.headers.authorization;
  const user = jwt.verify(token, keys.jwtSecret, (err, user) => {
    return user ? user : null;
  });
  return {
    models,
    user
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  playground: {
    endpoint: `http://localhost:${keys.port}/graphql`
  }
});

const app = express();

app.use(cors());
passport.use(googleOauth);
app.use(passport.initialize());
app.get('/auth/google', googleScope);
app.get('/auth/google/callback', googleCallback, googleRedirect);
server.applyMiddleware({ app });

app.listen({ port: keys.port }, () =>
  console.log(`🚀 Server ready at http://localhost:${keys.port}`),
);
