const Joi = require('joi');

/**
 * Validate create bot request
 */
exports.createBot = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().allow(''),
    pairs: Joi.array().items(Joi.string()).min(1).required()
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
 * Validate update bot request
 */
exports.updateBot = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string(),
    description: Joi.string().allow(''),
    pairs: Joi.array().items(Joi.string()).min(1),
    status: Joi.string().valid('active', 'inactive')
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