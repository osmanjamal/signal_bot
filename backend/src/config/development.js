module.exports = {
    // Override default configuration for development environment
    corsOrigin: 'http://localhost:3000',
    
    // Database configuration
    database: {
      url: 'mongodb://localhost:27017/signal-bot-dev'
    },
    
    // Binance configuration
    binance: {
      testMode: true
    },
    
    // Logging configuration
    logging: {
      level: 'debug'
    }
  };