const schema = require('./productSchema');

function productMiddleware(req, res, next) {
  const validate = schema.productSchema.validate(req.body);

  if (validate.error) {
    if (validate.error.details[0].type === 'string.min') {
    res.status(422).json({ message: validate.error.details[0].message });
    } else {
    res.status(400).json({ message: validate.error.details[0].message });
    }
  } else {
    next();
  }
}

module.exports = productMiddleware;