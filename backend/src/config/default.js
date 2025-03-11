require('dotenv').config();

module.exports = {
  // Server configuration
  port: process.env.PORT || 5000,
  
  // CORS configuration
  corsOrigin: process.env.CORS_ORIGIN || '*',
  
  // Database configuration
  database: {
    url: process.env.MONGODB_URI || 'mongodb://localhost:27017/signal-bot',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  
  // JWT configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key-for-development',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    webhookSecret: process.env.WEBHOOK_SECRET || 'webhook-secret-key-for-development'
  },
  
  // Crypto configuration
  crypto: {
    algorithm: 'aes-256-cbc',
    secretKey: process.env.CRYPTO_SECRET_KEY || 'your-crypto-secret-key-for-development',
    iv: process.env.CRYPTO_IV || 'your-crypto-iv-for-development'
  },
  
  // Binance configuration
  binance: {
    baseUrl: 'https://api.binance.com',
    testMode: process.env.BINANCE_TEST_MODE === 'true'
  },
  
  // Logging configuration
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    file: process.env.LOG_FILE || 'app.log'
  }
};