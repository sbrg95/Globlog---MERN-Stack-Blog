const { body, validationResult } = require('express-validator');

const postValidationRules = () => {
  return [
    body('title', 'Post title required').notEmpty(),
    body('description', 'Post description required').notEmpty(),
    body('body', 'Post body required').notEmpty(),
  ];
};

const signupValidationRules = () => {
  return [
    body('name', 'Name required').notEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password required with at least 5 characters').isLength({
      min: 5,
    }),
  ];
};

const signinValidationRules = () => {
  return [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password required with at least 5 characters').isLength({
      min: 5,
    }),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  postValidationRules,
  signupValidationRules,
  signinValidationRules,
  validate,
};
