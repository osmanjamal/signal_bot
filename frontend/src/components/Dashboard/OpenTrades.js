import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Paper,
  Typography,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  makeStyles
} from '@material-ui/core';
import { Refresh as RefreshIcon } from '@material-ui/icons';
import Loader from '../Common/Loader';
import { getOpenOrders } from '../../store/actions/binanceActions';
import { formatDate } from '../../utils/formatters';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
  title: {
    marginBottom: theme.spacing(2)
  },
  refreshButton: {
    margin: theme.spacing(1, 0)
  },
  emptyState: {
    padding: theme.spacing(3),
    textAlign: 'center'
  },
  statusChip: {
    marginRight: theme.spacing(1)
  },
  buy: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white
  },
  sell: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white
  }
}));

const OpenTrades = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  const { openOrders, loading, error } = useSelector(state => state.binance);
  const { hasApiKeys } = useSelector(state => state.user);
  
  // Fetch open orders on component mount
  useEffect(() => {
    if (hasApiKeys) {
      dispatch(getOpenOrders());
    }
  }, [dispatch, hasApiKeys]);
  
  const handleRefresh = () => {
    dispatch(getOpenOrders());
  };
  
  if (!hasApiKeys) {
    return (
      <Paper className={classes.paper} elevation={3}>
        <Typography variant="h6" className={classes.title}>
          Open Orders
        </Typography>
        <Typography variant="body1">
          Please set up your Binance API keys in the API Settings page.
        </Typography>
      </Paper>
    );
  }
  
  return (
    <Paper className={classes.paper} elevation={3}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h6" className={classes.title}>
            Open Orders
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
            disabled={loading}
            className={classes.refreshButton}
          >
            Refresh
          </Button>
        </Grid>
      </Grid>
      
      {loading ? (
        <Loader />
      ) : error ? (
        <Typography color="error">
          {error}
        </Typography>
      ) : (
        <div>
          {openOrders.length === 0 ? (
            <div className={classes.emptyState}>
              <Typography variant="body1" color="textSecondary">
                No open orders at the moment
              </Typography>
            </div>
          ) : (
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Symbol</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Created</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {openOrders.map((order) => (
                    <TableRow key={order.orderId}>
                      <TableCell>{order.symbol}</TableCell>
                      <TableCell>
                        <Chip
                          label={order.side}
                          size="small"
                          className={`${classes.statusChip} ${
                            order.side === 'BUY' ? classes.buy : classes.sell
                          }`}
                        />
                        {order.type}
                      </TableCell>
                      <TableCell align="right">
                        {parseFloat(order.price).toFixed(8)}
                      </TableCell>
                      <TableCell align="right">
                        {parseFloat(order.origQty).toFixed(8)}
                      </TableCell>
                      <TableCell align="right">
                        {formatDate(order.time)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      )}
    </Paper>
  );
};

export default OpenTrades;