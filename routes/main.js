'use strict';
const { home, about } = require('../controllers/main');
const express = require('express'),
  router = express.Router();


router.route('/').get(home);
router.route('/about').get(about);

module.exports = router;