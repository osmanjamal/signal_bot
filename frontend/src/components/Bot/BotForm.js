import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Chip,
  InputAdornment,
  FormControlLabel,
  Switch,
  // Removing unused Divider to fix ESLint warning
  makeStyles
} from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import WebhookInfo from './WebhookInfo';
import Alert from '../Common/Alert';
import Loader from '../Common/Loader';
import { 
  createBot, 
  getBotById, 
  updateBot,
  clearBotError
} from '../../store/actions/botActions';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    marginBottom: theme.spacing(4)
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(2)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  pairsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1),
    marginTop: theme.spacing(1)
  },
  divider: {
    margin: theme.spacing(3, 0)
  }
}));

const BotForm = () => {
  const classes = useStyles();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { bot, loading, error } = useSelector(state => state.bot);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    pairs: [],
    status: 'active'
  });
  
  const [pairInput, setPairInput] = useState('');
  const [errors, setErrors] = useState({});
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');
  
  // Fetch bot data if editing
  useEffect(() => {
    if (id) {
      dispatch(getBotById(id));
    }
    
    // Clear errors when component unmounts
    return () => {
      dispatch(clearBotError());
    };
  }, [dispatch, id]);
  
  // Set form data when bot data is loaded
  useEffect(() => {
    if (id && bot) {
      setFormData({
        name: bot.name || '',
        description: bot.description || '',
        pairs: bot.pairs || [],
        status: bot.status || 'active'
      });
    }
  }, [id, bot]);
  
  // Show alert when error occurs
  useEffect(() => {
    if (error) {
      setAlertMessage(error);
      setAlertSeverity('error');
      setAlertOpen(true);
    }
  }, [error]);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    // Clear error when field is edited
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: null
      });
    }
  };
  
  const handleStatusChange = (e) => {
    setFormData({
      ...formData,
      status: e.target.checked ? 'active' : 'inactive'
    });
  };
  
  const handlePairInputChange = (e) => {
    setPairInput(e.target.value);
  };
  
  const handleAddPair = () => {
    const pair = pairInput.trim().toUpperCase();
    
    if (!pair) return;
    
    if (formData.pairs.includes(pair)) {
      setErrors({
        ...errors,
        pair: 'This pair is already added'
      });
      return;
    }
    
    setFormData({
      ...formData,
      pairs: [...formData.pairs, pair]
    });
    
    setPairInput('');
    setErrors({
      ...errors,
      pair: null
    });
  };
  
  const handleRemovePair = (pairToRemove) => {
    setFormData({
      ...formData,
      pairs: formData.pairs.filter(pair => pair !== pairToRemove)
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (formData.pairs.length === 0) {
      newErrors.pair = 'At least one trading pair is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Create or update bot
    if (id) {
      dispatch(updateBot(id, formData, () => {
        setAlertMessage('Bot updated successfully');
        setAlertSeverity('success');
        setAlertOpen(true);
      }));
    } else {
      dispatch(createBot(formData, () => {
        setAlertMessage('Bot created successfully');
        setAlertSeverity('success');
        setAlertOpen(true);
        
        // Redirect to bot list after creation
        setTimeout(() => {
          navigate('/bots');
        }, 2000);
      }));
    }
  };
  
  const handleCancel = () => {
    navigate('/bots');
  };
  
  const handleAlertClose = () => {
    setAlertOpen(false);
  };
  
  if (loading && id) {
    return <Loader />;
  }
  
  return (
    <Container maxWidth="md">
      <Alert
        open={alertOpen}
        message={alertMessage}
        severity={alertSeverity}
        onClose={handleAlertClose}
      />
      
      <Paper className={classes.paper} elevation={3}>
        <Typography component="h1" variant="h5">
          {id ? 'Edit Bot' : 'Create New Bot'}
        </Typography>
        
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Bot Name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                variant="outlined"
                fullWidth
                id="description"
                label="Description (Optional)"
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="pair"
                variant="outlined"
                fullWidth
                id="pair"
                label="Add Trading Pair"
                placeholder="e.g. BTCUSDT"
                value={pairInput}
                onChange={handlePairInputChange}
                error={!!errors.pair}
                helperText={errors.pair}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        onClick={handleAddPair}
                        color="primary"
                        startIcon={<AddIcon />}
                      >
                        Add
                      </Button>
                    </InputAdornment>
                  )
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddPair();
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <div className={classes.pairsContainer}>
                {formData.pairs.map((pair, index) => (
                  <Chip
                    key={index}
                    label={pair}
                    onDelete={() => handleRemovePair(pair)}
                  />
                ))}
              </div>
            </Grid>
            
            {id && (
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.status === 'active'}
                      onChange={handleStatusChange}
                      color="primary"
                    />
                  }
                  label="Active"
                />
              </Grid>
            )}
          </Grid>
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={loading}
              >
                {id ? 'Update Bot' : 'Create Bot'}
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="outlined"
                onClick={handleCancel}
                className={classes.submit}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      
      {id && bot && (
        <Paper className={classes.paper} elevation={3}>
          <WebhookInfo bot={bot} />
        </Paper>
      )}
    </Container>
  );
};

export default BotForm;