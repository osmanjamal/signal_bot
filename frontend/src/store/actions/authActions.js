import {
    loginUser,
    registerUser,
    getCurrentUser,
    logoutUser,
    isAuthenticated
  } from '../../services/auth.service';
  
  // Action types
  export const AUTH_START = 'AUTH_START';
  export const AUTH_SUCCESS = 'AUTH_SUCCESS';
  export const AUTH_FAIL = 'AUTH_FAIL';
  export const AUTH_LOGOUT = 'AUTH_LOGOUT';
  export const AUTH_STATE_CHECK = 'AUTH_STATE_CHECK';
  
  /**
   * Login action
   * @param {Object} credentials - User credentials
   * @returns {Function} - Thunk function
   */
  export const login = (credentials) => {
    return async (dispatch) => {
      dispatch({ type: AUTH_START });
      
      try {
        const data = await loginUser(credentials);
        
        dispatch({
          type: AUTH_SUCCESS,
          payload: {
            token: data.token,
            user: data.user
          }
        });
      } catch (error) {
        dispatch({
          type: AUTH_FAIL,
          payload: error
        });
      }
    };
  };
  
  /**
   * Register action
   * @param {Object} userData - User data
   * @returns {Function} - Thunk function
   */
  export const register = (userData) => {
    return async (dispatch) => {
      dispatch({ type: AUTH_START });
      
      try {
        const data = await registerUser(userData);
        
        dispatch({
          type: AUTH_SUCCESS,
          payload: {
            token: data.token,
            user: data.user
          }
        });
      } catch (error) {
        dispatch({
          type: AUTH_FAIL,
          payload: error
        });
      }
    };
  };
  
  /**
   * Check auth state action
   * @returns {Function} - Thunk function
   */
  export const checkAuthState = () => {
    return async (dispatch) => {
      dispatch({ type: AUTH_STATE_CHECK });
      
      if (isAuthenticated()) {
        try {
          const user = await getCurrentUser();
          
          dispatch({
            type: AUTH_SUCCESS,
            payload: {
              token: localStorage.getItem('signal_bot_token'),
              user
            }
          });
        } catch (error) {
          dispatch({
            type: AUTH_FAIL,
            payload: error
          });
          
          // Clear token if error occurs
          logoutUser();
        }
      } else {
        dispatch({
          type: AUTH_FAIL,
          payload: null
        });
      }
    };
  };
  
  /**
   * Logout action
   * @returns {Object} - Action object
   */
  export const logout = () => {
    logoutUser();
    
    return {
      type: AUTH_LOGOUT
    };
  };