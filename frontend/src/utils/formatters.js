/**
 * Format currency value
 * @param {Number} value - Value to format
 * @param {String} currency - Currency code
 * @returns {String} - Formatted currency
 */
export const formatCurrency = (value, currency = 'USD') => {
    if (value === undefined || value === null) return '-';
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };
  
  /**
   * Format date
   * @param {String|Number|Date} date - Date to format
   * @returns {String} - Formatted date
   */
  export const formatDate = (date) => {
    if (!date) return '-';
    
    const dateObj = new Date(date);
    
    return dateObj.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  /**
   * Format number with commas
   * @param {Number} value - Value to format
   * @param {Number} decimals - Number of decimal places
   * @returns {String} - Formatted number
   */
  export const formatNumber = (value, decimals = 2) => {
    if (value === undefined || value === null) return '-';
    
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(value);
  };
  
  /**
   * Format percentage
   * @param {Number} value - Value to format
   * @param {Number} decimals - Number of decimal places
   * @returns {String} - Formatted percentage
   */
  export const formatPercentage = (value, decimals = 2) => {
    if (value === undefined || value === null) return '-';
    
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(value / 100);
  };
  
  /**
   * Truncate text
   * @param {String} text - Text to truncate
   * @param {Number} length - Maximum length
   * @returns {String} - Truncated text
   */
  export const truncateText = (text, length = 50) => {
    if (!text) return '';
    
    if (text.length <= length) return text;
    
    return `${text.substring(0, length)}...`;
  };