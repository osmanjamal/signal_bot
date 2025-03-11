import api from './api.js';

/**
 * Get account balance
 * @returns {Promise} - Promise with response
 */
export const getAccountBalance = async () => {
  try {
    const response = await api.get('/users/balance');
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Get open orders
 * @returns {Promise} - Promise with response
 */
export const getAccountOpenOrders = async () => {
  try {
    const response = await api.get('/users/open-orders');
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Test API connection
 * @param {Object} apiKeys - API keys
 * @returns {Promise} - Promise with response
 */
export const testApiConnection = async (apiKeys = null) => {
  try {
    const response = apiKeys 
      ? await api.post('/users/test-api-connection', apiKeys)
      : await api.get('/users/test-api-connection');
      
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