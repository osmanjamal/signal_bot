const config = {
    // API URL
    apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
    
    // Auth
    tokenKey: 'signal_bot_token',
    tokenExpiry: 7 * 24 * 60 * 60 * 1000, // 7 days
    
    // Pagination
    defaultPageSize: 10,
    
    // TradingView
    tradingViewUrl: 'https://www.tradingview.com',
    
    // Binance
    binanceUrl: 'https://www.binance.com',
  };
  
  export default config;