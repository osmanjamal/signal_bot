import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  makeStyles
} from '@material-ui/core';
import {
  VpnKey as ApiKeyIcon,
  Person as ProfileIcon
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  title: {
    marginBottom: theme.spacing(4)
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: theme.shadows[4]
    }
  },
  cardContent: {
    flexGrow: 1
  },
  icon: {
    fontSize: 48,
    marginBottom: theme.spacing(2),
    color: theme.palette.primary.main
  }
}));

const Settings = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  
  const settingsOptions = [
    {
      title: 'API Settings',
      description: 'Configure your Binance API keys for trading',
      icon: <ApiKeyIcon className={classes.icon} />,
      path: '/settings/api'
    },
    {
      title: 'Profile',
      description: 'Update your profile and password',
      icon: <ProfileIcon className={classes.icon} />,
      path: '/settings/profile'
    }
  ];
  
  return (
    <Container className={classes.container}>
      <Typography variant="h4" component="h1" className={classes.title}>
        Settings
      </Typography>
      
      <Grid container spacing={4}>
        {settingsOptions.map((option, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                {option.icon}
                <Typography variant="h5" component="h2" gutterBottom>
                  {option.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {option.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  color="primary" 
                  onClick={() => navigate(option.path)}
                >
                  Go to {option.title}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Settings;