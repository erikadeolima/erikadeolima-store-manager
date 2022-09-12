const schema = require('./salesSchema');

function salesMiddleware(req, res, next) {
  const validate = schema.salesSchema.validate(req.body);
  
 if (validate.error) {
    if (validate.error.details[0].type === 'any.required') {
    res.status(400).json({ message: validate.error.details[0].message });
    } else {
    res.status(422).json({ message: validate.error.details[0].message });
    }
  } else {
    next();
  }
}

module.exports = salesMiddleware;