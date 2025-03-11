import api from './api.js';

/**
 * Get all bots
 * @returns {Promise} - Promise with response
 */
export const getAllBots = async () => {
  try {
    const response = await api.get('/bots');
    return response.data.bots;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Get bot by ID
 * @param {String} id - Bot ID
 * @returns {Promise} - Promise with response
 */
export const getBotById = async (id) => {
  try {
    const response = await api.get(`/bots/${id}`);
    return response.data.bot;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Create new bot
 * @param {Object} botData - Bot data
 * @returns {Promise} - Promise with response
 */
export const createBot = async (botData) => {
  try {
    const response = await api.post('/bots', botData);
    return response.data.bot;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Update bot
 * @param {String} id - Bot ID
 * @param {Object} botData - Bot data
 * @returns {Promise} - Promise with response
 */
export const updateBot = async (id, botData) => {
  try {
    const response = await api.put(`/bots/${id}`, botData);
    return response.data.bot;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Delete bot
 * @param {String} id - Bot ID
 * @returns {Promise} - Promise with response
 */
export const deleteBot = async (id) => {
  try {
    const response = await api.delete(`/bots/${id}`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Regenerate bot secret
 * @param {String} id - Bot ID
 * @returns {Promise} - Promise with response
 */
export const regenerateSecret = async (id) => {
  try {
    const response = await api.post(`/bots/${id}/regenerate-secret`);
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