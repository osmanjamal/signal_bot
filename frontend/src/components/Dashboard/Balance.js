import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Paper,
  Typography,
  Grid,
  Button,
  Box,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  makeStyles
} from '@material-ui/core';
import { Refresh as RefreshIcon } from '@material-ui/icons';
import { getBalance } from '../../store/actions/binanceActions';
import Loader from '../Common/Loader';
import { formatCurrency } from '../../utils/formatters';

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
  divider: {
    margin: theme.spacing(2, 0)
  },
  totalValue: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    textAlign: 'center',
    margin: theme.spacing(2, 0)
  },
  assetContainer: {
    marginTop: theme.spacing(2)
  },
  tableContainer: {
    maxHeight: 440
  }
}));

const Balance = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  const { balances, loading, error } = useSelector(state => state.binance);
  const { hasApiKeys } = useSelector(state => state.user);
  
  const [filteredBalances, setFilteredBalances] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [showEmpty, setShowEmpty] = useState(false);
  
  // Fetch balance on component mount
  useEffect(() => {
    if (hasApiKeys) {
      dispatch(getBalance());
    }
  }, [dispatch, hasApiKeys]);
  
  // Filter out zero balances and calculate total
  useEffect(() => {
    if (balances) {
      // Filter and sort balances
      const filtered = Object.entries(balances)
        .filter(([_, balance]) => showEmpty || parseFloat(balance.available) > 0 || parseFloat(balance.onOrder) > 0)
        .map(([asset, balance]) => ({
          asset,
          available: parseFloat(balance.available),
          onOrder: parseFloat(balance.onOrder),
          total: parseFloat(balance.available) + parseFloat(balance.onOrder),
          estimatedValue: 0 // This would be calculated in a real app
        }))
        .sort((a, b) => b.total - a.total);
      
      setFilteredBalances(filtered);
      
      // Calculate total value (simplified)
      const total = filtered.reduce((acc, curr) => acc + curr.estimatedValue, 0);
      setTotalValue(total);
    }
  }, [balances, showEmpty]);
  
  const handleRefresh = () => {
    dispatch(getBalance());
  };
  
  const handleToggleEmpty = () => {
    setShowEmpty(!showEmpty);
  };
  
  if (!hasApiKeys) {
    return (
      <Paper className={classes.paper} elevation={3}>
        <Typography variant="h6" className={classes.title}>
          Account Balance
        </Typography>
        <Typography variant="body1">
          Please set up your Binance API keys in the API Settings page.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          href="/settings/api"
          style={{ marginTop: '16px' }}
        >
          Set Up API Keys
        </Button>
      </Paper>
    );
  }
  
  return (
    <Paper className={classes.paper} elevation={3}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h6" className={classes.title}>
            Account Balance
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
        <>
          <Box className={classes.totalValue}>
            <Typography variant="caption" display="block" color="textSecondary">
              Estimated Value
            </Typography>
            <Typography variant="h4">
              {formatCurrency(totalValue)}
            </Typography>
          </Box>
          
          <Divider className={classes.divider} />
          
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="subtitle1">
                Assets
              </Typography>
            </Grid>
            <Grid item>
              <Button
                size="small"
                color="primary"
                onClick={handleToggleEmpty}
              >
                {showEmpty ? 'Hide Empty' : 'Show Empty'}
              </Button>
            </Grid>
          </Grid>
          
          <div className={classes.assetContainer}>
            {filteredBalances.length === 0 ? (
              <Typography variant="body2" color="textSecondary" align="center">
                No assets found
              </Typography>
            ) : (
              <TableContainer className={classes.tableContainer}>
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Asset</TableCell>
                      <TableCell align="right">Available</TableCell>
                      <TableCell align="right">In Order</TableCell>
                      <TableCell align="right">Total</TableCell>
                      <TableCell align="right">Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredBalances.map((balance) => (
                      <TableRow key={balance.asset}>
                        <TableCell component="th" scope="row">
                          {balance.asset}
                        </TableCell>
                        <TableCell align="right">
                          {balance.available.toFixed(8)}
                        </TableCell>
                        <TableCell align="right">
                          {balance.onOrder.toFixed(8)}
                        </TableCell>
                        <TableCell align="right">
                          {balance.total.toFixed(8)}
                        </TableCell>
                        <TableCell align="right">
                          {formatCurrency(balance.estimatedValue)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </div>
        </>
      )}
    </Paper>
  );
};

export default Balance;