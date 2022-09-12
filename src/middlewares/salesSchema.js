const Joi = require('joi');

const saleInfo = Joi.object(
  {
    productId: Joi.number().min(1).required().messages({
      'any.required': '"productId" is required',
      'number.min': '"productId" must be greater than or equal to 1',
    }),
    quantity: Joi.number().min(1).required().messages({
      'any.required': '"quantity" is required',
      'number.min': '"quantity" must be greater than or equal to 1',
    }),
  },
);

const salesSchema = Joi.array().items(
  saleInfo,
);

module.exports = {
  salesSchema,
};