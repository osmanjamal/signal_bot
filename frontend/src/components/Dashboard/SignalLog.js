import React, { useEffect, useState } from 'react';
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
  Tabs,
  Tab,
  makeStyles
} from '@material-ui/core';
import { Refresh as RefreshIcon } from '@material-ui/icons';
import Loader from '../Common/Loader';
import { getSignals } from '../../store/actions/signalActions';
import { formatDate } from '../../utils/formatters';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
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
  tabs: {
    marginBottom: theme.spacing(2)
  },
  tableContainer: {
    flexGrow: 1,
    maxHeight: 600,
    overflowY: 'auto'
  },
  buy: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white
  },
  sell: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white
  },
  executed: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white
  },
  failed: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white
  },
  pending: {
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.common.white
  },
  processing: {
    backgroundColor: theme.palette.info.main,
    color: theme.palette.common.white
  }
}));

const SignalLog = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  const { signals, loading, error } = useSelector(state => state.signal);
  
  const [tabValue, setTabValue] = useState(0);
  
  // Fetch signals on component mount
  useEffect(() => {
    dispatch(getSignals());
  }, [dispatch]);
  
  const handleRefresh = () => {
    dispatch(getSignals());
  };
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const getStatusClass = (status) => {
    switch (status) {
      case 'executed':
        return classes.executed;
      case 'failed':
        return classes.failed;
      case 'pending':
        return classes.pending;
      case 'processing':
        return classes.processing;
      default:
        return '';
    }
  };
  
  // Filter signals based on tab
  const filteredSignals = signals.filter(signal => {
    if (tabValue === 0) return true; // All signals
    if (tabValue === 1) return signal.status === 'executed'; // Executed
    if (tabValue === 2) return signal.status === 'failed'; // Failed
    if (tabValue === 3) return ['pending', 'processing'].includes(signal.status); // Pending
    return true;
  });
  
  return (
    <Paper className={classes.paper} elevation={3}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h6" className={classes.title}>
            Signal History
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
      
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        className={classes.tabs}
      >
        <Tab label="All" />
        <Tab label="Executed" />
        <Tab label="Failed" />
        <Tab label="Pending" />
      </Tabs>
      
      {loading ? (
        <Loader />
      ) : error ? (
        <Typography color="error">
          {error}
        </Typography>
      ) : (
        <div className={classes.tableContainer}>
          {filteredSignals.length === 0 ? (
            <div className={classes.emptyState}>
              <Typography variant="body1" color="textSecondary">
                No signals found
              </Typography>
            </div>
          ) : (
            <TableContainer>
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Bot</TableCell>
                    <TableCell>Symbol</TableCell>
                    <TableCell>Action</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredSignals.map((signal) => (
                    <TableRow key={signal.id}>
                      <TableCell>{signal.botName}</TableCell>
                      <TableCell>{signal.symbol}</TableCell>
                      <TableCell>
                        <Chip
                          label={signal.action.toUpperCase()}
                          size="small"
                          className={signal.action === 'buy' ? classes.buy : classes.sell}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={signal.status.toUpperCase()}
                          size="small"
                          className={getStatusClass(signal.status)}
                        />
                      </TableCell>
                      <TableCell>
                        {formatDate(signal.createdAt)}
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

export default SignalLog;