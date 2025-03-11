import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  makeStyles
} from '@material-ui/core';
import {
  Dashboard as DashboardIcon,
  Code as CodeIcon,
  Settings as SettingsIcon,
  VpnKey as ApiKeyIcon,
  Person as ProfileIcon
} from '@material-ui/icons';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop: '64px'
  },
  toolbar: theme.mixins.toolbar,
  listItem: {
    '&.active': {
      backgroundColor: theme.palette.action.selected
    }
  }
}));

const Sidebar = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  const menuItems = [
    {
      text: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/'
    },
    {
      text: 'Bots',
      icon: <CodeIcon />,
      path: '/bots'
    },
    {
      text: 'Settings',
      icon: <SettingsIcon />,
      path: '/settings'
    },
    {
      text: 'API Settings',
      icon: <ApiKeyIcon />,
      path: '/settings/api'
    },
    {
      text: 'Profile',
      icon: <ProfileIcon />,
      path: '/settings/profile'
    }
  ];
  
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.toolbar} />
      <List>
        {menuItems.slice(0, 2).map((item, index) => (
          <ListItem
            button
            key={index}
            onClick={() => navigate(item.path)}
            className={`${classes.listItem} ${isActive(item.path) ? 'active' : ''}`}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {menuItems.slice(2).map((item, index) => (
          <ListItem
            button
            key={index}
            onClick={() => navigate(item.path)}
            className={`${classes.listItem} ${isActive(item.path) ? 'active' : ''}`}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;