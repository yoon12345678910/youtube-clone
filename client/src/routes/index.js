import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AppsIcon from '@material-ui/icons/Apps';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import HomeIcon from '@material-ui/icons/Home';
import Avatar from '@material-ui/core/Avatar';

import Home from './Home';
import Upload from './Upload';


const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: '100%',
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden'
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
    width: '20vw'
  },
  link: {
    textDecoration: 'none'
  },
  linkIcon: {
    color: '#FFFFFF'
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
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: 0
  }
})

class PersistentDrawer extends Component {
  state = {
    open: false
  }

  handleDrawerToggle = () => {
    this.setState({ open: !this.state.open });
  }

  handleDrawerClose = () => {
    this.setState({ open: false });
  }

  render() {
    const { classes } = this.props;
    const { open } = this.state;
    console.log(Drawer);
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
                  <Avatar src='http://via.placeholder.com/50x50' />
                </div>
              </Toolbar>
            </AppBar>
            <Drawer
              // type='persistent'
              className={classes.drawer}
              variant="persistent"
              anchor="left"
              transitionDuration={0}
              classes={{ paper: classes.drawerPaper }}
              open={open}>
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
              [classes.contentShift]: open})}>
              <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/upload' component={Upload}/>
              </Switch>
            </main>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default withStyles(styles, { withTheme: true })(PersistentDrawer);