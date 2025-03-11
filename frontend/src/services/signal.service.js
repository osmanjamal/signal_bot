import api from './api.js';

/**
 * Get signals
 * @param {Object} params - Query parameters
 * @returns {Promise} - Promise with response
 */
export const getSignals = async (params = {}) => {
  try {
    const response = await api.get('/signals', { params });
    return response.data.signals;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Get signals for a specific bot
 * @param {String} botId - Bot ID
 * @param {Object} params - Query parameters
 * @returns {Promise} - Promise with response
 */
export const getBotSignals = async (botId, params = {}) => {
  try {
    const response = await api.get(`/webhook/bot/${botId}/signals`, { params });
    return response.data.signals;
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