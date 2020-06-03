const express = require('express');
const controllers = require('./post.controllers');
const { protect } = require('../../utils/auth');
const { postValidationRules, validate } = require('../../utils/validator');
const router = express.Router();

router
  .route('/')
  .get(controllers.getMany)
  .post(protect, postValidationRules(), validate, controllers.createOne);

router
  .route('/:id')
  .get(controllers.getOne)
  .put(protect, postValidationRules(), validate, controllers.updateOne)
  .delete(protect, controllers.removeOne);

module.exports = router;
