import {
    getAccountBalance,
    getAccountOpenOrders
  } from '../../services/binance.service';
  
  // Action types
  export const BALANCE_FETCH_START = 'BALANCE_FETCH_START';
  export const BALANCE_FETCH_SUCCESS = 'BALANCE_FETCH_SUCCESS';
  export const BALANCE_FETCH_FAIL = 'BALANCE_FETCH_FAIL';
  
  export const ORDERS_FETCH_START = 'ORDERS_FETCH_START';
  export const ORDERS_FETCH_SUCCESS = 'ORDERS_FETCH_SUCCESS';
  export const ORDERS_FETCH_FAIL = 'ORDERS_FETCH_FAIL';
  
  /**
   * Get balance action
   * @returns {Function} - Thunk function
   */
  export const getBalance = () => {
    return async (dispatch) => {
      dispatch({ type: BALANCE_FETCH_START });
      
      try {
        const data = await getAccountBalance();
        
        dispatch({
          type: BALANCE_FETCH_SUCCESS,
          payload: data.balances
        });
      } catch (error) {
        dispatch({
          type: BALANCE_FETCH_FAIL,
          payload: error
        });
      }
    };
  };
  
  /**
   * Get open orders action
   * @returns {Function} - Thunk function
   */
  export const getOpenOrders = () => {
    return async (dispatch) => {
      dispatch({ type: ORDERS_FETCH_START });
      
      try {
        const data = await getAccountOpenOrders();
        
        dispatch({
          type: ORDERS_FETCH_SUCCESS,
          payload: data.orders
        });
      } catch (error) {
        dispatch({
          type: ORDERS_FETCH_FAIL,
          payload: error
        });
      }
    };
  };