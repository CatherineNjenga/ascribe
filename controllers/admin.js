'use strict';
const Post = require('../models/Post');
const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');

// Layout to render
const adminLayout = '../views/layouts/admin';

/**
 * GET
 * Admin
 */

const adminPanel = async (req, res) => {
  const locals = {
    title: "Admin",
    description: "A blog built with NodeJS, Express and MongoDB",
  };

  res.render('admin/index', { locals, layout: adminLayout });
};

/**
 * GET
 * Admin -Register
 */

const adminRegister = async (req, res) => {
  const locals = {
    title: "Admin",
    description: "A blog built with NodeJS, Express and MongoDB",
  };

  res.render('admin/register', { locals, layout: adminLayout });
};

/**
 * POST
 * Register
 */

const register = async (req, res) => {
  // 3. create user
  const user = await User.create({...req.body});
  // 4. create token 
  const token =  user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: {name: user.username}, token});
};

/**
 * POST
 * Login
 */

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(StatusCodes.UNAUTHORIZED).send('Unauthorized Credentials');
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(StatusCodes.UNAUTHORIZED).send('Unauthorized Credentials');
  }

  const isPasswordMatch = await user.comparePasswords(password);

  if (!isPasswordMatch) {
    return res.status(StatusCodes.UNAUTHORIZED).send('Unauthorized Credentials');
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: {name: user.username}, token });
};

module.exports = {
  adminPanel,
  adminRegister,
  register,
  login,
};