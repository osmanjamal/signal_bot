// src/store/actions/botActions.js
import {
    getAllBots,
    getBotById as getBotByIdService,
    createBot as createBotService,
    updateBot as updateBotService,
    deleteBot as deleteBotService,
    regenerateSecret as regenerateSecretService
  } from '../../services/bot.service';
  
  // Action types
  export const BOT_FETCH_START = 'BOT_FETCH_START';
  export const BOT_FETCH_SUCCESS = 'BOT_FETCH_SUCCESS';
  export const BOT_FETCH_FAIL = 'BOT_FETCH_FAIL';
  
  export const BOT_DETAILS_FETCH_START = 'BOT_DETAILS_FETCH_START';
  export const BOT_DETAILS_FETCH_SUCCESS = 'BOT_DETAILS_FETCH_SUCCESS';
  export const BOT_DETAILS_FETCH_FAIL = 'BOT_DETAILS_FETCH_FAIL';
  
  export const BOT_CREATE_START = 'BOT_CREATE_START';
  export const BOT_CREATE_SUCCESS = 'BOT_CREATE_SUCCESS';
  export const BOT_CREATE_FAIL = 'BOT_CREATE_FAIL';
  
  export const BOT_UPDATE_START = 'BOT_UPDATE_START';
  export const BOT_UPDATE_SUCCESS = 'BOT_UPDATE_SUCCESS';
  export const BOT_UPDATE_FAIL = 'BOT_UPDATE_FAIL';
  
  export const BOT_DELETE_START = 'BOT_DELETE_START';
  export const BOT_DELETE_SUCCESS = 'BOT_DELETE_SUCCESS';
  export const BOT_DELETE_FAIL = 'BOT_DELETE_FAIL';
  
  export const BOT_REGEN_SECRET_START = 'BOT_REGEN_SECRET_START';
  export const BOT_REGEN_SECRET_SUCCESS = 'BOT_REGEN_SECRET_SUCCESS';
  export const BOT_REGEN_SECRET_FAIL = 'BOT_REGEN_SECRET_FAIL';
  
  export const BOT_CLEAR_ERROR = 'BOT_CLEAR_ERROR';
  
  /**
   * Get all bots action
   * @returns {Function} - Thunk function
   */
  export const getBots = () => {
    return async (dispatch) => {
      dispatch({ type: BOT_FETCH_START });
      
      try {
        const bots = await getAllBots();
        
        dispatch({
          type: BOT_FETCH_SUCCESS,
          payload: bots
        });
      } catch (error) {
        dispatch({
          type: BOT_FETCH_FAIL,
          payload: error
        });
      }
    };
  };
  
  /**
   * Get bot by ID action
   * @param {String} id - Bot ID
   * @returns {Function} - Thunk function
   */
  export const getBotById = (id) => {
    return async (dispatch) => {
      dispatch({ type: BOT_DETAILS_FETCH_START });
      
      try {
        const bot = await getBotByIdService(id);
        
        dispatch({
          type: BOT_DETAILS_FETCH_SUCCESS,
          payload: bot
        });
      } catch (error) {
        dispatch({
          type: BOT_DETAILS_FETCH_FAIL,
          payload: error
        });
      }
    };
  };
  
  /**
   * Create bot action
   * @param {Object} botData - Bot data
   * @param {Function} callback - Optional callback function
   * @returns {Function} - Thunk function
   */
  export const createBot = (botData, callback) => {
    return async (dispatch) => {
      dispatch({ type: BOT_CREATE_START });
      
      try {
        const bot = await createBotService(botData);
        
        dispatch({
          type: BOT_CREATE_SUCCESS,
          payload: bot
        });
        
        if (callback) callback();
      } catch (error) {
        dispatch({
          type: BOT_CREATE_FAIL,
          payload: error
        });
      }
    };
  };
  
  /**
   * Update bot action
   * @param {String} id - Bot ID
   * @param {Object} botData - Bot data
   * @param {Function} callback - Optional callback function
   * @returns {Function} - Thunk function
   */
  export const updateBot = (id, botData, callback) => {
    return async (dispatch) => {
      dispatch({ type: BOT_UPDATE_START });
      
      try {
        const bot = await updateBotService(id, botData);
        
        dispatch({
          type: BOT_UPDATE_SUCCESS,
          payload: bot
        });
        
        if (callback) callback();
      } catch (error) {
        dispatch({
          type: BOT_UPDATE_FAIL,
          payload: error
        });
      }
    };
  };
  
  /**
   * Delete bot action
   * @param {String} id - Bot ID
   * @param {Function} callback - Optional callback function
   * @returns {Function} - Thunk function
   */
  export const deleteBot = (id, callback) => {
    return async (dispatch) => {
      dispatch({ type: BOT_DELETE_START });
      
      try {
        await deleteBotService(id);
        
        dispatch({
          type: BOT_DELETE_SUCCESS,
          payload: id
        });
        
        if (callback) callback();
      } catch (error) {
        dispatch({
          type: BOT_DELETE_FAIL,
          payload: error
        });
      }
    };
  };
  
  /**
   * Regenerate bot secret action
   * @param {String} id - Bot ID
   * @param {Function} callback - Optional callback function
   * @returns {Function} - Thunk function
   */
  export const regenerateBotSecret = (id, callback) => {
    return async (dispatch) => {
      dispatch({ type: BOT_REGEN_SECRET_START });
      
      try {
        const data = await regenerateSecretService(id);
        
        dispatch({
          type: BOT_REGEN_SECRET_SUCCESS,
          payload: {
            id,
            secret: data.secret
          }
        });
        
        if (callback) callback();
      } catch (error) {
        dispatch({
          type: BOT_REGEN_SECRET_FAIL,
          payload: error
        });
      }
    };
  };
  
  /**
   * Clear bot error action
   * @returns {Object} - Action object
   */
  export const clearBotError = () => {
    return {
      type: BOT_CLEAR_ERROR
    };
  };