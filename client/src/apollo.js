import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';

import { defaults, typeDefs, resolvers }  from './clientState/channel';

const cache = new InMemoryCache();

const stateLink = withClientState({
  cache,
  defaults: defaults,
  typeDefs: typeDefs,
  resolvers: resolvers
});

const httpLink = new HttpLink({ 
  uri: 'http://localhost:4000/graphql',
  headers: {
    authorization: localStorage.getItem('token') || null,
    'client-name': 'youtube-clone',
    'client-version': '1.0.0',
  }
});

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([stateLink, httpLink])
});

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem('token'),
  },
});

export default client;