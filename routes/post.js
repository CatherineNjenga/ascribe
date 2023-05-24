'use strict';
const { dashboard } = require('../controllers/post');
const express = require('express'),
  router = express.Router();

router.route('/dashboard').get(dashboard);

module.exports = router;


