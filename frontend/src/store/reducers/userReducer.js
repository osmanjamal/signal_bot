import {
    USER_UPDATE_START,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_PASSWORD_CHANGE_START,
    USER_PASSWORD_CHANGE_SUCCESS,
    USER_PASSWORD_CHANGE_FAIL,
    USER_API_KEYS_SET_START,
    USER_API_KEYS_SET_SUCCESS,
    USER_API_KEYS_SET_FAIL,
    USER_API_KEYS_CHECK_START,
    USER_API_KEYS_CHECK_SUCCESS,
    USER_API_KEYS_CHECK_FAIL,
    USER_API_TEST_START,
    USER_API_TEST_SUCCESS,
    USER_API_TEST_FAIL
  } from '../actions/userActions';
  
  import { AUTH_SUCCESS } from '../actions/authActions';
  
  const initialState = {
    hasApiKeys: false,
    loading: false,
    error: null,
    testResult: null,
    testLoading: false
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case AUTH_SUCCESS:
        return {
          ...state,
          hasApiKeys: action.payload.user.hasApiKeys || false
        };
        
      case USER_UPDATE_START:
      case USER_PASSWORD_CHANGE_START:
      case USER_API_KEYS_SET_START:
      case USER_API_KEYS_CHECK_START:
        return {
          ...state,
          loading: true,
          error: null
        };
        
      case USER_UPDATE_SUCCESS:
        return {
          ...state,
          loading: false,
          error: null
        };
        
      case USER_PASSWORD_CHANGE_SUCCESS:
        return {
          ...state,
          loading: false,
          error: null
        };
        
      case USER_API_KEYS_SET_SUCCESS:
        return {
          ...state,
          hasApiKeys: true,
          loading: false,
          error: null
        };
        
      case USER_API_KEYS_CHECK_SUCCESS:
        return {
          ...state,
          hasApiKeys: action.payload,
          loading: false,
          error: null
        };
        
      case USER_UPDATE_FAIL:
      case USER_PASSWORD_CHANGE_FAIL:
      case USER_API_KEYS_SET_FAIL:
      case USER_API_KEYS_CHECK_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
        
      case USER_API_TEST_START:
        return {
          ...state,
          testLoading: true,
          testResult: null,
          error: null
        };
        
      case USER_API_TEST_SUCCESS:
        return {
          ...state,
          testLoading: false,
          testResult: action.payload,
          error: null
        };
        
      case USER_API_TEST_FAIL:
        return {
          ...state,
          testLoading: false,
          testResult: null,
          error: action.payload
        };
        
      default:
        return state;
    }
  };
  
  export default userReducer;