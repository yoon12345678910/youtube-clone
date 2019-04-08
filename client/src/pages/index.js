import React, { Component } from 'react';
import styled from 'styled-components';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import DrawerMenu, { drawerWidth } from '../components/drawerMenu';
import Navigation from '../components/navigation';
import UserLanding from './userLanding';
import Home from './home';
import Upload from './upload';
import Video from './video';


const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <Route {...rest} render={props => (
      isLoggedIn ? (
        <Component {...props}/>
      ) : (
        <Redirect to={{
          pathname: '/',
          state: { from: props.location }
        }}/>
      )
    )}/>
  );
}

const Root = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  color: #444;
  z-index: 1;
`;

const PageContainer = styled.div`
  flex-grow: 1;
  margin-top: 64px;
  margin-left: -${drawerWidth};
  width: 100%;
  min-height: calc(100vh - 64px);
  background-color: #282828;
`;

class Pages extends Component {
  state = {
    isShowUserMenu: false,
    isShowDrawerMenu: false
  };

  handleToggleUserMenu = () => {
    this.setState({ 
      isShowUserMenu: !this.state.isShowUserMenu 
    });
  };

  handleToggleDrawerMenu = () => {
    this.setState({ 
      isShowDrawerMenu: !this.state.isShowDrawerMenu 
    });
  };

  render() {
    return (
      <BrowserRouter>
        <Root>
          <Navigation
            isShowUserMenu={this.state.isShowUserMenu}
            onToggleUserMenu={this.handleToggleUserMenu}
            onToggleDrawerMenu={this.handleToggleDrawerMenu}
          />
          <DrawerMenu
            isShowDrawerMenu={this.state.isShowDrawerMenu}
          />
          <PageContainer>
            <Route path='/user/:userId' component={UserLanding} />
            <Switch>
              <Route exact path='/' component={Home} />
              <PrivateRoute path='/upload' component={Upload} />
              <Route path='/video/:videoId' component={Video} />
            </Switch>
          </PageContainer>
        </Root>
      </BrowserRouter>
    )
  }
}

export default Pages;