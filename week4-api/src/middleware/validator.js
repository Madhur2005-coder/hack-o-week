const Joi = require('joi');

const chatSchema = Joi.object({
  question: Joi.string().min(1).max(500).required(),
});

const processSchema = Joi.object({
  text: Joi.string().min(1).max(1000).required(),
});

const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message,
      });
    }
    req.body = value;
    next();
  };
};

module.exports = {
  validate,
  chatSchema,
  processSchema,
};
