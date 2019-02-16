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
import { Auth } from './utils';


const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  link: new HttpLink({ 
    uri: 'http://localhost:4000/graphql',
    headers: {
      authorization: localStorage.getItem('token') || null,
      'client-name': 'youtube-clone',
      'client-version': '1.0.0',
    }
  }),
});

if (!!localStorage.getItem('token')) {
  Auth.authenticate();
}

// cache.writeData({
//   data: {
//     isLoggedIn: !!localStorage.getItem('token'),
//   },
// });

ReactDOM.render(
  <ApolloProvider client={client}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </ApolloProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();