import {
    AUTH_START,
    AUTH_SUCCESS,
    AUTH_FAIL,
    AUTH_LOGOUT,
    AUTH_STATE_CHECK
  } from '../actions/authActions';
  
  const initialState = {
    token: null,
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case AUTH_START:
        return {
          ...state,
          loading: true,
          error: null
        };
        
      case AUTH_STATE_CHECK:
        return {
          ...state,
          loading: true
        };
        
      case AUTH_SUCCESS:
        return {
          ...state,
          token: action.payload.token,
          user: action.payload.user,
          isAuthenticated: true,
          loading: false,
          error: null
        };
        
      case AUTH_FAIL:
        return {
          ...state,
          token: null,
          user: null,
          isAuthenticated: false,
          loading: false,
          error: action.payload
        };
        
      case AUTH_LOGOUT:
        return {
          ...state,
          token: null,
          user: null,
          isAuthenticated: false,
          loading: false,
          error: null
        };
        
      default:
        return state;
    }
  };
  
  export default authReducer;