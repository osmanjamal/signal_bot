import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Divider,
  CircularProgress,
  makeStyles
} from '@material-ui/core';
import Alert from '../Common/Alert';
import { setApiKeys, testApiConnection } from '../../store/actions/userActions';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    marginBottom: theme.spacing(4)
  },
  title: {
    marginBottom: theme.spacing(2)
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(2)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  divider: {
    margin: theme.spacing(3, 0)
  },
  infoSection: {
    marginTop: theme.spacing(3)
  },
  testButton: {
    marginTop: theme.spacing(2)
  }
}));

const ApiSettings = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  const { 
    hasApiKeys, 
    loading, 
    error, 
    testResult, 
    testLoading 
  } = useSelector(state => state.user);
  
  const [formData, setFormData] = useState({
    apiKey: '',
    apiSecret: ''
  });
  
  const [errors, setErrors] = useState({});
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');
  
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
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = {};
    
    if (!formData.apiKey.trim()) {
      newErrors.apiKey = 'API Key is required';
    }
    
    if (!formData.apiSecret.trim()) {
      newErrors.apiSecret = 'API Secret is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Save API keys
    dispatch(setApiKeys(formData, () => {
      setAlertMessage('API keys saved successfully');
      setAlertSeverity('success');
      setAlertOpen(true);
    }));
  };
  
  const handleTestConnection = () => {
    // If we already have keys saved, use those
    if (hasApiKeys) {
      dispatch(testApiConnection());
      return;
    }
    
    // Otherwise, validate form first
    const newErrors = {};
    
    if (!formData.apiKey.trim()) {
      newErrors.apiKey = 'API Key is required';
    }
    
    if (!formData.apiSecret.trim()) {
      newErrors.apiSecret = 'API Secret is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Test connection with form data
    dispatch(testApiConnection(formData));
  };
  
  const handleAlertClose = () => {
    setAlertOpen(false);
  };
  
  // Show alert when error occurs
  useEffect(() => {
    if (error) {
      setAlertMessage(error);
      setAlertSeverity('error');
      setAlertOpen(true);
    }
  }, [error]);
  
  // Show alert when test result is available
  useEffect(() => {
    if (testResult) {
      setAlertMessage(testResult.message);
      setAlertSeverity(testResult.success ? 'success' : 'error');
      setAlertOpen(true);
    }
  }, [testResult]);
  
  return (
    <Container maxWidth="md">
      <Alert
        open={alertOpen}
        message={alertMessage}
        severity={alertSeverity}
        onClose={handleAlertClose}
      />
      
      <Paper className={classes.paper} elevation={3}>
        <Typography component="h1" variant="h5" className={classes.title}>
          Binance API Settings
        </Typography>
        
        <Typography variant="body1" paragraph>
          To connect your Binance account, you need to create an API key with trading permissions.
        </Typography>
        
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="apiKey"
                variant="outlined"
                required
                fullWidth
                id="apiKey"
                label="API Key"
                value={formData.apiKey}
                onChange={handleChange}
                error={!!errors.apiKey}
                helperText={errors.apiKey}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="apiSecret"
                variant="outlined"
                required
                fullWidth
                id="apiSecret"
                label="API Secret"
                value={formData.apiSecret}
                onChange={handleChange}
                error={!!errors.apiSecret}
                helperText={errors.apiSecret}
              />
            </Grid>
          </Grid>
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Save API Keys'}
          </Button>
          
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            onClick={handleTestConnection}
            disabled={testLoading}
            className={classes.testButton}
          >
            {testLoading ? <CircularProgress size={24} /> : 'Test Connection'}
          </Button>
        </form>
        
        <Divider className={classes.divider} />
        
        <div className={classes.infoSection}>
          <Typography variant="h6" gutterBottom>
            How to create Binance API keys
          </Typography>
          
          <Typography variant="body2" component="ol">
            <li>Log in to your Binance account</li>
            <li>Go to API Management in your account settings</li>
            <li>Create a new API key (label it "Signal Bot")</li>
            <li>Enable trading permissions (but NOT withdrawals)</li>
            <li>Copy the API Key and Secret Key</li>
            <li>Paste them in the form above</li>
          </Typography>
          
          <Typography variant="body2" color="error" style={{ marginTop: '16px' }}>
            Important: Never share your API keys with anyone or give withdrawal permissions to this app.
          </Typography>
        </div>
      </Paper>
    </Container>
  );
};

export default ApiSettings;