import React from 'react';
import { CircularProgress, Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(4)
  }
}));

const Loader = ({ size = 40 }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <CircularProgress size={size} />
    </Box>
  );
};

export default Loader;