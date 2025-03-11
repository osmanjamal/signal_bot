const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const cryptoService = require('../../services/crypto.service');
const logger = require('../../utils/logger');

/**
 * Update user profile
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.updateProfile = async (req, res) => {
  try {
    const { name } = req.body;
    
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Update user fields
    if (name) user.name = name;
    
    // Save updated user
    await user.save();
    
    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    logger.error('Error in updateProfile controller:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Change user password
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }
    
    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    // Update password
    user.password = hashedPassword;
    await user.save();
    
    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    logger.error('Error in changePassword controller:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Set Binance API keys
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.setApiKeys = async (req, res) => {
  try {
    const { apiKey, apiSecret } = req.body;
    
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Encrypt API keys
    user.binanceApiKey = cryptoService.encrypt(apiKey);
    user.binanceApiSecret = cryptoService.encrypt(apiSecret);
    
    // Save updated user
    await user.save();
    
    res.status(200).json({ message: 'API keys saved successfully' });
  } catch (error) {
    logger.error('Error in setApiKeys controller:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Check if user has API keys set
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.hasApiKeys = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const hasKeys = Boolean(user.binanceApiKey && user.binanceApiSecret);
    
    res.status(200).json({ hasKeys });
  } catch (error) {
    logger.error('Error in hasApiKeys controller:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};