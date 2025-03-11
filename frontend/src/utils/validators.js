/**
 * Validate email
 * @param {String} email - Email to validate
 * @returns {Boolean} - Is email valid
 */
export const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  /**
   * Validate password
   * @param {String} password - Password to validate
   * @returns {Boolean} - Is password valid
   */
  export const isValidPassword = (password) => {
    return password && password.length >= 8;
  };
  
  /**
   * Validate trading pair
   * @param {String} pair - Trading pair to validate
   * @returns {Boolean} - Is trading pair valid
   */
  export const isValidTradingPair = (pair) => {
    // Very basic validation, can be enhanced
    const regex = /^[A-Z0-9]{2,}$/;
    return regex.test(pair);
  };
  
  /**
   * Validate Binance API key
   * @param {String} apiKey - API key to validate
   * @returns {Boolean} - Is API key valid
   */
  export const isValidApiKey = (apiKey) => {
    // Basic validation - Binance API keys are usually 64 characters long
    return apiKey && apiKey.length === 64;
  };
  
  /**
   * Validate Binance API secret
   * @param {String} apiSecret - API secret to validate
   * @returns {Boolean} - Is API secret valid
   */
  export const isValidApiSecret = (apiSecret) => {
    // Basic validation - Binance API secrets are usually 64 characters long
    return apiSecret && apiSecret.length === 64;
  };
  
  /**
   * Validate URL
   * @param {String} url - URL to validate
   * @returns {Boolean} - Is URL valid
   */
  export const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };
  
  /**
   * Validate numeric value
   * @param {String|Number} value - Value to validate
   * @returns {Boolean} - Is value numeric
   */
  export const isNumeric = (value) => {
    return !isNaN(parseFloat(value)) && isFinite(value);
  };