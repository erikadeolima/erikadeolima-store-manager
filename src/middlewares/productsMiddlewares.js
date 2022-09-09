const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().min(5).max(30).required(),
});

module.exports = {
  productSchema,
};