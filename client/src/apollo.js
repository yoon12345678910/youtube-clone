import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { resolvers, typeDefs } from './resolvers';


const cache = new InMemoryCache();
const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore'
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  }
};
const client = new ApolloClient({
  link: new HttpLink({ 
    uri: 'http://localhost:4000/graphql',
    headers: {
      authorization: localStorage.getItem('token') || null
    }
  }),
  cache,
  defaultOptions: defaultOptions,
  resolvers,
  typeDefs
});

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem('token')
  },
});

export default client;