import api from './api.js';
import config from '../config';

/**
 * Login user
 * @param {Object} credentials - User credentials
 * @returns {Promise} - Promise with response
 */
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    
    // Store token in localStorage
    if (response.data.token) {
      localStorage.setItem(config.tokenKey, response.data.token);
    }
    
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Register user
 * @param {Object} userData - User data
 * @returns {Promise} - Promise with response
 */
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    
    // Store token in localStorage
    if (response.data.token) {
      localStorage.setItem(config.tokenKey, response.data.token);
    }
    
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Get current user
 * @returns {Promise} - Promise with response
 */
export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/profile');
    return response.data.user;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Logout user
 */
export const logoutUser = () => {
  localStorage.removeItem(config.tokenKey);
  // Force page reload to clear any in-memory state
  window.location.href = '/login';
};

/**
 * Check if user is authenticated
 * @returns {Boolean} - Is user authenticated
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem(config.tokenKey);
};

/**
 * Get auth token
 * @returns {String|null} - Auth token
 */
export const getToken = () => {
  return localStorage.getItem(config.tokenKey);
};

/**
 * Handle API errors
 * @param {Error} error - Error object
 * @returns {String} - Error message
 */
const handleError = (error) => {
  if (error.response && error.response.data) {
    if (error.response.data.message) {
      return error.response.data.message;
    }
    
    if (error.response.data.errors && Array.isArray(error.response.data.errors)) {
      return error.response.data.errors[0];
    }
  }
  
  return error.message || 'Something went wrong';
};