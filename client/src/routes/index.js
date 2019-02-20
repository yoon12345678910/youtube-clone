import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import classNames from 'classnames';
import { PrivateRoute }  from '../utils';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AppsIcon from '@material-ui/icons/Apps';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import HomeIcon from '@material-ui/icons/Home';
import SignInIcon from '@material-ui/icons/ExitToApp';
import AccountIcon from '@material-ui/icons/AccountBox';

import Home from './Home';
import Upload from './Upload';
import UserLanding from './UserLanding';
import Video from './Video';
import Channel from './Channel';


const drawerWidth = 240;

const styles = theme => ({
  root: {
    overflow: 'hidden',
    width: '100%',
    height: '100%',
    zIndex: 1,
    color: '#444'
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%'
  },
  appBar: {
    position: 'absolute',
    zIndex: 2020
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  toolbarRight: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingRight: '20px',
    width: '200px'
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary
  },
  linkIcon: {
    color: '#FFFFFF',
    cursor: 'pointer'
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
    color: '#DDDDDD'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    position: 'relative',
    width: '100%',
    height: '100%',
    zIndex: 2005,
    border: 0
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    marginTop: 64,
    width: '100%',
    height: 'calc(100% - 64px)',
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.down('xs')]: {
      height: 'calc(100% - 48px)',
      marginTop: 48
    },
    marginLeft: -drawerWidth
  },
  contentShift: {
    // width: `calc(100% - ${drawerWidth}px)`,
    // marginLeft: 0
  },
  contentInner: {
    margin: '0 auto',
    width: 'auto',
    [theme.breakpoints.up('lg')]: {
      width: '1003px'
    },
  },
  contentRender: {
    textAlign: 'center'
  }
})

class PersistentDrawer extends Component {
  state = {
    drawerOpen: false,
    menuOpen: false
  }

  handleDrawerToggle = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };

  handleMenuToggle  = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  };

  handleMenuClose = e => {
    if (document.getElementById('avatar').contains(e.target)) {
      return;
    }
    this.setState({ menuOpen: false });
  };


  render() {
    const { classes } = this.props;
    const { drawerOpen, menuOpen } = this.state;
    const avatarUrl = window.localStorage.getItem('avatar') || 'http://via.placeholder.com/50x50';
    
    return (
      <BrowserRouter>
        <div className={classes.root}>
          <div className={classes.appFrame}>
            <AppBar className={classNames(classes.appBar)}>
              <Toolbar className={classes.toolbar}>
                <IconButton
                  aria-label="open drawer"
                  onClick={this.handleDrawerToggle}
                  className={classNames(classes.menuButton)}>
                  <MenuIcon />
                </IconButton>
                <div className={classes.toolbarRight}>
                  <Link to='/upload' className={classes.linkIcon}>
                    <VideoCallIcon/>
                  </Link>
                  <AppsIcon/>
                  <AddAlertIcon/>
                  <Avatar
                    id='avatar'
                    aria-owns={menuOpen ? 'menu-list-grow' : undefined}
                    src={avatarUrl}
                    onClick={this.handleMenuToggle}
                    className={classes.linkIcon}/>
                  <Popper open={menuOpen} anchorEl={document.getElementById('avatar')} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        id='menu-list-grow'
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
                        <Paper>
                          <ClickAwayListener onClickAway={this.handleMenuClose}>
                            <MenuList>
                              <MenuItem>
                                <ListItemIcon><SignInIcon/></ListItemIcon>
                                <a href='http://localhost:4000/auth/google' className={classes.link}>Sign In with Google</a>
                              </MenuItem>
                              <MenuItem onClick={this.handleMenuClose}>
                                <ListItemIcon><AccountIcon/></ListItemIcon>
                                <Link to='/channel' className={classes.link}>My Channel</Link>
                              </MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </div>
              </Toolbar>
            </AppBar>
            <Drawer
              className={classes.drawer}
              variant='persistent'
              anchor='left'
              // transitionDuration={0}
              classes={{ paper: classes.drawerPaper }}
              open={drawerOpen}>
              <div className={classes.drawerHeader}>
                <IconButton>
                  <ChevronLeftIcon />
                </IconButton>
              </div>
              <List className={classes.list}>
                <Link to='/' className={classes.link}>
                  <ListItem button>
                    <ListItemIcon>
                      <HomeIcon/>
                    </ListItemIcon>
                    <ListItemText primary='Home'/>
                  </ListItem>
                </Link>
              </List>
              <Divider />
              <List className={classes.list}></List>
            </Drawer>
            <main className={classNames(classes.content, {
              [classes.contentShift]: drawerOpen})}>
              <div className={classNames(classes.contentInner)}>
                <div className={classNames(classes.contentRender)}>
                  <Switch>
                    <Route exact path='/' component={Home}/>
                    <PrivateRoute path='/upload' component={Upload}/>
                    <Route path='/channel' component={Channel}/>
                    <Route path='/user/:userId' component={UserLanding}/>
                    <Route path='/video/:videoId' component={Video}/>
                  </Switch>
                </div>
              </div>
            </main>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default withStyles(styles, { withTheme: true })(PersistentDrawer);