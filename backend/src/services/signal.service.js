const Signal = require('../models/Signal');
const Trade = require('../models/Trade');
const binanceService = require('./binance.service');
const logger = require('../utils/logger');

/**
 * Process a TradingView signal
 * @param {Object} signal - Signal object
 * @param {Object} user - User object
 * @param {Object} bot - Bot object
 * @returns {Object} - Processing result
 */
exports.processSignal = async (signal, user, bot) => {
  try {
    // Update signal status
    signal.status = 'processing';
    await signal.save();
    
    // Extract signal details
    const { action, symbol } = signal;
    const isBuy = action.toLowerCase() === 'buy';
    
    // Map TradingView symbol to Binance symbol if needed
    const binanceSymbol = mapToBinanceSymbol(symbol);
    
    // Default quantity (can be enhanced with position sizing logic)
    const quantity = 0.01; // This is a placeholder, should be calculated based on user settings
    
    // Execute order on Binance
    const orderResult = await binanceService.executeMarketOrder(
      user,
      binanceSymbol,
      isBuy ? 'BUY' : 'SELL',
      quantity
    );
    
    if (orderResult.success) {
      // Create trade record
      const trade = new Trade({
        userId: user._id,
        botId: bot._id,
        signalId: signal._id,
        orderId: orderResult.orderId,
        symbol: binanceSymbol,
        type: 'MARKET',
        side: isBuy ? 'BUY' : 'SELL',
        quantity: parseFloat(orderResult.executedQty),
        price: orderResult.details.price || signal.price,
        status: 'FILLED',
        executionDetails: orderResult.details
      });
      
      await trade.save();
      
      // Update bot statistics
      bot.stats.signals += 1;
      bot.stats.executed += 1;
      await bot.save();
      
      return {
        success: true,
        trade: trade._id,
        orderId: orderResult.orderId,
        executedQty: orderResult.executedQty
      };
    } else {
      // Update bot statistics
      bot.stats.signals += 1;
      bot.stats.failed += 1;
      await bot.save();
      
      return {
        success: false,
        error: orderResult.error
      };
    }
  } catch (error) {
    logger.error('Error processing signal:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Map TradingView symbol to Binance symbol
 * @param {String} tvSymbol - TradingView symbol
 * @returns {String} - Binance symbol
 */
function mapToBinanceSymbol(tvSymbol) {
  // Remove any exchange prefix (e.g., BINANCE:BTCUSDT -> BTCUSDT)
  const cleanSymbol = tvSymbol.includes(':') 
    ? tvSymbol.split(':')[1] 
    : tvSymbol;
  
  // Replace any special formatting
  return cleanSymbol.replace(/\//g, '');
}

/**
 * Get signals for a user
 * @param {String} userId - User ID
 * @param {Object} options - Query options
 * @returns {Array} - Signals
 */
exports.getUserSignals = async (userId, options = {}) => {
  const { page = 1, limit = 20, status, botId } = options;
  const skip = (page - 1) * limit;
  
  // Build query
  const query = { userId };
  if (status) query.status = status;
  if (botId) query.botId = botId;
  
  try {
    const signals = await Signal.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Signal.countDocuments(query);
    
    return {
      signals,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  } catch (error) {
    logger.error('Error getting user signals:', error);
    throw error;
  }
};