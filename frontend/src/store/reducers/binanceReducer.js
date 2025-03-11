import {
    BALANCE_FETCH_START,
    BALANCE_FETCH_SUCCESS,
    BALANCE_FETCH_FAIL,
    ORDERS_FETCH_START,
    ORDERS_FETCH_SUCCESS,
    ORDERS_FETCH_FAIL
  } from '../actions/binanceActions';
  
  const initialState = {
    balances: null,
    openOrders: [],
    loading: false,
    error: null
  };
  
  const binanceReducer = (state = initialState, action) => {
    switch (action.type) {
      case BALANCE_FETCH_START:
        return {
          ...state,
          loading: true,
          error: null
        };
        
      case BALANCE_FETCH_SUCCESS:
        return {
          ...state,
          balances: action.payload,
          loading: false,
          error: null
        };
        
      case BALANCE_FETCH_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
        
      case ORDERS_FETCH_START:
        return {
          ...state,
          loading: true,
          error: null
        };
        
      case ORDERS_FETCH_SUCCESS:
        return {
          ...state,
          openOrders: action.payload,
          loading: false,
          error: null
        };
        
      case ORDERS_FETCH_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
        
      default:
        return state;
    }
  };
  
  export default binanceReducer;