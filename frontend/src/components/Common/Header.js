import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  makeStyles
} from '@material-ui/core';
import { Settings as SettingsIcon, ExitToApp as LogoutIcon } from '@material-ui/icons';
import { logout } from '../../store/actions/authActions';

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  title: {
    marginRight: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
  },
  logo: {
    height: '36px',
    marginRight: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    marginRight: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  settingsIcon: {
    marginRight: theme.spacing(1)
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center'
  }
}));

const Header = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user } = useSelector(state => state.auth);
  
  // User menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuOpen = Boolean(anchorEl);
  
  const handleLogoClick = () => {
    navigate('/');
  };
  
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleSettings = () => {
    navigate('/settings');
    handleMenuClose();
  };
  
  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
  };
  
  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user || !user.name) return '?';
    
    const names = user.name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    
    return names[0][0].toUpperCase();
  };
  
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <div className={classes.title} onClick={handleLogoClick}>
          <img src="/assets/logo.png" alt="Signal Bot" className={classes.logo} />
          <Typography variant="h6">
            Signal Bot
          </Typography>
        </div>
        
        <div className={classes.spacer} />
        
        <Button
          color="inherit"
          onClick={() => navigate('/bots')}
        >
          Bots
        </Button>
        
        <div className={classes.userInfo}>
          <Avatar className={classes.avatar}>
            {getUserInitials()}
          </Avatar>
          <IconButton
            color="inherit"
            onClick={handleMenuClick}
            aria-controls="user-menu"
            aria-haspopup="true"
          >
            <Typography variant="body1">
              {user ? user.name : 'User'}
            </Typography>
          </IconButton>
          <Menu
            id="user-menu"
            anchorEl={anchorEl}
            keepMounted
            open={menuOpen}
            onClose={handleMenuClose}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleSettings}>
              <SettingsIcon className={classes.settingsIcon} />
              Settings
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <LogoutIcon className={classes.settingsIcon} />
              Logout
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;