const express = require('express');
const controllers = require('./user.controllers');
const { protect } = require('../../utils/auth');
const router = express.Router();

router.route('/').get(protect, controllers.getUser);

module.exports = router;
