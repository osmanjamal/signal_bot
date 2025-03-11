// src/services/binance.service.js
const Binance = require('node-binance-api');
const config = require('../config/default');
const cryptoService = require('./crypto.service');
const logger = require('../utils/logger');

/**
 * Create a Binance instance with user API keys
 * @param {Object} user - User object with encrypted API keys
 * @returns {Object} - Binance instance
 */
const createBinanceInstance = (user) => {
  // Decrypt API keys
  const apiKey = cryptoService.decrypt(user.binanceApiKey);
  const apiSecret = cryptoService.decrypt(user.binanceApiSecret);
  
  // Create Binance instance
  const binance = new Binance().options({
    APIKEY: apiKey,
    APISECRET: apiSecret,
    useServerTime: true,
    test: config.binance.testMode
  });
  
  return binance;
};

/**
 * Execute a market order on Binance
 * @param {Object} user - User object with encrypted API keys
 * @param {String} symbol - Trading pair symbol
 * @param {String} side - Order side (BUY or SELL)
 * @param {Number} quantity - Order quantity
 * @returns {Object} - Order result
 */
exports.executeMarketOrder = async (user, symbol, side, quantity) => {
  try {
    const binance = createBinanceInstance(user);
    
    // Execute market order
    let result;
    if (side === 'BUY') {
      result = await binance.marketBuy(symbol, quantity);
    } else {
      result = await binance.marketSell(symbol, quantity);
    }
    
    logger.info(`Market ${side} order executed for ${symbol}`, {
      symbol,
      side,
      quantity,
      orderId: result.orderId
    });
    
    return {
      success: true,
      orderId: result.orderId,
      executedQty: result.executedQty,
      details: result
    };
  } catch (error) {
    logger.error(`Error executing market ${side} order for ${symbol}:`, error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Get account information from Binance
 * @param {Object} user - User object with encrypted API keys
 * @returns {Object} - Account information
 */
exports.getAccountInfo = async (user) => {
  try {
    const binance = createBinanceInstance(user);
    
    // Get account information
    const accountInfo = await binance.balance();
    
    return {
      success: true,
      balances: accountInfo
    };
  } catch (error) {
    logger.error('Error getting account information:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Get open orders from Binance
 * @param {Object} user - User object with encrypted API keys
 * @param {String} symbol - Trading pair symbol (optional)
 * @returns {Object} - Open orders
 */
exports.getOpenOrders = async (user, symbol = null) => {
  try {
    const binance = createBinanceInstance(user);
    
    // Get open orders
    const openOrders = symbol 
      ? await binance.openOrders(symbol)
      : await binance.openOrders();
    
    return {
      success: true,
      orders: openOrders
    };
  } catch (error) {
    logger.error('Error getting open orders:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Test Binance API connection
 * @param {String} apiKey - Binance API key
 * @param {String} apiSecret - Binance API secret
 * @returns {Object} - Test result
 */
exports.testConnection = async (apiKey, apiSecret) => {
  try {
    // Create temporary Binance instance
    const binance = new Binance().options({
      APIKEY: apiKey,
      APISECRET: apiSecret,
      useServerTime: true,
      test: config.binance.testMode
    });
    
    // Test connection with ping
    await binance.ping();
    
    // Get account information to verify API key permissions
    const accountInfo = await binance.accountInfo();
    
    return {
      success: true,
      message: 'Connection successful',
      canTrade: accountInfo.canTrade
    };
  } catch (error) {
    logger.error('Error testing Binance connection:', error);
    return {
      success: false,
      error: error.message
    };
  }
};