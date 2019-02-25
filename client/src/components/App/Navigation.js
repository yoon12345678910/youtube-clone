import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuIcon from '@material-ui/icons/Menu';
import AppsIcon from '@material-ui/icons/Apps';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import SignInIcon from '@material-ui/icons/ExitToApp';
import AccountIcon from '@material-ui/icons/AccountBox';


const AppBarStyled = styled(AppBar)`
  && {
    position: absolute;
    z-index: 2020;
  }
`;

const ToolBarStyled = styled(Toolbar)`
  && {
    display: flex;
    justify-content: space-between;
  }
`;

const ToolBarRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-right: 20px;
  width: 200px;
`;

const IconButtonStyled = styled(IconButton)`
  && {
    margin-left: 12px;
    margin-right: 20px;
    color: #ddd;
  }
`;

const _linkStyled = () => `
  textDecoration: 'none',
  color: #fff,
  cursor: pointer
`;

const AvatarStyled = styled(Avatar)`
  && {
    ${_linkStyled}
  }
`;

const LinkStyled = styled(Link)`
  && {
    ${_linkStyled}
  }
`;

const SignGoogleButton = styled.address`
  ${_linkStyled}
`;

class Navigation extends Component {
  render() {
    const { 
      isShowUserMenu, 
      onToggleUserMenu, 
      onHideUserMenu, 
      onToggleDrawerMenu
    } = this.props;
    const avatarUrl = window.localStorage.getItem('avatar') || 'http://via.placeholder.com/50x50';
    
    return (
      <AppBarStyled>
        <ToolBarStyled>
          <IconButtonStyled
            aria-label='open drawer'
            onClick={onToggleDrawerMenu}>
            <MenuIcon />
          </IconButtonStyled>
          <ToolBarRight>
            <LinkStyled to='/upload'><VideoCallIcon/></LinkStyled>
            <AppsIcon/>
            <AddAlertIcon/>
            <AvatarStyled
              id='avatar'
              src={avatarUrl}
              aria-owns={isShowUserMenu ? 'menu-list-grow' : undefined}
              onClick={onToggleUserMenu}/>
            <Popper open={isShowUserMenu} anchorEl={document.getElementById('avatar')} transition disablePortal>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  id='menu-list-grow'
                  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
                  <Paper>
                    <ClickAwayListener onClickAway={onHideUserMenu}>
                      <MenuList>
                        <MenuItem>
                          <ListItemIcon><SignInIcon/></ListItemIcon>
                          <SignGoogleButton href='http://localhost:4000/auth/google'>Sign In with Google</SignGoogleButton>
                        </MenuItem>
                        <MenuItem onClick={onHideUserMenu}>
                          <ListItemIcon><AccountIcon/></ListItemIcon>
                          <LinkStyled to='/channel'>My Channel</LinkStyled>
                        </MenuItem>
                        <MenuItem onClick={onHideUserMenu}>
                          <ListItemIcon><SignInIcon/></ListItemIcon>
                          <LinkStyled to='/'>Logout</LinkStyled>
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </ToolBarRight>
        </ToolBarStyled>
      </AppBarStyled>
    )
  }
}

export default Navigation;