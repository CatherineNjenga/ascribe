'use strict';
const { adminPanel, adminRegister, register, login } = require('../controllers/admin');
const express = require('express'),
  router = express.Router();

router.route('/admin').get(adminPanel);
router.route('/register').get(adminRegister);
router.route('/register').post(register);
router.route('/login').post(login);


module.exports = router;