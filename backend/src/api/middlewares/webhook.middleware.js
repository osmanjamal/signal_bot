const jwt = require('jsonwebtoken');
const Bot = require('../../models/Bot');
const config = require('../../config/default');
const logger = require('../../utils/logger');

/**
 * Verify webhook secret middleware
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
module.exports = async (req, res, next) => {
  try {
    const botUuid = req.params.uuid;
    const providedSecret = req.body.secret;
    
    // Check if secret is provided
    if (!providedSecret) {
      logger.warn(`Webhook received without secret for bot UUID: ${botUuid}`);
      return res.status(401).json({ message: 'No secret provided' });
    }
    
    // Find bot by UUID
    const bot = await Bot.findOne({ uuid: botUuid });
    if (!bot) {
      logger.warn(`Webhook received for unknown bot UUID: ${botUuid}`);
      return res.status(404).json({ message: 'Bot not found' });
    }
    
    // Verify secret
    if (providedSecret !== bot.secret) {
      logger.warn(`Invalid webhook secret provided for bot UUID: ${botUuid}`);
      return res.status(401).json({ message: 'Invalid secret' });
    }
    
    // Add bot ID to request object
    req.botId = bot._id;
    
    next();
  } catch (error) {
    logger.error('Webhook middleware error:', error);
    return res.status(401).json({ message: 'Authentication failed' });
  }
};