const logger = require('../utils/logger');

/**
 * Validate TradingView webhook payload
 * @param {Object} payload - Webhook payload
 * @returns {Object} - Validation result
 */
exports.validateWebhookPayload = (payload) => {
  // Required fields
  const requiredFields = ['action', 'tv_instrument', 'timestamp'];
  
  // Check required fields
  for (const field of requiredFields) {
    if (!payload[field]) {
      return {
        valid: false,
        error: `Missing required field: ${field}`
      };
    }
  }
  
  // Validate action
  if (!['buy', 'sell'].includes(payload.action.toLowerCase())) {
    return {
      valid: false,
      error: `Invalid action: ${payload.action}`
    };
  }
  
  // Validate timestamp (should be within a reasonable timeframe)
  const timestamp = parseInt(payload.timestamp);
  const now = Date.now();
  const maxLag = parseInt(payload.max_lag) || 300; // Default 5 minutes
  
  if (isNaN(timestamp) || Math.abs(now - timestamp) > maxLag * 1000) {
    return {
      valid: false,
      error: `Timestamp is outside acceptable range: ${payload.timestamp}`
    };
  }
  
  return {
    valid: true
  };
};

/**
 * Format TradingView signal for storage
 * @param {Object} payload - Webhook payload
 * @returns {Object} - Formatted signal
 */
exports.formatSignal = (payload) => {
  return {
    action: payload.action.toLowerCase(),
    symbol: payload.tv_instrument,
    exchange: payload.tv_exchange || 'binance',
    price: parseFloat(payload.trigger_price) || 0,
    timestamp: parseInt(payload.timestamp) || Date.now(),
    strategyInfo: payload.strategy_info || {},
    orderDetails: payload.order || {}
  };
};

/**
 * Generate TradingView webhook URL
 * @param {String} baseUrl - Base URL of the API
 * @param {String} botUuid - Bot UUID
 * @returns {String} - Webhook URL
 */
exports.generateWebhookUrl = (baseUrl, botUuid) => {
  return `${baseUrl}/api/webhook/${botUuid}`;
};

/**
 * Generate TradingView Pine Script webhook code
 * @param {String} webhookUrl - Webhook URL
 * @param {String} secret - Bot secret
 * @returns {String} - Pine Script code
 */
exports.generatePineScriptCode = (webhookUrl, secret) => {
  return `
// TradingView Webhook Code
webhook_url = "${webhookUrl}"
secret = "${secret}"

// This function sends alerts to Signal Bot
alertMessage() =>
    json.encode({
        "secret": secret,
        "max_lag": "300",
        "timestamp": str.tostring(timenow),
        "trigger_price": str.tostring(close),
        "tv_exchange": exchange,
        "tv_instrument": ticker,
        "action": strategy.order.action,
        "strategy_info": {
            "market_position": strategy.market_position,
            "market_position_size": strategy.market_position_size,
            "prev_market_position": strategy.prev_market_position,
            "prev_market_position_size": strategy.prev_market_position_size
        },
        "order": {
            "amount": str.tostring(strategy.order.contracts),
            "currency_type": "base"
        }
    })

// Example usage in your strategy
if (strategy.position_size != strategy.position_size[1])
    alert(alertMessage())
`;
};