import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';

import { MuiThemeProvider } from '@material-ui/core/styles';

import 'typeface-roboto';
import theme from './theme';
import App from './routes';


const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri: 'http://localhost:4000/graphql' })
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