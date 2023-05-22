'use strict';
const { home, about, post, search } = require('../controllers/main');
const express = require('express'),
  router = express.Router();


router.route('/').get(home);
router.route('/about').get(about);
router.route('/post/:id').get(post);
router.route('/search').post(search);

module.exports = router;