import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import HomeIcon from '@material-ui/icons/Home';

export const drawerWidth = '240px';

const paper = 'DrawerPaper';

const DrawerStyled = styled(Drawer).attrs({
  classes: { paper }
})`
  flex-shrink: 0;
  width: ${drawerWidth};

  .${paper} {
    position: relative;
    border: 0;
    width: 100%;
    height: 100%;
    z-index: 2005;
  }
`;

const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 64px;
`;

const LinkStyled = styled(Link) `
  && {
    text-decoration: none;
    color: #fff;
    cursor: pointer;
  }
`;

class DrawerMenu extends Component {
  render() {
    const { isShowDrawerMenu } = this.props;
    
    return (
      <DrawerStyled
        anchor='left'
        variant='persistent'
        open={isShowDrawerMenu}>
        <DrawerHeader>
          <IconButton><ChevronLeftIcon/></IconButton>
        </DrawerHeader>
        <List>
          <LinkStyled to='/'>
            <ListItem button>
              <ListItemIcon><HomeIcon/></ListItemIcon>
              <ListItemText primary='Home'/>
            </ListItem>
          </LinkStyled>
        </List>
        <Divider />
      </DrawerStyled>
    );
  }
}

export default DrawerMenu;