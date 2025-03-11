import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

// Reducers
import authReducer from './reducers/authReducer';
import botReducer from './reducers/botReducer';
import userReducer from './reducers/userReducer';
import binanceReducer from './reducers/binanceReducer';
import signalReducer from './reducers/signalReducer';

// Root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  bot: botReducer,
  user: userReducer,
  binance: binanceReducer,
  signal: signalReducer
});

// Create store
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;