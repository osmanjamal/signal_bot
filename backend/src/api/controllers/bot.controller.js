const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const Bot = require('../../models/Bot');
const User = require('../../models/User');
const logger = require('../../utils/logger');
const config = require('../../config/default');
const cryptoService = require('../../services/crypto.service');

/**
 * Create a new bot
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.createBot = async (req, res) => {
  try {
    const { name, description, pairs } = req.body;
    
    // Generate UUID for bot
    const botUuid = uuidv4();
    
    // Generate secret for webhook authentication
    const payload = { 
      signals_source_id: Date.now() 
    };
    
    const secret = jwt.sign(
      payload,
      config.jwt.webhookSecret,
      { noTimestamp: true }
    );

    // Create new bot
    const bot = new Bot({
      name,
      description,
      pairs,
      userId: req.userId,
      uuid: botUuid,
      secret
    });

    // Save bot to database
    await bot.save();

    res.status(201).json({
      message: 'Bot created successfully',
      bot: {
        id: bot._id,
        name: bot.name,
        description: bot.description,
        pairs: bot.pairs,
        uuid: bot.uuid,
        secret: bot.secret,
        createdAt: bot.createdAt
      }
    });
  } catch (error) {
    logger.error('Error in createBot controller:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Get all bots for current user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getBots = async (req, res) => {
  try {
    const bots = await Bot.find({ userId: req.userId });
    
    res.status(200).json({
      bots: bots.map(bot => ({
        id: bot._id,
        name: bot.name,
        description: bot.description,
        pairs: bot.pairs,
        uuid: bot.uuid,
        status: bot.status,
        createdAt: bot.createdAt,
        updatedAt: bot.updatedAt
      }))
    });
  } catch (error) {
    logger.error('Error in getBots controller:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Get a specific bot by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getBotById = async (req, res) => {
  try {
    const botId = req.params.id;
    
    const bot = await Bot.findOne({ _id: botId, userId: req.userId });
    if (!bot) {
      return res.status(404).json({ message: 'Bot not found' });
    }
    
    res.status(200).json({
      bot: {
        id: bot._id,
        name: bot.name,
        description: bot.description,
        pairs: bot.pairs,
        uuid: bot.uuid,
        secret: bot.secret,
        status: bot.status,
        createdAt: bot.createdAt,
        updatedAt: bot.updatedAt
      }
    });
  } catch (error) {
    logger.error('Error in getBotById controller:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Update a bot
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.updateBot = async (req, res) => {
  try {
    const botId = req.params.id;
    const { name, description, pairs, status } = req.body;
    
    const bot = await Bot.findOne({ _id: botId, userId: req.userId });
    if (!bot) {
      return res.status(404).json({ message: 'Bot not found' });
    }
    
    // Update bot fields
    if (name) bot.name = name;
    if (description) bot.description = description;
    if (pairs) bot.pairs = pairs;
    if (status) bot.status = status;
    
    // Save updated bot
    await bot.save();
    
    res.status(200).json({
      message: 'Bot updated successfully',
      bot: {
        id: bot._id,
        name: bot.name,
        description: bot.description,
        pairs: bot.pairs,
        uuid: bot.uuid,
        status: bot.status,
        createdAt: bot.createdAt,
        updatedAt: bot.updatedAt
      }
    });
  } catch (error) {
    logger.error('Error in updateBot controller:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Delete a bot
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.deleteBot = async (req, res) => {
  try {
    const botId = req.params.id;
    
    const bot = await Bot.findOne({ _id: botId, userId: req.userId });
    if (!bot) {
      return res.status(404).json({ message: 'Bot not found' });
    }
    
    // Delete bot
    await bot.remove();
    
    res.status(200).json({ message: 'Bot deleted successfully' });
  } catch (error) {
    logger.error('Error in deleteBot controller:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Regenerate bot secret
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.regenerateSecret = async (req, res) => {
  try {
    const botId = req.params.id;
    
    const bot = await Bot.findOne({ _id: botId, userId: req.userId });
    if (!bot) {
      return res.status(404).json({ message: 'Bot not found' });
    }
    
    // Generate new secret
    const payload = { 
      signals_source_id: Date.now() 
    };
    
    const secret = jwt.sign(
      payload,
      config.jwt.webhookSecret,
      { noTimestamp: true }
    );
    
    // Update bot secret
    bot.secret = secret;
    await bot.save();
    
    res.status(200).json({
      message: 'Bot secret regenerated successfully',
      secret: bot.secret
    });
  } catch (error) {
    logger.error('Error in regenerateSecret controller:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};