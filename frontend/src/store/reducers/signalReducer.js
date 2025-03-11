import {
    SIGNAL_FETCH_START,
    SIGNAL_FETCH_SUCCESS,
    SIGNAL_FETCH_FAIL,
    BOT_SIGNAL_FETCH_START,
    BOT_SIGNAL_FETCH_SUCCESS,
    BOT_SIGNAL_FETCH_FAIL
  } from '../actions/signalActions';
  
  const initialState = {
    signals: [],
    loading: false,
    error: null
  };
  
  const signalReducer = (state = initialState, action) => {
    switch (action.type) {
      case SIGNAL_FETCH_START:
      case BOT_SIGNAL_FETCH_START:
        return {
          ...state,
          loading: true,
          error: null
        };
        
      case SIGNAL_FETCH_SUCCESS:
      case BOT_SIGNAL_FETCH_SUCCESS:
        return {
          ...state,
          signals: action.payload,
          loading: false,
          error: null
        };
        
      case SIGNAL_FETCH_FAIL:
      case BOT_SIGNAL_FETCH_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
        
      default:
        return state;
    }
  };
  
  export default signalReducer;