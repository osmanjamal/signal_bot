import api from './api.js';

/**
 * Update user profile
 * @param {Object} profileData - Profile data
 * @returns {Promise} - Promise with response
 */
export const updateProfile = async (profileData) => {
  try {
    const response = await api.put('/users/profile', profileData);
    return response.data.user;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Change user password
 * @param {Object} passwordData - Password data
 * @returns {Promise} - Promise with response
 */
export const changePassword = async (passwordData) => {
  try {
    const response = await api.put('/users/password', passwordData);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Set API keys
 * @param {Object} apiKeysData - API keys data
 * @returns {Promise} - Promise with response
 */
export const setApiKeys = async (apiKeysData) => {
  try {
    const response = await api.post('/users/api-keys', apiKeysData);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Test API connection
 * @param {Object} apiKeysData - API keys data
 * @returns {Promise} - Promise with response
 */
export const testApiConnection = async (apiKeysData = null) => {
  try {
    const response = apiKeysData 
      ? await api.post('/users/test-api-connection', apiKeysData)
      : await api.get('/users/test-api-connection');
      
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Check if user has API keys
 * @returns {Promise} - Promise with response
 */
export const hasApiKeys = async () => {
  try {
    const response = await api.get('/users/api-keys/status');
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
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