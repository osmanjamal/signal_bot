import {
    getSignals as getSignalsService,
    getBotSignals as getBotSignalsService
  } from '../../services/signal.service';
  
  // Action types
  export const SIGNAL_FETCH_START = 'SIGNAL_FETCH_START';
  export const SIGNAL_FETCH_SUCCESS = 'SIGNAL_FETCH_SUCCESS';
  export const SIGNAL_FETCH_FAIL = 'SIGNAL_FETCH_FAIL';
  
  export const BOT_SIGNAL_FETCH_START = 'BOT_SIGNAL_FETCH_START';
  export const BOT_SIGNAL_FETCH_SUCCESS = 'BOT_SIGNAL_FETCH_SUCCESS';
  export const BOT_SIGNAL_FETCH_FAIL = 'BOT_SIGNAL_FETCH_FAIL';
  
  /**
   * Get signals action
   * @param {Object} params - Query parameters
   * @returns {Function} - Thunk function
   */
  export const getSignals = (params = {}) => {
    return async (dispatch) => {
      dispatch({ type: SIGNAL_FETCH_START });
      
      try {
        const signals = await getSignalsService(params);
        
        dispatch({
          type: SIGNAL_FETCH_SUCCESS,
          payload: signals
        });
      } catch (error) {
        dispatch({
          type: SIGNAL_FETCH_FAIL,
          payload: error
        });
      }
    };
  };
  
  /**
   * Get bot signals action
   * @param {String} botId - Bot ID
   * @param {Object} params - Query parameters
   * @returns {Function} - Thunk function
   */
  export const getBotSignals = (botId, params = {}) => {
    return async (dispatch) => {
      dispatch({ type: BOT_SIGNAL_FETCH_START });
      
      try {
        const signals = await getBotSignalsService(botId, params);
        
        dispatch({
          type: BOT_SIGNAL_FETCH_SUCCESS,
          payload: signals
        });
      } catch (error) {
        dispatch({
          type: BOT_SIGNAL_FETCH_FAIL,
          payload: error
        });
      }
    };
  };