const { v4: uuidv4 } = require('uuid');

/**
 * Generate a UUID v4
 * @returns {String} - UUID v4
 */
exports.generateUuid = () => {
  return uuidv4();
};

/**
 * Validate a UUID
 * @param {String} uuid - UUID to validate
 * @returns {Boolean} - Validation result
 */
exports.validateUuid = (uuid) => {
  if (!uuid) return false;
  
  const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return regex.test(uuid);
};

/**
 * Generate a short UUID (first 8 characters)
 * @returns {String} - Short UUID
 */
exports.generateShortUuid = () => {
  return uuidv4().split('-')[0];
};