import React, { Component } from 'react';
import styled from 'styled-components';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { PrivateRoute }  from '../../utils';
import Navigation from './Navigation';
import { DrawerMenu, drawerWidth } from './DrawerMenu';

import Home from '../../Routes/Home';
// import Upload from '../../Routes/Upload';
// import Video from '../../Routes/Video';
// import Channel from '../../Routes/Channel';
// import UserLanding from '../../Routes/UserLanding';


const Root = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  color: #444;
  z-index: 1;
`;

const AppFrame = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  flex-grow: 1;
  margin-top: 64px;
  width: 100%;
  height: calc(100% - 64px);
  margin-left: -${drawerWidth};
`;

class App extends Component {
  state = {
    isShowUserMenu: false,
    isShowDrawerMenu: false
  };

  handleToggleUserMenu  = () => {
    this.setState({ isShowUserMenu: !this.state.isShowUserMenu });
  };

  handleHideUserMenu = e => {
    if (document.getElementById('avatar').contains(e.target)) return;
    this.setState({ isShowUserMenu: false });
  };

  handleToggleDrawerMenu = () => {
    this.setState({ isShowDrawerMenu: !this.state.isShowDrawerMenu });
  };

  render() {
    return (
      <BrowserRouter>
        <Root>
          <AppFrame>
            <Navigation 
              isShowUserMenu={this.state.isShowUserMenu}
              onToggleUserMenu={this.handleToggleUserMenu}
              onHideUserMenu={this.handleHideUserMenu}
              onToggleDrawerMenu={this.handleToggleDrawerMenu}
            />
            <DrawerMenu 
              isShowDrawerMenu={this.state.isShowDrawerMenu}
            />
            <Content>
              <Switch>
                <Route exact path='/' component={Home}/>
                {/* <PrivateRoute path='/upload' component={Upload}/> */}
                {/* <Route path='/channel' component={Channel}/> */}
                {/* <Route path='/user/:userId' component={UserLanding}/> */}
                {/* <Route path='/video/:videoId' component={Video}/> */}
              </Switch>
            </Content>
          </AppFrame>
        </Root>
      </BrowserRouter>
    )
  }
}

export default App;