module.exports = {
    // Override default configuration for production environment
    corsOrigin: process.env.CORS_ORIGIN,
    
    // Database configuration
    database: {
      url: process.env.MONGODB_URI
    },
    
    // Binance configuration
    binance: {
      testMode: false
    },
    
    // Logging configuration
    logging: {
      level: 'info'
    }
  };