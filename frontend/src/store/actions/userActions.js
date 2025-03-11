import {
    updateProfile as updateProfileService,
    changePassword as changePasswordService,
    setApiKeys as setApiKeysService,
    testApiConnection as testApiConnectionService,
    hasApiKeys as hasApiKeysService
  } from '../../services/user.service';
  
  // Action types
  export const USER_UPDATE_START = 'USER_UPDATE_START';
  export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS';
  export const USER_UPDATE_FAIL = 'USER_UPDATE_FAIL';
  
  export const USER_PASSWORD_CHANGE_START = 'USER_PASSWORD_CHANGE_START';
  export const USER_PASSWORD_CHANGE_SUCCESS = 'USER_PASSWORD_CHANGE_SUCCESS';
  export const USER_PASSWORD_CHANGE_FAIL = 'USER_PASSWORD_CHANGE_FAIL';
  
  export const USER_API_KEYS_SET_START = 'USER_API_KEYS_SET_START';
  export const USER_API_KEYS_SET_SUCCESS = 'USER_API_KEYS_SET_SUCCESS';
  export const USER_API_KEYS_SET_FAIL = 'USER_API_KEYS_SET_FAIL';
  
  export const USER_API_KEYS_CHECK_START = 'USER_API_KEYS_CHECK_START';
  export const USER_API_KEYS_CHECK_SUCCESS = 'USER_API_KEYS_CHECK_SUCCESS';
  export const USER_API_KEYS_CHECK_FAIL = 'USER_API_KEYS_CHECK_FAIL';
  
  export const USER_API_TEST_START = 'USER_API_TEST_START';
  export const USER_API_TEST_SUCCESS = 'USER_API_TEST_SUCCESS';
  export const USER_API_TEST_FAIL = 'USER_API_TEST_FAIL';
  
  /**
   * Update profile action
   * @param {Object} profileData - Profile data
   * @param {Function} callback - Optional callback function
   * @returns {Function} - Thunk function
   */
  export const updateProfile = (profileData, callback) => {
    return async (dispatch) => {
      dispatch({ type: USER_UPDATE_START });
      
      try {
        const user = await updateProfileService(profileData);
        
        dispatch({
          type: USER_UPDATE_SUCCESS,
          payload: user
        });
        
        if (callback) callback();
      } catch (error) {
        dispatch({
          type: USER_UPDATE_FAIL,
          payload: error
        });
      }
    };
  };
  
  /**
   * Change password action
   * @param {Object} passwordData - Password data
   * @param {Function} callback - Optional callback function
   * @returns {Function} - Thunk function
   */
  export const changePassword = (passwordData, callback) => {
    return async (dispatch) => {
      dispatch({ type: USER_PASSWORD_CHANGE_START });
      
      try {
        await changePasswordService(passwordData);
        
        dispatch({
          type: USER_PASSWORD_CHANGE_SUCCESS
        });
        
        if (callback) callback();
      } catch (error) {
        dispatch({
          type: USER_PASSWORD_CHANGE_FAIL,
          payload: error
        });
      }
    };
  };
  
  /**
   * Set API keys action
   * @param {Object} apiKeysData - API keys data
   * @param {Function} callback - Optional callback function
   * @returns {Function} - Thunk function
   */
  export const setApiKeys = (apiKeysData, callback) => {
    return async (dispatch) => {
      dispatch({ type: USER_API_KEYS_SET_START });
      
      try {
        await setApiKeysService(apiKeysData);
        
        dispatch({
          type: USER_API_KEYS_SET_SUCCESS
        });
        
        if (callback) callback();
      } catch (error) {
        dispatch({
          type: USER_API_KEYS_SET_FAIL,
          payload: error
        });
      }
    };
  };
  
  /**
   * Check if user has API keys action
   * @returns {Function} - Thunk function
   */
  export const hasApiKeys = () => {
    return async (dispatch) => {
      dispatch({ type: USER_API_KEYS_CHECK_START });
      
      try {
        const data = await hasApiKeysService();
        
        dispatch({
          type: USER_API_KEYS_CHECK_SUCCESS,
          payload: data.hasKeys
        });
      } catch (error) {
        dispatch({
          type: USER_API_KEYS_CHECK_FAIL,
          payload: error
        });
      }
    };
  };
  
  /**
   * Test API connection action
   * @param {Object} apiKeysData - Optional API keys data
   * @returns {Function} - Thunk function
   */
  export const testApiConnection = (apiKeysData = null) => {
    return async (dispatch) => {
      dispatch({ type: USER_API_TEST_START });
      
      try {
        const result = await testApiConnectionService(apiKeysData);
        
        dispatch({
          type: USER_API_TEST_SUCCESS,
          payload: result
        });
      } catch (error) {
        dispatch({
          type: USER_API_TEST_FAIL,
          payload: error
        });
      }
    };
  };