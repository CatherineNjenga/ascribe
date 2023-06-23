'use strict';
const { home, about, post, search, contact } = require('../controllers/main');
const express = require('express'),
  router = express.Router();


router.route('/').get(home);
router.route('/about').get(about);
router.route('/post/:id').get(post);
router.route('/search').post(search);
router.route('/contact').get(contact);


module.exports = router;