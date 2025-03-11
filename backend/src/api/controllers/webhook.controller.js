const Bot = require('../../models/Bot');
const Signal = require('../../models/Signal');
const User = require('../../models/User');
const logger = require('../../utils/logger');
const binanceService = require('../../services/binance.service');
const signalService = require('../../services/signal.service');

/**
 * Process incoming webhook from TradingView
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.processWebhook = async (req, res) => {
  try {
    const botUuid = req.params.uuid;
    const payload = req.body;
    
    // Find bot by UUID
    const bot = await Bot.findOne({ uuid: botUuid });
    if (!bot) {
      logger.warn(`Webhook received for unknown bot UUID: ${botUuid}`);
      return res.status(404).json({ message: 'Bot not found' });
    }
    
    // Check if bot is active
    if (bot.status !== 'active') {
      logger.warn(`Webhook received for inactive bot: ${bot.name} (${botUuid})`);
      return res.status(403).json({ message: 'Bot is inactive' });
    }
    
    // Find user
    const user = await User.findById(bot.userId);
    if (!user) {
      logger.error(`Bot owner not found for bot: ${bot.name} (${botUuid})`);
      return res.status(500).json({ message: 'Bot owner not found' });
    }
    
    // Validate the payload
    if (!payload.action || !payload.tv_instrument) {
      logger.warn(`Invalid webhook payload received for bot: ${bot.name} (${botUuid})`);
      return res.status(400).json({ message: 'Invalid webhook payload' });
    }
    
    // Log the signal
    const signal = new Signal({
      botId: bot._id,
      userId: user._id,
      action: payload.action,
      symbol: payload.tv_instrument,
      exchange: payload.tv_exchange || 'binance',
      price: payload.trigger_price,
      rawData: payload
    });
    
    await signal.save();
    logger.info(`Signal received for bot ${bot.name}: ${payload.action} ${payload.tv_instrument} at ${payload.trigger_price}`);
    
    // Process the signal (execute trade)
    if (user.binanceApiKey && user.binanceApiSecret) {
      try {
        const result = await signalService.processSignal(signal, user, bot);
        
        // Update signal with execution result
        signal.status = result.success ? 'executed' : 'failed';
        signal.executionDetails = result;
        await signal.save();
        
        logger.info(`Signal executed for bot ${bot.name}: ${result.success ? 'Success' : 'Failed'}`);
      } catch (error) {
        signal.status = 'failed';
        signal.executionDetails = { error: error.message };
        await signal.save();
        
        logger.error(`Error executing signal for bot ${bot.name}:`, error);
      }
    } else {
      signal.status = 'pending';
      signal.executionDetails = { error: 'No API keys configured' };
      await signal.save();
      
      logger.warn(`No API keys configured for user of bot ${bot.name}`);
    }
    
    // Always respond with 200 to TradingView
    res.status(200).json({ message: 'Webhook received and processed' });
  } catch (error) {
    logger.error('Error processing webhook:', error);
    // Always respond with 200 to TradingView
    res.status(200).json({ message: 'Webhook received' });
  }
};

/**
 * Get signals for a specific bot
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getBotSignals = async (req, res) => {
  try {
    const botId = req.params.id;
    
    // Verify bot belongs to user
    const bot = await Bot.findOne({ _id: botId, userId: req.userId });
    if (!bot) {
      return res.status(404).json({ message: 'Bot not found' });
    }
    
    // Get signals with pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    
    const signals = await Signal.find({ botId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Signal.countDocuments({ botId });
    
    res.status(200).json({
      signals: signals.map(signal => ({
        id: signal._id,
        action: signal.action,
        symbol: signal.symbol,
        exchange: signal.exchange,
        price: signal.price,
        status: signal.status,
        executionDetails: signal.executionDetails,
        createdAt: signal.createdAt
      })),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    logger.error('Error in getBotSignals controller:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};