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
import { updateProfile, changePassword } from '../../store/actions/userActions';

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
  }
}));

const Profile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  const { user, loading, error } = useSelector(state => state.user);
  
  const [profileForm, setProfileForm] = useState({
    name: ''
  });
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [profileErrors, setProfileErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState({});
  
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');
  
  // Set initial profile form data
  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || ''
      });
    }
  }, [user]);
  
  // Show alert when error occurs
  useEffect(() => {
    if (error) {
      setAlertMessage(error);
      setAlertSeverity('error');
      setAlertOpen(true);
    }
  }, [error]);
  
  const handleProfileChange = (e) => {
    setProfileForm({
      ...profileForm,
      [e.target.name]: e.target.value
    });
    
    // Clear error when field is edited
    if (profileErrors[e.target.name]) {
      setProfileErrors({
        ...profileErrors,
        [e.target.name]: null
      });
    }
  };
  
  const handlePasswordChange = (e) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value
    });
    
    // Clear error when field is edited
    if (passwordErrors[e.target.name]) {
      setPasswordErrors({
        ...passwordErrors,
        [e.target.name]: null
      });
    }
  };
  
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = {};
    
    if (!profileForm.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setProfileErrors(newErrors);
      return;
    }
    
    // Update profile
    dispatch(updateProfile(profileForm, () => {
      setAlertMessage('Profile updated successfully');
      setAlertSeverity('success');
      setAlertOpen(true);
    }));
  };
  
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = {};
    
    if (!passwordForm.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    
    if (!passwordForm.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordForm.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }
    
    if (!passwordForm.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setPasswordErrors(newErrors);
      return;
    }
    
    // Change password
    dispatch(changePassword(
      {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      },
      () => {
        // Clear password form
        setPasswordForm({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        
        setAlertMessage('Password changed successfully');
        setAlertSeverity('success');
        setAlertOpen(true);
      }
    ));
  };
  
  const handleAlertClose = () => {
    setAlertOpen(false);
  };
  
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
          Profile Settings
        </Typography>
        
        <form className={classes.form} onSubmit={handleProfileSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Full Name"
                value={profileForm.name}
                onChange={handleProfileChange}
                error={!!profileErrors.name}
                helperText={profileErrors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={user ? user.email : ''}
                InputProps={{
                  readOnly: true,
                }}
                disabled
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
            {loading ? <CircularProgress size={24} /> : 'Update Profile'}
          </Button>
        </form>
        
        <Divider className={classes.divider} />
        
        <Typography component="h2" variant="h5" className={classes.title}>
          Change Password
        </Typography>
        
        <form className={classes.form} onSubmit={handlePasswordSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="currentPassword"
                variant="outlined"
                required
                fullWidth
                id="currentPassword"
                label="Current Password"
                type="password"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                error={!!passwordErrors.currentPassword}
                helperText={passwordErrors.currentPassword}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="newPassword"
                variant="outlined"
                required
                fullWidth
                id="newPassword"
                label="New Password"
                type="password"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                error={!!passwordErrors.newPassword}
                helperText={passwordErrors.newPassword}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="confirmPassword"
                variant="outlined"
                required
                fullWidth
                id="confirmPassword"
                label="Confirm New Password"
                type="password"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                error={!!passwordErrors.confirmPassword}
                helperText={passwordErrors.confirmPassword}
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
            {loading ? <CircularProgress size={24} /> : 'Change Password'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Profile;