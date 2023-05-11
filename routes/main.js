'use strict';
const { home } = require('../controllers/main');
const express = require('express'),
  router = express.Router();


router.get('/', home);

module.exports = router;