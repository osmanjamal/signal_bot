/**
 * Application constants
 */
module.exports = {
    // User roles
    USER_ROLES: {
      USER: 'user',
      ADMIN: 'admin'
    },
    
    // Bot status
    BOT_STATUS: {
      ACTIVE: 'active',
      INACTIVE: 'inactive'
    },
    
    // Signal status
    SIGNAL_STATUS: {
      RECEIVED: 'received',
      PROCESSING: 'processing',
      EXECUTED: 'executed',
      FAILED: 'failed',
      PENDING: 'pending'
    },
    
    // Trade status
    TRADE_STATUS: {
      NEW: 'NEW',
      PARTIALLY_FILLED: 'PARTIALLY_FILLED',
      FILLED: 'FILLED',
      CANCELED: 'CANCELED',
      REJECTED: 'REJECTED',
      EXPIRED: 'EXPIRED'
    },
    
    // Trade sides
    TRADE_SIDES: {
      BUY: 'BUY',
      SELL: 'SELL'
    },
    
    // Trade types
    TRADE_TYPES: {
      MARKET: 'MARKET',
      LIMIT: 'LIMIT'
    },
    
    // Default pagination
    PAGINATION: {
      DEFAULT_PAGE: 1,
      DEFAULT_LIMIT: 20
    }
  };