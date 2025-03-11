/**
 * Validate email format
 * @param {String} email - Email to validate
 * @returns {Boolean} - Validation result
 */
exports.isValidEmail = (email) => {
    if (!email) return false;
    
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  /**
   * Validate password strength
   * @param {String} password - Password to validate
   * @returns {Object} - Validation result
   */
  exports.validatePassword = (password) => {
    if (!password) {
      return {
        valid: false,
        error: 'Password is required'
      };
    }
    
    if (password.length < 8) {
      return {
        valid: false,
        error: 'Password must be at least 8 characters long'
      };
    }
    
    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      return {
        valid: false,
        error: 'Password must contain at least one uppercase letter'
      };
    }
    
    // Check for at least one lowercase letter
    if (!/[a-z]/.test(password)) {
      return {
        valid: false,
        error: 'Password must contain at least one lowercase letter'
      };
    }
    
    // Check for at least one number
    if (!/\d/.test(password)) {
      return {
        valid: false,
        error: 'Password must contain at least one number'
      };
    }
    
    return {
      valid: true
    };
  };
  
  /**
   * Validate trading pair format
   * @param {String} pair - Trading pair to validate
   * @returns {Boolean} - Validation result
   */
  exports.isValidTradingPair = (pair) => {
    if (!pair) return false;
    
    // Basic format validation (e.g., BTCUSDT, BTC/USDT, BTC-USDT)
    const regex = /^[A-Za-z0-9]{2,10}(\/|-)?[A-Za-z0-9]{2,10}$/;
    return regex.test(pair);
  };
  
  /**
   * Validate Binance API key format
   * @param {String} apiKey - API key to validate
   * @returns {Boolean} - Validation result
   */
  exports.isValidBinanceApiKey = (apiKey) => {
    if (!apiKey) return false;
    
    // Binance API keys are 64 characters long
    return apiKey.length === 64;
  };
  
  /**
   * Validate Binance API secret format
   * @param {String} apiSecret - API secret to validate
   * @returns {Boolean} - Validation result
   */
  exports.isValidBinanceApiSecret = (apiSecret) => {
    if (!apiSecret) return false;
    
    // Binance API secrets are 64 characters long
    return apiSecret.length === 64;
  };