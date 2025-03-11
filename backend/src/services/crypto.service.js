const crypto = require('crypto');
const config = require('../config/default');

// Convert string to buffer for IV
const getIV = () => {
  // IV should be 16 bytes for AES-256-CBC
  return Buffer.from(config.crypto.iv.padEnd(16, '0').slice(0, 16));
};

// Get encryption key
const getKey = () => {
  // Key should be 32 bytes for AES-256-CBC
  return crypto.scryptSync(config.crypto.secretKey, 'salt', 32);
};

/**
 * Encrypt a string
 * @param {String} text - Text to encrypt
 * @returns {String} - Encrypted text
 */
exports.encrypt = (text) => {
  if (!text) return null;
  
  const iv = getIV();
  const key = getKey();
  const cipher = crypto.createCipheriv(config.crypto.algorithm, key, iv);
  
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  return encrypted;
};

/**
 * Decrypt a string
 * @param {String} encryptedText - Encrypted text
 * @returns {String} - Decrypted text
 */
exports.decrypt = (encryptedText) => {
  if (!encryptedText) return null;
  
  const iv = getIV();
  const key = getKey();
  const decipher = crypto.createDecipheriv(config.crypto.algorithm, key, iv);
  
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
};

/**
 * Hash a string using SHA-256
 * @param {String} text - Text to hash
 * @returns {String} - Hashed text
 */
exports.hash = (text) => {
  return crypto.createHash('sha256').update(text).digest('hex');
};

/**
 * Generate a random string
 * @param {Number} length - Length of the string
 * @returns {String} - Random string
 */
exports.generateRandomString = (length = 32) => {
  return crypto.randomBytes(length).toString('hex').slice(0, length);
};