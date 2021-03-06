const { validationResult } = require('express-validator');

const validate = (validations) => async (req, res, next) => {
  await Promise.all(validations.map((validation) => validation.run(req)));

  const errors = validationResult(req);

  req.errors = [];
  if (!errors.isEmpty()) {
    res.status(500);
    req.errors = errors.array();
    console.log(req.errors);
  }
  next();
};

module.exports = validate;
