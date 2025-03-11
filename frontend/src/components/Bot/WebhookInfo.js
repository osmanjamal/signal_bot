import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Divider,
  makeStyles
} from '@material-ui/core';
import { FileCopy as CopyIcon, Refresh as RefreshIcon } from '@material-ui/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Alert from '../Common/Alert';
import { regenerateBotSecret } from '../../store/actions/botActions';
import { useDispatch } from 'react-redux';
import config from '../../config';

const useStyles = makeStyles((theme) => ({
  section: {
    marginBottom: theme.spacing(4)
  },
  title: {
    marginBottom: theme.spacing(2)
  },
  field: {
    marginBottom: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(3, 0)
  },
  codeBlock: {
    backgroundColor: theme.palette.grey[100],
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    fontFamily: 'monospace',
    overflowX: 'auto',
    fontSize: '0.9rem',
    marginTop: theme.spacing(2)
  }
}));

const WebhookInfo = ({ bot }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');
  
  // Generate webhook URL
  const webhookUrl = `${config.apiUrl}/webhook/${bot.uuid}`;
  
  // Generate Pine Script code
  const pineScriptCode = `
// TradingView Webhook Code
webhook_url = "${webhookUrl}"
secret = "${bot.secret}"

// This function sends alerts to Signal Bot
alertMessage() =>
    json.encode({
        "secret": secret,
        "max_lag": "300",
        "timestamp": str.tostring(timenow),
        "trigger_price": str.tostring(close),
        "tv_exchange": exchange,
        "tv_instrument": ticker,
        "action": strategy.order.action,
        "strategy_info": {
            "market_position": strategy.market_position,
            "market_position_size": strategy.market_position_size,
            "prev_market_position": strategy.prev_market_position,
            "prev_market_position_size": strategy.prev_market_position_size
        },
        "order": {
            "amount": str.tostring(strategy.order.contracts),
            "currency_type": "base"
        }
    })

// Example usage in your strategy
if (strategy.position_size != strategy.position_size[1])
    alert(alertMessage())
`;
  
  const handleCopy = (text) => {
    setAlertMessage(`${text} copied to clipboard`);
    setAlertSeverity('success');
    setAlertOpen(true);
  };
  
  const handleRegenerateSecret = () => {
    if (window.confirm('Are you sure you want to regenerate the secret? This will invalidate the current webhook URL.')) {
      dispatch(regenerateBotSecret(bot.id, () => {
        setAlertMessage('Secret regenerated successfully');
        setAlertSeverity('success');
        setAlertOpen(true);
      }));
    }
  };
  
  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  return (
    <div>
      <Alert
        open={alertOpen}
        message={alertMessage}
        severity={alertSeverity}
        onClose={handleAlertClose}
      />
      
      <Typography variant="h6" className={classes.title}>
        TradingView Webhook Configuration
      </Typography>
      
      <div className={classes.section}>
        <Typography variant="subtitle1" gutterBottom>
          Webhook URL
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <TextField
              fullWidth
              variant="outlined"
              value={webhookUrl}
              InputProps={{
                readOnly: true
              }}
              className={classes.field}
            />
          </Grid>
          <Grid item>
            <CopyToClipboard text={webhookUrl} onCopy={() => handleCopy('Webhook URL')}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<CopyIcon />}
              >
                Copy
              </Button>
            </CopyToClipboard>
          </Grid>
        </Grid>
      </div>
      
      <div className={classes.section}>
        <Typography variant="subtitle1" gutterBottom>
          Secret Key
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <TextField
              fullWidth
              variant="outlined"
              value={bot.secret}
              InputProps={{
                readOnly: true
              }}
              className={classes.field}
            />
          </Grid>
          <Grid item>
            <CopyToClipboard text={bot.secret} onCopy={() => handleCopy('Secret Key')}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<CopyIcon />}
              >
                Copy
              </Button>
            </CopyToClipboard>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<RefreshIcon />}
              onClick={handleRegenerateSecret}
            >
              Regenerate
            </Button>
          </Grid>
        </Grid>
      </div>
      
      <Divider className={classes.divider} />
      
      <div className={classes.section}>
        <Typography variant="subtitle1" gutterBottom>
          Pine Script Code
        </Typography>
        <Typography variant="body2" color="textSecondary" paragraph>
          Copy this code into your TradingView Pine Script strategy to enable webhook alerts.
        </Typography>
        
        <div className={classes.codeBlock}>
          <pre>{pineScriptCode}</pre>
        </div>
        
        <Box mt={2}>
          <CopyToClipboard text={pineScriptCode} onCopy={() => handleCopy('Pine Script Code')}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<CopyIcon />}
            >
              Copy Code
            </Button>
          </CopyToClipboard>
        </Box>
      </div>
    </div>
  );
};

export default WebhookInfo;