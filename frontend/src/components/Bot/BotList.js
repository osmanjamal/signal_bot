import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles
} from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import BotCard from './BotCard';
import Alert from '../Common/Alert';
import Loader from '../Common/Loader';
import { 
  getBots, 
  updateBot, 
  deleteBot,
  clearBotError
} from '../../store/actions/botActions';

const useStyles = makeStyles((theme) => ({
  header: {
    padding: theme.spacing(3, 0),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  emptyState: {
    padding: theme.spacing(6),
    textAlign: 'center',
    marginTop: theme.spacing(4)
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '400px'
  }
}));

const BotList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { bots, loading, error } = useSelector(state => state.bot);
  
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');
  
  // Delete confirmation dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [botToDelete, setBotToDelete] = useState(null);
  
  // Fetch bots on component mount
  useEffect(() => {
    dispatch(getBots());
    
    // Clear errors when component unmounts
    return () => {
      dispatch(clearBotError());
    };
  }, [dispatch]);
  
  // Show alert when error occurs
  useEffect(() => {
    if (error) {
      setAlertMessage(error);
      setAlertSeverity('error');
      setAlertOpen(true);
    }
  }, [error]);
  
  const handleCreateBot = () => {
    navigate('/bots/new');
  };
  
  const handleToggleStatus = (id, newStatus) => {
    dispatch(updateBot(id, { status: newStatus }, () => {
      setAlertMessage(`Bot ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully`);
      setAlertSeverity('success');
      setAlertOpen(true);
    }));
  };
  
  const handleDeleteClick = (id) => {
    setBotToDelete(id);
    setDeleteDialogOpen(true);
  };
  
  const handleDeleteConfirm = () => {
    dispatch(deleteBot(botToDelete, () => {
      setAlertMessage('Bot deleted successfully');
      setAlertSeverity('success');
      setAlertOpen(true);
    }));
    setDeleteDialogOpen(false);
    setBotToDelete(null);
  };
  
  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setBotToDelete(null);
  };
  
  const handleAlertClose = () => {
    setAlertOpen(false);
  };
  
  return (
    <Container>
      <Alert
        open={alertOpen}
        message={alertMessage}
        severity={alertSeverity}
        onClose={handleAlertClose}
      />
      
      <div className={classes.header}>
        <Typography variant="h4" component="h1">
          Your Bots
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleCreateBot}
        >
          Create Bot
        </Button>
      </div>
      
      {loading ? (
        <div className={classes.loadingContainer}>
          <Loader />
        </div>
      ) : bots.length === 0 ? (
        <Paper className={classes.emptyState} elevation={2}>
          <Typography variant="h6" paragraph>
            You don't have any bots yet
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            Create your first bot to start receiving TradingView signals
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleCreateBot}
          >
            Create Your First Bot
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {bots.map((bot) => (
            <Grid item xs={12} sm={6} md={4} key={bot.id}>
              <BotCard
                bot={bot}
                onToggleStatus={handleToggleStatus}
                onDelete={handleDeleteClick}
              />
            </Grid>
          ))}
        </Grid>
      )}
      
      {/* Delete confirmation dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>Delete Bot</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this bot? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BotList;