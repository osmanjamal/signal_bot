import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Grid,
  Divider,
  makeStyles
} from '@material-ui/core';
import {
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  Settings as SettingsIcon,
  Delete as DeleteIcon
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: theme.shadows[4]
    }
  },
  cardContent: {
    flexGrow: 1
  },
  active: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white
  },
  inactive: {
    backgroundColor: theme.palette.grey[500],
    color: theme.palette.common.white
  },
  pairsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1),
    marginTop: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  statsItem: {
    textAlign: 'center'
  }
}));

const BotCard = ({ 
  bot, 
  onToggleStatus, 
  onDelete 
}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  
  const { 
    id, 
    name, 
    description, 
    pairs, 
    status, 
    stats,
    createdAt 
  } = bot;
  
  const isActive = status === 'active';
  
  const handleEdit = () => {
    navigate(`/bots/${id}`);
  };
  
  const handleToggleStatus = () => {
    onToggleStatus(id, isActive ? 'inactive' : 'active');
  };
  
  const handleDelete = () => {
    onDelete(id);
  };
  
  // Format date
  const formattedDate = new Date(createdAt).toLocaleDateString();
  
  return (
    <Card className={classes.card} variant="outlined">
      <CardContent className={classes.cardContent}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h5" component="h2">
              {name}
            </Typography>
          </Grid>
          <Grid item>
            <Chip
              label={isActive ? 'Active' : 'Inactive'}
              className={isActive ? classes.active : classes.inactive}
              size="small"
            />
          </Grid>
        </Grid>
        
        <Typography variant="body2" color="textSecondary" component="p">
          {description || 'No description'}
        </Typography>
        
        <div className={classes.pairsContainer}>
          {pairs.map((pair, index) => (
            <Chip key={index} label={pair} size="small" />
          ))}
        </div>
        
        <Divider className={classes.divider} />
        
        <Grid container spacing={2}>
          <Grid item xs={4} className={classes.statsItem}>
            <Typography variant="h6" component="p">
              {stats?.signals || 0}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Signals
            </Typography>
          </Grid>
          <Grid item xs={4} className={classes.statsItem}>
            <Typography variant="h6" component="p">
              {stats?.executed || 0}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Executed
            </Typography>
          </Grid>
          <Grid item xs={4} className={classes.statsItem}>
            <Typography variant="h6" component="p">
              {stats?.failed || 0}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Failed
            </Typography>
          </Grid>
        </Grid>
        
        <Typography variant="caption" color="textSecondary" component="p" style={{ marginTop: '16px' }}>
          Created: {formattedDate}
        </Typography>
      </CardContent>
      
      <CardActions>
        <Button
          size="small"
          color="primary"
          startIcon={isActive ? <PauseIcon /> : <PlayIcon />}
          onClick={handleToggleStatus}
        >
          {isActive ? 'Pause' : 'Activate'}
        </Button>
        <Button
          size="small"
          color="primary"
          startIcon={<SettingsIcon />}
          onClick={handleEdit}
        >
          Edit
        </Button>
        <Button
          size="small"
          color="secondary"
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default BotCard;