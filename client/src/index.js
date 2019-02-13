import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';

import { MuiThemeProvider } from '@material-ui/core/styles';

import theme from './theme';
import App from './App';


const client = new ApolloClient({
  link: new HttpLink({ uri: `http://localhost:4000/graphql` }),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </ApolloProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
