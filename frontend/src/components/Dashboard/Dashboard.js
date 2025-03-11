import React from 'react';
import { Container, Grid, Typography, makeStyles } from '@material-ui/core';
import Balance from './Balance';
import OpenTrades from './OpenTrades';
import SignalLog from './SignalLog';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  title: {
    marginBottom: theme.spacing(4)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Typography variant="h4" component="h1" className={classes.title}>
        Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Balance />
          <OpenTrades />
        </Grid>
        <Grid item xs={12} md={5}>
          <SignalLog />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;