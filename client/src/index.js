import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from '@material-ui/core/styles'; 
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from 'react-apollo';
import 'typeface-roboto';
import theme from './theme';
import client from './apollo';
import Pages from './pages';


ReactDOM.render(
  <ApolloProvider client={client}>
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <Pages />    
      </ThemeProvider>
    </MuiThemeProvider>
  </ApolloProvider>,
  document.getElementById('root')
);