const jwt = require('jsonwebtoken');
const config = require('../../config/default');
const logger = require('../../utils/logger');

/**
 * Verify JWT token middleware
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
module.exports = (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'No authentication token provided' });
    }

    const token = authHeader.split(' ')[1]; // "Bearer TOKEN"
    if (!token) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Verify token
    const decodedToken = jwt.verify(token, config.jwt.secret);
    
    // Add user ID to request object
    req.userId = decodedToken.userId;
    
    next();
  } catch (error) {
    logger.error('Auth middleware error:', error);
    return res.status(401).json({ message: 'Authentication failed' });
  }
};