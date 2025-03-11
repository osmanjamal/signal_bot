const Joi = require('joi');

/**
 * Validate update profile request
 */
exports.updateProfile = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: 'Validation error',
      errors: error.details.map(err => err.message)
    });
  }

  next();
};

/**
 * Validate change password request
 */
exports.changePassword = (req, res, next) => {
  const schema = Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().min(8).required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: 'Validation error',
      errors: error.details.map(err => err.message)
    });
  }

  next();
};

/**
 * Validate set API keys request
 */
exports.setApiKeys = (req, res, next) => {
  const schema = Joi.object({
    apiKey: Joi.string().required(),
    apiSecret: Joi.string().required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: 'Validation error',
      errors: error.details.map(err => err.message)
    });
  }

  next();
};