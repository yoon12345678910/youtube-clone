import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from 'react-apollo';
// import { MuiThemeProvider } from '@material-ui/core/styles';
import 'typeface-roboto';
import theme from './theme';
import client from './apollo';
import App from './Components/App';


ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById('root')
);